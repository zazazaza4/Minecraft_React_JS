import { useEffect, useState } from 'react';
import { useKeyboard } from '../hooks/useKeyboard';
import { useStore } from '../hooks/useStore';
import { dirtImg, glassImg, logImg, grassImg, woodImg } from '../images/images';

const images = {
  dirt: dirtImg,
  grass: grassImg,
  glass: glassImg,
  log: logImg,
  wood: woodImg
};

export const TextureSelector = () => {
  const [visible, setVisible] = useState(false);
  const [activeTexture, setTexture] = useStore((state) => [state.texture, state.setTexture]);
  const { dirt, grass, glass, wood, log } = useKeyboard();

  useEffect(() => {
    const textures = {
      dirt,
      grass,
      glass,
      wood,
      log
    };

    const pressedTexture = Object.entries(textures).find(([k, v]) => v);
    if (pressedTexture) {
      setTexture(pressedTexture[0]);
    }
  }, [setTexture, dirt, grass, glass, wood, log]);

  useEffect(() => {
    const visibilityTimeout = setTimeout(() => {
      setVisible(false);
    }, 20000);
    setVisible(true);

    return () => {
      clearTimeout(visibilityTimeout);
    };
  }, [activeTexture]);

  return (
    visible && (
      <div className="absolute bottom texture-selector">
        {Object.entries(images).map(([k, src]) => {
          return (
            <img src={src} alt={k} key={k} className={`${k === activeTexture ? 'active' : ''}`} />
          );
        })}
      </div>
    )
  );
};
