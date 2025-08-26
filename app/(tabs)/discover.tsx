import { Button } from '@/components/ui/Button';
import { SwipeCard } from '@/components/ui/Card';
import { BorderRadius, FontSizes, Shadows, Spacing } from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import SwipeCards from 'react-native-deck-swiper';

const { width, height } = Dimensions.get('window');
const CARD_HEIGHT = height * 0.7;
const CARD_WIDTH = width * 0.9;

// Mock user data for discovery
const mockUsers = [
  {
    id: '1',
    name: 'Emma',
    age: 25,
    photos: [
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop',
    ],
    bio: 'Love adventures and good coffee ☕️',
    distance: '2 miles away',
    interests: ['Photography', 'Travel', 'Coffee'],
    verified: true,
  },
  {
    id: '2',
    name: 'Jessica',
    age: 27,
    photos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop',
    ],
    bio: 'Yoga instructor & dog lover 🧘‍♀️🐕',
    distance: '5 miles away',
    interests: ['Yoga', 'Dogs', 'Nature'],
    verified: false,
  },
  {
    id: '3',
    name: 'Sophia',
    age: 24,
    photos: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=600&fit=crop',
    ],
    bio: 'Artist & music lover 🎨🎵',
    distance: '3 miles away',
    interests: ['Art', 'Music', 'Dancing'],
    verified: true,
  },
  {
    id: '4',
    name: 'Madison',
    age: 26,
    photos: [
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
    ],
    bio: 'Foodie & travel enthusiast 🍕✈️',
    distance: '4 miles away',
    interests: ['Food', 'Travel', 'Cooking'],
    verified: true,
  },
];

export default function DiscoverScreen() {
  const { colors } = useTheme();
  const [cardIndex, setCardIndex] = useState(0);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const swipeRef = useRef<any>(null);

  const handleSwipeLeft = (cardIndex: number) => {
    console.log('Swiped left on:', mockUsers[cardIndex]?.name);
    setCurrentPhotoIndex(0);
  };

  const handleSwipeRight = (cardIndex: number) => {
    console.log('Swiped right on:', mockUsers[cardIndex]?.name);
    Alert.alert('It\'s a Match! 💕', `You and ${mockUsers[cardIndex]?.name} liked each other!`);
    setCurrentPhotoIndex(0);
  };

  const handleSwipeTop = (cardIndex: number) => {
    console.log('Super liked:', mockUsers[cardIndex]?.name);
    Alert.alert('Super Like! ⭐', `You super liked ${mockUsers[cardIndex]?.name}!`);
    setCurrentPhotoIndex(0);
  };

  const renderCard = (user: any, index: number) => {
    if (!user) return null;

    return (
      <SwipeCard style={[styles.card, { backgroundColor: colors.cardBackground }]}>
        {/* Photo Section */}
        <View style={styles.photoSection}>
          <TouchableOpacity
            style={styles.photoContainer}
            onPress={() => {
              const nextIndex = (currentPhotoIndex + 1) % user.photos.length;
              setCurrentPhotoIndex(nextIndex);
            }}
          >
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

            {/* Verification badge */}
            {user.verified && (
              <View style={[styles.verificationBadge, { backgroundColor: colors.primary }]}>
                <Ionicons name="checkmark" size={12} color="#FFFFFF" />
              </View>
            )}

            {/* Gradient overlay */}
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={styles.gradientOverlay}
            />
          </TouchableOpacity>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <View style={styles.nameRow}>
            <Text style={[styles.name, { color: '#FFFFFF' }]}>
              {user.name}, {user.age}
            </Text>
            <TouchableOpacity
              style={[styles.infoButton, { backgroundColor: colors.surface }]}
              onPress={() => {/* TODO: Show full profile */}}
            >
              <Ionicons name="information-outline" size={16} color={colors.text} />
            </TouchableOpacity>
          </View>

          <View style={styles.distanceRow}>
            <Ionicons name="location-outline" size={14} color="rgba(255, 255, 255, 0.8)" />
            <Text style={styles.distance}>{user.distance}</Text>
          </View>

          {user.bio && (
            <Text style={styles.bio} numberOfLines={2}>
              {user.bio}
            </Text>
          )}

          {/* Interests */}
          <View style={styles.interests}>
            {user.interests.slice(0, 3).map((interest: string, idx: number) => (
              <View key={idx} style={[styles.interestTag, { backgroundColor: colors.primary + '20' }]}>
                <Text style={[styles.interestText, { color: colors.primary }]}>
                  {interest}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </SwipeCard>
    );
  };

  const renderNoMoreCards = () => (
    <View style={[styles.noMoreCards, { backgroundColor: colors.surface }]}>
      <Text style={[styles.noMoreCardsTitle, { color: colors.text }]}>
        No more profiles
      </Text>
      <Text style={[styles.noMoreCardsText, { color: colors.textSecondary }]}>
        Check back later for new people in your area
      </Text>
      <Button
        title="Expand Search"
        onPress={() => {/* TODO: Expand search radius */}}
        variant="gradient"
        size="medium"
        style={styles.expandButton}
      />
    </View>
  );

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

        <Text style={[styles.headerTitle, { color: colors.text }]}>Discover</Text>

        <TouchableOpacity
          style={[styles.headerButton, { backgroundColor: colors.surface }]}
          onPress={() => {/* TODO: Open location settings */}}
        >
          <Ionicons name="location-outline" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Swipe Cards */}
      <View style={styles.cardContainer}>
        <SwipeCards
          ref={swipeRef}
          cards={mockUsers}
          renderCard={renderCard}
          onSwipedLeft={handleSwipeLeft}
          onSwipedRight={handleSwipeRight}
          onSwipedTop={handleSwipeTop}
          onSwipedAll={() => console.log('All cards swiped')}
          cardIndex={cardIndex}
          backgroundColor={colors.background}
          stackSize={3}
          stackSeparation={15}
          animateOverlayLabelsOpacity
          animateCardOpacity
          swipeBackCard
          disableBottomSwipe
          overlayLabels={{
            left: {
              title: 'NOPE',
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
          renderNoMoreCards={renderNoMoreCards}
        />
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={[styles.actionButton, styles.rejectButton, { backgroundColor: colors.error }]}
          onPress={() => swipeRef.current?.swipeLeft()}
        >
          <Ionicons name="close" size={28} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.superLikeButton, { backgroundColor: colors.info }]}
          onPress={() => swipeRef.current?.swipeTop()}
        >
          <Ionicons name="star" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.likeButton, { backgroundColor: colors.success }]}
          onPress={() => swipeRef.current?.swipeRight()}
        >
          <Ionicons name="heart" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
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
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.light,
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    ...Shadows.heavy,
  },
  photoSection: {
    flex: 1,
    position: 'relative',
  },
  photoContainer: {
    flex: 1,
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
  verificationBadge: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.medium,
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  infoSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.lg,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  name: {
    fontSize: FontSizes.xxl,
    fontWeight: 'bold',
  },
  infoButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  distanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  distance: {
    fontSize: FontSizes.sm,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  bio: {
    fontSize: FontSizes.md,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  interests: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  interestTag: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  interestText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
  },
  noMoreCards: {
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    ...Shadows.medium,
  },
  noMoreCardsTitle: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  noMoreCardsText: {
    fontSize: FontSizes.md,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing.xl,
  },
  expandButton: {
    marginTop: Spacing.md,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    gap: Spacing.xl,
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.medium,
  },
  rejectButton: {
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