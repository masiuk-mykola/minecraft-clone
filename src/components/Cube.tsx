import type { FC } from 'react';
import type { Cube as CubeType } from '../hooks/useStore';
import { useBox } from '@react-three/cannon';
import * as textures from '../assets/images/textures';
import type { Texture } from 'three';

export const Cube: FC<Pick<CubeType, 'position' | 'texture'>> = ({
  position,
  texture
}) => {
  const [ref] = useBox(() => ({
    type: 'Static',
    position
  }));

  const actionTexture = (textures as Record<string, Texture<HTMLImageElement>>)[
    texture + 'Texture'
  ];

  return (
    <mesh ref={ref}>
      <boxGeometry attach="geometry" />
      <meshStandardMaterial attach="material" map={actionTexture} />
    </mesh>
  );
};
