import React, { useState, useEffect, useCallback } from 'react';
import Color from 'color';
import { Icon } from '@gatsby-tv/components';
import { useResizeObserver } from '@gatsby-tv/utilities';

import { Ipfs as IpfsIcon } from '@src/icons/Info';

import styles from './Ipfs.module.scss';

type Position = {
  x: number;
  y: number;
};

type StarType = {
  position: Position;
  size: number;
  color: string;
};

function Star(position: Position): StarType {
  const size = Math.floor(2 + 3 * Math.random());
  const lightness = Math.floor(70 + 25 * Math.random() - 50 / size);

  return {
    position,
    size,
    color: String(Color.hsl(0, 0, lightness)),
  };
}

Star.render = (
  { position, size, color }: StarType,
  context: CanvasRenderingContext2D
) => {
  context.save();
  context.fillStyle = color;
  context.beginPath();
  context.arc(position.x, position.y, size, 0, 2 * Math.PI, true);
  context.closePath();
  context.fill();
  context.restore();
};

export function Ipfs(): React.ReactElement {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [stars, setStars] = useState<StarType[]>([]);

  const onResize = useCallback(({ inlineSize: width, blockSize: height }) => {
    const count = Math.ceil((250 * (width * height)) / 1000000);

    setCanvas((current) => {
      if (!current) return current;
      current.width = width;
      current.height = height;
      return current;
    });

    setStars(
      [...Array(count)].map(() =>
        Star({
          x: Math.floor(Math.random() * width),
          y: Math.floor(Math.random() * height),
        })
      )
    );
  }, []);

  useResizeObserver(container, onResize);

  useEffect(() => {
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach((star) => Star.render(star, context));
  }, [canvas, stars]);

  return (
    <div className={styles.Ipfs}>
      <div ref={setContainer} className={styles.Stars}>
        <canvas ref={setCanvas} />
      </div>
      <Icon className={styles.Icon} src={IpfsIcon} />
      <h3>Built on IPFS</h3>
      <div className={styles.Text}>
        <p>
          By leveraging the peer-to-peer file distribution provided by{' '}
          <a href="https://ipfs.io">IPFS</a>, Gatsby is able to completely
          eliminate the barriers to entry surrounding the video sharing
          industry. IPFS allows users who stream videos in their browsers to
          simultaneously redistribute those videos to other viewers.
        </p>
      </div>
    </div>
  );
}
