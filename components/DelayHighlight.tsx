import { useEffect, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';

import { DepartureDelay } from '@/src/domain/value-objects/DepartureDelay';

interface DelayHighlightProps {
  delayInSeconds: number | null | undefined;
}

export function DelayHighlight({ delayInSeconds }: DelayHighlightProps) {
  const { severity, formattedText, shouldAnimate } = new DepartureDelay(delayInSeconds);
  const [opacity] = useState(() => new Animated.Value(1));

  useEffect(() => {
    if (shouldAnimate) {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0.25,
            duration: 700,
            useNativeDriver: true,
            isInteraction: false,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
            isInteraction: false,
          }),
        ]),
      );

      animation.start();
      return () => animation.stop();
    }

    opacity.setValue(1);
  }, [shouldAnimate, opacity]);

  const colorStyle =
    severity === 'ON_TIME'
      ? styles.onTime
      : severity === 'MINOR'
        ? styles.minorDelay
        : styles.majorDelay;

  return (
    <Animated.Text style={[styles.baseText, colorStyle, { opacity }]}>
      {formattedText}
    </Animated.Text>
  );
}

const styles = StyleSheet.create({
  baseText: {
    fontSize: 12,
  },
  onTime: {
    color: '#16A34A',
    fontWeight: 'normal',
  },
  minorDelay: {
    color: '#D97706',
    fontWeight: 'normal',
  },
  majorDelay: {
    color: '#DC2626',
    fontWeight: 'bold',
  },
});
