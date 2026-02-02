import { useCallback, useEffect, useState } from 'react';
export type Texture = 'dirt' | 'grass' | 'glass' | 'wood' | 'log';
export const textures: Record<string, Texture> = {
  dirt: 'dirt',
  grass: 'grass',
  glass: 'glass',
  wood: 'wood',
  log: 'log'
};

export type Actions =
  | 'moveForward'
  | 'moveBackward'
  | 'moveLeft'
  | 'moveRight'
  | 'jump'
  | Texture;

const actionByKey = (key: string) => {
  const keyActionMap: Record<string, Actions> = {
    KeyW: 'moveForward',
    KeyS: 'moveBackward',
    KeyA: 'moveLeft',
    KeyD: 'moveRight',
    Space: 'jump',
    Digit1: 'dirt',
    Digit2: 'grass',
    Digit3: 'glass',
    Digit4: 'wood',
    Digit5: 'log'
  };
  return keyActionMap[key];
};

const keys = {
  moveForward: false,
  moveBackward: false,
  moveLeft: false,
  moveRight: false,
  jump: false,
  dirt: false,
  grass: false,
  glass: false,
  wood: false,
  log: false
};

export const useKeyboard = () => {
  const [actions, setActions] = useState(keys);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const action = actionByKey(event.code);

    if (action) {
      setActions((prev) => ({ ...prev, [action]: true }));
    }
  }, []);

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    const action = actionByKey(event.code);

    if (action) {
      setActions((prev) => ({ ...prev, [action]: false }));
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return actions;
};
