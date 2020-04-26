// eslint-disable-next-line import/no-unresolved
const dotenv = require('dotenv');
const { App } = require('@slack/bolt');
// const { somoimList } = require('./show_list/list_block');
// const { ModalBlocks } = require('./register/register_block');

dotenv.config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

async function viewModal(body, context, client) {
  try {
    const result = await client.views.open({
      token: context.botToken,
      trigger_id: body.trigger_id,
      view: {
        type: 'modal',
        title: {
          type: 'plain_text',
          text: 'Somoim register',
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
              text: ':wave: Hello!\n\nPlease register your Somoim',
              emoji: true,
            },
          },
          {
            type: 'divider',
          },
          {
            type: 'input',
            element: {
              type: 'plain_text_input',
              action_id: 'option_0',
              placeholder: {
                type: 'plain_text',
                text: 'Name of your Somoim',
              },
            },
            label: {
              type: 'plain_text',
              text: "What's the name of your Somoim?",
              emoji: true,
            },
          },
          {
            type: 'input',
            element: {
              type: 'plain_text_input',
              action_id: 'option_1',
              placeholder: {
                type: 'plain_text',
                text: 'Choose the best emoji for your Somoim',
              },
            },
            label: {
              type: 'plain_text',
              text: 'Best emoji for your Somoim',
              emoji: true,
            },
          },
          {
            type: 'input',
            element: {
              type: 'plain_text_input',
              action_id: 'option_1',
              placeholder: {
                type: 'plain_text',
                text: '소모임 이름을 적어주세요',
              },
            },
            label: {
              type: 'plain_text',
              text: "What's the name of your Somoim?",
              emoji: true,
            },
          },
        ],
      },
    });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

app.command('/somoim', async ({ command, ack, say, body, context, client }) => {
  await ack();

  if (`${command.text}` === 'register') await viewModal(body, context, client);
  else if (`${command.text}` === 'list') await say('you called list');
  else if (`${command.text}` === 'unregister') await say('you called unregister');
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('Bolt app is running!');
})();

/* viewModal(body, context, client); */
/* say('you called register'); */
