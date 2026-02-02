import type { FC } from 'react';
import { useStore } from '../hooks/useStore';
import { images } from '../assets/images/images';

export const Menu: FC = () => {
  const saveWorld = useStore((state) => state.saveWorld);
  const resetWorld = useStore((state) => state.resetWorld);

  return (
    <div className="menu absolute">
      <ul>
        {Object.values(images).map((imgSrc, index) => (
          <li key={index}>
            <p>
              {index + 1}
              {'-'}
            </p>
            <img src={imgSrc} alt={`texture-${index}`} />
          </li>
        ))}
      </ul>
      <p>Alt + Click to remove block</p>
      <div>
        <button onClick={saveWorld}>Save</button>
        <button onClick={resetWorld}>Reset</button>
      </div>
    </div>
  );
};
