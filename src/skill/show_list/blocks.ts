/* eslint-disable import/prefer-default-export */
import { SectionBlock, Button, MrkdwnElement, KnownBlock, ActionsBlock } from '@slack/types';
import { Somoim } from '../../model';
import { literal } from 'sequelize';

function createSomoimSection(somoim: Somoim): SectionBlock {
  const section: SectionBlock = {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: '',
    },
    accessory: {
      type: 'button',
      text: {
        type: 'plain_text',
        text: 'Join',
      },
      url: '',
      value: 'section',
      action_id: 'join',
    },
  };
  (section.text as MrkdwnElement).text = `${somoim.represent_emoji} *${somoim.somoim_name}* \t<@${somoim.registant_name}>\n${somoim.description}`;
  (section.accessory as Button).url = somoim.somoim_url;
  return section;
}

export async function createSomoimListBlock(offset: number, limit: number, campusNo: number): Promise<KnownBlock[]> {
  const listBlock: KnownBlock[] = [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: '*Which somoim would you like to join?* ',
      },
    },
    {
      type: 'divider',
    },
  ];

  const { count, rows: somoims } = await Somoim.findAndCountAll({
    where: {
      campus: campusNo,
    },
    offset,
    limit,
    order: [['created_at', 'DESC']],
  });

  for (let i = 0; i < somoims.length; i += 1) {
    listBlock.push(createSomoimSection(somoims[i]));
    listBlock.push({
      type: 'divider',
    });
  }

  const actionBlock: ActionsBlock = {
    type: 'actions',
    elements: [],
  };

  if (offset - limit >= 0) {
    actionBlock.elements.push({
      type: 'button',
      text: {
        type: 'plain_text',
        emoji: true,
        text: 'Prev',
      },
      action_id: 'paginate_previous',
      value: String(offset - limit),
    });
  }
  if (offset + limit < count) {
    actionBlock.elements.push({
      type: 'button',
      text: {
        type: 'plain_text',
        emoji: true,
        text: 'Next',
      },
      action_id: 'paginate_next',
      value: String(offset + limit),
    });
  }

  if (actionBlock.elements.length !== 0) listBlock.push(actionBlock);
  if (listBlock.length <= 2) {
    listBlock.push(
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'There is no Somoim on your campus. :sob:\n',
        },
      },
      {
        type: 'divider',
      }
    );
  }
  return listBlock;
}
