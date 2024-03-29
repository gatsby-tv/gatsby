import {
  useState,
  useEffect,
  useCallback,
  ReactElement,
} from 'react';
import Color from 'color';
import {
  Class,
  useVolatileState,
  useResizeObserver,
} from '@gatsby-tv/utilities';

import { Optional } from '@lib/components/Optional';
import { Injection } from '@lib/components/Injection';

import styles from './Stars.scss';

type Position = {
  x: number;
  y: number;
};

function Frames(time: number) {
  return (60 * time) / 1000;
}

type TwinkleType = {
  epoch: number;
  count: number;
  duration: number;
  delay: number;
  intensity: number;
};

function Twinkle(epoch: number): TwinkleType {
  return {
    epoch,
    count: Math.ceil(2 * Math.random()),
    duration: Math.ceil(5 + 8 * Math.random()),
    delay: Math.ceil(30 * Math.random()),
    intensity: 0.2 + 0.7 * Math.random(),
  };
}

Twinkle.update = (twinkle: TwinkleType, time: number) => {
  if (!twinkle.count) return;

  const frames = Frames(time - twinkle.epoch) - twinkle.delay;
  return frames > twinkle.duration
    ? { ...Twinkle(time), count: twinkle.count - 1, delay: 5 }
    : twinkle;
};

Twinkle.apply = (twinkle: TwinkleType, time: number) => {
  const frames = Frames(time - twinkle.epoch) - twinkle.delay;
  if (frames < 0 || frames > twinkle.duration) return 0.38;
  return (
    0.38 +
    0.62 * twinkle.intensity * Math.sin((Math.PI * frames) / twinkle.duration)
  );
};

type AstroidType = {
  position: Position;
  size: number;
  curvature: number;
  twinkle?: TwinkleType;
  color: string;
};

// Not to be confused with `Asteroid`
function Astroid(position: Position): AstroidType {
  const size = Math.floor(4 * (1 + Math.random()));
  const lightness = Math.floor(70 + 25 * Math.random() - 100 / size);

  return {
    position,
    size,
    color: String(Color.hsl(0, 0, lightness)),
    curvature: 0.38,
  };
}

Astroid.twinkle = (astroid: AstroidType, time: number) => {
  return {
    ...astroid,
    twinkle: Twinkle(time),
  };
};

Astroid.update = (astroid: AstroidType, time: number) => {
  const { twinkle } = astroid;
  if (!twinkle) return astroid;

  return {
    ...astroid,
    twinkle: Twinkle.update(twinkle, time),
    curvature: Twinkle.apply(twinkle, time),
  };
};

Astroid.render = (
  { position, size, curvature, color }: AstroidType,
  context: CanvasRenderingContext2D
) => {
  const offset = size * (1 - curvature);
  context.save();
  context.fillStyle = color;
  context.beginPath();
  context.moveTo(position.x, position.y - size);
  context.bezierCurveTo(
    position.x,
    position.y - offset,
    position.x + offset,
    position.y,
    position.x + size,
    position.y
  );
  context.bezierCurveTo(
    position.x + offset,
    position.y,
    position.x,
    position.y + offset,
    position.x,
    position.y + size
  );
  context.bezierCurveTo(
    position.x,
    position.y + offset,
    position.x - offset,
    position.y,
    position.x - size,
    position.y
  );
  context.bezierCurveTo(
    position.x - offset,
    position.y,
    position.x,
    position.y - offset,
    position.x,
    position.y - size
  );
  context.closePath();
  context.fill();
  context.restore();
};

export interface StarsProps {
  density?: number;
  background?: boolean;
}

export function Stars(props: StarsProps): ReactElement {
  const { density = 100, background } = props;
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [frame, setFrame] = useVolatileState();
  const [, setAstroids] = useState<AstroidType[]>([]);

  const onResize = useCallback(
    ({ inlineSize: width, blockSize: height }) => {
      const ppm = (width * height) / 1000000;
      const count = Math.ceil(density * ppm);
      const green = Math.floor(count * Math.random());

      setCanvas((current) => {
        if (!current) return current;
        current.width = width;
        current.height = height;
        return current;
      });

      setAstroids(
        [...Array(count)].map((_, index) =>
          index !== green
            ? Astroid({
                x: Math.floor(Math.random() * width),
                y: Math.floor(Math.random() * height),
              })
            : {
                ...Astroid({
                  x: Math.floor(Math.random() * width),
                  y: Math.floor(Math.random() * height),
                }),
                size: Math.floor(6 + 2 * Math.random()),
                color: String(Color.rgb(76, 175, 80)),
              }
        )
      );
    },
    [density]
  );

  useResizeObserver(container, onResize);

  useEffect(() => {
    const time = Date.now();
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    setAstroids((current) =>
      current.map((astroid) => {
        const updated = Astroid.update(astroid, time);
        Astroid.render(updated, context);
        return updated;
      })
    );

    const id = requestAnimationFrame(() => setFrame());
    return () => cancelAnimationFrame(id);
  }, [canvas, frame]);

  useEffect(() => {
    const id = setInterval(() => {
      const time = Date.now();
      setAstroids((current) =>
        current.map((astroid) =>
          astroid.twinkle || Math.random() > 0.1
            ? astroid
            : Astroid.twinkle(astroid, time)
        )
      );
    }, 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <Optional
      component={Injection}
      active={background}
      $props={{ target: '$background' }}
    >
      <div
        ref={setContainer}
        className={Class(
          styles.Stars,
          background && styles.Fixed
        )}
      >
        <canvas ref={setCanvas} />
      </div>
    </Optional>
  );
}
