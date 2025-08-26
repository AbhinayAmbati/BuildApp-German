import { Button } from '@/components/ui/Button';
import { Card, ProfileCard } from '@/components/ui/Card';
import { BorderRadius, FontSizes, Shadows, Spacing } from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

// Mock user data - in real app this would come from API/storage
const mockUser = {
  id: '1',
  firstName: 'Sarah',
  age: 28,
  photos: [
    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop',
  ],
  bio: 'Love hiking, coffee, and good conversations. Looking for someone to explore the city with! 🌟',
  location: 'San Francisco, CA',
  height: '5\'6"',
  education: 'Stanford University',
  job: 'Product Designer',
  interests: ['Photography', 'Hiking', 'Coffee', 'Travel', 'Art', 'Music'],
  lifestyle: {
    drinking: 'Socially',
    smoking: 'Never',
    workout: 'Often',
  },
  prompts: [
    {
      question: 'My ideal Sunday',
      answer: 'Brunch with friends, a long walk in the park, and binge-watching Netflix'
    },
    {
      question: 'I\'m looking for',
      answer: 'Someone who can make me laugh and isn\'t afraid of adventure'
    },
    {
      question: 'Fun fact about me',
      answer: 'I once backpacked through 15 countries in 3 months!'
    }
  ],
  completionPercentage: 85,
  verified: true,
};

