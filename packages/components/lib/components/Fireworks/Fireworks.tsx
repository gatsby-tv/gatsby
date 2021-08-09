import { useRef, useState, useEffect, useCallback, ReactElement } from 'react';
import Color from 'color';
import {
  Class,
  useVolatileState,
  useResizeObserver,
  useComponentDidMount,
} from '@gatsby-tv/utilities';

import { Optional } from '@lib/components/Optional';
import { Injection } from '@lib/components/Injection';
import { EventListener } from '@lib/components/EventListener';

import styles from './Fireworks.scss';

type Position = {
  x: number;
  y: number;
};

type Origin = Position | (() => Position);

type Velocity = {
  dx: number;
  dy: number;
};

function Frames(time: number) {
  return (60 * time) / 1000;
}

type ParticleType = {
  position: Position;
  velocity: Velocity;
  size: number;
  color: string;
  resistance?: number;
  gravity?: number;
  shrink?: number;
};

function Particle(origin: Origin): ParticleType {
  const position = typeof origin === 'function' ? origin() : origin;
  return {
    position,
    velocity: { dx: 0, dy: 0 },
    size: 2,
    color: String(Color.hsl(0, 0, 80)),
  };
}

Particle.exists = ({ size }: ParticleType) => size >= 1;

Particle.update = (particle: ParticleType, dt: number) => {
  const {
    position,
    velocity,
    size,
    resistance = 0,
    gravity = 0,
    shrink = 0,
  } = particle;

  return {
    ...particle,
    position: {
      x: position.x + velocity.dx * dt,
      y: position.y + velocity.dy * dt,
    },
    velocity: {
      dx: velocity.dx * Math.exp(-resistance * dt),
      dy: velocity.dy * Math.exp(-resistance * dt) + gravity * dt,
    },
    size: size * Math.exp(-shrink * dt),
  };
};

Particle.explode = (particle: ParticleType, dt: number) => {
  const count = Math.floor(10 * Math.random() + 80);

  return [...Array(count)].map(() => {
    const angle = 2 * Math.PI * Math.random();
    const speed = 15 * Math.cos((Math.random() * Math.PI) / 2);

    return {
      ...Particle(particle.position),
      velocity: { dx: speed * Math.cos(angle), dy: speed * Math.sin(angle) },
      size: 10,
      gravity: 0.2,
      resistance: 0.1,
      shrink: 0.04 * (1 + Math.random()),
      color: String(
        Color.hsl(10 * Math.floor((Math.random() * 360) / 10), 100, 50)
      ),
    };
  });
};

Particle.render = (
  particle: ParticleType,
  context: CanvasRenderingContext2D
) => {
  if (!Particle.exists(particle)) return;

  context.save();
  context.globalCompositeOperation = 'lighter';
  context.fillStyle = particle.color;
  context.beginPath();
  context.arc(
    Math.floor(particle.position.x),
    Math.floor(particle.position.y),
    particle.size,
    0,
    2 * Math.PI,
    true
  );
  context.closePath();
  context.fill();
  context.restore();
};

export interface FireworksProps {
  origin?: Origin;
  toggle?: number;
  count?: number;
  interval?: number;
  delay?: number;
  background?: boolean;
  foreground?: boolean;
}

export function Fireworks(props: FireworksProps): ReactElement {
  const fires = useRef(0);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [time, setTime] = useState(Date.now());
  const [frame, setFrame] = useVolatileState();
  const [fire, setFire] = useVolatileState();
  const [delayed, setDelayed] = useState(Boolean(props.delay));
  const [rockets, setRockets] = useState<ParticleType[]>([]);
  const [particles, setParticles] = useState<ParticleType[]>([]);
  const inactive = !rockets.length && !particles.length;

  const {
    origin,
    count = Infinity,
    interval = 800,
    toggle = Infinity,
    delay = 0,
    background,
    foreground,
  } = props;

  const onResize = useCallback(({ inlineSize: width, blockSize: height }) => {
    setCanvas((current) => {
      if (!current) return current;
      current.width = width;
      current.height = height;
      return current;
    });
  }, []);

  const draw = useCallback(() => {
    setTime(Date.now());
    const dt = Math.min(Frames(Date.now() - time), 1);

    const context = canvas?.getContext('2d');
    if (!canvas || !context || inactive) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    const sparks: ParticleType[] = [];

    setRockets((current) =>
      current.reduce((acc: ParticleType[], rocket: ParticleType) => {
        const updated = Particle.update(rocket, dt);

        if (
          updated.position.y < (canvas.height ?? 0) / 5 ||
          Math.random() <= 0.01 * dt
        ) {
          sparks.push(...Particle.explode(rocket, dt));
        } else {
          Particle.render(updated, context);
          acc.push(updated);
        }

        return acc;
      }, [])
    );

    setParticles((current) =>
      current
        .concat(sparks)
        .reduce((acc: ParticleType[], particle: ParticleType) => {
          const updated = Particle.update(particle, dt);
          if (!Particle.exists(updated)) return acc;
          Particle.render(updated, context);
          acc.push(updated);
          return acc;
        }, [])
    );

    const id = requestAnimationFrame(() => setFrame());
    return () => cancelAnimationFrame(id);
  }, [time, canvas, inactive]);

  const fireRocket = useCallback(() => {
    if (!canvas || fires.current >= count) return;

    setRockets((current) => {
      /* For infinite fireworks, if rendering is slow then this interval
       * will fire rockets faster than they can explode. This will cause
       * rockets to build up on screen which will only perpetuate the poor
       * rendering performance.
       **/
      if (count === Infinity && current.length > 4) return current;

      fires.current++;
      return [
        ...current,
        {
          ...Particle(
            origin ?? {
              x: (Math.random() * canvas.width * 2) / 3 + canvas.width / 6,
              y: canvas.height,
            }
          ),
          velocity: {
            dx: 6 * Math.random() - 3,
            dy: -3 * Math.random() - 4,
          },
          size: 4,
        },
      ];
    });
  }, [origin, canvas, count]);

  useEffect(() => {
    if (!toggle || delayed) return;

    fires.current = 0;
    // Typescript is (understandably) bothered by our use of `id` in its own initializer
    // so we have to declare it as `any`.
    const id: any = setInterval(
      () => (fires.current < count ? setFire() : clearInterval(id)),
      interval
    );

    return () => clearInterval(id);
  }, [count, toggle, delayed, interval]);

  useEffect(() => {
    if (!delayed) return;

    const id = setTimeout(() => setDelayed(false), delay);
    return () => clearTimeout(id);
  }, [delay, delayed]);

  useResizeObserver(container, onResize);

  useEffect(draw, [canvas, frame, inactive]);
  useEffect(fireRocket, [fire]);

  return (
    <Optional
      component={Injection}
      active={background || foreground}
      $props={{ target: background ? '$background' : '$foreground' }}
    >
      <div
        ref={setContainer}
        className={Class(
          styles.Fireworks,
          (background || foreground) && styles.Fixed
        )}
      >
        <canvas ref={setCanvas} />
      </div>
    </Optional>
  );
}
