import { KnownBlock, SectionBlock, DividerBlock, InputBlock } from '@slack/types';
import { Somoim } from '../../model';

/* eslint-disable import/prefer-default-export */
export function createSomoimOption(somoim: Somoim): any {
  const option: any = {
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

export function createUnregisterBlocks(): KnownBlock[] {
  const unregisterBlocks: KnownBlock[] = [
    <SectionBlock>{
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: ' ',
      },
    },
    <DividerBlock>{
      type: 'divider',
    },
    <InputBlock>{
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
  ];
  return unregisterBlocks;
}
