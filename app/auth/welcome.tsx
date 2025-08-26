import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';
import { Spacing, FontSizes, BorderRadius } from '@/constants/Colors';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const { colors } = useTheme();

  const handleContinueWithGoogle = () => {
    // TODO: Implement Google OAuth
    router.push('/auth/permissions');
  };

  const handleContinueWithFacebook = () => {
    // TODO: Implement Facebook OAuth
    router.push('/auth/permissions');
  };

  const handleContinueWithEmail = () => {
    // TODO: Implement email signup
    router.push('/auth/permissions');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={colors.gradients.sunset}
        style={StyleSheet.absoluteFillObject}
      />
      
      <View style={styles.content}>
        {/* Logo/Brand Section */}
        <View style={styles.logoSection}>
          <View style={[styles.logoContainer, { backgroundColor: colors.surface }]}>
            <Text style={[styles.logoText, { color: colors.primary }]}>💕</Text>
          </View>
          <Text style={[styles.appName, { color: '#FFFFFF' }]}>LoveConnect</Text>
          <Text style={[styles.tagline, { color: 'rgba(255, 255, 255, 0.9)' }]}>
            Find your perfect match
          </Text>
        </View>

        {/* Auth Buttons */}
        <View style={styles.authSection}>
          <Button
            title="Continue with Google"
            onPress={handleContinueWithGoogle}
            variant="primary"
            size="large"
            fullWidth
            style={[styles.authButton, { backgroundColor: '#FFFFFF' }]}
            textStyle={{ color: '#333333' }}
            icon={<Text style={styles.socialIcon}>🔍</Text>}
          />
          
          <Button
            title="Continue with Facebook"
            onPress={handleContinueWithFacebook}
            variant="primary"
            size="large"
            fullWidth
            style={[styles.authButton, { backgroundColor: '#1877F2' }]}
            icon={<Text style={styles.socialIcon}>📘</Text>}
          />
          
          <Button
            title="Continue with Email"
            onPress={handleContinueWithEmail}
            variant="outline"
            size="large"
            fullWidth
            style={[styles.authButton, { borderColor: '#FFFFFF', borderWidth: 2 }]}
            textStyle={{ color: '#FFFFFF' }}
            icon={<Text style={styles.socialIcon}>✉️</Text>}
          />
        </View>

        {/* Terms and Privacy */}
        <View style={styles.termsSection}>
          <Text style={[styles.termsText, { color: 'rgba(255, 255, 255, 0.8)' }]}>
            By continuing, you agree to our{' '}
            <Text style={styles.linkText}>Terms of Service</Text> and{' '}
            <Text style={styles.linkText}>Privacy Policy</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    justifyContent: 'space-between',
    paddingTop: height * 0.1,
    paddingBottom: Spacing.xl,
  },
  logoSection: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  logoText: {
    fontSize: 48,
  },
  appName: {
    fontSize: FontSizes.xxxl,
    fontWeight: 'bold',
    marginBottom: Spacing.sm,
  },
  tagline: {
    fontSize: FontSizes.lg,
    textAlign: 'center',
    fontWeight: '300',
  },
  authSection: {
    gap: Spacing.md,
  },
  authButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  socialIcon: {
    fontSize: 20,
  },
  termsSection: {
    marginTop: Spacing.lg,
  },
  termsText: {
    fontSize: FontSizes.sm,
    textAlign: 'center',
    lineHeight: 20,
  },
  linkText: {
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
});
