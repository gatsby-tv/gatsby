import React, { useState, useEffect, useCallback, forwardRef } from 'react';
import {
  classNames,
  ifExists,
  useForwardedRef,
  useOptionalForm,
} from '@gatsby-tv/utilities';

import { IconSource, IconSize } from '@lib/types';
import { Icon } from '@lib/components/Icon';
import { Tooltip } from '@lib/components/Tooltip';

import styles from './Button.scss';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  className?: string;
  unstyled?: boolean;
  animate?: boolean;
  tooltip?: string;
  icon?: IconSource;
  size?: IconSize;
  asLabelFor?: string;
  onClick?: (event: any) => void;
  onDblClick?: (event: any) => void;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props: ButtonProps, ref: React.Ref<HTMLButtonElement>) => {
    const {
      children,
      className,
      unstyled,
      animate,
      tooltip,
      icon,
      size,
      asLabelFor,
      onClick: onClickHandler,
      onDblClick: onDblClickHandler,
      ...rest
    } = props;
    const form = useOptionalForm();
    const button = useForwardedRef<HTMLButtonElement>(ref);
    const [click, setClick] = useState<MouseEvent>();
    const [dblClick, setDblClick] = useState<MouseEvent>();
    const [reset, setReset] = useState(false);
    const [active, setActive] = useState(0);
    const [held, setHeld] = useState(false);

    useEffect(() => {
      if (dblClick && onDblClickHandler) {
        onDblClickHandler(dblClick);
      }
    }, [dblClick]);

    useEffect(() => {
      if (click) {
        const id = setTimeout(() => {
          if (onClickHandler) {
            onClickHandler(click);
          }
          setClick(undefined);
        }, 300);
        return () => clearTimeout(id);
      }
    }, [click]);

    useEffect(() => {
      if (active) {
        const id = setTimeout(() => setActive(0), 200);
        return () => clearTimeout(id);
      }
    }, [active]);

    const onClick = useCallback(
      (event: any) => {
        if (onDblClickHandler) {
          setClick((current) => {
            if (current) {
              setDblClick(event);
            } else {
              return event;
            }
          });
        } else if (onClickHandler) {
          onClickHandler(event);
        }
      },
      [onClickHandler, onDblClickHandler]
    );

    const onPointerDown = useCallback(
      (event) => {
        event.stopPropagation();
        if (animate) {
          setReset(true);
          setHeld(true);
          setActive((current) => current + 1);

          const id = window.requestAnimationFrame(() => setReset(false));
          return () => window.cancelAnimationFrame(id);
        }
      },
      [animate]
    );

    const onPointerUp = useCallback(
      (event) => {
        event.stopPropagation();
        if (animate) {
          setHeld(false);
        }
      },
      [animate]
    );

    const onPointerLeave = useCallback(
      (event) => {
        if (animate) {
          setHeld(false);
        }
      },
      [animate]
    );

    const classes = classNames(
      className,
      styles.Button,
      !unstyled && styles.Styled,
      !unstyled && animate && styles.Animation,
      icon && styles.Icon,
      asLabelFor && styles.FitContent
    );

    const disabled =
      Object.values(form?.errors ?? {}).some(Boolean) ||
      !Object.values(form?.values ?? {}).some(Boolean);

    const TooltipMarkup =
      tooltip && !held ? (
        <Tooltip for={button} offset={7}>
          {tooltip}
        </Tooltip>
      ) : null;

    const ChildrenMarkup = icon ? <Icon src={icon} size={size} /> : children;

    const ButtonMarkup = React.createElement(asLabelFor ? 'label' : 'button', {
      children: ChildrenMarkup,
      ref: button,
      className: classes,
      htmlFor: asLabelFor,
      tabIndex: ifExists(asLabelFor, -1),
      disabled: ifExists(form, disabled),
      'data-animating': ifExists(
        !unstyled && animate && !reset && (active || held)
      ),
      onClick,
      onPointerDown,
      onPointerUp,
      onPointerLeave,
      onPointerCancel: onPointerLeave,
      ...rest,
    });

    return (
      <>
        {ButtonMarkup}
        {TooltipMarkup}
      </>
    );
  }
);

Button.displayName = 'Button';
