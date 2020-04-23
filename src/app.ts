import { App } from '@slack/bolt';

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

app.command('/somoim', async ({ command, ack, say }) => {
  await ack();

  if (`${command.text}` === 'register') await say('you called register');
  else if (`${command.text}` === 'list') await say('you called list');
  else if (`${command.text}` === 'unregister') await say('you called unregister');
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('Bolt app is running!');
})();
