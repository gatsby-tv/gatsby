import { useState, useCallback } from 'react';

export type Controller = {
  active: boolean;
  toggle: () => void;
  activate: () => void;
  deactivate: () => void;
};

export function useController(): Controller {
  const [active, setActive] = useState(false);
  const toggle = useCallback(() => setActive((current) => !current), []);
  const activate = useCallback(() => setActive(true), []);
  const deactivate = useCallback(() => setActive(false), []);

  return { active, toggle, activate, deactivate };
}
