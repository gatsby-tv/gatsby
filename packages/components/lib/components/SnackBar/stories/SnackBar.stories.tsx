import { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { useSnackBar } from '@gatsby-tv/utilities';

import { Button } from '@lib/components/Button';
import { SnackBar } from '@lib/components/SnackBar';

import styles from './SnackBar.stories.scss';

export default {
  title: 'SnackBar',
  component: SnackBar,
} as Meta;

export const Message: Story = () => {
  const [, setSnack] = useSnackBar();
  const [clicks, setClicks] = useState(1);

  return (
    <Button
      animate
      onClick={() => {
        setClicks(clicks + 1);
        setSnack(
          <div className={styles.Snack}>
            {`${clicks} Clicks!`}
            <Button animate onClick={() => setSnack(undefined)}>
              Dismiss
            </Button>
          </div>
        );
      }}
    >
      ClickMe
    </Button>
  );
};

export const Toast: Story = () => {
  const [, setSnack] = useSnackBar();
  const [clicks, setClicks] = useState(1);

  return (
    <Button
      animate
      onClick={() => {
        setClicks(clicks + 1);
        setSnack({
          content: `${clicks} Clicks!`,
          duration: 2000,
        });
      }}
    >
      ClickMe
    </Button>
  );
};

export const AsyncToast: Story = (props) => {
  const [snack, setSnack] = useSnackBar();
  const [clicks, setClicks] = useState(1);

  return (
    <Button
      animate
      onClick={() => {
        setClicks(clicks + 1);
        setSnack({
          content: new Promise((resolve) =>
            setTimeout(() => resolve(`${clicks} Clicks!`), 1500)
          ),
          duration: 2000,
        });
      }}
    >
      ClickMe
    </Button>
  );
};
