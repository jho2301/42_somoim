import { Button, MrkdwnElement, SectionBlock, KnownBlock } from '@slack/types';
import { Somoim } from '../../model';
import { urlFormatter, getUserCampusNo } from '../../util';
import * as blocks from './blocks';
import app from '../../app';

function promoteToRandomChannel(body, { emoji, somoimName, desc, url }): void {
  const { promotionBlocks } = blocks;
  ((promotionBlocks[2] as SectionBlock)
    .text as MrkdwnElement).text = `${emoji} *${somoimName}* <@${body.user.name}>\n ${desc}`;
  ((promotionBlocks[2] as SectionBlock).accessory as Button).url = url;

  app.client.chat.postMessage({
    token: process.env.SLACK_BOT_TOKEN,
    channel: process.env.PROMOTION_CHANNEL || 'random',
    user: body.user.id,
    blocks: promotionBlocks,
    text: `New Somoim Appears!. join now`,
  });
}

async function showRegisterModal(body, context, client): Promise<void> {
  const registerBlocks: KnownBlock[] = await blocks.getRegisterBlocks(body.user_id);
  try {
    await client.views.open({
      token: context.botToken,
      trigger_id: body.trigger_id,
      view: {
        type: 'modal',
        callback_id: 'register',
        title: {
          type: 'plain_text',
          text: 'Somoim Registration',
          emoji: true,
        },
        submit: {
          type: 'plain_text',
          text: 'Submit',
          emoji: true,
        },
        close: {
          type: 'plain_text',
          text: 'Cancel',
          emoji: true,
        },
        blocks: registerBlocks,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

async function register(body, view, context, client): Promise<void> {
  const campusNo: number = await getUserCampusNo(body.user.id);
  let blockId: string = view.blocks[2].block_id;
  const somoimName: string = view.state.values[blockId].somoim_name.value;
  blockId = view.blocks[3].block_id;
  const emoji: string = view.state.values[blockId].represent_emoji.value;
  blockId = view.blocks[5].block_id;
  const desc: string = view.state.values[blockId].description.value;
  blockId = view.blocks[6].block_id;
  const url: string = urlFormatter(view.state.values[blockId].somoim_url.value);

  await Somoim.create({
    campus: campusNo,
    somoim_name: somoimName,
    represent_emoji: emoji,
    description: desc,
    somoim_url: url,
    registant_name: body.user.name,
  })
    .then(() => {
      client.views.open({
        token: context.botToken,
        trigger_id: body.trigger_id,
        view: {
          type: 'modal',
          title: {
            type: 'plain_text',
            text: 'Registration Success',
            emoji: true,
          },
          close: {
            type: 'plain_text',
            text: 'Close',
            emoji: true,
          },
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: '\nYou registered for a Somoim list',
              },
            },
          ],
        },
      });

      blockId = view.blocks[7].block_id;
      if (view.state.values[blockId].advertise_action.selected_options)
        promoteToRandomChannel(body, { emoji, somoimName, desc, url });
    })
    .catch((err) => {
      console.error(err);
      client.views.open({
        token: context.botToken,
        trigger_id: body.trigger_id,
        view: {
          type: 'modal',
          title: {
            type: 'plain_text',
            text: 'Error Occured',
            emoji: true,
          },
          close: {
            type: 'plain_text',
            text: 'Close',
            emoji: true,
          },
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: '\nThere is a duplicate Somoim name',
              },
            },
          ],
        },
      });
    });
}

app.view('register', async ({ ack, body, view, context, client }) => {
  await ack();
  await register(body, view, context, client);
});

export default showRegisterModal;
