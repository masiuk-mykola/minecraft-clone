import { nanoid } from 'nanoid';
import { create } from 'zustand';

export type Cube = {
  key: string;
  pos: [number, number, number];
  texture: string;
};

export type StoreState = {
  texture: string;
  cubes: Cube[];
  addCube: (x: number, y: number, z: number) => void;
  removeCube: (id: string) => void;
  setTexture: (texture: string) => void;
  saveWorld: () => void;
  resetWorld: () => void;
};

export const useStore = create<StoreState>((set) => ({
  texture: 'dirt',
  cubes: [{
    key: nanoid(), pos: [0, 0, 0], texture: 'dirt'
  }],
  addCube: (x, y, z) =>
    set((state) => ({
      cubes: [...state.cubes, { key: nanoid(), pos: [x, y, z], texture: state.texture }]
    })),
  removeCube: (id) =>
    set((state) => ({
      cubes: state.cubes.filter((cube) => cube.key !== id)
    })),
  setTexture: (texture) => set(() => ({ texture })),
  saveWorld: () => {},
  resetWorld: () => {}
}));
