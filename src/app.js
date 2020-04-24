const dotenv = require('dotenv');
const { App } = require('@slack/bolt');
const { somoimList } = require('./show_list/list_block');

dotenv.config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.command('/somoim42', async ({ command, ack, say }) => {
  await ack();

  if (`${command.text}` === 'register') await say('you called register');
  else if (`${command.text}` === 'list') await say(somoimList);
  else if (`${command.text}` === 'unregister') await say('you called unregister');
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('Bolt app is running!');
})();
