import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import { Validators } from '@gatsby-tv/utilities';

import { Form, FormFieldProps, FormLabelProps } from '@lib/components/Form';

import styles from './Form.stories.scss';

export default {
  title: 'Form',
  component: Form,
} as Meta;

type ValidatorConfig = {
  required: boolean;
  maxLength: number;
  minLength: number;
  pattern: RegExp;
};

type FieldStoryProps = Partial<FormFieldProps & FormLabelProps>;

export const Field: Story<FieldStoryProps> = (props) => {
  const { help, hidden, required, minLength, maxLength, pattern, ...rest } =
    props;

  const [value, setValue] = useState('');

  const validators = [
    required && Validators.required('Required'),
    minLength && Validators.minLength(minLength, 'Mininum Length'),
    maxLength && Validators.maxLength(maxLength, 'Maximum Length'),
    pattern && Validators.pattern(RegExp(pattern), 'Pattern'),
  ].filter(Boolean);

  return (
    <Form className={styles.Form}>
      <Form.Label
        for="field"
        label="Example Field"
        help={typeof props.help === 'string' ? props.help : undefined}
        hidden={props.hidden}
      >
        <Form.Field
          id="field"
          placeholder="Text..."
          name="field"
          value={value}
          validators={validators}
          onChange={setValue}
          {...rest}
        />
      </Form.Label>
    </Form>
  );
};

Field.args = {
  help: undefined,
  hidden: false,
  required: false,
  minLength: undefined,
  maxLength: undefined,
  pattern: undefined,
};

export const Select: Story<Partial<FormSelectProps & FormLabelProps>> = (
  props
) => {
  const options = [
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'cyan', label: 'Cyan' },
  ];

  return (
    <Form className={styles.Form}>
      <Form.Label
        for="select"
        label="Example Select"
        help={typeof props.help === 'string' ? props.help : undefined}
        hidden={props.hidden}
      >
        <Form.Select
          id="select"
          name="select"
          placeholder="Select..."
          options={options}
          {...props}
        />
      </Form.Label>
    </Form>
  );
};

Select.args = {
  help: undefined,
  hidden: false,
  searchable: true,
  multiple: false,
  clearable: true,
};

export const Slider: Story<Partial<FormSliderProps & FormLabelProps>> = (
  props
) => {
  const [value, setValue] = useState(50);

  return (
    <Form className={styles.Form}>
      <Form.Label
        for="slider"
        label="Example Slider"
        help={typeof props.help === 'string' ? props.help : undefined}
        hidden={props.hidden}
      >
        <Form.Slider
          id="slider"
          name="slider"
          min={0}
          max={100}
          value={value}
          onChange={setValue}
        />
      </Form.Label>
    </Form>
  );
};

Slider.args = {
  help: undefined,
  hidden: false,
};

export const SliderWithStops: Story<Partial<FormSliderProps & FormLabelProps>> =
  (props) => {
    const [value, setValue] = useState(50);
    const stops = [
      { value: 0, label: '0 units' },
      { value: 10, label: '1 units' },
      { value: 20, label: '2 units' },
      { value: 30, label: '3 units' },
      { value: 40, label: '4 units' },
      { value: 50, label: '5 units' },
      { value: 60, label: '6 units' },
      { value: 70, label: '7 units' },
      { value: 80, label: '8 units' },
      { value: 90, label: '9 units' },
      { value: 100, label: '10 units' },
    ];

    return (
      <Form className={styles.Form}>
        <Form.Label
          for="slider"
          label="Example Slider"
          help={typeof props.help === 'string' ? props.help : undefined}
          hidden={props.hidden}
        >
          <Form.Slider
            id="slider"
            name="slider"
            min={-5}
            max={105}
            stops={stops}
            hideLabels={props.hideLabels}
            value={value}
            onChange={setValue}
          />
        </Form.Label>
      </Form>
    );
  };

SliderWithStops.args = {
  help: undefined,
  hidden: false,
  hideLabels: false,
};
