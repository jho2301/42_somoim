import { KnownBlock } from '@slack/types';
import { ButtonAction } from '@slack/bolt';
import { getUserCampusNo } from '../../util';
import { createSomoimListBlock } from './blocks';
import app from '../../app';

async function showListMessage(command): Promise<void> {
  const campusNo: number = await getUserCampusNo(command.user_id);
  const listBlocks: KnownBlock[] = await createSomoimListBlock(0, 5, campusNo);
  await app.client.chat.postEphemeral({
    token: process.env.SLACK_BOT_TOKEN,
    channel: command.channel_id,
    user: command.user_id,
    blocks: listBlocks,
    text: 'you called somoim list',
  });
}

app.action(/paginate.*/, async ({ action, body, ack, respond }) => {
  try {
    await ack();
    const campusNo: number = await getUserCampusNo(body.user.id);
    const { value } = action as ButtonAction;
    const blocks: KnownBlock[] = await createSomoimListBlock(parseInt(value, 10), 5, campusNo);
    await respond({
      replace_original: true,
      blocks,
      text: 'error occurred',
    });
  } catch (err) {
    console.error(err);
  }
});

app.action('join', async ({ ack }) => {
  await ack();
});

app.action('show-list', async ({ body, ack }) => {
  await ack();
  await showListMessage({ user_id: body.user.id, channel_id: body.channel.id });
});

export default showListMessage;
