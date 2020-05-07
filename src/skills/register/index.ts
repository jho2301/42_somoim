import app from '../../app';
import { getUserCampusNo, getUserCampusName, SomoimDB } from '../../model';
import { UsersInfoResult } from '../../interface';

function promoteToRandomChannel(body, registrationInfo) {
  const promotionBlock = [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'New Somoim appears!',
      },
    },
    {
      type: 'divider',
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '-',
      },
      accessory: {
        type: 'button',
        text: {
          type: 'plain_text',
          text: 'Join',
        },
        url: 'https://naver.com',
        value: 'none',
        action_id: 'join',
      },
    },
    {
      type: 'divider',
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          action_id: 'show-list',
          text: {
            type: 'plain_text',
            text: 'show other somoims',
            emoji: true,
          },
          value: 'click_me_123',
        },
      ],
    },
  ];

  promotionBlock[2].text.text = `${registrationInfo.emoji} *${registrationInfo.somoimName}* <@${body.user.name}>\n ${registrationInfo.desc}`;
  promotionBlock[2].accessory.url = registrationInfo.url;

  app.client.chat.postMessage({
    token: process.env.SLACK_BOT_TOKEN,
    channel: process.env.PROMOTION_CHANNEL || 'random',
    user: body.user.id,
    blocks: promotionBlock,
    text: `New Somoim Appears!. join now`,
  });
}

async function showRegisterModal(body, context, client) {
  try {
    const userinfo: UsersInfoResult = await app.client.users.info({
      token: process.env.SLACK_BOT_TOKEN,
      user: body.user_id,
    });

    const campusNo = await getUserCampusNo(userinfo.user.profile.email);
    const campusName = await getUserCampusName(campusNo);

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
        blocks: [
          {
            type: 'section',
            text: {
              type: 'plain_text',
              text: ':wave: Hello! Please register your Somoim',
              emoji: true,
            },
          },
          {
            type: 'divider',
          },
          {
            type: 'input',
            label: {
              type: 'plain_text',
              text: "What's the name of your Somoim?",
              emoji: true,
            },
            element: {
              type: 'plain_text_input',
              action_id: 'somoim_name',
              placeholder: {
                type: 'plain_text',
                text: 'Name of your Somoim',
              },
            },
          },
          {
            type: 'input',
            element: {
              type: 'plain_text_input',
              action_id: 'represent_emoji',
              placeholder: {
                type: 'plain_text',
                text: 'e.g.) :soccer:',
              },
            },
            label: {
              type: 'plain_text',
              text: 'Emoji representing your Somoim',
              emoji: true,
            },
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: '<https://www.webfx.com/tools/emoji-cheat-sheet/|copy emoji from emoji cheatsheet>',
            },
          },
          {
            type: 'input',
            element: {
              type: 'plain_text_input',
              action_id: 'description',
              placeholder: {
                type: 'plain_text',
                text: 'My Somoim is about...',
              },
            },
            label: {
              type: 'plain_text',
              text: 'Brief introduction',
              emoji: true,
            },
          },
          {
            type: 'input',
            element: {
              type: 'plain_text_input',
              action_id: 'somoim_url',
              placeholder: {
                type: 'plain_text',
                text: 'Discord Server, KaKao Talk Open Chat, Slack Workspace, etc...',
              },
            },
            label: {
              type: 'plain_text',
              text: 'Somoim URL',
              emoji: true,
            },
          },
          {
            type: 'input',
            optional: true,
            element: {
              type: 'checkboxes',
              initial_options: [
                {
                  text: {
                    type: 'plain_text',
                    text: `Promote to #${campusName}_global_random`,
                    emoji: true,
                  },
                  value: 'advertise_checkbox',
                },
              ],
              options: [
                {
                  text: {
                    type: 'plain_text',
                    text: `Promote to #${campusName}_global_random`,
                    emoji: true,
                  },
                  value: 'advertise_checkbox',
                },
              ],
              action_id: 'advertise_action',
            },
            label: {
              type: 'plain_text',
              text: 'Promotion',
              emoji: true,
            },
          },
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
}

function urlFormatter(url) {
  let urlTemp = url.split('https://');
  if (urlTemp.length !== 1) return url;
  urlTemp = url.split('http://');
  if (urlTemp.length !== 1) return url;
  return `https://${url}`;
}

async function register(body, view, context, client) {
  const userinfo: UsersInfoResult = await app.client.users.info({
    token: process.env.SLACK_BOT_TOKEN,
    user: body.user.id,
  });

  const campusName = await getUserCampusNo(userinfo.user.profile.email);

  let blockId = view.blocks[2].block_id;
  const somoimName = view.state.values[blockId].somoim_name.value;
  blockId = view.blocks[3].block_id;
  const emoji = view.state.values[blockId].represent_emoji.value;
  blockId = view.blocks[5].block_id;
  const desc = view.state.values[blockId].description.value;
  blockId = view.blocks[6].block_id;
  const url = urlFormatter(view.state.values[blockId].somoim_url.value);

  await SomoimDB.create({
    campus: campusName,
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
