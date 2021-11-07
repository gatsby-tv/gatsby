import { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import {
  Breadcrumbs,
  BreadcrumbsProps,
  BreadcrumbPath,
} from '@lib/components/Breadcrumbs';
import { Button } from '@lib/components/Button';

import styles from './Breadcrumbs.stories.scss';

export default {
  title: 'Breadcrumbs',
  component: Breadcrumbs,
} as Meta;

export const Example: Story<BreadcrumbsProps> = (props) => {
  const [crumbs, setCrumbs] = useState<BreadcrumbPath[]>([
    { label: 'First' },
    { label: 'Second' },
    { label: 'Third' },
  ]);

  return (
    <>
      <div className={styles.Breadcrumbs}>
        <Breadcrumbs
          crumbs={crumbs}
          onSelect={(crumb: BreadcrumbPath) =>
            setCrumbs((current) => current.slice(0, current.indexOf(crumb) + 1))
          }
        />
      </div>
      <div className={styles.Controls}>
        <Button onClick={() => setCrumbs([])}>Clear</Button>
        <Button
          onClick={() =>
            setCrumbs((current) => [...current, { label: 'First' }])
          }
        >
          First
        </Button>
        <Button
          onClick={() =>
            setCrumbs((current) => [...current, { label: 'Second' }])
          }
        >
          Second
        </Button>
        <Button
          onClick={() =>
            setCrumbs((current) => [...current, { label: 'Third' }])
          }
        >
          Third
        </Button>
        <Button
          onClick={() =>
            setCrumbs((current) => [
              ...current,
              { label: 'First' },
              { label: 'Second' },
            ])
          }
        >
          First & Second
        </Button>
      </div>
    </>
  );
};
