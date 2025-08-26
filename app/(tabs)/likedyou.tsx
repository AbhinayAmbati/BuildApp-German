import { Button } from '@/components/ui/Button';
import { Card, SwipeCard } from '@/components/ui/Card';
import { BorderRadius, FontSizes, Shadows, Spacing } from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - Spacing.xl * 3) / 2;

// Mock data for people who liked you
const mockLikes = [
  {
    id: '1',
    name: 'Emma',
    age: 25,
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=400&fit=crop',
    distance: '2 miles away',
    verified: true,
    isBlurred: true, // Premium feature - blur for non-premium users
  },
  {
    id: '2',
    name: 'Jessica',
    age: 27,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop',
    distance: '5 miles away',
    verified: false,
    isBlurred: true,
  },
  {
    id: '3',
    name: 'Sophia',
    age: 24,
    photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=400&fit=crop',
    distance: '3 miles away',
    verified: true,
    isBlurred: true,
  },
  {
    id: '4',
    name: 'Madison',
    age: 26,
    photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=400&fit=crop',
    distance: '4 miles away',
    verified: true,
    isBlurred: true,
  },
  {
    id: '5',
    name: 'Olivia',
    age: 23,
    photo: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=400&fit=crop',
    distance: '1 mile away',
    verified: false,
    isBlurred: true,
  },
  {
    id: '6',
    name: 'Ava',
    age: 28,
    photo: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300&h=400&fit=crop',
    distance: '6 miles away',
    verified: true,
    isBlurred: true,
  },
];

