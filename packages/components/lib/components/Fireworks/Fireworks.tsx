import React, { useState, useEffect, useCallback } from 'react';
import Color from 'color';
import { ifExists } from '@gatsby-tv/utilities';

import { Injection } from '@lib/components/Injection';
import { EventListener } from '@lib/components/EventListener';

import styles from './Fireworks.scss';

export interface FireworksProps {
  origin?: Origin;
  activator?: React.ReactNode;
  infinite?: boolean;
  toggle?: boolean;
  count?: number;
  interval?: number;
  background?: boolean;
  zIndex?: number;
}

type Position = {
  x: number;
  y: number;
};

type Origin = Position | (() => Position);

interface Velocity {
  dx: number;
  dy: number;
}

interface ParticleType {
  position: Position;
  velocity: Velocity;
  size: number;
  alpha: number;
  hue: number;
  saturation: number;
  value: number;
  resistance?: number;
  gravity?: number;
  shrink?: number;
  fade?: number;
}

const Particle = (position: Position) =>
  ({
    position,
    velocity: { dx: 0, dy: 0 },
    size: 2,
    alpha: 1,
    hue: 100,
    saturation: 100,
    value: 50,
  } as ParticleType);

Particle.exists = ({ alpha, size }: ParticleType) => {
  return alpha >= 0.1 && size >= 1;
};

Particle.update = (particle: ParticleType, dt: number) => {
  const {
    position,
    velocity,
    size,
    alpha,
    resistance = 0,
    gravity = 0,
    shrink = 1,
    fade = 0,
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
    size: size * shrink,
    alpha: alpha - fade,
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
      shrink: 0.05 * Math.random() + 0.93,
      hue: 10 * Math.floor((Math.random() * 360) / 10),
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
  context.fillStyle = String(
    Color.hsl(particle.hue, particle.saturation, particle.value).fade(
      1 - particle.alpha
    )
  );
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

export function Fireworks(props: FireworksProps): React.ReactElement {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const [time, setTime] = useState(Date.now());
  const [frame, setFrame] = useState(0);
  const [, setRockets] = useState<ParticleType[]>([]);
  const [, setParticles] = useState<ParticleType[]>([]);

  const getDefaultOrigin = useCallback(
    () => ({
      x: (Math.random() * window.innerWidth * 2) / 3 + window.innerWidth / 6,
      y: window.innerHeight,
    }),
    []
  );

  const {
    activator,
    origin = getDefaultOrigin,
    count = Infinity,
    interval = 800,
    infinite,
    toggle,
    background,
    zIndex,
  } = props;

  const handleResize = useCallback(() => {
    setCanvas((current) => {
      if (!current) return current;
      current.width = window.innerWidth;
      current.height = window.innerHeight;
      return current;
    });
  }, []);

  const draw = useCallback(() => {
    setTime(Date.now());
    const dt = Math.min(60 * (Date.now() - time) / 1000, 1);

    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    let newParticles: ParticleType[] = [];

    setRockets((current) =>
      current.reduce((acc: ParticleType[], rocket: ParticleType) => {
        const updatedRocket = Particle.update(rocket, dt);

        if (
          updatedRocket.position.y < (canvas.height ?? 0) / 5 ||
          Math.random() <= (0.01 * dt)
        ) {
          newParticles = newParticles.concat(Particle.explode(rocket, dt));
          return acc;
        } else {
          Particle.render(updatedRocket, context);
          return [...acc, updatedRocket];
        }
      }, [])
    );

    setParticles((current) =>
      current
        .concat(newParticles)
        .reduce((acc: ParticleType[], particle: ParticleType) => {
          const updatedParticle = Particle.update(particle, dt);

          if (!Particle.exists(updatedParticle)) {
            return acc;
          } else {
            Particle.render(updatedParticle, context);
            return [...acc, updatedParticle];
          }
        }, [])
    );

    const id = requestAnimationFrame(() => setFrame((current) => current + 1));
    return () => cancelAnimationFrame(id);
  }, [time, canvas]);

  useEffect(() => handleResize(), [canvas]);
  useEffect(() => draw(), [canvas, frame]);

  useEffect(() => {
    if (!infinite && toggle == null) return;

    const rocketGenerator = () => {
      const position = typeof origin === 'function' ? origin() : origin;
      return {
        ...Particle(position),
        velocity: { dx: 6 * Math.random() - 3, dy: -3 * Math.random() - 4 },
        size: 4,
        hue: 0,
        saturation: 0,
        value: 80,
      };
    };

    let iterations = 0;
    const id = setInterval(() => {
      if (iterations < count) {
        setRockets((current) => {
          /* For infinite fireworks, if rendering is slow then this interval
           * will fire rockets faster than they can explode. This will cause
           * rockets to build up on screen which will only perpetuate the poor
           * rendering performance.
           **/
          if (count !== Infinity || current.length < 5) {
            iterations += 1;
            return [...current, rocketGenerator()];
          } else {
            return current;
          }
        });
      } else {
        clearInterval(id);
      }
    }, interval ?? 500);

    return () => clearInterval(id);
  }, [origin, count, interval, toggle, infinite]);

  return (
    <>
      {activator}
      <Injection target={background ? '$background' : '$foreground'}>
        <div style={ifExists(zIndex, { zIndex })} className={styles.Fireworks}>
          <canvas ref={setCanvas} />
        </div>
        <EventListener event="resize" handler={handleResize} />
      </Injection>
    </>
  );
}
