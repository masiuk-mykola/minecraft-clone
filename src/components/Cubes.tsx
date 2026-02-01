import type { FC } from 'react';
import { useStore, type StoreState } from '../hooks/useStore';
import { Cube } from './Cube';

export const Cubes: FC = () => {
  const cubes = useStore((state: StoreState) => state.cubes);

  return cubes.map(({ key, position, texture }) => (
    <Cube key={key} position={position} texture={texture} />
  ));
};
