import { nanoid } from 'nanoid';
import type { Texture } from '../hooks/useKeyboard';
import { create } from 'zustand';

const getLocalStorage = (key: string) =>
  JSON.parse(window.localStorage.getItem(key) ?? '[]');
const setLocalStorage = (key: string, value: Cube[]) =>
  window.localStorage.setItem(key, JSON.stringify(value));

export type Cube = {
  key: string;
  position: [number, number, number];
  texture: Texture;
};

export type StoreState = {
  texture: Texture;
  cubes: Cube[];
  addCube: (x: number, y: number, z: number) => void;
  removeCube: (id: string) => void;
  setTexture: (texture: Texture) => void;
  saveWorld: () => void;
  resetWorld: () => void;
};

export const useStore = create<StoreState>((set) => ({
  texture: 'dirt',
  cubes: getLocalStorage('cubes') || [],
  addCube: (x, y, z) =>
    set((state) => ({
      cubes: [
        ...state.cubes,
        { key: nanoid(), position: [x, y, z], texture: state.texture }
      ]
    })),
  removeCube: (id) =>
    set((state) => ({
      cubes: state.cubes.filter((cube) => cube.key !== id)
    })),
  setTexture: (texture) => set(() => ({ texture })),
  saveWorld: () => {
    set((state) => {
      setLocalStorage('cubes', state.cubes);
      return {};
    });
  },
  resetWorld: () => {
    set(() => ({ cubes: [] }));
  }
}));
