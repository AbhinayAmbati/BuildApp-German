import { BorderRadius, FontSizes, Shadows, Spacing } from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

// Mock chat data
const mockChats = [
  {
    id: '1',
    user: {
      name: 'Emma',
      age: 25,
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop',
      verified: true,
    },
    lastMessage: {
      text: 'Hey! How was your weekend? 😊',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      isOwn: false,
    },
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: '2',
    user: {
      name: 'Jessica',
      age: 27,
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
      verified: false,
    },
    lastMessage: {
      text: 'That sounds amazing! I\'d love to try that restaurant',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      isOwn: true,
    },
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: '3',
    user: {
      name: 'Sophia',
      age: 24,
      photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop',
      verified: true,
    },
    lastMessage: {
      text: 'Thanks for the coffee recommendation! ☕',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      isOwn: false,
    },
    unreadCount: 1,
    isOnline: true,
  },
  {
    id: '4',
    user: {
      name: 'Madison',
      age: 26,
      photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop',
      verified: true,
    },
    lastMessage: {
      text: 'It\'s a match! 💕',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      isOwn: false,
    },
    unreadCount: 0,
    isOnline: false,
  },
];

// Mock new matches
const mockNewMatches = [
  {
    id: '5',
    name: 'Olivia',
    photo: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&h=100&fit=crop',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
  },
  {
    id: '6',
    name: 'Ava',
    photo: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=100&h=100&fit=crop',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
  },
  {
    id: '7',
    name: 'Isabella',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
  },
];

export default function ChatScreen() {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'matches' | 'messages'>('messages');

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMinutes}m`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d`;
    }
  };

  const renderNewMatch = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.newMatchItem}>
      <View style={styles.newMatchImageContainer}>
        <Image source={{ uri: item.photo }} style={styles.newMatchImage} />
        <LinearGradient
          colors={colors.gradients.primary}
          style={styles.newMatchBadge}
        >
          <Ionicons name="heart" size={12} color="#FFFFFF" />
        </LinearGradient>
      </View>
      <Text style={[styles.newMatchName, { color: colors.text }]} numberOfLines={1}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderChatItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.chatItem, { backgroundColor: colors.surface }]}
      onPress={() => router.push(`/chat/${item.id}`)}
    >
      <View style={styles.chatAvatar}>
        <Image source={{ uri: item.user.photo }} style={styles.avatarImage} />
        {item.isOnline && (
          <View style={[styles.onlineIndicator, { backgroundColor: colors.success }]} />
        )}
      </View>

      <View style={styles.chatContent}>
        <View style={styles.chatHeader}>
          <View style={styles.nameContainer}>
            <Text style={[styles.chatName, { color: colors.text }]}>
              {item.user.name}
            </Text>
            {item.user.verified && (
              <Ionicons name="checkmark-circle" size={16} color={colors.primary} />
            )}
          </View>
          <Text style={[styles.chatTime, { color: colors.textMuted }]}>
            {formatTime(item.lastMessage.timestamp)}
          </Text>
        </View>

        <View style={styles.messageRow}>
          <Text
            style={[
              styles.lastMessage,
              {
                color: item.unreadCount > 0 ? colors.text : colors.textSecondary,
                fontWeight: item.unreadCount > 0 ? '600' : 'normal',
              }
            ]}
            numberOfLines={1}
          >
            {item.lastMessage.isOwn ? 'You: ' : ''}{item.lastMessage.text}
          </Text>
          {item.unreadCount > 0 && (
            <View style={[styles.unreadBadge, { backgroundColor: colors.primary }]}>
              <Text style={styles.unreadCount}>{item.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const filteredChats = mockChats.filter(chat =>
    chat.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Messages</Text>
        <TouchableOpacity
          style={[styles.headerButton, { backgroundColor: colors.surface }]}
          onPress={() => {/* TODO: Open chat settings */}}
        >
          <Ionicons name="ellipsis-horizontal" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Ionicons name="search" size={20} color={colors.textMuted} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search messages..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'matches' && { backgroundColor: colors.primary + '20' }
          ]}
          onPress={() => setActiveTab('matches')}
        >
          <Text style={[
            styles.tabText,
            { color: activeTab === 'matches' ? colors.primary : colors.textSecondary }
          ]}>
            New Matches ({mockNewMatches.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'messages' && { backgroundColor: colors.primary + '20' }
          ]}
          onPress={() => setActiveTab('messages')}
        >
          <Text style={[
            styles.tabText,
            { color: activeTab === 'messages' ? colors.primary : colors.textSecondary }
          ]}>
            Messages ({filteredChats.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activeTab === 'matches' ? (
        <View style={styles.matchesContainer}>
          <FlatList
            data={mockNewMatches}
            renderItem={renderNewMatch}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.newMatchesList}
          />
          <View style={styles.matchesEmptyState}>
            <Text style={[styles.emptyStateTitle, { color: colors.text }]}>
              Start a conversation!
            </Text>
            <Text style={[styles.emptyStateText, { color: colors.textSecondary }]}>
              Say hello to your new matches and break the ice
            </Text>
          </View>
        </View>
      ) : (
        <FlatList
          data={filteredChats}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id}
          style={styles.chatsList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.chatsContent}
        />
      )}

      {/* Empty State for Search */}
      {searchQuery.length > 0 && filteredChats.length === 0 && (
        <View style={styles.emptySearchState}>
          <Ionicons name="search" size={48} color={colors.textMuted} />
          <Text style={[styles.emptyStateTitle, { color: colors.text }]}>
            No messages found
          </Text>
          <Text style={[styles.emptyStateText, { color: colors.textSecondary }]}>
            Try searching with a different name
          </Text>
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
    paddingVertical: Spacing.xs,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.md,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
  },
  tabText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
  },
  matchesContainer: {
    flex: 1,
  },
  newMatchesList: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  newMatchItem: {
    alignItems: 'center',
    width: 80,
  },
  newMatchImageContainer: {
    position: 'relative',
    marginBottom: Spacing.sm,
  },
  newMatchImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  newMatchBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newMatchName: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    textAlign: 'center',
  },
  matchesEmptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  chatsList: {
    flex: 1,
  },
  chatsContent: {
    paddingHorizontal: Spacing.xl,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
    borderRadius: BorderRadius.md,
    ...Shadows.light,
  },
  chatAvatar: {
    position: 'relative',
    marginRight: Spacing.md,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  chatName: {
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
  chatTime: {
    fontSize: FontSizes.sm,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastMessage: {
    fontSize: FontSizes.sm,
    flex: 1,
    marginRight: Spacing.sm,
  },
  unreadBadge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xs,
  },
  unreadCount: {
    fontSize: FontSizes.xs,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  emptySearchState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  emptyStateTitle: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: FontSizes.md,
    textAlign: 'center',
    lineHeight: 22,
  },
});