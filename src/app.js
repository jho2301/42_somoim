const dotenv = require('dotenv');
const { app } = require('./init');
const { unregister } = require('./skills/unregister');
const { register } = require('./skills/register');
const { help } = require('./skills/help');
const { SomoimDB, getUserCampusNo } = require('./model');

dotenv.config();

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
  section.text.text = `${somoim.represent_emoji} ${somoim.somoim_name} \t<@${somoim.registant_name}>\n${somoim.description}`;
  section.accessory.url = somoim.somoim_url;
  return section;
}

function urlFormatter(url) {
  let urlTemp = url.split('https://');
  if (urlTemp.length !== 1) return url;
  urlTemp = url.split('http://');
  if (urlTemp.length !== 1) return url;
  return `https://${url}`;
}

app.command(process.env.COMMAND || '/somoim', async ({ command, ack, body, context, client }) => {
  await ack();
  // const userinfo = await app.client.users.info({
  //   token: process.env.SLACK_BOT_TOKEN,
  //   user: command.user_id,
  // });

  if (`${command.text}` === 'register') await register(body, context, client);
  else if (`${command.text}` === 'list') await showList(command, body, context, client);
  else if (`${command.text}` === 'unregister') await unregister(body, context, client);
  else await help(command);
});

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

  for (let somoim of somoims) {
    listBlock.push(createSomoimSection(somoim));
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

async function showList(command, body) {
  console.log('\nphase1\n');
  const userinfo = await app.client.users.info({
    token: process.env.SLACK_BOT_TOKEN,
    user: body.user_id,
  });

  console.log('\nphase2\n');
  const campusNo = await getUserCampusNo(userinfo.user.profile.email);

  console.log('\nphase3\n');
  const listBlock = await createSomoimListBlock(0, 5, campusNo);
  console.log('list!!!:', listBlock);
  const result = await app.client.chat.postEphemeral({
    token: process.env.SLACK_BOT_TOKEN,
    channel: command.channel_id,
    user: command.user_id,
    blocks: listBlock,
    text: 'you called somoim list',
  });

  console.log('========== show list result ==============: ', result);
}

app.action('show-list', async ({ body, ack }) => {
  await ack();
  // console.log('hi');
  await showList({ user_id: body.user.id, channel_id: body.container.channel_id }, { user_id: body.user.id });
});

app.action(/paginate.*/, async ({ action, body, ack, respond }) => {
  try {
    await ack();
    console.log(body);
    const userinfo = await app.client.users.info({
      token: process.env.SLACK_BOT_TOKEN,
      user: body.user.id,
    });
    const campusNo = await getUserCampusNo(userinfo.user.profile.email);
    await respond({
      replace_original: true,
      blocks: await createSomoimListBlock(parseInt(action.value), 5, campusNo),
    });
  } catch (err) {
    console.log(err);
  }
});

app.view('register', async ({ ack, body, view, context, client }) => {
  await ack();

  const userinfo = await app.client.users.info({
    token: process.env.SLACK_BOT_TOKEN,
    user: body.user.id,
  });
  const campusName = await getUserCampusNo(userinfo.user.profile.email);

  let blockId = view.blocks[2].block_id;
  const somoimName = view.state.values[blockId].somoim_name.value;
  blockId = view.blocks[3].block_id;
  const emoji = view.state.values[blockId].represent_emoji.value;
  blockId = view.blocks[4].block_id;
  const desc = view.state.values[blockId].description.value;
  blockId = view.blocks[5].block_id;
  const url = urlFormatter(view.state.values[blockId].somoim_url.value);

  await SomoimDB.create({
    campus: campusName,
    somoim_name: somoimName,
    represent_emoji: emoji,
    description: desc,
    somoim_url: url,
    registant_name: body.user.name,
  })
    .then((somoim) => {
      console.log('data created!! id:', somoim.id);
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

      promotionBlock[2].text.text = `${emoji} *${somoimName}* <@${body.user.name}>\n ${desc}`;
      promotionBlock[2].accessory.url = url;

      blockId = view.blocks[6].block_id;
      if (view.state.values[blockId].advertise_action.selected_options) {
        app.client.chat.postMessage({
          token: process.env.SLACK_BOT_TOKEN,
          channel: 'making-slackbot',
          user: body.user.id,
          blocks: promotionBlock,
          text: `New Somoim Appears!. join now`,
        });
      }
    })
    .catch((err) => {
      console.log('failed to create\n', err);
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
});

app.action('join', async ({ ack }) => {
  await ack();
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('Bolt app is running!');
})();
