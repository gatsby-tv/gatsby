import { useEffect } from 'react';

let flexGap: boolean | undefined = undefined;

export function supportsFlexGap(): boolean | undefined {
  return flexGap;
}

function testFlexGap() {
  if (flexGap !== undefined) return;

  const flex = document.createElement('div');
  flex.style.display = 'flex';
  flex.style.flexDirection = 'column';
  flex.style.rowGap = '1px';
  flex.appendChild(document.createElement('div'));
  flex.appendChild(document.createElement('div'));
  document.body.appendChild(flex);
  flexGap = flex.scrollHeight === 1;
  document.body.removeChild(flex);
}

export function useSupports(): void {
  useEffect(() => {
    testFlexGap();
  }, []);
}
