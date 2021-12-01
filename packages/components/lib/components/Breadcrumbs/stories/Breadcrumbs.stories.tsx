import { useRef, useState } from 'react';
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
  const key = useRef(0);
  const [crumbs, setCrumbs] = useState<BreadcrumbPath[]>([
    { label: 'First', key: key.current++ },
    { label: 'Second', key: key.current++ },
    { label: 'Third', key: key.current++ },
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
            setCrumbs((current) => [
              ...current,
              { label: 'First', key: key.current++ },
            ])
          }
        >
          First
        </Button>
        <Button
          onClick={() =>
            setCrumbs((current) => [
              ...current,
              { label: 'Second', key: key.current++ },
            ])
          }
        >
          Second
        </Button>
        <Button
          onClick={() => setCrumbs([{ label: 'Third', key: key.current++ }])}
        >
          Replace with Third
        </Button>
        <Button
          onClick={() =>
            setCrumbs((current) => [
              ...current,
              { label: 'First', key: key.current++ },
              { label: 'Second', key: key.current++ },
            ])
          }
        >
          First & Second
        </Button>
      </div>
    </>
  );
};
