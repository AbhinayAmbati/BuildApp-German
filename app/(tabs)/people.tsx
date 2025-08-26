import { Card } from '@/components/ui/Card';
import { MatchModal } from '@/components/ui/MatchModal';
import { BorderRadius, FontSizes, Shadows, Spacing } from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Swiper from 'react-native-deck-swiper';

const { width, height } = Dimensions.get('window');
const CARD_HEIGHT = height * 0.75;

// Enhanced user profiles with comprehensive information
const mockProfiles = [
  {
    id: '1',
    name: 'Emma',
    age: 25,
    photos: [
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop',
    ],
    bio: 'Adventure seeker and coffee enthusiast ☕️ Love exploring new places and trying different cuisines.',
    location: 'San Francisco, CA',
    distance: '2 miles away',
    profession: 'Product Designer',
    company: 'Tech Startup',
    education: 'Stanford University',
    height: '5\'6"',
    interests: ['Photography', 'Hiking', 'Coffee', 'Travel', 'Art', 'Yoga'],
    lifestyle: {
      drinking: 'Socially',
      smoking: 'Never',
      workout: 'Often',
      pets: 'Dog lover',
      kids: 'Want someday',
    },
    prompts: [
      {
        question: 'My ideal Sunday',
        answer: 'Brunch with friends, hiking in nature, and cozy movie nights'
      },
      {
        question: 'I\'m looking for',
        answer: 'Someone genuine who loves adventure and deep conversations'
      }
    ],
    verified: true,
    isOnline: true,
    lastActive: '5 minutes ago',
    mutualFriends: 3,
    mutualInterests: ['Photography', 'Travel'],
  },
  {
    id: '2',
    name: 'Jessica',
    age: 27,
    photos: [
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=600&fit=crop',
    ],
    bio: 'Yoga instructor by day, foodie by night 🧘‍♀️🍕 Passionate about wellness and helping others.',
    location: 'Oakland, CA',
    distance: '5 miles away',
    profession: 'Yoga Instructor',
    company: 'Mindful Studio',
    education: 'UC Berkeley',
    height: '5\'4"',
    interests: ['Yoga', 'Meditation', 'Cooking', 'Dogs', 'Nature', 'Wellness'],
    lifestyle: {
      drinking: 'Rarely',
      smoking: 'Never',
      workout: 'Daily',
      pets: 'Has a dog',
      kids: 'Open to it',
    },
    prompts: [
      {
        question: 'Fun fact about me',
        answer: 'I can do a handstand for 2 minutes straight!'
      }
    ],
    verified: false,
    isOnline: false,
    lastActive: '2 hours ago',
    mutualFriends: 1,
    mutualInterests: ['Nature', 'Dogs'],
  },
];

