import app from './app';
import { showRegisterModal, showListMessage, showUnregisterModal, showHelpMessage } from './skill';

app.command(process.env.COMMAND || '/somoim', async ({ command, ack, body, context, client }) => {
  await ack();
  if (`${command.text}` === 'register') await showRegisterModal(body, context, client);
  else if (`${command.text}` === 'list') await showListMessage(command);
  else if (`${command.text}` === 'unregister') await showUnregisterModal(body, context, client);
  else showHelpMessage(command);
});

(async () => {
  await app.start(process.env.PORT || 3000);
})();
