import { BorderRadius, FontSizes, Shadows, Spacing } from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // Two cards per row with spacing

// Current user interests for matching
const currentUserInterests = ['Photography', 'Hiking', 'Coffee', 'Travel', 'Art', 'Music'];

// Enhanced user data with compatibility scoring
const mockUsers = [
  {
    id: '1',
    name: 'Emma',
    age: 25,
    photos: [
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop',
    ],
    bio: 'Adventure seeker and coffee enthusiast ☕️ Love exploring new places and capturing moments.',
    location: 'San Francisco, CA',
    distance: '2 miles away',
    profession: 'Product Designer',
    interests: ['Photography', 'Hiking', 'Coffee', 'Travel', 'Art'],
    lifestyle: {
      drinking: 'Socially',
      workout: 'Often',
      pets: 'Dog lover',
    },
    verified: true,
    isOnline: true,
    compatibilityScore: 95,
    mutualInterests: ['Photography', 'Hiking', 'Coffee', 'Travel', 'Art'],
  },
  {
    id: '2',
    name: 'Jessica',
    age: 27,
    photos: [
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop',
    ],
    bio: 'Yoga instructor and foodie 🧘‍♀️ Passionate about wellness and helping others.',
    location: 'Oakland, CA',
    distance: '5 miles away',
    profession: 'Yoga Instructor',
    interests: ['Yoga', 'Cooking', 'Dogs', 'Nature', 'Wellness', 'Photography'],
    lifestyle: {
      drinking: 'Rarely',
      workout: 'Daily',
      pets: 'Has a dog',
    },
    verified: false,
    isOnline: false,
    compatibilityScore: 78,
    mutualInterests: ['Photography'],
  },
  {
    id: '3',
    name: 'Sophia',
    age: 24,
    photos: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop',
    ],
    bio: 'Artist and music lover 🎨🎵 Creating beautiful things and spreading positive vibes.',
    location: 'Berkeley, CA',
    distance: '8 miles away',
    profession: 'Graphic Designer',
    interests: ['Art', 'Music', 'Dancing', 'Photography', 'Fashion'],
    lifestyle: {
      drinking: 'Socially',
      workout: 'Sometimes',
      pets: 'Cat person',
    },
    verified: true,
    isOnline: true,
    compatibilityScore: 88,
    mutualInterests: ['Art', 'Music', 'Photography'],
  },
  {
    id: '4',
    name: 'Maya',
    age: 26,
    photos: [
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop',
    ],
    bio: 'Travel blogger and adventure enthusiast ✈️ Always planning the next trip!',
    location: 'San Jose, CA',
    distance: '12 miles away',
    profession: 'Travel Blogger',
    interests: ['Travel', 'Photography', 'Writing', 'Hiking', 'Culture'],
    lifestyle: {
      drinking: 'Socially',
      workout: 'Often',
      pets: 'No pets',
    },
    verified: true,
    isOnline: false,
    compatibilityScore: 92,
    mutualInterests: ['Travel', 'Photography', 'Hiking'],
  },
];

