import { KnownBlock, SectionBlock, DividerBlock, InputBlock, ActionsBlock } from '@slack/types';
import { getUserCampusNo, getUserCampusName } from '../../util';

export const promotionBlocks: Array<KnownBlock> = [
  <SectionBlock>{
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: 'New Somoim appears!',
    },
  },
  <DividerBlock>{
    type: 'divider',
  },
  <SectionBlock>{
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: '-',
    },
    accessory: {
      type: 'button',
      text: {
        type: 'plain_text',
        text: 'Join',
      },
      url: 'https://naver.com',
      value: 'none',
      action_id: 'join',
    },
  },
  <DividerBlock>{
    type: 'divider',
  },
  <ActionsBlock>{
    type: 'actions',
    elements: [
      {
        type: 'button',
        action_id: 'show-list',
        text: {
          type: 'plain_text',
          text: 'show other somoims',
          emoji: true,
        },
        value: 'click_me_123',
      },
    ],
  },
];

export async function getRegisterBlocks(body): Promise<Array<KnownBlock>> {
  const campusName = await getUserCampusName(await getUserCampusNo(body.user.id));
  const registerBlocks: Array<KnownBlock> = [
    <SectionBlock>{
      type: 'section',
      text: {
        type: 'plain_text',
        text: ':wave: Hello! Please register your Somoim',
        emoji: true,
      },
    },
    <DividerBlock>{
      type: 'divider',
    },
    <InputBlock>{
      type: 'input',
      label: {
        type: 'plain_text',
        text: "What's the name of your Somoim?",
        emoji: true,
      },
      element: {
        type: 'plain_text_input',
        action_id: 'somoim_name',
        placeholder: {
          type: 'plain_text',
          text: 'Name of your Somoim',
        },
      },
    },
    <InputBlock>{
      type: 'input',
      element: {
        type: 'plain_text_input',
        action_id: 'represent_emoji',
        placeholder: {
          type: 'plain_text',
          text: 'e.g.) :soccer:',
        },
      },
      label: {
        type: 'plain_text',
        text: 'Emoji representing your Somoim',
        emoji: true,
      },
    },
    <SectionBlock>{
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '<https://www.webfx.com/tools/emoji-cheat-sheet/|copy emoji from emoji cheatsheet>',
      },
    },
    {
      type: 'input',
      element: {
        type: 'plain_text_input',
        action_id: 'description',
        placeholder: {
          type: 'plain_text',
          text: 'My Somoim is about...',
        },
      },
      label: {
        type: 'plain_text',
        text: 'Brief introduction',
        emoji: true,
      },
    },
    <InputBlock>{
      type: 'input',
      element: {
        type: 'plain_text_input',
        action_id: 'somoim_url',
        placeholder: {
          type: 'plain_text',
          text: 'Discord Server, KaKao Talk Open Chat, Slack Workspace, etc...',
        },
      },
      label: {
        type: 'plain_text',
        text: 'Somoim URL',
        emoji: true,
      },
    },
    <InputBlock>{
      type: 'input',
      optional: true,
      element: {
        type: 'checkboxes',
        initial_options: [
          {
            text: {
              type: 'plain_text',
              text: process.env.IS_42BORN2CODE ? `Promote to #${campusName}_global_random` : `Promote to #random`,
              emoji: true,
            },
            value: 'advertise_checkbox',
          },
        ],
        options: [
          {
            text: {
							type: 'plain_text',
              text: process.env.PROMOTION_CHANNEL ? `Promote to #${campusName}_global_random` : `Promote to #random`,
              emoji: true,
            },
            value: 'advertise_checkbox',
          },
        ],
        action_id: 'advertise_action',
      },
      label: {
        type: 'plain_text',
        text: 'Promotion',
        emoji: true,
      },
    },
  ];
  return registerBlocks;
}
