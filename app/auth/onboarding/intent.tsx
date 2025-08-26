import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Spacing, FontSizes, BorderRadius } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function IntentScreen() {
  const { colors } = useTheme();
  const [intent, setIntent] = useState('');
  const [interestedIn, setInterestedIn] = useState('');

  const intentOptions = [
    {
      value: 'dating',
      title: 'Looking to Date',
      description: 'Find romantic connections and meaningful relationships',
      icon: '💕',
      gradient: colors.gradients.primary,
    },
    {
      value: 'friends',
      title: 'Looking for BFF',
      description: 'Make new friends and expand your social circle',
      icon: '👫',
      gradient: colors.gradients.secondary,
    },
  ];

  const genderPreferences = [
    { value: 'women', label: 'Women', icon: '♀️' },
    { value: 'men', label: 'Men', icon: '♂️' },
    { value: 'everyone', label: 'Everyone', icon: '🌈' },
  ];

  const handleContinue = () => {
    if (!intent) {
      alert('Please select what you\'re looking for');
      return;
    }
    
    if (!interestedIn) {
      alert('Please select who you\'d like to meet');
      return;
    }

    // TODO: Save user preferences
    router.push('/auth/onboarding/personal-info');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }]}>
            What are you looking for?
          </Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { backgroundColor: colors.borderLight }]}>
            <View style={[styles.progressFill, { backgroundColor: colors.primary, width: '40%' }]} />
          </View>
          <Text style={[styles.progressText, { color: colors.textSecondary }]}>
            Step 2 of 5
          </Text>
        </View>

        {/* Intent Selection */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Your intention on this app
          </Text>
          <View style={styles.intentOptions}>
            {intentOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.intentCard,
                  {
                    borderColor: intent === option.value ? colors.primary : colors.border,
                    borderWidth: intent === option.value ? 2 : 1,
                  }
                ]}
                onPress={() => setIntent(option.value)}
              >
                <LinearGradient
                  colors={intent === option.value ? option.gradient : ['transparent', 'transparent']}
                  style={[
                    styles.intentGradient,
                    { opacity: intent === option.value ? 0.1 : 0 }
                  ]}
                />
                <View style={styles.intentContent}>
                  <Text style={styles.intentIcon}>{option.icon}</Text>
                  <View style={styles.intentText}>
                    <Text style={[
                      styles.intentTitle,
                      { 
                        color: intent === option.value ? colors.primary : colors.text,
                        fontWeight: intent === option.value ? 'bold' : '600'
                      }
                    ]}>
                      {option.title}
                    </Text>
                    <Text style={[styles.intentDescription, { color: colors.textSecondary }]}>
                      {option.description}
                    </Text>
                  </View>
                  {intent === option.value && (
                    <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Gender Preference */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Who would you like to meet?
          </Text>
          <View style={styles.preferenceOptions}>
            {genderPreferences.map((preference) => (
              <TouchableOpacity
                key={preference.value}
                style={[
                  styles.preferenceOption,
                  {
                    borderColor: interestedIn === preference.value ? colors.primary : colors.border,
                    backgroundColor: interestedIn === preference.value ? colors.primary + '10' : colors.surface,
                  }
                ]}
                onPress={() => setInterestedIn(preference.value)}
              >
                <Text style={styles.preferenceIcon}>{preference.icon}</Text>
                <Text style={[
                  styles.preferenceLabel,
                  { 
                    color: interestedIn === preference.value ? colors.primary : colors.text,
                    fontWeight: interestedIn === preference.value ? 'bold' : '500'
                  }
                ]}>
                  {preference.label}
                </Text>
                {interestedIn === preference.value && (
                  <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={[styles.footer, { backgroundColor: colors.background }]}>
        <Button
          title="Continue"
          onPress={handleContinue}
          variant="gradient"
          size="large"
          fullWidth
        />
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
  },
  progressContainer: {
    marginBottom: Spacing.xxl,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    marginBottom: Spacing.sm,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: FontSizes.sm,
    textAlign: 'center',
  },
  section: {
    marginBottom: Spacing.xxl,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    marginBottom: Spacing.lg,
  },
  intentOptions: {
    gap: Spacing.md,
  },
  intentCard: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    position: 'relative',
  },
  intentGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  intentContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  intentIcon: {
    fontSize: 32,
    marginRight: Spacing.md,
  },
  intentText: {
    flex: 1,
  },
  intentTitle: {
    fontSize: FontSizes.lg,
    marginBottom: Spacing.xs,
  },
  intentDescription: {
    fontSize: FontSizes.sm,
    lineHeight: 20,
  },
  preferenceOptions: {
    gap: Spacing.sm,
  },
  preferenceOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderWidth: 1,
    borderRadius: BorderRadius.sm,
    gap: Spacing.md,
  },
  preferenceIcon: {
    fontSize: 24,
  },
  preferenceLabel: {
    fontSize: FontSizes.md,
    flex: 1,
  },
  footer: {
    padding: Spacing.xl,
    paddingTop: Spacing.lg,
  },
});
