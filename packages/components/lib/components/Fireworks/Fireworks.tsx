import React, { useRef, useState, useEffect, useCallback } from 'react';
import Color from 'color';
import { useVolatileState, useComponentDidMount } from '@gatsby-tv/utilities';

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

function Particle(origin?: Origin): ParticleType {
  const position = typeof origin === 'function' ? origin() : origin;
  return {
    position: position ?? {
      x: (Math.random() * window.innerWidth * 2) / 3 + window.innerWidth / 6,
      y: window.innerHeight,
    },
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
  activator?: React.ReactNode;
  toggle?: number;
  count?: number;
  interval?: number;
  background?: boolean;
}

export function Fireworks(props: FireworksProps): React.ReactElement {
  const fires = useRef(0);
  const mounted = useComponentDidMount();
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [time, setTime] = useState(Date.now());
  const [frame, setFrame] = useVolatileState();
  const [fire, setFire] = useVolatileState();
  const [rockets, setRockets] = useState<ParticleType[]>([]);
  const [particles, setParticles] = useState<ParticleType[]>([]);
  const inactive = !rockets.length && !particles.length;

  const {
    activator,
    origin,
    count = Infinity,
    interval = 800,
    toggle = Infinity,
    background,
  } = props;

  const onResize = useCallback(() => {
    setCanvas((current) => {
      if (!current) return current;
      current.width = window.innerWidth;
      current.height = window.innerHeight;
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
    if (!mounted || fires.current >= count) return;

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
          ...Particle(origin),
          velocity: {
            dx: 6 * Math.random() - 3,
            dy: -3 * Math.random() - 4,
          },
          size: 4,
        },
      ];
    });
  }, [origin, count, mounted]);

  useEffect(() => {
    if (!toggle) return;

    fires.current = 0;
    // Typescript is (understandably) bothered by our use of `id` in its own initializer
    // so we have to declare it as `any`.
    const id: any = setInterval(
      () => (fires.current < count ? setFire() : clearInterval(id)),
      interval
    );

    return () => clearInterval(id);
  }, [count, toggle, interval]);

  useEffect(onResize, [canvas]);
  useEffect(draw, [canvas, frame, inactive]);
  useEffect(fireRocket, [fire]);

  return (
    <>
      {activator}
      <Injection target={background ? '$background' : '$foreground'}>
        <div className={styles.Fireworks}>
          <canvas ref={setCanvas} />
        </div>
        <EventListener event="resize" handler={onResize} />
      </Injection>
    </>
  );
}
