import { SlashCommand } from '@slack/bolt';
import app from '../../app';
import * as blocks from './blocks';

function showHelpMessage(command: SlashCommand): void {
  app.client.chat.postEphemeral({
    token: process.env.SLACK_BOT_TOKEN,
    channel: command.channel_id,
    user: command.user_id,
    blocks: blocks.helpBlocks,
    text: 'you called help',
  });
}

export default showHelpMessage;