export default function PeopleScreen() {
  const { colors } = useTheme();
  const [cardIndex, setCardIndex] = useState(0);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchedUser, setMatchedUser] = useState<any>(null);
  const swipeRef = useRef<any>(null);

  const handleSwipeLeft = (cardIndex: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    console.log('Passed on:', mockProfiles[cardIndex]?.name);
    setCurrentPhotoIndex(0); // Reset photo index for next card
  };

  const handleSwipeRight = (cardIndex: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    const user = mockProfiles[cardIndex];
    if (!user) return;

    // Simulate match (30% chance for demo)
    const isMatch = Math.random() > 0.7;

    if (isMatch) {
      setMatchedUser(user);
      setShowMatchModal(true);
    } else {
      Alert.alert('Liked! 💕', `You liked ${user.name}!`);
    }

    setCurrentPhotoIndex(0); // Reset photo index for next card
  };

  const handleSwipeTop = (cardIndex: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    const user = mockProfiles[cardIndex];
    Alert.alert('Super Like! ⭐', `You super liked ${user.name}!`);
    setCurrentPhotoIndex(0); // Reset photo index for next card
  };

  const handlePhotoTap = (side: 'left' | 'right') => {
    const currentUser = mockProfiles[cardIndex];
    if (!currentUser) return;

    if (side === 'right' && currentPhotoIndex < currentUser.photos.length - 1) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
    } else if (side === 'left' && currentPhotoIndex > 0) {
      setCurrentPhotoIndex(currentPhotoIndex - 1);
    }
  };

  const handleSendMessage = () => {
    setShowMatchModal(false);
    Alert.alert('Message', 'Opening chat...');
  };

  const handleLike = () => {
    swipeRef.current?.swipeRight();
  };

  const handlePass = () => {
    swipeRef.current?.swipeLeft();
  };

  const handleSuperLike = () => {
    swipeRef.current?.swipeTop();
  };

  const renderCard = (user: any, index: number) => {
    return (
      <View key={user.id} style={[styles.card, { backgroundColor: colors.cardBackground }]}>
        <View style={styles.photoSection}>
          <View style={styles.photoContainer}>
            {/* Left tap area */}
            <TouchableOpacity
              style={[styles.photoTapArea, styles.leftTapArea]}
              onPress={() => handlePhotoTap('left')}
              activeOpacity={1}
            />

            {/* Right tap area */}
            <TouchableOpacity
              style={[styles.photoTapArea, styles.rightTapArea]}
              onPress={() => handlePhotoTap('right')}
              activeOpacity={1}
            />

            <Image
              source={{ uri: user.photos[currentPhotoIndex] || user.photos[0] }}
              style={styles.photo}
              resizeMode="cover"
            />

            {/* Photo indicators */}
            {user.photos.length > 1 && (
              <View style={styles.photoIndicators}>
                {user.photos.map((_: any, photoIndex: number) => (
                  <View
                    key={photoIndex}
                    style={[
                      styles.indicator,
                      {
                        backgroundColor: photoIndex === currentPhotoIndex
                          ? '#FFFFFF'
                          : 'rgba(255, 255, 255, 0.5)',
                      }
                    ]}
                  />
                ))}
              </View>
            )}

            {/* Online status */}
            {user.isOnline && (
              <View style={[styles.onlineStatus, { backgroundColor: colors.success }]}>
                <Text style={styles.onlineText}>Online</Text>
              </View>
            )}

            {/* Verification badge */}
            {user.verified && (
              <View style={[styles.verificationBadge, { backgroundColor: colors.primary }]}>
                <Ionicons name="checkmark" size={16} color="#FFFFFF" />
              </View>
            )}

            {/* Gradient overlay */}
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.3)']}
              style={styles.gradientOverlay}
            />
          </View>
        </View>

        {/* Scrollable Content Section */}
        <ScrollView
          style={styles.contentSection}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >
          {/* Basic Info */}
          <View style={styles.basicInfo}>
            <View style={styles.nameRow}>
              <Text style={[styles.name, { color: colors.text }]}>
                {user.name}, {user.age}
              </Text>
              {user.mutualFriends > 0 && (
                <View style={[styles.mutualBadge, { backgroundColor: colors.secondary + '20' }]}>
                  <Ionicons name="people" size={12} color={colors.secondary} />
                  <Text style={[styles.mutualText, { color: colors.secondary }]}>
                    {user.mutualFriends}
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={16} color={colors.textSecondary} />
              <Text style={[styles.location, { color: colors.textSecondary }]}>
                {user.distance} • {user.location}
              </Text>
            </View>

            <Text style={[styles.bio, { color: colors.text }]}>
              {user.bio}
            </Text>
          </View>

          {/* Professional Info */}
          <Card style={styles.infoCard}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Professional</Text>
            <View style={styles.infoList}>
              <View style={styles.infoItem}>
                <Ionicons name="briefcase-outline" size={18} color={colors.textSecondary} />
                <Text style={[styles.infoText, { color: colors.text }]}>
                  {user.profession} at {user.company}
                </Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="school-outline" size={18} color={colors.textSecondary} />
                <Text style={[styles.infoText, { color: colors.text }]}>
                  {user.education}
                </Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="resize-outline" size={18} color={colors.textSecondary} />
                <Text style={[styles.infoText, { color: colors.text }]}>
                  {user.height}
                </Text>
              </View>
            </View>
          </Card>

          {/* Bottom spacing for action buttons */}
          <View style={{ height: 120 }} />
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <TouchableOpacity
          style={[styles.headerButton, { backgroundColor: colors.surface }]}
          onPress={() => {/* TODO: Open filters */}}
        >
          <Ionicons name="options-outline" size={20} color={colors.text} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>People</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
            Swipe to explore profiles
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.headerButton, { backgroundColor: colors.surface }]}
          onPress={() => {/* TODO: Open profile details */}}
        >
          <Ionicons name="information-circle-outline" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Swipeable Cards */}
      <View style={styles.cardContainer}>
        <Swiper
          ref={swipeRef}
          cards={mockProfiles}
          renderCard={renderCard}
          onSwipedLeft={handleSwipeLeft}
          onSwipedRight={handleSwipeRight}
          onSwipedTop={handleSwipeTop}
          onSwipedAll={() => {
            Alert.alert('No more profiles', 'Check back later for new people!');
          }}
          cardIndex={cardIndex}
          onSwiped={(cardIndex) => {
            setCardIndex(cardIndex + 1);
            setCurrentPhotoIndex(0);
          }}
          backgroundColor={'transparent'}
          stackSize={3}
          stackSeparation={15}
          animateOverlayLabelsOpacity
          animateCardOpacity
          swipeBackCard
          disableBottomSwipe
          overlayLabels={{
            left: {
              title: 'PASS',
              style: {
                label: {
                  backgroundColor: colors.error,
                  borderColor: colors.error,
                  color: '#FFFFFF',
                  borderWidth: 1,
                  fontSize: 24,
                  fontWeight: 'bold',
                  padding: 10,
                  borderRadius: 10,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: -30,
                },
              },
            },
            right: {
              title: 'LIKE',
              style: {
                label: {
                  backgroundColor: colors.success,
                  borderColor: colors.success,
                  color: '#FFFFFF',
                  borderWidth: 1,
                  fontSize: 24,
                  fontWeight: 'bold',
                  padding: 10,
                  borderRadius: 10,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: 30,
                },
              },
            },
            top: {
              title: 'SUPER LIKE',
              style: {
                label: {
                  backgroundColor: colors.info,
                  borderColor: colors.info,
                  color: '#FFFFFF',
                  borderWidth: 1,
                  fontSize: 20,
                  fontWeight: 'bold',
                  padding: 10,
                  borderRadius: 10,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              },
            },
          }}
        />
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.passButton, { backgroundColor: colors.error }]}
          onPress={handlePass}
        >
          <Ionicons name="close" size={28} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.superLikeButton, { backgroundColor: colors.info }]}
          onPress={handleSuperLike}
        >
          <Ionicons name="star" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.likeButton, { backgroundColor: colors.success }]}
          onPress={handleLike}
        >
          <Ionicons name="heart" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Match Modal */}
      <MatchModal
        visible={showMatchModal}
        onClose={() => setShowMatchModal(false)}
        onSendMessage={handleSendMessage}
        userPhoto="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
        matchPhoto={matchedUser?.photos[0] || ''}
        matchName={matchedUser?.name || ''}
      />
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
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.light,
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: FontSizes.sm,
    marginTop: 2,
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: width - (Spacing.lg * 2),
    height: CARD_HEIGHT,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.heavy,
  },
  photoSection: {
    height: '60%',
    position: 'relative',
  },
  photoContainer: {
    flex: 1,
    position: 'relative',
  },
  photoTapArea: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '50%',
    zIndex: 10,
  },
  leftTapArea: {
    left: 0,
  },
  rightTapArea: {
    right: 0,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  photoIndicators: {
    position: 'absolute',
    top: Spacing.md,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.xs,
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  onlineStatus: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  onlineText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: '#FFFFFF',
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
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%',
  },
  contentSection: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  basicInfo: {
    padding: Spacing.lg,
    paddingBottom: Spacing.md,
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
  mutualBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    gap: Spacing.xs,
  },
  mutualText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.md,
  },
  location: {
    fontSize: FontSizes.sm,
  },
  bio: {
    fontSize: FontSizes.md,
    lineHeight: 22,
  },
  infoCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  cardTitle: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    marginBottom: Spacing.md,
  },
  infoList: {
    gap: Spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  infoText: {
    fontSize: FontSizes.md,
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    gap: Spacing.xl,
    backgroundColor: 'transparent',
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.heavy,
  },
  passButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  superLikeButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
  },
  likeButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});
