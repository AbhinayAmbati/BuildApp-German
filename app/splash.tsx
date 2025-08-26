import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { useTheme } from '@/contexts/ThemeContext';
import { Spacing, FontSizes } from '@/constants/Colors';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const { colors } = useTheme();
  
  // Animation values
  const logoScale = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(30);

  useEffect(() => {
    // Start animations
    logoOpacity.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.ease) });
    logoScale.value = withSequence(
      withSpring(1.2, { damping: 10, stiffness: 200 }),
      withSpring(1, { damping: 15, stiffness: 200 })
    );

    // Animate text after logo
    setTimeout(() => {
      textOpacity.value = withTiming(1, { duration: 600 });
      textTranslateY.value = withSpring(0, { damping: 15, stiffness: 200 });
    }, 500);

    // Navigate to main app after animations
    setTimeout(() => {
      router.replace('/(tabs)');
    }, 2500);
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textTranslateY.value }],
  }));

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={colors.gradients.sunset}
        style={StyleSheet.absoluteFillObject}
      />
      
      <View style={styles.content}>
        {/* Logo */}
        <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
          <View style={[styles.logoCircle, { backgroundColor: 'rgba(255, 255, 255, 0.2)' }]}>
            <Text style={styles.logoEmoji}>💕</Text>
          </View>
        </Animated.View>

        {/* App Name and Tagline */}
        <Animated.View style={[styles.textContainer, textAnimatedStyle]}>
          <Text style={styles.appName}>LoveConnect</Text>
          <Text style={styles.tagline}>Find your perfect match</Text>
        </Animated.View>
      </View>

      {/* Version */}
      <View style={styles.footer}>
        <Text style={styles.version}>v1.0.0</Text>
      </View>
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
  logoContainer: {
    marginBottom: Spacing.xxl,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  logoEmoji: {
    fontSize: 48,
  },
  textContainer: {
    alignItems: 'center',
  },
  appName: {
    fontSize: FontSizes.xxxl + 8,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: Spacing.sm,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    fontSize: FontSizes.lg,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontWeight: '300',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: Spacing.xl,
  },
  version: {
    fontSize: FontSizes.sm,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '300',
  },
});
