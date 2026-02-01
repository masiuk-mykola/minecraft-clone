import { usePlane } from '@react-three/cannon';
import type { FC } from 'react';
import { groundTexture } from '../assets/images/textures';
import { NearestFilter, RepeatWrapping } from 'three';

export const Ground: FC = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0]
  }));

  groundTexture.magFilter = NearestFilter;
  groundTexture.wrapS = RepeatWrapping;
  groundTexture.wrapT = RepeatWrapping;
  groundTexture.repeat.set(100, 100);

  // useEffect(() => {
  //   groundTexture.magFilter = NearestFilter;
  //   groundTexture.wrapS = RepeatWrapping;
  //   groundTexture.wrapT = RepeatWrapping;
  //   groundTexture.repeat.set(100, 100);
  // }, []);

  return (
    <mesh ref={ref}>
      <planeGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" map={groundTexture} />
    </mesh>
  );
};
