import { BorderRadius, FontSizes, Shadows, Spacing } from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

// Mock chat messages
const mockMessages = [
  {
    id: '1',
    text: 'Hey! How are you doing? 😊',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    isOwn: false,
  },
  {
    id: '2',
    text: 'Hi Emma! I\'m doing great, thanks for asking! How was your weekend?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5),
    isOwn: true,
  },
  {
    id: '3',
    text: 'It was amazing! I went hiking in Marin County. The views were incredible 🏔️',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    isOwn: false,
  },
  {
    id: '4',
    text: 'That sounds wonderful! I love hiking too. Which trail did you take?',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    isOwn: true,
  },
  {
    id: '5',
    text: 'The Dipsea Trail! Have you been there before? We should go together sometime! 🥾',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    isOwn: false,
  },
];

// Mock user info
const mockUser = {
  id: '1',
  name: 'Emma',
  age: 25,
  photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop',
  isOnline: true,
  verified: true,
};

export default function ChatScreen() {
  const { colors } = useTheme();
  const { id } = useLocalSearchParams();
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const message = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      timestamp: new Date(),
      isOwn: true,
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate typing indicator and response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        'That sounds great! 😊',
        'I\'d love to hear more about that!',
        'Absolutely! When are you free?',
        'That\'s so interesting! Tell me more 🤔',
        'I completely agree! 💯',
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const responseMessage = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        timestamp: new Date(),
        isOwn: false,
      };
      
      setMessages(prev => [...prev, responseMessage]);
    }, 2000);
  };

  const renderMessage = ({ item }: { item: any }) => (
    <View style={[
      styles.messageContainer,
      item.isOwn ? styles.ownMessage : styles.otherMessage
    ]}>
      <View style={[
        styles.messageBubble,
        {
          backgroundColor: item.isOwn ? colors.messageOwn : colors.messageOther,
          alignSelf: item.isOwn ? 'flex-end' : 'flex-start',
        }
      ]}>
        <Text style={[
          styles.messageText,
          { color: item.isOwn ? colors.messageOwnText : colors.messageOtherText }
        ]}>
          {item.text}
        </Text>
        <Text style={[
          styles.messageTime,
          { 
            color: item.isOwn 
              ? 'rgba(255, 255, 255, 0.7)' 
              : colors.textMuted 
          }
        ]}>
          {formatTime(item.timestamp)}
        </Text>
      </View>
    </View>
  );

  const renderTypingIndicator = () => (
    <View style={[styles.messageContainer, styles.otherMessage]}>
      <View style={[styles.messageBubble, { backgroundColor: colors.messageOther }]}>
        <View style={styles.typingIndicator}>
          <View style={[styles.typingDot, { backgroundColor: colors.textMuted }]} />
          <View style={[styles.typingDot, { backgroundColor: colors.textMuted }]} />
          <View style={[styles.typingDot, { backgroundColor: colors.textMuted }]} />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        
        <View style={styles.userInfo}>
          <Image source={{ uri: mockUser.photo }} style={styles.avatar} />
          <View style={styles.userDetails}>
            <View style={styles.nameRow}>
              <Text style={[styles.userName, { color: colors.text }]}>
                {mockUser.name}
              </Text>
              {mockUser.verified && (
                <Ionicons name="checkmark-circle" size={16} color={colors.primary} />
              )}
            </View>
            <Text style={[styles.userStatus, { color: colors.textSecondary }]}>
              {mockUser.isOnline ? 'Online now' : 'Active recently'}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.headerButton, { backgroundColor: colors.surface }]}
          onPress={() => {/* TODO: Open user profile */}}
        >
          <Ionicons name="ellipsis-horizontal" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView 
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={isTyping ? renderTypingIndicator : null}
        />

        {/* Input Section */}
        <View style={[styles.inputContainer, { backgroundColor: colors.background, borderTopColor: colors.border }]}>
          <View style={[styles.inputWrapper, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <TextInput
              style={[styles.textInput, { color: colors.text }]}
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder="Type a message..."
              placeholderTextColor={colors.textMuted}
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                { 
                  backgroundColor: newMessage.trim() ? colors.primary : colors.textMuted,
                  opacity: newMessage.trim() ? 1 : 0.5,
                }
              ]}
              onPress={handleSendMessage}
              disabled={!newMessage.trim()}
            >
              <Ionicons name="send" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
  },
  backButton: {
    marginRight: Spacing.md,
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: Spacing.md,
  },
  userDetails: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  userName: {
    fontSize: FontSizes.md,
    fontWeight: '600',
  },
  userStatus: {
    fontSize: FontSizes.sm,
    marginTop: 2,
  },
  headerButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.light,
  },
  chatContainer: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  messageContainer: {
    marginVertical: Spacing.xs,
  },
  ownMessage: {
    alignItems: 'flex-end',
  },
  otherMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    ...Shadows.light,
  },
  messageText: {
    fontSize: FontSizes.md,
    lineHeight: 20,
    marginBottom: Spacing.xs,
  },
  messageTime: {
    fontSize: FontSizes.xs,
    textAlign: 'right',
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  inputContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderWidth: 1,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  textInput: {
    flex: 1,
    fontSize: FontSizes.md,
    maxHeight: 100,
    paddingVertical: Spacing.sm,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.light,
  },
});