export default function DiscoverScreen() {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Filter options
  const filterOptions = [
    { id: 'all', label: 'All', icon: 'people-outline' },
    { id: 'high-match', label: 'High Match', icon: 'heart-outline' },
    { id: 'online', label: 'Online', icon: 'radio-outline' },
    { id: 'verified', label: 'Verified', icon: 'checkmark-circle-outline' },
  ];

  // Filter users based on selected criteria
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.bio.toLowerCase().includes(searchQuery.toLowerCase());
    
    switch (selectedFilter) {
      case 'high-match':
        return matchesSearch && user.compatibilityScore >= 85;
      case 'online':
        return matchesSearch && user.isOnline;
      case 'verified':
        return matchesSearch && user.verified;
      default:
        return matchesSearch;
    }
  });

  const handleLike = (user: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert('Liked! 💕', `You liked ${user.name}!`);
  };

  const handleViewProfile = (user: any) => {
    // Navigate to detailed profile view
    console.log('View profile:', user.name);
  };

  const renderUserCard = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.userCard, { backgroundColor: colors.surface }]}
      onPress={() => handleViewProfile(item)}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.photos[0] }}
          style={styles.cardImage}
          resizeMode="cover"
        />
        
        {/* Compatibility Score */}
        <View style={[styles.compatibilityBadge, { backgroundColor: colors.primary }]}>
          <Text style={styles.compatibilityText}>{item.compatibilityScore}%</Text>
        </View>

        {/* Online Status */}
        {item.isOnline && (
          <View style={[styles.onlineIndicator, { backgroundColor: colors.success }]} />
        )}

        {/* Verification Badge */}
        {item.verified && (
          <View style={[styles.verificationBadge, { backgroundColor: colors.primary }]}>
            <Ionicons name="checkmark" size={12} color="#FFFFFF" />
          </View>
        )}
      </View>

      <View style={styles.cardContent}>
        <View style={styles.nameRow}>
          <Text style={[styles.userName, { color: colors.text }]} numberOfLines={1}>
            {item.name}, {item.age}
          </Text>
        </View>

        <Text style={[styles.userDistance, { color: colors.textSecondary }]} numberOfLines={1}>
          {item.distance} • {item.profession}
        </Text>

        <Text style={[styles.userBio, { color: colors.text }]} numberOfLines={2}>
          {item.bio}
        </Text>

        {/* Mutual Interests */}
        <View style={styles.mutualInterests}>
          {item.mutualInterests.slice(0, 2).map((interest: string, idx: number) => (
            <View key={idx} style={[styles.mutualTag, { backgroundColor: colors.primary + '20' }]}>
              <Ionicons name="heart" size={10} color={colors.primary} />
              <Text style={[styles.mutualText, { color: colors.primary }]}>
                {interest}
              </Text>
            </View>
          ))}
          {item.mutualInterests.length > 2 && (
            <Text style={[styles.moreInterests, { color: colors.textSecondary }]}>
              +{item.mutualInterests.length - 2} more
            </Text>
          )}
        </View>

        {/* Action Button */}
        <TouchableOpacity
          style={[styles.likeButton, { backgroundColor: colors.primary }]}
          onPress={() => handleLike(item)}
        >
          <Ionicons name="heart" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Discover</Text>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
          People with similar interests
        </Text>
      </View>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: colors.background }]}>
        <View style={[styles.searchBar, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Ionicons name="search" size={20} color={colors.textMuted} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search by name or interests..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Filter Options */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        {filterOptions.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterButton,
              {
                backgroundColor: selectedFilter === filter.id ? colors.primary : colors.surface,
                borderColor: selectedFilter === filter.id ? colors.primary : colors.border,
              }
            ]}
            onPress={() => setSelectedFilter(filter.id)}
          >
            <Ionicons
              name={filter.icon as any}
              size={16}
              color={selectedFilter === filter.id ? '#FFFFFF' : colors.text}
            />
            <Text
              style={[
                styles.filterText,
                {
                  color: selectedFilter === filter.id ? '#FFFFFF' : colors.text,
                }
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results Count */}
      <View style={styles.resultsHeader}>
        <Text style={[styles.resultsCount, { color: colors.textSecondary }]}>
          {filteredUsers.length} people found
        </Text>
      </View>

      {/* User Grid */}
      <FlatList
        data={filteredUsers}
        renderItem={renderUserCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.gridContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: Spacing.md }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  headerTitle: {
    fontSize: FontSizes.xxl,
    fontWeight: 'bold',
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    fontSize: FontSizes.md,
  },
  searchContainer: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    gap: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSizes.md,
  },
  filtersContainer: {
    paddingVertical: Spacing.sm,
  },
  filtersContent: {
    paddingHorizontal: Spacing.xl,
    gap: Spacing.sm,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    gap: Spacing.xs,
  },
  filterText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  resultsHeader: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm,
  },
  resultsCount: {
    fontSize: FontSizes.sm,
  },
  gridContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  row: {
    justifyContent: 'space-between',
  },
  userCard: {
    width: CARD_WIDTH,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.medium,
  },
  imageContainer: {
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: CARD_WIDTH * 1.2,
  },
  compatibilityBadge: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  compatibilityText: {
    fontSize: FontSizes.xs,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  onlineIndicator: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  verificationBadge: {
    position: 'absolute',
    bottom: Spacing.sm,
    right: Spacing.sm,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    padding: Spacing.md,
  },
  nameRow: {
    marginBottom: Spacing.xs,
  },
  userName: {
    fontSize: FontSizes.md,
    fontWeight: 'bold',
  },
  userDistance: {
    fontSize: FontSizes.sm,
    marginBottom: Spacing.sm,
  },
  userBio: {
    fontSize: FontSizes.sm,
    lineHeight: 18,
    marginBottom: Spacing.sm,
  },
  mutualInterests: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  mutualTag: {
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
  moreInterests: {
    fontSize: FontSizes.xs,
  },
  likeButton: {
    alignSelf: 'flex-end',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.light,
  },
});
