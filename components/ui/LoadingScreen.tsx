import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { useTheme } from '@/contexts/ThemeContext';
import { Spacing, FontSizes } from '@/constants/Colors';

const { width, height } = Dimensions.get('window');

interface LoadingScreenProps {
  message?: string;
}

export function LoadingScreen({ message = 'Finding your perfect match...' }: LoadingScreenProps) {
  const { colors } = useTheme();
  
  // Animation values
  const heartScale = useSharedValue(1);
  const heartOpacity = useSharedValue(1);
  const pulseScale = useSharedValue(1);
  const textOpacity = useSharedValue(0);

  useEffect(() => {
    // Heart animation
    heartScale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    // Pulse animation
    pulseScale.value = withRepeat(
      withTiming(1.5, { duration: 1500, easing: Easing.out(Easing.ease) }),
      -1,
      false
    );

    // Text fade in
    textOpacity.value = withTiming(1, { duration: 1000, easing: Easing.out(Easing.ease) });
  }, []);

  const heartAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
    opacity: heartOpacity.value,
  }));

  const pulseAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: 1 - (pulseScale.value - 1) / 0.5,
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={colors.gradients.sunset}
        style={StyleSheet.absoluteFillObject}
      />
      
      <View style={styles.content}>
        {/* Animated heart with pulse effect */}
        <View style={styles.heartContainer}>
          {/* Pulse rings */}
          <Animated.View style={[styles.pulseRing, pulseAnimatedStyle, { borderColor: colors.primary }]} />
          <Animated.View 
            style={[
              styles.pulseRing, 
              pulseAnimatedStyle, 
              { borderColor: colors.primary, animationDelay: 500 }
            ]} 
          />
          
          {/* Main heart */}
          <Animated.View style={[styles.heart, heartAnimatedStyle]}>
            <Text style={styles.heartEmoji}>💕</Text>
          </Animated.View>
        </View>

        {/* Loading text */}
        <Animated.View style={[styles.textContainer, textAnimatedStyle]}>
          <Text style={[styles.loadingText, { color: '#FFFFFF' }]}>
            {message}
          </Text>
          <View style={styles.dotsContainer}>
            <LoadingDots />
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

function LoadingDots() {
  const dot1Opacity = useSharedValue(0.3);
  const dot2Opacity = useSharedValue(0.3);
  const dot3Opacity = useSharedValue(0.3);

  useEffect(() => {
    const animateDots = () => {
      dot1Opacity.value = withSequence(
        withTiming(1, { duration: 400 }),
        withTiming(0.3, { duration: 400 })
      );
      
      setTimeout(() => {
        dot2Opacity.value = withSequence(
          withTiming(1, { duration: 400 }),
          withTiming(0.3, { duration: 400 })
        );
      }, 200);
      
      setTimeout(() => {
        dot3Opacity.value = withSequence(
          withTiming(1, { duration: 400 }),
          withTiming(0.3, { duration: 400 })
        );
      }, 400);
    };

    const interval = setInterval(animateDots, 1200);
    animateDots(); // Start immediately

    return () => clearInterval(interval);
  }, []);

  const dot1Style = useAnimatedStyle(() => ({ opacity: dot1Opacity.value }));
  const dot2Style = useAnimatedStyle(() => ({ opacity: dot2Opacity.value }));
  const dot3Style = useAnimatedStyle(() => ({ opacity: dot3Opacity.value }));

  return (
    <View style={styles.dots}>
      <Animated.View style={[styles.dot, dot1Style]} />
      <Animated.View style={[styles.dot, dot2Style]} />
      <Animated.View style={[styles.dot, dot3Style]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF6B6B',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  heartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xxl,
  },
  pulseRing: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
  },
  heart: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  heartEmoji: {
    fontSize: 40,
  },
  textContainer: {
    alignItems: 'center',
  },
  loadingText: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: Spacing.md,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  dotsContainer: {
    marginTop: Spacing.sm,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
});
