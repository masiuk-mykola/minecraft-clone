import { PointerLockControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import type { FC } from 'react';

interface FPVProps {}

export const FPV: FC<FPVProps> = ({}) => {
  const { camera, gl } = useThree();
  return <PointerLockControls args={[camera, gl.domElement]} />;
};
