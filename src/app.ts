import { App } from '@slack/bolt';
import 'dotenv/config';

const app: App = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('app is running');
})();

export default app;
