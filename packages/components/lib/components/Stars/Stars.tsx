import React, {
  useRef,
  useState,
  useEffect,
  useReducer,
  useCallback,
} from 'react';
import Color from 'color';

import { Injection } from '@lib/components/Injection';
import { EventListener } from '@lib/components/EventListener';

import styles from './Stars.scss';

type Position = {
  x: number;
  y: number;
};

type PointDecomposition = {
  north: [number, number];
  east: [number, number];
  south: [number, number];
  west: [number, number];
};

type AstroidDecomposition = {
  anchors: PointDecomposition;
  controls: PointDecomposition;
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
  lightness: number;
  green?: boolean;
};

// Not to be confused with `Asteroid`
function Astroid(position: Position): AstroidType {
  const size = Math.floor(4 * (1 + Math.random()));
  const lightness = Math.floor(70 + 25 * Math.random() - 100 / size);

  return {
    position,
    size,
    lightness,
    curvature: 0.38,
  };
}

Astroid.decompose = ({ position, size, curvature }: AstroidType) =>
  ({
    anchors: {
      north: [position.x, position.y - size],
      east: [position.x + size, position.y],
      south: [position.x, position.y + size],
      west: [position.x - size, position.y],
    },
    controls: {
      north: [position.x, position.y - size * (1 - curvature)],
      east: [position.x + size * (1 - curvature), position.y],
      south: [position.x, position.y + size * (1 - curvature)],
      west: [position.x - size * (1 - curvature), position.y],
    },
  } as AstroidDecomposition);

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

Astroid.render = (astroid: AstroidType, context: CanvasRenderingContext2D) => {
  const { anchors, controls } = Astroid.decompose(astroid);

  context.save();
  context.fillStyle = astroid.green
    ? String(Color.rgb(76, 175, 80))
    : String(Color.hsl(0, 0, astroid.lightness));
  context.beginPath();
  context.moveTo(...anchors.north);
  context.bezierCurveTo(...controls.north, ...controls.east, ...anchors.east);
  context.bezierCurveTo(...controls.east, ...controls.south, ...anchors.south);
  context.bezierCurveTo(...controls.south, ...controls.west, ...anchors.west);
  context.bezierCurveTo(...controls.west, ...controls.north, ...anchors.north);
  context.closePath();
  context.fill();
  context.restore();
};

export interface StarsProps {
  density?: number;
}

export function Stars(props: StarsProps): React.ReactElement {
  const { density = 100 } = props;
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [frame, setFrame] = useState(0);
  const [astroids, setAstroids] = useState<AstroidType[]>([]);

  const onResize = useCallback(() => {
    const ppm = (window.innerWidth * window.innerHeight) / 1000000;
    const count = Math.ceil(density * ppm);
    const green = Math.floor(count * Math.random());

    setCanvas((current) => {
      if (!current) return current;
      current.width = window.innerWidth;
      current.height = window.innerHeight;
      return current;
    });

    setAstroids(
      [...Array(count)].map((_, index) => ({
        ...Astroid({
          x: Math.floor(Math.random() * window.innerWidth),
          y: Math.floor(Math.random() * window.innerHeight),
        }),
        green: index === green,
      }))
    );
  }, [density]);

  useEffect(onResize, [canvas]);

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

    const id = requestAnimationFrame(() => setFrame((current) => current + 1));
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
    <Injection target="$background">
      <div className={styles.Stars}>
        <canvas ref={setCanvas} />
      </div>
      <EventListener event="resize" handler={onResize} />
    </Injection>
  );
}
