import React from 'react';
import '../dist/fonts.css';
import '../dist/styles.css';
import { AppProvider } from '@lib/components';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
  (Story) => (
    <AppProvider>
      <Story />
    </AppProvider>
  ),
];
