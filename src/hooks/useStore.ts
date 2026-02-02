import { nanoid } from 'nanoid';
import type { Texture } from '../hooks/useKeyboard';
import { create } from 'zustand';
const initialCubes: Cube[] = [
  { key: '_CMcY7YaOPDfzHP_OiVpW', position: [0, 8, -1], texture: 'dirt' },
  { key: 'A5znq8DvftGuDC2MzgDky', position: [0, 1, 6], texture: 'dirt' },
  { key: 'l8kqL3jhpSV-PMk2AJoo0', position: [7, 1, -1], texture: 'dirt' },
  { key: 'WjKHwPyZIXdmxX0mbcBkS', position: [0, 1, -8], texture: 'dirt' },
  { key: 'EEbDhonf-IcMyci0k1r9_', position: [-7, 1, -1], texture: 'dirt' },
  { key: 'azKNct4qkoajrE5x-W7KR', position: [0, 2, 5], texture: 'dirt' },
  { key: 'GNh9yiqiTK_AZsPmGUd0d', position: [0, 2, -7], texture: 'dirt' },
  { key: 'ta_NUmxOscBqVg_kK-9I9', position: [0, 3, -6], texture: 'dirt' },
  { key: 'FxKIKlRRjO4VoB18KJraS', position: [0, 3, 4], texture: 'dirt' },
  { key: 'ZdXWv4p31IpDtE0qjkZID', position: [-6, 2, -1], texture: 'dirt' },
  { key: 'JDNTbWjTipdlnUV5NU4Eq', position: [0, 4, 3], texture: 'dirt' },
  { key: 'BusBRdEcgDSU1Rxn52O1z', position: [0, 5, 2], texture: 'dirt' },
  { key: 'v9rkgUr2WA-0tBCsdx188', position: [0, 6, 1], texture: 'dirt' },
  { key: 'Hb1uS81Hcox6KDPXX3nwa', position: [0, 7, 0], texture: 'dirt' },
  { key: 'l03aHkeptzrZBge_FgUCr', position: [0, 4, -5], texture: 'dirt' },
  { key: 'rw72nWYbWwQqT1OmXKHaK', position: [0, 5, -4], texture: 'dirt' },
  { key: 'AFbVCc0LZebI2EKMs62vN', position: [0, 6, -3], texture: 'dirt' },
  { key: 'Ic-RnFV1vzYTBUuBFjnGN', position: [0, 7, -2], texture: 'dirt' },
  { key: 'BtoE7KKJnco-Pj7JUVM2w', position: [-5, 3, -1], texture: 'dirt' },
  { key: 'CmeAgD77ozsmUdi6uSWX3', position: [-4, 4, -1], texture: 'dirt' },
  { key: 'qJaXgN3vI4DNZttxG730z', position: [-3, 5, -1], texture: 'dirt' },
  { key: '-SkO9VFSUC7TYt2xW-aKz', position: [-2, 6, -1], texture: 'dirt' },
  { key: 'ASFIvfEAooTvPtTNY4A1O', position: [-1, 7, -1], texture: 'dirt' },
  { key: 'bVUh9LADxxRC5T_gTsKl0', position: [6, 2, -1], texture: 'dirt' },
  { key: '_DmOnim1nxSThwDx0dCWP', position: [5, 3, -1], texture: 'dirt' },
  { key: 'KE-gmG72OvNgZt84TbrHH', position: [4, 4, -1], texture: 'dirt' },
  { key: 'pnngqFyYhxO6l5YexwZnf', position: [3, 5, -1], texture: 'dirt' },
  { key: 'uP1X8tf5wszrKHnRxqjnI', position: [2, 6, -1], texture: 'dirt' },
  { key: '66SWEBZIrcGuYI0yTij-8', position: [1, 7, -1], texture: 'dirt' },
  { key: '31v_iJpyjuiTYJvuMRxxl', position: [0, 9, -1], texture: 'dirt' },
  { key: 'OnfR2CL7mkfnqLLqIJFL1', position: [0, 10, -1], texture: 'dirt' },
  { key: 'sgnLWsvq799jhnFbLS96_', position: [0, 11, -1], texture: 'dirt' },
  { key: 'vsJLpMLZNg31MLXpdoMRL', position: [0, 12, -1], texture: 'dirt' }
];

const getLocalStorage = (key: string) => {
  const item = window.localStorage.getItem(key);
  return item ? JSON.parse(item) : initialCubes;
};
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
  cubes: getLocalStorage('cubes') || initialCubes,
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
