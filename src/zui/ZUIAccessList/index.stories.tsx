import { ComponentMeta, ComponentStory } from '@storybook/react';

import ZUIAccessList from '.';

export default {
  component: ZUIAccessList,
  title: 'Molecules/ZUIAccessList',
} as ComponentMeta<typeof ZUIAccessList>;

const Template: ComponentStory<typeof ZUIAccessList> = (args) => {
  return (
    <div style={{ width: 700 }}>
      <ZUIAccessList
        accessList={args.accessList}
        officials={args.officials}
        orgId={args.orgId}
      />
    </div>
  );
};

export const basic = Template.bind({});
basic.args = {
  accessList: [
    {
      level: 'configure',
      person: {
        first_name: 'Clara',
        id: 1,
        last_name: 'Zetkin',
      },
    },
    {
      level: 'edit',
      person: {
        first_name: 'Clara',
        id: 1,
        last_name: 'Zetkin',
      },
    },
    {
      level: 'readonly',
      person: {
        first_name: 'Clara',
        id: 1,
        last_name: 'Zetkin',
      },
    },
    {
      level: 'readonly',
      person: {
        first_name: 'Clara',
        id: 1,
        last_name: 'Zetkin',
      },
    },
    {
      level: 'readonly',
      person: {
        first_name: 'Clara',
        id: 1,
        last_name: 'Zetkin',
      },
    },
    {
      level: 'readonly',
      person: {
        first_name: 'Clara',
        id: 1,
        last_name: 'Zetkin',
      },
    },
    {
      level: 'readonly',
      person: {
        first_name: 'Clara',
        id: 1,
        last_name: 'Zetkin',
      },
    },
  ],
  officials: [
    {
      first_name: 'Angela',
      id: 2,
      last_name: 'Davis',
      role: 'admin',
    },
    {
      first_name: 'Angela',
      id: 2,
      last_name: 'Davis',
      role: 'organizer',
    },
  ],
  orgId: 1,
};
