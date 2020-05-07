import { App } from '@slack/bolt';
import 'dotenv/config';

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

export default app;
