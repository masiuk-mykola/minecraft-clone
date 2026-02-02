import { useEffect, useState, type FC } from 'react';
import { useStore } from '../hooks/useStore';
import { useKeyboard, type Texture } from '../hooks/useKeyboard';
import { images } from '../assets/images/images';

const VISIBILITY_TIMEOUT = 500;

export const TextureSelector: FC = () => {
  const [visible, setVisible] = useState(false);

  const activeTexture = useStore((state) => state.texture);
  const setTexture = useStore((state) => state.setTexture);
  const { dirt, grass, glass, wood, log } = useKeyboard();

  useEffect(() => {
    const textures = { dirt, grass, glass, wood, log };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const selected = Object.entries(textures).find(([_, v]) => v);

    if (selected) setTexture(selected[0] as Texture);
  }, [dirt, grass, glass, wood, log, setTexture]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
    }, VISIBILITY_TIMEOUT);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);

    return () => clearTimeout(timeout);
  }, [activeTexture]);

  return (
    visible && (
      <div className="absolute centered texture-selector">
        {Object.entries(images).map(([key, src]) => (
          <img
            key={key}
            src={src}
            alt={key}
            className={`${key === activeTexture ? 'active' : ''}`}
            onClick={() => setTexture(key as Texture)}
          />
        ))}
      </div>
    )
  );
};
