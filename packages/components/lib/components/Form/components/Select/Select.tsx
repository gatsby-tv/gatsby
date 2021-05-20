import React, {
  useRef,
  useState,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import { usePopper } from "react-popper";
import { ExtendDown, Cancel } from "@gatsby-tv/icons";
import {
  classNames,
  ifExists,
  ifNotExists,
  useResizeObserver,
} from "@gatsby-tv/utilities";

import { Button } from "@lib/components/Button";
import { Icon } from "@lib/components/Icon";
import { Scroll } from "@lib/components/Scroll";
import { useForm } from "@lib/utilities/form";
import { SelectionContext } from "@lib/utilities/selection";
import { FormSelectContext } from "@lib/utilities/form";
import { Option as SelectOption } from "@lib/types";

import { Option, Tag } from "./components";
import styles from "./Select.scss";

type SelectState = {
  selection?: string | string[];
  query: string;
  focus: boolean;
  active: boolean;
};

type SelectAction =
  | { type: "select-replace"; option: string }
  | { type: "select-append"; option: string }
  | { type: "select-filter"; option: string }
  | { type: "select-slice" }
  | { type: "clear" }
  | { type: "input", query: string }
  | { type: "toggle" }
  | { type: "activate" }
  | { type: "deactivate" }
  | { type: "focus" }
  | { type: "blur" };

const OptionsFilter = {
  selected: (
    options: SelectOption[],
    selection: string | string[] | undefined
  ): SelectOption[] => {
    if (!selection) return [];
    return [selection]
      .flat()
      .map((item) => options.find((option) => option.value === item))
      .filter(Boolean) as SelectOption[];
  },

  unselected: (
    options: SelectOption[],
    selection: string | string[] | undefined
  ): SelectOption[] => {
    if (!selection) return options;
    return options.filter(
      (option) => ![selection].flat().some((item) => item === option.value)
    );
  },

  query: (options: SelectOption[], query: string): SelectOption[] => {
    return options.filter((option) =>
      option.label.toLowerCase().includes(query.toLowerCase())
    );
  },
};

export interface SelectProps
  extends Omit<
    React.SelectHTMLAttributes<HTMLElement>,
    "id" | "autoComplete" | "onChange"
  > {
  id: string;
  options: SelectOption[];
  default?: string | string[];
  placeholder?: string;
  searchable?: boolean;
  clearable?: boolean;
  onChange?: (
    value: string,
    id?: string,
    setError?: (id: string, message: string) => void,
    clearError?: (id: string) => void
  ) => void;
}

export function Select(props: SelectProps): React.ReactElement {
  const {
    id,
    className,
    name,
    options,
    default: defaultValue,
    placeholder,
    clearable,
    searchable,
    multiple,
    onClick,
    onChange: onChangeHandler,
    onFocus: onFocusHandler,
    onBlur: onBlurHandler,
    onMouseDown: onMouseDownHandler,
    onKeyDown: onKeyDownHandler
  } = props;

  const ref = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const { errors, setError, clearError } = useForm();

  const [width, setWidth] = useState(0);
  const [hover, setHover] = useState<string | undefined>(options[0]?.value);
  const [popper, setPopper] = useState<HTMLDivElement | null>(null);
  const { styles: style, attributes } = usePopper(ref.current, popper, {
    placement: "bottom",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 10],
        },
      },
    ],
  });

  const [state, dispatch] = useReducer(
    (state: SelectState, action: SelectAction) => {
      let result: any;
      const selection = [state.selection].flat().filter(Boolean) as string[];
      switch (action.type) {
        case "select-replace":
          return {
            ...state,
            query: "",
            active: action.option === selection[0],
            selection: action.option,
          };

        case "select-append":
          return {
            ...state,
            query: "",
            active: false,
            selection: [...selection, action.option],
          };

        case "select-filter":
          result = selection.filter((value) => value !== action.option);
          return {
            ...state,
            selection: result.length ? result : undefined,
          };

        case "select-slice":
          result = selection.slice(0, -1);
          return {
            ...state,
            selection: result.length ? result : undefined,
          };

        case "clear":
          return {
            ...state,
            query: "",
            active: false,
            selection: undefined,
          };

        case "input":
          return {
            ...state,
            query: action.query,
            active: true,
          };

        case "toggle":
          return {
            ...state,
            active: !state.active,
          };

        case "activate":
          return {
            ...state,
            active: true,
          };

        case "deactivate":
          return {
            ...state,
            active: false,
          };

        case "focus":
          return {
            ...state,
            focus: true,
            active: state.focus ? state.active : true,
          };

        case "blur":
          return { ...state, focus: false, active: false, query: "" };
      }
    },
    {
      selection: defaultValue,
      query: "",
      focus: Boolean(props.autoFocus),
      active: false,
    }
  );

  useResizeObserver(ref, (content) => setWidth(content.inlineSize));

  useEffect(() => {
    if (state.focus) {
      input.current?.focus();
    } else {
      input.current?.blur();
    }
  }, [state.focus]);

  useEffect(() => {
    if (!state.active) setHover(options[0]?.value);
  }, [state.active, options]);

  const classes = classNames(
    className,
    styles.Select,
    searchable && styles.Searchable
  );

  const clearSelection = useCallback(
    (option: string) => multiple && dispatch({ type: "select-filter", option }),
    [multiple]
  );

  const onClear = useCallback((event: any) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch({ type: "clear" });
  }, []);

  const onChange = useCallback(
    (option: string) => {
      dispatch({ type: multiple ? "select-append" : "select-replace", option });
      onChangeHandler?.(option, id, setError, clearError);
    },
    [id, multiple, onChangeHandler]
  );

  const onFocus = useCallback(
    (event: any) => {
      dispatch({ type: "focus" });
      onFocusHandler?.(event);
    },
    [onFocusHandler]
  );

  const onBlur = useCallback(
    (event: any) => {
      dispatch({ type: "blur" });
      onBlurHandler?.(event);
    },
    [onBlurHandler]
  );

  const onMouseDown = useCallback(
    (event: any) => {
      event.preventDefault();
      dispatch({ type: "toggle" });
      dispatch({ type: "focus" });
      onMouseDownHandler?.(event);
    },
    [onMouseDownHandler]
  );

  const onKeyDown = useCallback(
    (event: any) => {
      event.stopPropagation();
      onKeyDownHandler?.(event);
      let index: number;

      switch (event.code) {
        case "Enter":
          event.preventDefault();
          if (state.active && hover) {
            dispatch({
              type: multiple ? "select-append" : "select-replace",
              option: hover,
            });
          } else {
            dispatch({ type: "activate" });
          }
          break;

        case "Delete":
        case "Backspace":
          if (!state.query && state.selection) {
            dispatch({ type: multiple ? "select-slice" : "clear" });
          }
          break;

        case "Escape":
          dispatch({ type: "deactivate" });
          break;
      }
    },
    [
      state.active,
      state.query,
      state.selection,
      multiple,
      options,
      hover,
      onKeyDownHandler,
    ]
  );

  const SelectionMarkup =
    !multiple && state.selection && !state.query ? (
      <div className={styles.Selection}>
        {OptionsFilter.selected(options, state.selection).map(
          (option) => option.label
        )}
      </div>
    ) : null;

  const TagsMarkup =
    multiple && state.selection
      ? OptionsFilter.selected(options, state.selection).map((option) => (
          <Tag key={`Select.Tag.${option.value}`} option={option} />
        ))
      : null;

  const MenuMarkup = state.active ? (
    <div
      ref={setPopper}
      className={styles.Mask}
      style={{ ...style.popper, width: `${width}px` }}
      {...attributes.popper}
    >
      <Scroll className={styles.Menu} floating>
        {OptionsFilter.query(
          multiple
            ? OptionsFilter.unselected(options, state.selection)
            : options,
          state.query
        ).map((option) => (
          <Option key={`Select.Option.${option.value}`} option={option} />
        ))}
      </Scroll>
    </div>
  ) : null;

  const ClearMarkup =
    clearable && state.selection ? (
      <Button
        className={styles.Icon}
        unstyled
        onClick={(event: any) => event.preventDefault()}
        onMouseDown={onClear}
      >
        <Icon src={Cancel} size="smallest" />
      </Button>
    ) : null;

  const InputsMarkup = name
    ? OptionsFilter.selected(options, state.selection).map((option) => (
        <input
          key={`Select.Input.${option.value}`}
          name={name}
          type="hidden"
          value={option.value}
        />
      ))
    : null;

  return (
    <SelectionContext.Provider
      value={{
        selection: state.selection,
        setSelection: onChange,
        clearSelection,
      }}
    >
      <FormSelectContext.Provider value={{ hover, setHover }}>
        <div
          ref={ref}
          className={classes}
          data-focus={ifExists(state.focus)}
          data-error={ifExists(errors[id])}
          onClick={onClick}
          onMouseDown={onMouseDown}
        >
          <div className={styles.Input}>
            {TagsMarkup}
            <input
              id={id}
              ref={input}
              value={state.query}
              placeholder={ifNotExists(state.selection, placeholder)}
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              tabIndex={0}
              type="text"
              readOnly={ifNotExists(searchable)}
              onMouseDown={(event: any) => event.preventDefault()}
              onChange={(event: any) =>
                dispatch({ type: "input", query: event.target.value })
              }
              onKeyDown={onKeyDown}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            {SelectionMarkup}
          </div>
          {ClearMarkup}
          <div className={styles.Separator} />
          <Icon className={styles.Icon} src={ExtendDown} />
        </div>
        {MenuMarkup}
        {InputsMarkup}
      </FormSelectContext.Provider>
    </SelectionContext.Provider>
  );
}
