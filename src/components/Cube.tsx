import type { FC } from 'react';
import { useStore, type Cube as CubeType } from '../hooks/useStore';
import { useBox } from '@react-three/cannon';
import * as textures from '../assets/images/textures';
import type { Texture } from 'three';

export const Cube: FC<CubeType & { id: CubeType['key'] }> = ({
  position,
  texture,
  id
}) => {
  const [ref] = useBox(() => ({
    type: 'Static',
    position
  }));
  const addCube = useStore((state) => state.addCube);
  const removeCube = useStore((state) => state.removeCube);

  const actionTexture = (textures as Record<string, Texture<HTMLImageElement>>)[
    texture + 'Texture'
  ];

  return (
    <mesh
      onClick={(e) => {
        e.stopPropagation();
        const clickedFace = Math.floor(e.faceIndex! / 2);

        const { x, y, z } = ref.current!.position;
        if (e.altKey) {
          removeCube(id);
          return;
        }
        const faceOffsets = [
          [1, 0, 0],
          [-1, 0, 0],
          [0, 1, 0],
          [0, -1, 0],
          [0, 0, 1],
          [0, 0, -1]
        ];
        const [dx, dy, dz] = faceOffsets[clickedFace];
        addCube(x + dx, y + dy, z + dz);
      }}
      ref={ref}
    >
      <boxGeometry attach="geometry" />
      <meshStandardMaterial attach="material" map={actionTexture} />
    </mesh>
  );
};