export default function ProfileScreen() {
  const { colors, toggleTheme, isDark } = useTheme();
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const renderPhotoCarousel = () => (
    <View style={styles.photoContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setActivePhotoIndex(index);
        }}
      >
        {mockUser.photos.map((photo, index) => (
          <Image
            key={index}
            source={{ uri: photo }}
            style={styles.photo}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      {/* Photo indicators */}
      <View style={styles.photoIndicators}>
        {mockUser.photos.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              {
                backgroundColor: index === activePhotoIndex ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)',
              }
            ]}
          />
        ))}
      </View>

      {/* Verification badge */}
      {mockUser.verified && (
        <View style={[styles.verificationBadge, { backgroundColor: colors.primary }]}>
          <Ionicons name="checkmark" size={16} color="#FFFFFF" />
        </View>
      )}
    </View>
  );

  const renderBasicInfo = () => (
    <View style={styles.basicInfo}>
      <View style={styles.nameRow}>
        <Text style={[styles.name, { color: colors.text }]}>
          {mockUser.firstName}, {mockUser.age}
        </Text>
        <TouchableOpacity
          style={[styles.editButton, { backgroundColor: colors.primary + '20' }]}
          onPress={() => {/* TODO: Navigate to edit profile */}}
        >
          <Ionicons name="pencil" size={16} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.locationRow}>
        <Ionicons name="location-outline" size={16} color={colors.textSecondary} />
        <Text style={[styles.location, { color: colors.textSecondary }]}>
          {mockUser.location}
        </Text>
      </View>
      {mockUser.bio && (
        <Text style={[styles.bio, { color: colors.text }]}>
          {mockUser.bio}
        </Text>
      )}
    </View>
  );

  const renderCompletionStatus = () => (
    <Card style={styles.completionCard}>
      <View style={styles.completionHeader}>
        <Text style={[styles.completionTitle, { color: colors.text }]}>
          Profile Completion
        </Text>
        <Text style={[styles.completionPercentage, { color: colors.primary }]}>
          {mockUser.completionPercentage}%
        </Text>
      </View>
      <View style={[styles.completionBar, { backgroundColor: colors.borderLight }]}>
        <View
          style={[
            styles.completionFill,
            {
              backgroundColor: colors.primary,
              width: `${mockUser.completionPercentage}%`,
            }
          ]}
        />
      </View>
      <Text style={[styles.completionText, { color: colors.textSecondary }]}>
        Complete your profile to get more matches
      </Text>
    </Card>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Profile</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={[styles.headerButton, { backgroundColor: colors.surface }]}
            onPress={toggleTheme}
          >
            <Ionicons
              name={isDark ? 'sunny' : 'moon'}
              size={20}
              color={colors.text}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.headerButton, { backgroundColor: colors.surface }]}
            onPress={() => router.push('/settings')}
          >
            <Ionicons name="settings-outline" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Photo Carousel */}
        <ProfileCard style={styles.photoCard}>
          {renderPhotoCarousel()}
          {renderBasicInfo()}
        </ProfileCard>

        {/* Profile Completion */}
        {renderCompletionStatus()}

        {/* Quick Actions */}
        <Card style={styles.actionsCard}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
          <View style={styles.actionButtons}>
            <Button
              title="Edit Profile"
              onPress={() => {/* TODO: Navigate to edit profile */}}
              variant="outline"
              size="medium"
              style={styles.actionButton}
              icon={<Ionicons name="pencil-outline" size={16} color={colors.primary} />}
            />
            <Button
              title="Add Photos"
              onPress={() => {/* TODO: Navigate to photo upload */}}
              variant="outline"
              size="medium"
              style={styles.actionButton}
              icon={<Ionicons name="camera-outline" size={16} color={colors.primary} />}
            />
          </View>
        </Card>

        {/* Basic Details */}
        <Card style={styles.detailsCard}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>About Me</Text>
          <View style={styles.detailsList}>
            <View style={styles.detailItem}>
              <Ionicons name="briefcase-outline" size={20} color={colors.textSecondary} />
              <Text style={[styles.detailText, { color: colors.text }]}>
                {mockUser.job} at {mockUser.education}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="resize-outline" size={20} color={colors.textSecondary} />
              <Text style={[styles.detailText, { color: colors.text }]}>
                {mockUser.height}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="wine-outline" size={20} color={colors.textSecondary} />
              <Text style={[styles.detailText, { color: colors.text }]}>
                Drinks {mockUser.lifestyle.drinking.toLowerCase()}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons name="fitness-outline" size={20} color={colors.textSecondary} />
              <Text style={[styles.detailText, { color: colors.text }]}>
                Works out {mockUser.lifestyle.workout.toLowerCase()}
              </Text>
            </View>
          </View>
        </Card>

        {/* Interests */}
        <Card style={styles.interestsCard}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Interests</Text>
          <View style={styles.interestsList}>
            {mockUser.interests.map((interest, index) => (
              <View
                key={index}
                style={[styles.interestTag, { backgroundColor: colors.primary + '20' }]}
              >
                <Text style={[styles.interestText, { color: colors.primary }]}>
                  {interest}
                </Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Prompts */}
        <View style={styles.promptsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text, marginBottom: Spacing.lg }]}>
            Get to Know Me
          </Text>
          {mockUser.prompts.map((prompt, index) => (
            <Card key={index} style={styles.promptCard}>
              <Text style={[styles.promptQuestion, { color: colors.textSecondary }]}>
                {prompt.question}
              </Text>
              <Text style={[styles.promptAnswer, { color: colors.text }]}>
                {prompt.answer}
              </Text>
            </Card>
          ))}
        </View>

        {/* Settings Section */}
        <Card style={styles.settingsCard}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Settings & Preferences
          </Text>

          <View style={styles.settingsList}>
            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => router.push('/settings')}
            >
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: colors.primary + '20' }]}>
                  <Ionicons name="settings-outline" size={20} color={colors.primary} />
                </View>
                <Text style={[styles.settingText, { color: colors.text }]}>
                  App Settings
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => router.push('/premium')}
            >
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: colors.secondary + '20' }]}>
                  <Ionicons name="star-outline" size={20} color={colors.secondary} />
                </View>
                <Text style={[styles.settingText, { color: colors.text }]}>
                  Get Premium
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => console.log('Privacy settings')}
            >
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: colors.info + '20' }]}>
                  <Ionicons name="shield-outline" size={20} color={colors.info} />
                </View>
                <Text style={[styles.settingText, { color: colors.text }]}>
                  Privacy & Safety
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.settingItem}
              onPress={() => console.log('Help & Support')}
            >
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: colors.success + '20' }]}>
                  <Ionicons name="help-circle-outline" size={20} color={colors.success} />
                </View>
                <Text style={[styles.settingText, { color: colors.text }]}>
                  Help & Support
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
        </Card>

        {/* Bottom spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  headerTitle: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.light,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
  },
  photoCard: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.lg,
    padding: 0,
  },
  photoContainer: {
    height: 400,
    position: 'relative',
  },
  photo: {
    width: width - (Spacing.xl * 2),
    height: 400,
  },
  photoIndicators: {
    position: 'absolute',
    bottom: Spacing.md,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.xs,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  verificationBadge: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.medium,
  },
  basicInfo: {
    padding: Spacing.lg,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  name: {
    fontSize: FontSizes.xxl,
    fontWeight: 'bold',
  },
  editButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.md,
  },
  location: {
    fontSize: FontSizes.md,
  },
  bio: {
    fontSize: FontSizes.md,
    lineHeight: 22,
  },
  completionCard: {
    marginBottom: Spacing.lg,
  },
  completionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  completionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
  },
  completionPercentage: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
  },
  completionBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: Spacing.sm,
  },
  completionFill: {
    height: '100%',
    borderRadius: 4,
  },
  completionText: {
    fontSize: FontSizes.sm,
  },
  actionsCard: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    marginBottom: Spacing.md,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  actionButton: {
    flex: 1,
  },
  detailsCard: {
    marginBottom: Spacing.lg,
  },
  detailsList: {
    gap: Spacing.md,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  detailText: {
    fontSize: FontSizes.md,
    flex: 1,
  },
  interestsCard: {
    marginBottom: Spacing.lg,
  },
  interestsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  interestTag: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  interestText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  promptsSection: {
    marginBottom: Spacing.lg,
  },
  promptCard: {
    marginBottom: Spacing.md,
  },
  promptQuestion: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  promptAnswer: {
    fontSize: FontSizes.md,
    lineHeight: 22,
  },
  settingsCard: {
    marginBottom: Spacing.lg,
  },
  settingsList: {
    gap: Spacing.sm,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingText: {
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
});