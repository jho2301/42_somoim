import { ButtonAction } from '@slack/bolt';
import app from '../../app';
import { SomoimDB, getUserCampusNo } from '../../model';
import { UsersInfoResult } from '../../interface';

function createSomoimSection(somoim) {
  const section = {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: '',
    },
    accessory: {
      type: 'button',
      text: {
        type: 'plain_text',
        text: 'Join',
      },
      url: '',
      value: 'click_me_123',
      action_id: 'join',
    },
  };
  section.text.text = `${somoim.represent_emoji} *${somoim.somoim_name}* \t<@${somoim.registant_name}>\n${somoim.description}`;
  section.accessory.url = somoim.somoim_url;
  return section;
}

async function createSomoimListBlock(offset, limit, campusNo) {
  const listBlock = [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*Which somoim would you like to join?* ',
      },
    },
    {
      type: 'divider',
    },
  ];

  const { count, rows: somoims } = await SomoimDB.findAndCountAll({
    where: {
      campus: campusNo,
    },
    offset,
    limit,
  });

  for (let i = 0; i < somoims.length; i += 1) {
    listBlock.push(createSomoimSection(somoims[i]));
    listBlock.push({
      type: 'divider',
    });
  }

  const actionBlock = {
    type: 'actions',
    elements: [],
  };
  if (offset - limit >= 0) {
    actionBlock.elements.push({
      type: 'button',
      text: {
        type: 'plain_text',
        emoji: true,
        text: 'Previous',
      },
      action_id: 'paginate_previous',
      value: String(offset - limit),
    });
  }
  if (offset + limit < count) {
    actionBlock.elements.push({
      type: 'button',
      text: {
        type: 'plain_text',
        emoji: true,
        text: 'Next',
      },
      action_id: 'paginate_next',
      value: String(offset + limit),
    });
  }

  if (actionBlock.elements.length !== 0) listBlock.push(actionBlock);
  if (listBlock.length <= 2) {
    listBlock.push(
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'There is no Somoim on your campus. :sob:\n',
        },
      },

      {
        type: 'divider',
      }
    );
  }
  return listBlock;
}

async function showListMessage(command, body) {
  const userinfo: UsersInfoResult = await app.client.users.info({
    token: process.env.SLACK_BOT_TOKEN,
    user: body.user_id,
  });
  const campusNo = await getUserCampusNo(userinfo.user.profile.email);
  const listBlock = await createSomoimListBlock(0, 5, campusNo);
  await app.client.chat.postEphemeral({
    token: process.env.SLACK_BOT_TOKEN,
    channel: command.channel_id,
    user: command.user_id,
    blocks: listBlock,
    text: 'you called somoim list',
  });
}

app.action(/paginate.*/, async ({ action, body, ack, respond }) => {
  try {
    await ack();
    const userinfo: UsersInfoResult = await app.client.users.info({
      token: process.env.SLACK_BOT_TOKEN,
      user: body.user.id,
    });
    const { value } = action as ButtonAction;
    const campusNo = await getUserCampusNo(userinfo.user.profile.email);
    const blocks = await createSomoimListBlock(parseInt(value, 10), 5, campusNo);
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
  await showListMessage({ user_id: body.user.id, channel_id: body.channel.id }, { user_id: body.user.id });
});

export default showListMessage;
