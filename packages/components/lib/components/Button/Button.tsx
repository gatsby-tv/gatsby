import {
  useState,
  useEffect,
  useCallback,
  forwardRef,
  createElement,
  ButtonHTMLAttributes,
  Ref,
  ReactNode,
  ReactElement,
} from 'react';
import { Spinner } from '@gatsby-tv/icons';
import {
  Class,
  Exists,
  useRepaint,
  useForwardedRef,
  useOptionalForm,
} from '@gatsby-tv/utilities';

import { Icon } from '@lib/components/Icon';
import { Tooltip } from '@lib/components/Tooltip';
import { Optional } from '@lib/components/Optional';
import { IconSource, IconSize } from '@lib/types';

import styles from './Button.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLElement> {
  children?: ReactNode;
  className?: string;
  unstyled?: boolean;
  animate?: boolean;
  tooltip?: string;
  icon?: IconSource;
  size?: IconSize;
  waiting?: boolean;
  asLabelFor?: string;
  onClick?: (event: any) => void;
  onDblClick?: (event: any) => void;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props: ButtonProps, ref: Ref<HTMLButtonElement>) => {
    const {
      children,
      className,
      unstyled,
      animate,
      tooltip,
      icon,
      size,
      waiting,
      disabled,
      asLabelFor,
      onClick: onClickHandler,
      onDblClick: onDblClickHandler,
      ...rest
    } = props;

    const form = useOptionalForm();
    const button = useForwardedRef<HTMLButtonElement>(ref);
    const repaint = useRepaint();
    const [emit, setEmit] = useState<MouseEvent>();
    const [click, setClick] = useState<MouseEvent>();
    const [dblClick, setDblClick] = useState<MouseEvent>();
    const [reset, setReset] = useState(false);
    const [active, setActive] = useState(false);
    const [held, setHeld] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      if (!click) return;

      const id = setTimeout(
        () =>
          setClick((current) => (current ? void setEmit(current) : current)),
        300
      );

      return () => clearTimeout(id);
    }, [click]);

    useEffect(() => {
      if (!emit) return;
      onClickHandler?.(emit);
    }, [emit]);

    useEffect(() => {
      if (!dblClick) return;
      onDblClickHandler?.(dblClick);
    }, [dblClick]);

    useEffect(() => {
      if (!reset) return;
      repaint();
    }, [reset]);

    useEffect(() => {
      if (!waiting) return;
      const id = setTimeout(() => setLoading(true), 200);
      return () => clearTimeout(id);
    }, [waiting]);

    const onClick = useCallback(
      (event: any) => {
        if (onDblClickHandler) {
          return void setClick((current) =>
            current ? void setDblClick(event) : event
          );
        }

        onClickHandler?.(event);
      },
      [onClickHandler, onDblClickHandler]
    );

    const onPointerDown = useCallback(
      (event: any) => {
        event.stopPropagation();
        if (!animate) return;

        setReset(true);
        setHeld(true);
        setActive(true);

        const id = requestAnimationFrame(() => setReset(false));
        return () => cancelAnimationFrame(id);
      },
      [animate]
    );

    const onPointerUp = useCallback(
      (event: any) => {
        event.stopPropagation();
        if (!animate) return;
        setHeld(false);
      },
      [animate]
    );

    const onPointerLeave = useCallback(
      (event: any) => {
        if (!animate) return;
        setHeld(false);
      },
      [animate]
    );

    const onAnimationEnd = useCallback(() => setActive(false), []);

    const classes = Class(
      className,
      styles.Button,
      !unstyled && styles.Styled,
      !unstyled && animate && styles.Animation,
      icon && styles.Icon,
      asLabelFor && styles.FitContent
    );

    const invalid =
      disabled || (form && Object.values(form.errors).some(Boolean));

    const TooltipMarkup =
      tooltip && !held ? (
        <Tooltip for={button} offset={7}>
          {tooltip}
        </Tooltip>
      ) : null;

    const ChildrenMarkup = icon ? (
      <Icon src={icon} size={size} />
    ) : loading ? (
      <div className={styles.LoadingContainer}>
        <div className={styles.Hidden}>{children}</div>
        <Icon className={styles.Spinner} src={Spinner} size="small" />
      </div>
    ) : (
      children
    );

    const ButtonMarkup = createElement(asLabelFor ? 'label' : 'button', {
      children: ChildrenMarkup,
      ref: button,
      className: classes,
      htmlFor: asLabelFor,
      tabIndex: Exists(asLabelFor, -1),
      disabled: Exists(invalid),
      'data-interactive': Exists(loading, 'false'),
      'data-animating': Exists(
        !unstyled && animate && !reset && (active || held)
      ),
      onClick,
      onPointerDown,
      onPointerUp,
      onPointerLeave,
      onPointerCancel: onPointerLeave,
      onAnimationEnd,
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
