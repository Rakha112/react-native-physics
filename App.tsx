import {StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Bodies, Composite, Engine} from 'matter-js';
import {Canvas} from '@shopify/react-native-skia';

import {Dimensions} from 'react-native';
import Genre from './src/components/Genre';
import musicGenres from './src/data/data';

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const UI_TIMESTEP = 1000 / 45;
export const PHYSICS_TIMESTEP = 1000 / 60;

export const TOP_WALL_OFFSET = -50;
export const WALL_WIDTH = 100;

export const BUBBLES_COUNT = musicGenres.length;
export const BUBBLE_SPAWN_X = SCREEN_WIDTH / 2;
export const BUBBLE_SPAWN_Y = SCREEN_HEIGHT;

const App = () => {
  const [renderBubbles, setRenderBubbles] = useState<Matter.Body[]>([]);

  const [, setTick] = useState([]);
  const engine = useRef(
    Engine.create({
      positionIterations: 6,
      gravity: {
        scale: -0.001,
      },
    }),
  ).current;

  useEffect(() => {
    // Create walls
    const _wallBodies = createWalls();

    // Create bubbles
    const _bubbleBodies = createBubbles();

    // Add all bodies into the world
    Composite.add(engine.world, [..._wallBodies]);

    // create a timer
    const timer = (ms: number) => new Promise(res => setTimeout(res, ms));

    const load = async () => {
      // loop through the bubbles
      for (var i = 0; i < _bubbleBodies.length; i++) {
        // Add the bubble to the world
        Composite.add(engine.world, _bubbleBodies[i]);
        // Add the bubble to the render list
        setRenderBubbles(prev => [...prev, _bubbleBodies[i]]);
        // Wait for a short time before adding the next bubble
        await timer(250);
      }
    };

    load();

    // Launch physics update loop
    const update = () => {
      Engine.update(engine, PHYSICS_TIMESTEP);
      requestAnimationFrame(update);
    };

    update();

    // Launch UI refresh loop
    setInterval(() => {
      setTick([]);
    }, UI_TIMESTEP);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createWalls = (): Matter.Body[] => {
    const totalWidth = SCREEN_WIDTH;
    const totalHeight = SCREEN_HEIGHT + TOP_WALL_OFFSET;

    const topWall = createWall(0, -TOP_WALL_OFFSET, totalWidth, WALL_WIDTH);
    const leftWall = createWall(
      -WALL_WIDTH,
      -TOP_WALL_OFFSET,
      WALL_WIDTH,
      totalHeight,
    );
    const rightWall = createWall(
      totalWidth,
      -TOP_WALL_OFFSET,
      WALL_WIDTH,
      totalHeight,
    );
    const bottomWall = createWall(0, SCREEN_HEIGHT, totalWidth, WALL_WIDTH);

    return [topWall, leftWall, rightWall, bottomWall];
  };

  const createWall = (
    x: number,
    y: number,
    width: number,
    height: number,
  ): Matter.Body => {
    return Bodies.rectangle(x + width / 2, y + height / 2, width, height, {
      isStatic: true,
    });
  };

  function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const calculateRadius = (text: string): number => {
    const textLength = text.length;
    const baseRadius = 20; // Set your desired base radius here
    const radiusIncrement = 5; // Set the increment value for each character here
    return baseRadius + textLength * radiusIncrement;
  };

  const createBubbles = (): Matter.Body[] => {
    let bodies: Matter.Body[] = [];

    for (let i = 0; i < BUBBLES_COUNT; i++) {
      bodies.push(
        Bodies.circle(
          getRandomNumber(0, SCREEN_WIDTH),
          getRandomNumber((SCREEN_HEIGHT * 3) / 4, SCREEN_HEIGHT),
          calculateRadius(musicGenres[i].name),
          {
            isStatic: false,
            restitution: 0.2,
          },
        ),
      );
    }

    return bodies;
  };

  const roundDigitsLength = (value: number, length: number): number => {
    return parseFloat(value.toFixed(length));
  };

  return (
    <Canvas style={styles.canvasContainer}>
      {renderBubbles.map((body, index) => {
        return (
          <Genre
            x={roundDigitsLength(body.position.x, 2)}
            y={roundDigitsLength(body.position.y, 2)}
            r={body.circleRadius!}
            color={musicGenres[index].color}
            text={musicGenres[index].name}
            key={musicGenres[index].name}
          />
        );
      })}
    </Canvas>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  canvasContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});
