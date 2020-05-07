const { app } = require('../../init');

async function showHelpMessage(command) {
  const helpMessage = [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text:
          '```\t/somoim register\t\tregister new group\n\t/somoim list\t\t\tlist groups of your campus\n\t/somoim unregister\t  delete one of your groups```',
      },
    },
  ];
  await app.client.chat.postEphemeral({
    token: process.env.SLACK_BOT_TOKEN,
    channel: command.channel_id,
    user: command.user_id,
    blocks: helpMessage,
    text: 'you called help',
  });
}

exports.showHelpMessage = showHelpMessage;
