import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Spacing, FontSizes } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function PermissionsScreen() {
  const { colors } = useTheme();
  const [locationGranted, setLocationGranted] = useState(false);
  const [notificationsGranted, setNotificationsGranted] = useState(false);
  const [loading, setLoading] = useState(false);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setLocationGranted(true);
      } else {
        Alert.alert(
          'Location Permission',
          'Location access is needed to find people near you. You can enable it later in settings.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  const requestNotificationPermission = async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === 'granted') {
        setNotificationsGranted(true);
      } else {
        Alert.alert(
          'Notification Permission',
          'Notifications help you stay updated with matches and messages. You can enable them later in settings.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  const handleContinue = async () => {
    setLoading(true);
    // Small delay for better UX
    setTimeout(() => {
      setLoading(false);
      router.push('/auth/onboarding/basic-info');
    }, 1000);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Enable Permissions
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            To give you the best experience, we need a couple of permissions
          </Text>
        </View>

        {/* Permission Cards */}
        <View style={styles.permissionsContainer}>
          <Card style={styles.permissionCard}>
            <View style={styles.permissionHeader}>
              <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
                <Ionicons name="location" size={32} color={colors.primary} />
              </View>
              <View style={styles.permissionInfo}>
                <Text style={[styles.permissionTitle, { color: colors.text }]}>
                  Location Services
                </Text>
                <Text style={[styles.permissionDescription, { color: colors.textSecondary }]}>
                  Find people near you and see distance
                </Text>
              </View>
              <Ionicons 
                name={locationGranted ? "checkmark-circle" : "ellipse-outline"} 
                size={24} 
                color={locationGranted ? colors.success : colors.textMuted} 
              />
            </View>
            {!locationGranted && (
              <Button
                title="Allow Location"
                onPress={requestLocationPermission}
                variant="outline"
                size="small"
                style={styles.permissionButton}
              />
            )}
          </Card>

          <Card style={styles.permissionCard}>
            <View style={styles.permissionHeader}>
              <View style={[styles.iconContainer, { backgroundColor: colors.secondary + '20' }]}>
                <Ionicons name="notifications" size={32} color={colors.secondary} />
              </View>
              <View style={styles.permissionInfo}>
                <Text style={[styles.permissionTitle, { color: colors.text }]}>
                  Push Notifications
                </Text>
                <Text style={[styles.permissionDescription, { color: colors.textSecondary }]}>
                  Get notified about matches and messages
                </Text>
              </View>
              <Ionicons 
                name={notificationsGranted ? "checkmark-circle" : "ellipse-outline"} 
                size={24} 
                color={notificationsGranted ? colors.success : colors.textMuted} 
              />
            </View>
            {!notificationsGranted && (
              <Button
                title="Allow Notifications"
                onPress={requestNotificationPermission}
                variant="outline"
                size="small"
                style={styles.permissionButton}
              />
            )}
          </Card>
        </View>

        {/* Continue Button */}
        <View style={styles.footer}>
          <Button
            title="Continue"
            onPress={handleContinue}
            variant="gradient"
            size="large"
            fullWidth
            loading={loading}
          />
          <Text style={[styles.skipText, { color: colors.textMuted }]}>
            You can always change these settings later
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
    paddingTop: Spacing.xxl,
  },
  header: {
    marginBottom: Spacing.xxl,
  },
  title: {
    fontSize: FontSizes.xxxl,
    fontWeight: 'bold',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: FontSizes.md,
    lineHeight: 24,
  },
  permissionsContainer: {
    flex: 1,
    gap: Spacing.lg,
  },
  permissionCard: {
    padding: Spacing.lg,
  },
  permissionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  permissionInfo: {
    flex: 1,
  },
  permissionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  permissionDescription: {
    fontSize: FontSizes.sm,
    lineHeight: 20,
  },
  permissionButton: {
    alignSelf: 'flex-start',
  },
  footer: {
    paddingBottom: Spacing.xl,
  },
  skipText: {
    fontSize: FontSizes.sm,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
});
