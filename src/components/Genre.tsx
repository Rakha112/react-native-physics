import React, {useEffect} from 'react';
import {Circle, Group, Text, useFont} from '@shopify/react-native-skia';
import {useSharedValue, withSpring, withTiming} from 'react-native-reanimated';

type Props = {
  x: number;
  y: number;
  r: number;
  color: string;
  text: string;
};

const Genre = ({x, y, r, color, text}: Props) => {
  const radius = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    radius.value = withSpring(r);
    opacity.value = withTiming(1, {duration: 250});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const font = useFont(require('../assets/fonts/Roboto-Bold.ttf'), 18);

  if (!font) {
    return null;
  }

  const fontSize = font!.measureText(text);

  return (
    <Group>
      <Circle cx={x} cy={y} r={radius} color={color} />
      <Text
        text={text}
        font={font}
        x={x - fontSize.width / 2}
        y={y + fontSize.height / 4}
        color={'white'}
        opacity={opacity}
      />
    </Group>
  );
};

export default Genre;
