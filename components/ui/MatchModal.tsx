import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from './Button';
import { Spacing, FontSizes, BorderRadius } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface MatchModalProps {
  visible: boolean;
  onClose: () => void;
  onSendMessage: () => void;
  userPhoto: string;
  matchPhoto: string;
  matchName: string;
}

export function MatchModal({
  visible,
  onClose,
  onSendMessage,
  userPhoto,
  matchPhoto,
  matchName,
}: MatchModalProps) {
  const { colors } = useTheme();

  // Animation values
  const modalScale = useSharedValue(0);
  const modalOpacity = useSharedValue(0);
  const heartsScale = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const buttonsTranslateY = useSharedValue(50);
  const buttonsOpacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      // Reset values
      modalScale.value = 0;
      modalOpacity.value = 0;
      heartsScale.value = 0;
      textOpacity.value = 0;
      buttonsTranslateY.value = 50;
      buttonsOpacity.value = 0;

      // Animate in sequence
      modalOpacity.value = withTiming(1, { duration: 300 });
      modalScale.value = withSpring(1, { damping: 15, stiffness: 200 });
      
      heartsScale.value = withDelay(
        200,
        withSequence(
          withSpring(1.2, { damping: 10, stiffness: 200 }),
          withSpring(1, { damping: 15, stiffness: 200 })
        )
      );

      textOpacity.value = withDelay(400, withTiming(1, { duration: 500 }));
      
      buttonsTranslateY.value = withDelay(600, withSpring(0, { damping: 15, stiffness: 200 }));
      buttonsOpacity.value = withDelay(600, withTiming(1, { duration: 300 }));
    } else {
      // Animate out
      modalScale.value = withTiming(0.8, { duration: 200 });
      modalOpacity.value = withTiming(0, { duration: 200 });
    }
  }, [visible]);

  const modalAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: modalScale.value }],
    opacity: modalOpacity.value,
  }));

  const heartsAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartsScale.value }],
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  const buttonsAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: buttonsTranslateY.value }],
    opacity: buttonsOpacity.value,
  }));

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
    >
      <BlurView intensity={20} style={StyleSheet.absoluteFillObject}>
        <View style={styles.overlay}>
          <Animated.View style={[styles.modalContainer, modalAnimatedStyle]}>
            <LinearGradient
              colors={colors.gradients.sunset}
              style={styles.gradient}
            >
              {/* Close button */}
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>

              {/* Hearts animation */}
              <Animated.View style={[styles.heartsContainer, heartsAnimatedStyle]}>
                <View style={styles.heartRow}>
                  <Text style={styles.heartEmoji}>💕</Text>
                  <Text style={styles.heartEmoji}>💖</Text>
                  <Text style={styles.heartEmoji}>💕</Text>
                </View>
                <View style={styles.heartRow}>
                  <Text style={styles.heartEmoji}>💖</Text>
                  <Text style={[styles.heartEmoji, styles.bigHeart]}>💕</Text>
                  <Text style={styles.heartEmoji}>💖</Text>
                </View>
                <View style={styles.heartRow}>
                  <Text style={styles.heartEmoji}>💕</Text>
                  <Text style={styles.heartEmoji}>💖</Text>
                  <Text style={styles.heartEmoji}>💕</Text>
                </View>
              </Animated.View>

              {/* Photos */}
              <View style={styles.photosContainer}>
                <View style={styles.photoWrapper}>
                  <Image source={{ uri: userPhoto }} style={styles.photo} />
                  <View style={[styles.photoBorder, { borderColor: colors.primary }]} />
                </View>
                <View style={styles.photoWrapper}>
                  <Image source={{ uri: matchPhoto }} style={styles.photo} />
                  <View style={[styles.photoBorder, { borderColor: colors.primary }]} />
                </View>
              </View>

              {/* Text */}
              <Animated.View style={[styles.textContainer, textAnimatedStyle]}>
                <Text style={styles.matchTitle}>It's a Match!</Text>
                <Text style={styles.matchSubtitle}>
                  You and {matchName} liked each other
                </Text>
              </Animated.View>

              {/* Buttons */}
              <Animated.View style={[styles.buttonsContainer, buttonsAnimatedStyle]}>
                <Button
                  title="Send Message"
                  onPress={onSendMessage}
                  variant="primary"
                  size="large"
                  fullWidth
                  style={[styles.button, { backgroundColor: '#FFFFFF' }]}
                  textStyle={{ color: colors.primary }}
                  icon={<Ionicons name="chatbubble" size={20} color={colors.primary} />}
                />
                <Button
                  title="Keep Swiping"
                  onPress={onClose}
                  variant="ghost"
                  size="large"
                  fullWidth
                  style={styles.button}
                  textStyle={{ color: '#FFFFFF' }}
                />
              </Animated.View>
            </LinearGradient>
          </Animated.View>
        </View>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 350,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 20,
  },
  gradient: {
    padding: Spacing.xxl,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: Spacing.lg,
    right: Spacing.lg,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  heartsContainer: {
    marginBottom: Spacing.xl,
  },
  heartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginVertical: Spacing.xs,
  },
  heartEmoji: {
    fontSize: 20,
    opacity: 0.8,
  },
  bigHeart: {
    fontSize: 32,
    opacity: 1,
  },
  photosContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: -20, // Overlap photos slightly
    marginBottom: Spacing.xl,
  },
  photoWrapper: {
    position: 'relative',
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  photoBorder: {
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: 54,
    borderWidth: 3,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  matchTitle: {
    fontSize: FontSizes.xxxl,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: Spacing.sm,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  matchSubtitle: {
    fontSize: FontSizes.md,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonsContainer: {
    width: '100%',
    gap: Spacing.md,
  },
  button: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
});