export default function LikedYouScreen() {
  const { colors } = useTheme();
  const [isPremium, setIsPremium] = useState(false); // Mock premium status

  const handleUpgradeToPremium = () => {
    // TODO: Navigate to premium subscription
    setIsPremium(true); // Mock upgrade for demo
  };

  const handleLikeBack = (userId: string) => {
    console.log('Liked back:', userId);
    // TODO: Handle like back action
  };

  const handlePass = (userId: string) => {
    console.log('Passed on:', userId);
    // TODO: Handle pass action
  };

  const renderLikeCard = ({ item, index }: { item: any; index: number }) => (
    <View style={[styles.likeCard, { width: CARD_WIDTH }]}>
      <SwipeCard style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.photo }}
            style={[
              styles.cardImage,
              item.isBlurred && !isPremium && styles.blurredImage
            ]}
            resizeMode="cover"
          />

          {/* Blur overlay for non-premium users */}
          {item.isBlurred && !isPremium && (
            <View style={styles.blurOverlay}>
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.gradientOverlay}
              />
              <View style={styles.premiumBadge}>
                <Ionicons name="star" size={16} color="#FFD700" />
              </View>
            </View>
          )}

          {/* Verification badge */}
          {item.verified && (
            <View style={[styles.verificationBadge, { backgroundColor: colors.primary }]}>
              <Ionicons name="checkmark" size={12} color="#FFFFFF" />
            </View>
          )}
        </View>

        <View style={styles.cardInfo}>
          <Text style={[styles.cardName, { color: colors.text }]}>
            {isPremium || !item.isBlurred ? item.name : '???'}, {item.age}
          </Text>
          <Text style={[styles.cardDistance, { color: colors.textSecondary }]}>
            {item.distance}
          </Text>
        </View>

        {/* Action buttons for premium users */}
        {isPremium && (
          <View style={styles.cardActions}>
            <TouchableOpacity
              style={[styles.actionButton, styles.passButton, { backgroundColor: colors.error }]}
              onPress={() => handlePass(item.id)}
            >
              <Ionicons name="close" size={16} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.likeButton, { backgroundColor: colors.success }]}
              onPress={() => handleLikeBack(item.id)}
            >
              <Ionicons name="heart" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        )}
      </SwipeCard>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Likes ({mockLikes.length})
        </Text>
        <TouchableOpacity
          style={[styles.headerButton, { backgroundColor: colors.surface }]}
          onPress={() => {/* TODO: Open filters */}}
        >
          <Ionicons name="options-outline" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      {!isPremium && (
        <>
          {/* Premium Upsell Banner */}
          <Card style={[styles.premiumBanner, { backgroundColor: colors.primary }]}>
            <LinearGradient
              colors={colors.gradients.primary}
              style={styles.bannerGradient}
            >
              <View style={styles.bannerContent}>
                <View style={styles.bannerText}>
                  <Text style={styles.bannerTitle}>
                    See who likes you! ⭐
                  </Text>
                  <Text style={styles.bannerSubtitle}>
                    Upgrade to Premium to see all your likes and get unlimited swipes
                  </Text>
                </View>
                <Button
                  title="Upgrade"
                  onPress={handleUpgradeToPremium}
                  variant="primary"
                  size="small"
                  style={[styles.upgradeButton, { backgroundColor: '#FFFFFF' }]}
                  textStyle={{ color: colors.primary }}
                />
              </View>
            </LinearGradient>
          </Card>

          {/* Feature List */}
          <Card style={styles.featuresCard}>
            <Text style={[styles.featuresTitle, { color: colors.text }]}>
              Premium Features
            </Text>
            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <Ionicons name="eye" size={20} color={colors.primary} />
                <Text style={[styles.featureText, { color: colors.text }]}>
                  See who likes you
                </Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="infinite" size={20} color={colors.primary} />
                <Text style={[styles.featureText, { color: colors.text }]}>
                  Unlimited swipes
                </Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="refresh" size={20} color={colors.primary} />
                <Text style={[styles.featureText, { color: colors.text }]}>
                  Rewind last swipe
                </Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="rocket" size={20} color={colors.primary} />
                <Text style={[styles.featureText, { color: colors.text }]}>
                  Boost your profile
                </Text>
              </View>
            </View>
          </Card>
        </>
      )}

      {/* Likes Grid */}
      <FlatList
        data={mockLikes}
        renderItem={renderLikeCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.likesGrid}
        columnWrapperStyle={styles.gridRow}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom CTA for non-premium users */}
      {!isPremium && (
        <View style={[styles.bottomCTA, { backgroundColor: colors.background }]}>
          <Button
            title="Get Premium - See All Likes"
            onPress={handleUpgradeToPremium}
            variant="gradient"
            size="large"
            fullWidth
            icon={<Ionicons name="star" size={20} color="#FFFFFF" />}
          />
        </View>
      )}
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
  premiumBanner: {
    marginHorizontal: Spacing.xl,
    marginVertical: Spacing.md,
    padding: 0,
    overflow: 'hidden',
  },
  bannerGradient: {
    padding: Spacing.lg,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bannerText: {
    flex: 1,
    marginRight: Spacing.md,
  },
  bannerTitle: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: Spacing.xs,
  },
  bannerSubtitle: {
    fontSize: FontSizes.sm,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
  },
  upgradeButton: {
    minWidth: 80,
  },
  featuresCard: {
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  featuresTitle: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    marginBottom: Spacing.md,
  },
  featuresList: {
    gap: Spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  featureText: {
    fontSize: FontSizes.md,
    flex: 1,
  },
  likesGrid: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  gridRow: {
    justifyContent: 'space-between',
  },
  likeCard: {
    marginBottom: Spacing.md,
  },
  cardContainer: {
    height: 280,
    padding: 0,
  },
  imageContainer: {
    flex: 1,
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  blurredImage: {
    opacity: 0.7,
  },
  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  premiumBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: BorderRadius.full,
    padding: Spacing.sm,
  },
  verificationBadge: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  cardName: {
    fontSize: FontSizes.md,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: Spacing.xs,
  },
  cardDistance: {
    fontSize: FontSizes.sm,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  cardActions: {
    position: 'absolute',
    bottom: Spacing.md,
    right: Spacing.md,
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.medium,
  },
  passButton: {},
  likeButton: {},
  bottomCTA: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
});