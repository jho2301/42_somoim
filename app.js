const { App } = require('@slack/bolt');

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.command('/somoim', async ({ command, ack, say }) => {
  // Acknowledge command request
  await ack();

  if (`${command.text}` === 'register')
    await say("you called register");
  else if (`${command.text}` === 'list')
    await say("you called list");
  else if (`${command.text}` === 'unregister')
    await say("you called unregister")
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('Bolt app is running!');
})();