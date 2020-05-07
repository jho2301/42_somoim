const { SomoimDB } = require('../../model');
const { app } = require('../../init');

function createSomoimOption(somoim) {
  const option = {
    text: {
      type: 'plain_text',
      text: '',
    },
    value: '',
  };
  option.text.text = somoim.somoim_name;
  option.value = `${somoim.id}`;
  return option;
}

async function showUnregisterModal(body, context, client) {
  let unregisterBlock = {
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
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: ' ',
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'input',
        block_id: 'unregister_list',
        label: {
          type: 'plain_text',
          text: 'Select a Somoim to unregister',
        },
        element: {
          type: 'static_select',
          action_id: 'chosen_one',
          placeholder: {
            type: 'plain_text',
            text: 'Select a Somoim',
            emoji: true,
          },
          options: [],
        },
      },
    ],
  };

  const somoims = await SomoimDB.findAll({
    where: {
      registant_name: body.user_name,
    },
  });

  if (!somoims.length) {
    unregisterBlock = {
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
    };
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const somoim of somoims) unregisterBlock.blocks[2].element.options.push(createSomoimOption(somoim));

  try {
    await client.views.open({
      token: context.botToken,
      trigger_id: body.trigger_id,
      view: unregisterBlock,
    });
  } catch (error) {
    console.error(error);
  }
}

async function unregister(view) {
  SomoimDB.destroy({
    where: {
      id: view.state.values.unregister_list.chosen_one.selected_option.value,
    },
  });
}

app.view('unregister', async ({ ack, view }) => {
  await ack();
  await unregister(view);
});

exports.showUnregisterModal = showUnregisterModal;
