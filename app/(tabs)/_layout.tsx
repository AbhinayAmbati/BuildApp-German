import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        tabBarInactiveTintColor: colors.tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
            backgroundColor: colors.tabBarBackground,
          },
          default: {
            backgroundColor: colors.tabBarBackground,
            borderTopColor: colors.border,
            borderTopWidth: 1,
          },
        }),
      }}>
      <Tabs.Screen
        name="discover_new"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={26}
              name={focused ? 'flame' : 'flame-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="people"
        options={{
          title: 'People',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={26}
              name={focused ? 'people' : 'people-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="likedyou"
        options={{
          title: 'Likes',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={26}
              name={focused ? 'heart' : 'heart-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={26}
              name={focused ? 'chatbubbles' : 'chatbubbles-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              size={26}
              name={focused ? 'person' : 'person-outline'}
              color={color}
            />
          ),
        }}
      />
      
    </Tabs>
  );
}
