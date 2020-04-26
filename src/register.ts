// eslint-disable-next-line import/extensions
// import app from './app';
// import { App } from '@slack/bolt';
// import '@slack/bolt';

// app.message(':wave:', async ({ message, say }) => {
//   await say(`Hello, <@${message.user}>`);
// });

// async function viewModal(body, context, client) {
//   try {
// const result = await client.views.open({
//   token: context.botToken,
//   trigger_id: body.trigger_id,
//   view: {
// type: 'modal',
// title: {
//   type: 'plain_text',
//   text: 'Somoim register',
//   emoji: true,
// },
// submit: {
//   type: 'plain_text',
//   text: 'Submit',
//   emoji: true,
// },
// close: {
//   type: 'plain_text',
//   text: 'Cancel',
//   emoji: true,
// },
// blocks: [
//   {
// type: 'section',
// text: {
//   type: 'plain_text',
//   text: ':wave: Hello!\n\nPlease register your Somoim',
//   emoji: true,
// },
//   },
//   {
// type: 'divider',
//   },
//   {
// type: 'input',
// element: {
//   type: 'plain_text_input',
//   action_id: 'option_0',
//   placeholder: {
// type: 'plain_text',
// text: 'Name of your Somoim',
//   },
// },
// label: {
//   type: 'plain_text',
//   text: "What's the name of your Somoim?",
//   emoji: true,
// },
//   },
//   {
// type: 'input',
// element: {
//   type: 'plain_text_input',
//   action_id: 'option_1',
//   placeholder: {
// type: 'plain_text',
// text: 'Choose the best emoji for your Somoim',
//   },
// },
// label: {
//   type: 'plain_text',
//   text: 'Best emoji for your Somoim',
//   emoji: true,
// },
//   },
//   {
// type: 'input',
// element: {
//   type: 'plain_text_input',
//   action_id: 'option_1',
//   placeholder: {
// type: 'plain_text',
// text: '모임을 표현할 수 있는 간단한 설명',
//   },
// },
// label: {
//   type: 'plain_text',
//   text: "What's the name of your Somoim?",
//   emoji: true,
// },
//   },
// ],
//   },
// });
// console.log(result);
//   } catch (error) {
// console.error(error);
//   }
// }
//
// export default viewModal;

// app.message('register', async ({ body, context, client }) => {
//   try {
//     const result = await client.views.open({
//       token: context.botToken,
//       trigger_id: body.trigger_id,
//       view: {
//         type: 'modal',
//         title: {
//           type: 'plain_text',
//           text: 'My App',
//         },
//         close: {
//           type: 'plain_text',
//           text: 'Close',
//         },
//         blocks: [
//           {
//             type: 'section',
//             text: {
//               type: 'mrkdwn',
//               text:
//                 'About the simplest modal you could conceive of :smile:\n\nMaybe <https://api.slack.com/reference/block-kit/interactive-components|*make the modal interactive*> or <https://api.slack.com/surfaces/modals/using#modifying|*learn more advanced modal use cases*>.',
//             },
//           },
//           {
//             type: 'context',
//             elements: [
//               {
//                 type: 'mrkdwn',
//                 text:
//                   'Psssst this modal was designed using <https://api.slack.com/tools/block-kit-builder|*Block Kit Builder*>',
//               },
//             ],
//           },
//         ],
//       },
//     });
//     console.log(result);
//   } catch (error) {
//     console.error(error);
//   }
// });

// {
// 	"type": "modal",
// 	"title": {
// 		"type": "plain_text",
// 		"text": "Somoim register",
// 		"emoji": true
// 	},
// 	"submit": {
// 		"type": "plain_text",
// 		"text": "Submit",
// 		"emoji": true
// 	},
// 	"close": {
// 		"type": "plain_text",
// 		"text": "Cancel",
// 		"emoji": true
// 	},
// 	"blocks": [
// 		{
// 			"type": "section",
// 			"text": {
// 				"type": "plain_text",
// 				"text": ":wave: Hello!\n\nPlease register your Somoim",
// 				"emoji": true
// 			}
// 		},
// 		{
// 			"type": "divider"
// 		},
// 		{
// 			"type": "input",
// 			"element": {
// 			"type": "plain_text_input",
// 			"action_id": "option_0",
// 			"placeholder": {
// 				"type": "plain_text",
// 				"text": "Name of your Somoim"
// 			}
// 		},
// 			"label": {
// 				"type": "plain_text",
// 				"text": "What's the name of your Somoim?",
// 				"emoji": true
// 			}
// 		},
// 		{
// 			"type": "input",
// 			"element": {
// 			"type": "plain_text_input",
// 			"action_id": "option_1",
// 			"placeholder": {
// 				"type": "plain_text",
// 				"text": "Choose the best emoji for your Somoim"
// 			}
// 		},
// 			"label": {
// 				"type": "plain_text",
// 				"text": "Best emoji for your Somoim",
// 				"emoji": true
// 			}
// 		},
// 		{
// 			"type": "input",
// 			"element": {
// 			"type": "plain_text_input",
// 			"action_id": "option_1",
// 			"placeholder": {
// 				"type": "plain_text",
// 				"text": "모임을 표현할 수 있는 간단한 설명"
// 			}
// 		},
// 			"label": {
// 				"type": "plain_text",
// 				"text": "What's the name of your Somoim?",
// 				"emoji": true
// 			}
// 		}
// 	]
// }
