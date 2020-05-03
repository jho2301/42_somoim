// eslint-disable-next-line import/no-unresolved
const dotenv = require("dotenv");
const { App } = require("@slack/bolt");
const { SomoimDB } = require("./db");
const { getUserCampus } = require("./campus_classification");

dotenv.config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

function createSomoimSection(somoim) {
  const section = {
    type: "section",
    text: {
      type: "mrkdwn",
      text: "",
    },
    accessory: {
      type: "button",
      text: {
        type: "plain_text",
        text: "Join",
      },
      url: "",
      value: "click_me_123",
      action_id: "button",
    },
  };

  section.text.text =
    // eslint-disable-next-line prefer-template
    somoim.represent_emoji + " " + somoim.somoim_name + "\t*<@" + somoim.registant_name + ">*\n" + somoim.description;
  section.accessory.url = somoim.somoim_url;
  return section;
}

function createSomoimOption(somoim) {
  const option = {
    text: {
      type: "plain_text",
      text: "",
    },
    value: "", // db id
  };
  option.text.text = somoim.somoim_name;
  option.value = `${somoim.id}`;
  return option;
}

async function register(body, context, client) {
  try {
    await client.views.open({
      token: context.botToken,
      trigger_id: body.trigger_id,
      view: {
        type: "modal",
        callback_id: "register-view",
        title: {
          type: "plain_text",
          text: "Register Somoim",
          emoji: true,
        },
        submit: {
          type: "plain_text",
          text: "Submit",
          emoji: true,
        },
        close: {
          type: "plain_text",
          text: "Cancel",
          emoji: true,
        },
        blocks: [
          {
            type: "section",
            text: {
              type: "plain_text",
              text: ":wave: Hello!\n\nPlease register your Somoim",
              emoji: true,
            },
          },
          {
            type: "divider",
          },
          {
            type: "input",
            element: {
              type: "plain_text_input",
              action_id: "somoim_name",
              placeholder: {
                type: "plain_text",
                text: "Name of your Somoim",
              },
            },
            label: {
              type: "plain_text",
              text: "What's the name of your Somoim?",
              emoji: true,
            },
          },
          {
            type: "input",
            element: {
              type: "plain_text_input",
              action_id: "represent_emoji",
              placeholder: {
                type: "plain_text",
                text: "Choose the best emoji for your Somoim",
              },
            },
            label: {
              type: "plain_text",
              text: "Best emoji for your Somoim",
              emoji: true,
            },
          },
          {
            type: "input",
            element: {
              type: "plain_text_input",
              action_id: "description",
              placeholder: {
                type: "plain_text",
                text: "brief introduce",
              },
            },
            label: {
              type: "plain_text",
              text: "Brief introduce",
              emoji: true,
            },
          },
          {
            type: "input",
            element: {
              type: "plain_text_input",
              action_id: "somoim_url",
              placeholder: {
                type: "plain_text",
                text: "URL",
              },
            },
            label: {
              type: "plain_text",
              text: "Discord/Kakao talk link",
              emoji: true,
            },
          },
          {
            type: "input",
            optional: true,
            element: {
              type: "checkboxes",
              options: [
                {
                  text: {
                    type: "plain_text",
                    text: "advertise to your own campus random channel",
                    emoji: true,
                  },
                  value: "advertise_checkbox",
                },
              ],
              action_id: "advertise_action",
            },
            label: {
              type: "plain_text",
              text: "Optional advertise",
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

async function showList(command) {
  const listBlock = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "*Which somoim would you like to join?* ",
      },
    },
    {
      type: "divider",
    },
  ];

  const somoims = await SomoimDB.findAll({
    offset: 0,
    limit: 5,
  });
  listBlock.push(createSomoimSection(somoims[0]));

  // for (const somoim of somoims) {
  //   listBlock.push(createSomoimSection(somoim));
  //   listBlock.push({
  //     type: "divider",
  //   });
  // }
  // console.log("LEN: ", listBlock.length);
  // console.log(listBlock);

  // listBlock.push({
  //   type: "actions",
  //   elements: [
  //     {
  //       type: "button",
  //       text: {
  //         type: "plain_text",
  //         emoji: true,
  //         text: "Previous",
  //       },
  //       value: "go_to_previous_value",
  //     },
  //     {
  //       type: "button",
  //       text: {
  //         type: "plain_text",
  //         emoji: true,
  //         text: "Next",
  //       },
  //       value: "go_to_next_value",
  //     }
  //   ],
  // });

  await app.client.chat.postEphemeral({
    token: process.env.SLACK_BOT_TOKEN,
    channel: command.channel_id,
    user: command.user_id,
    blocks: listBlock,
    text: "you called somoim list",
  });
}

async function unregister(body, context, client) {
  let unregisterBlock = {
    type: "modal",
    callback_id: "unregister",
    title: {
      type: "plain_text",
      text: "Somoim register",
      emoji: true,
    },
    submit: {
      type: "plain_text",
      text: "Submit",
      emoji: true,
    },
    close: {
      type: "plain_text",
      text: "Cancel",
      emoji: true,
    },
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "Hello 👋\n\n Unregister your somoim",
        },
      },
      {
        type: "divider",
      },
      {
        type: "input",
        block_id: "unregister_list",
        label: {
          type: "plain_text",
          text: "choose somoim to unregister",
        },
        element: {
          type: "static_select",
          action_id: "chosen_one",
          placeholder: {
            type: "plain_text",
            text: "소모임 고르기",
            emoji: true,
          },
          options: [
            // insert data here!
          ],
        },
      },
    ],
  };

  const somoims = await SomoimDB.findAll({
    where: {
      registant_name: body.user_name,
    },
  });

  // eslint-disable-next-line no-restricted-syntax
  if (!somoims.length) {
    unregisterBlock = {
      type: "modal",
      title: {
        type: "plain_text",
        text: "Somoim",
        emoji: true,
      },
      close: {
        type: "plain_text",
        text: "Close",
        emoji: true,
      },
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "\nyou don't have a somoim",
          },
        },
      ],
    };
  }

  for (const somoim of somoims) unregisterBlock.blocks[2].element.options.push(createSomoimOption(somoim));

  try {
    const result = await client.views.open({
      token: context.botToken,
      trigger_id: body.trigger_id,
      view: unregisterBlock,
    });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

app.command("/so", async ({ command, ack, body, context, client }) => {
  await ack();
  // const userinfo = await app.client.users.info({
  //   token: process.env.SLACK_BOT_TOKEN,
  //   user: command.user_id,
  // });

  if (`${command.text}` === "register") await register(body, context, client);
  else if (`${command.text}` === "list") await showList(command, body, context, client);
  else if (`${command.text}` === "unregister") await unregister(body, context, client);
});

app.view("register-view", async ({ ack, body, view, context, client }) => {
  await ack();

  const userinfo = await app.client.users.info({
    token: process.env.SLACK_BOT_TOKEN,
    user: body.user.id,
  });
  const campusName = await getUserCampus(userinfo.user.profile.email);

  let blockId = view.blocks[2].block_id;
  const somoimName = view.state.values[blockId].somoim_name.value;
  blockId = view.blocks[3].block_id;
  const emoji = view.state.values[blockId].represent_emoji.value;
  blockId = view.blocks[4].block_id;
  const desc = view.state.values[blockId].description.value;
  blockId = view.blocks[5].block_id;
  const url = view.state.values[blockId].somoim_url.value;

  await SomoimDB.create({
    campus: campusName,
    somoim_name: somoimName,
    represent_emoji: emoji,
    description: desc,
    somoim_url: url,
    registant_name: body.user.name,
  })
    .then((somoim) => {
      console.log("data created!! id:", somoim.id);
      client.views.open({
        token: context.botToken,
        trigger_id: body.trigger_id,
        view: {
          type: "modal",
          title: {
            type: "plain_text",
            text: "create success",
            emoji: true,
          },
          close: {
            type: "plain_text",
            text: "Close",
            emoji: true,
          },
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: "\n성공했어~",
              },
            },
          ],
        },
      });

      blockId = view.blocks[6].block_id;
      if (view.state.values[blockId].advertise_action.selected_options) {
        app.client.chat.postMessage({
          token: process.env.SLACK_BOT_TOKEN,
          channel: "making-slackbot",
          user: body.user.id,
          text: `Welcome!:party::party:, New ${body.user.id}'s somoim got registered now. join now`,
        });
      }
    })
    .catch((err) => {
      console.log("failed to create\n", err);
      client.views.open({
        token: context.botToken,
        trigger_id: body.trigger_id,
        view: {
          type: "modal",
          title: {
            type: "plain_text",
            text: "Error Occured",
            emoji: true,
          },
          close: {
            type: "plain_text",
            text: "Close",
            emoji: true,
          },
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: "\n이름이 중복됐어요~",
              },
            },
          ],
        },
      });
    });
});

app.view("unregister", async ({ ack, body, view, context, client }) => {
  await ack();

  const result = await SomoimDB.destroy({
    where: {
      id: view.state.values.unregister_list.chosen_one.selected_option.value,
    },
  });
  console.log(result);
});

app.action("btn_join", async ({ ack }) => {
  await ack();
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("Bolt app is running!");
})();
