// eslint-disable-next-line import/no-unresolved
const dotenv = require("dotenv");
const { App } = require("@slack/bolt");
const { SomoimDB } = require("./db");
const { getUserCampus, Campus } = require("./campus_classification");

dotenv.config();

const showList = [
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: "*Whicbuttonh somoim would you like to join?* ",
    },
  },
  {
    type: "divider",
  },
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text:
        ":soccer: *42 풋살 동아리*\n 개발(develop아님 ㅎ)도 같이 즐겨요! 매주 일요일 아카데미 축구장에서 풋살 합니다.",
    },
    accessory: {
      type: "button",
      text: {
        type: "plain_text",
        emoji: false,
        text: "Join",
      },
      value: "open.kakao.com",
    },
  },
  {
    type: "divider",
  },
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text:
        ":deciduous_tree: *모여봐요 모동숲*\n 현생을 피해 섬으로 피신하신 분들은 이쪽으로 오세요 모동숲 얘기만 해요!",
    },
    accessory: {
      type: "button",
      text: {
        type: "plain_text",
        emoji: false,
        text: "Join",
      },
      value: "open.kakao.com",
    },
  },
  {
    type: "divider",
  },
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text:
        ":book: *프로그래밍 책 같이 읽기*\n 혼자 하면 힘들더라구요... 프로그래밍 관련 서적들 같이 읽고 의견 나눠봐요.",
    },
    accessory: {
      type: "button",
      text: {
        type: "plain_text",
        emoji: false,
        text: "Join",
      },
      value: "open.kakao.com",
    },
  },
  {
    type: "divider",
  },
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: ":video_game: *42롤*\n 롤 같이 하실 분들. 브실골 플다챌 모두 오세요ㅎㅎ",
    },
    accessory: {
      type: "button",
      text: {
        type: "plain_text",
        emoji: false,
        text: "Join",
      },
      value: "open.kakao.com",
    },
  },
  {
    type: "divider",
  },
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: ":musical_note: *노동요 같이 들어요*\n 코딩할 때 듣는 음악 추천하는 방",
    },
    accessory: {
      type: "button",
      text: {
        type: "plain_text",
        emoji: false,
        text: "Join",
      },
      value: "open.kakao.com",
    },
  },
  {
    type: "divider",
  },
  {
    type: "actions",
    elements: [
      {
        type: "button",
        text: {
          type: "plain_text",
          emoji: true,
          text: "Previous",
        },
        value: "go_to_previous_value",
      },
      {
        type: "button",
        text: {
          type: "plain_text",
          emoji: true,
          text: "Next",
        },
        value: "go_to_next_value",
      },
    ],
  },
];

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

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
            type: "section",
            text: {
              type: "mrkdwn",
              text: "Select to advertise (optional)",
            },
            accessory: {
              type: "checkboxes",
              options: [
                {
                  text: {
                    type: "plain_text",
                    text: "advertise to random channel",
                    emoji: true,
                  },
                  description: {
                    type: "plain_text",
                    text: "to your own campus random channel",
                    emoji: true,
                  },
                  value: "advertise",
                },
              ],
            },
          },
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
}

async function unregister(body, context, client) {
  try {
    const result = await client.views.open({
      token: context.botToken,
      trigger_id: body.trigger_id,
      view: {
        type: "modal",
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
            type: "section",
            text: {
              type: "mrkdwn",
              text: "삭제할 소모임을 골라주세요",
            },
            accessory: {
              type: "static_select",
              placeholder: {
                type: "plain_text",
                text: "소모임 고르기",
                emoji: true,
              },
              options: [
                {
                  text: {
                    type: "plain_text",
                    text: ":deciduous_tree: 모여봐요 모동숲",
                    emoji: true,
                  },
                  value: "value-0",
                },
                {
                  text: {
                    type: "plain_text",
                    text: ":soccer: 42 풋살 동아리",
                    emoji: true,
                  },
                  value: "value-1",
                },
                {
                  text: {
                    type: "plain_text",
                    text: ":musical_note: 노동요 같이 들어요",
                    emoji: true,
                  },
                  value: "value-2",
                },
                {
                  text: {
                    type: "plain_text",
                    text: ":video_game: 42롤",
                    emoji: true,
                  },
                  value: "value-3",
                },
              ],
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

app.command("/somoim", async ({ command, ack, body, context, client }) => {
  await ack();
  // const userinfo = await app.client.users.info({
  //   token: process.env.SLACK_BOT_TOKEN,
  //   user: command.user_id,
  // });

  if (`${command.text}` === "register") await register(body, context, client);
  else if (`${command.text}` === "list")
    await app.client.chat.postEphemeral({
      token: process.env.SLACK_BOT_TOKEN,
      channel: command.channel_id,
      user: command.user_id,
      blocks: showList,
      text: "you called somoim list",
    });
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
      registant_name: body.user.name
    }).then((somoim) => {
      console.log("data created!! id:", somoim.id);
      client.views.open({
        token: context.botToken,
        trigger_id: body.trigger_id,
        view:
      {
        "type": "modal",
        "title": {
          "type": "plain_text",
          "text": "create success",
          "emoji": true
        },
        "close": {
          "type": "plain_text",
          "text": "Close",
          "emoji": true
        },
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "\n성공했어~"
            }
          }
        ]
      }})
    }
    ).catch(err => {
      console.log('failed to create\n', err);
      client.views.open({
        token: context.botToken,
        trigger_id: body.trigger_id,
        view:
      {
        "type": "modal",
        "title": {
          "type": "plain_text",
    	"text": "Error Occured",
          "emoji": true
        },
        "close": {
          "type": "plain_text",
          "text": "Close",
          "emoji": true
        },
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "\n이름이 중복됐어요~"
            }
          }
        ]
      }})
    });
  }
);

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log("Bolt app is running!");
})();
