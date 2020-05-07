const dotenv = require('dotenv');
const { App } = require('@slack/bolt');

dotenv.config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

exports.app = app;
