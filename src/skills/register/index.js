const { getUserCampusNo, getUserCampusName } = require('../../model');
const { app } = require('../../init');

async function register(body, context, client) {
  try {
    const userinfo = await app.client.users.info({
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

exports.register = register;
