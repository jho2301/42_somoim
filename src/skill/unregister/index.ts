import { InputBlock, StaticSelect } from '@slack/types';
import { Somoim } from '../../model';
import app from '../../app';
import { createSomoimOption, unregisterBlocks } from './blocks';

async function showUnregisterModal(body, context, client) {
  let unregisterModal = {
    type: 'modal',
    callback_id: 'unregister',
    title: {
      type: 'plain_text',
      text: 'Somoim Unregisteration',
      emoji: true,
    },
    submit: {
      type: 'plain_text',
      text: 'Submit',
      emoji: true,
    },
    close: {
      type: 'plain_text',
      text: 'Cancel',
      emoji: true,
    },
    blocks: unregisterBlocks,
  };

  const somoims = await Somoim.findAll({
    where: {
      registant_name: body.user_name,
    },
  });

  if (!somoims.length) {
    unregisterModal = {
      type: 'modal',
      title: {
        type: 'plain_text',
        text: 'Somoim Unregistration',
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
            text: '\nThere is no Somoim to unregister :cry:',
          },
        },
      ],
      callback_id: 'unregister',
      submit: {
        type: 'plain_text',
        text: 'submit',
        emoji: false,
      },
    };
  } else {
    for (let i = 0; i < somoims.length; i += 1)
      ((unregisterModal.blocks[2] as InputBlock).element as StaticSelect).options.push(createSomoimOption(somoims[i]));
  }

  try {
    await client.views.open({
      token: context.botToken,
      trigger_id: body.trigger_id,
      view: unregisterModal,
    });
  } catch (error) {
    console.error(error);
  }
}

async function unregister(view) {
  Somoim.destroy({
    where: {
      id: view.state.values.unregister_list.chosen_one.selected_option.value,
    },
  });
}

app.view('unregister', async ({ ack, view }) => {
  await ack();
  await unregister(view);
});

export default showUnregisterModal;
