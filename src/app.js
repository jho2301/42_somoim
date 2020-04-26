const dotenv = require('dotenv');
const { App } = require('@slack/bolt');

dotenv.config();

const showList = [
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
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text:
        ':soccer: *42 풋살 동아리*\n 개발(develop아님 ㅎ)도 같이 즐겨요! 매주 일요일 아카데미 축구장에서 풋살 합니다.',
    },
    accessory: {
      type: 'button',
      text: {
        type: 'plain_text',
        emoji: false,
        text: 'Join',
      },
      value: 'open.kakao.com',
    },
  },
  {
    type: 'divider',
  },
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text:
        ':deciduous_tree: *모여봐요 모동숲*\n 현생을 피해 섬으로 피신하신 분들은 이쪽으로 오세요 모동숲 얘기만 해요!',
    },
    accessory: {
      type: 'button',
      text: {
        type: 'plain_text',
        emoji: false,
        text: 'Join',
      },
      value: 'open.kakao.com',
    },
  },
  {
    type: 'divider',
  },
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text:
        ':book: *프로그래밍 책 같이 읽기*\n 혼자 하면 힘들더라구요... 프로그래밍 관련 서적들 같이 읽고 의견 나눠봐요.',
    },
    accessory: {
      type: 'button',
      text: {
        type: 'plain_text',
        emoji: false,
        text: 'Join',
      },
      value: 'open.kakao.com',
    },
  },
  {
    type: 'divider',
  },
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: ':video_game: *42롤*\n 롤 같이 하실 분들. 브실골 플다챌 모두 오세요ㅎㅎ',
    },
    accessory: {
      type: 'button',
      text: {
        type: 'plain_text',
        emoji: false,
        text: 'Join',
      },
      value: 'open.kakao.com',
    },
  },
  {
    type: 'divider',
  },
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: ':musical_note: *노동요 같이 들어요*\n 코딩할 때 듣는 음악 추천하는 방',
    },
    accessory: {
      type: 'button',
      text: {
        type: 'plain_text',
        emoji: false,
        text: 'Join',
      },
      value: 'open.kakao.com',
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
        text: {
          type: 'plain_text',
          emoji: true,
          text: 'Previous',
        },
        value: 'go_to_previous_value',
      },
      {
        type: 'button',
        text: {
          type: 'plain_text',
          emoji: true,
          text: 'Next',
        },
        value: 'go_to_next_value',
      },
    ],
  },
];

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.command('/somoim42', async ({ command, ack, say }) => {
  await ack();

  const userinfo = await app.client.users.info({
    token: process.env.SLACK_BOT_TOKEN,
    user: command.user_id,
  });

  if (`${command.text}` === 'register') await say(`${userinfo.user.profile.email}`);
  else if (`${command.text}` === 'list')
    await app.client.chat.postEphemeral({
      token: process.env.SLACK_BOT_TOKEN,
      channel: command.channel_id,
      user: command.user_id,
      blocks: showList,
      text: 'you called somoim list',
    });
  else if (`${command.text}` === 'unregister') await say('you called unregister');
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('Bolt app is running!');
})();
