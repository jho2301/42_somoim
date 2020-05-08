import { SectionBlock } from '@slack/types';

/* eslint-disable import/prefer-default-export */
export const helpBlocks: SectionBlock[] = [
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text:
        '```\t/somoim register\t\tregister new group\n\t/somoim list\t\t\tlist groups of your campus\n\t/somoim unregister\t  delete one of your groups```',
    },
  },
];
