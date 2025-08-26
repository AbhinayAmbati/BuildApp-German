import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { BorderRadius, FontSizes, Spacing } from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function SettingsScreen() {
  const { colors, isDark, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [showOnline, setShowOnline] = useState(true);
  const [showDistance, setShowDistance] = useState(true);

  const settingSections = [
    {
      title: 'Account',
      items: [
        {
          icon: 'person-outline',
          title: 'Edit Profile',
          subtitle: 'Update your photos and info',
          onPress: () => console.log('Edit profile'),
          showArrow: true,
        },
        {
          icon: 'star-outline',
          title: 'Get Premium',
          subtitle: 'Unlock all features',
          onPress: () => router.push('/premium'),
          showArrow: true,
          highlight: true,
        },
        {
          icon: 'card-outline',
          title: 'Payment & Billing',
          subtitle: 'Manage subscriptions',
          onPress: () => console.log('Payment'),
          showArrow: true,
        },
      ],
    },
    {
      title: 'Privacy & Safety',
      items: [
        {
          icon: 'eye-outline',
          title: 'Show me on app',
          subtitle: 'Control your visibility',
          toggle: true,
          value: showOnline,
          onToggle: setShowOnline,
        },
        {
          icon: 'location-outline',
          title: 'Show distance',
          subtitle: 'Display distance to matches',
          toggle: true,
          value: showDistance,
          onToggle: setShowDistance,
        },
        {
          icon: 'shield-outline',
          title: 'Safety Center',
          subtitle: 'Report, block, and safety tips',
          onPress: () => console.log('Safety center'),
          showArrow: true,
        },
        {
          icon: 'lock-closed-outline',
          title: 'Privacy Settings',
          subtitle: 'Control your data and privacy',
          onPress: () => console.log('Privacy settings'),
          showArrow: true,
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          icon: 'notifications-outline',
          title: 'Push Notifications',
          subtitle: 'New matches and messages',
          toggle: true,
          value: notifications,
          onToggle: setNotifications,
        },
        {
          icon: 'location-outline',
          title: 'Location Services',
          subtitle: 'Find people near you',
          toggle: true,
          value: locationServices,
          onToggle: setLocationServices,
        },
      ],
    },
    {
      title: 'App Preferences',
      items: [
        {
          icon: isDark ? 'sunny-outline' : 'moon-outline',
          title: 'Dark Mode',
          subtitle: 'Switch between light and dark theme',
          toggle: true,
          value: isDark,
          onToggle: toggleTheme,
        },
        {
          icon: 'language-outline',
          title: 'Language',
          subtitle: 'English',
          onPress: () => console.log('Language'),
          showArrow: true,
        },
        {
          icon: 'help-circle-outline',
          title: 'Help & Support',
          subtitle: 'Get help and contact us',
          onPress: () => console.log('Help'),
          showArrow: true,
        },
      ],
    },
    {
      title: 'Legal',
      items: [
        {
          icon: 'document-text-outline',
          title: 'Terms of Service',
          onPress: () => console.log('Terms'),
          showArrow: true,
        },
        {
          icon: 'shield-checkmark-outline',
          title: 'Privacy Policy',
          onPress: () => console.log('Privacy policy'),
          showArrow: true,
        },
        {
          icon: 'information-circle-outline',
          title: 'About',
          subtitle: 'Version 1.0.0',
          onPress: () => console.log('About'),
          showArrow: true,
        },
      ],
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Log Out', 
          style: 'destructive',
          onPress: () => {
            // TODO: Clear user data and navigate to auth
            console.log('Logging out...');
          }
        }
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This action cannot be undone. All your data will be permanently deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Account Deleted', 'Your account has been deleted.');
          }
        }
      ]
    );
  };

  const renderSettingItem = (item: any) => (
    <TouchableOpacity
      key={item.title}
      style={[
        styles.settingItem,
        { backgroundColor: colors.surface },
        item.highlight && { borderColor: colors.primary, borderWidth: 1 }
      ]}
      onPress={item.onPress}
      disabled={item.toggle}
    >
      <View style={styles.settingLeft}>
        <View style={[
          styles.settingIcon,
          { backgroundColor: item.highlight ? colors.primary + '20' : colors.background }
        ]}>
          <Ionicons 
            name={item.icon} 
            size={20} 
            color={item.highlight ? colors.primary : colors.textSecondary} 
          />
        </View>
        <View style={styles.settingText}>
          <Text style={[styles.settingTitle, { color: colors.text }]}>
            {item.title}
          </Text>
          {item.subtitle && (
            <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>
              {item.subtitle}
            </Text>
          )}
        </View>
      </View>
      
      <View style={styles.settingRight}>
        {item.toggle ? (
          <Switch
            value={item.value}
            onValueChange={item.onToggle}
            trackColor={{ false: colors.border, true: colors.primary + '40' }}
            thumbColor={item.value ? colors.primary : colors.textMuted}
          />
        ) : item.showArrow ? (
          <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
        ) : null}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {settingSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {section.title}
            </Text>
            <Card style={styles.sectionCard}>
              {section.items.map((item, itemIndex) => (
                <View key={itemIndex}>
                  {renderSettingItem(item)}
                  {itemIndex < section.items.length - 1 && (
                    <View style={[styles.separator, { backgroundColor: colors.border }]} />
                  )}
                </View>
              ))}
            </Card>
          </View>
        ))}

        {/* Danger Zone */}
        <View style={styles.dangerZone}>
          <Text style={[styles.sectionTitle, { color: colors.error }]}>
            Danger Zone
          </Text>
          <Card style={styles.sectionCard}>
            <TouchableOpacity
              style={[styles.settingItem, { backgroundColor: colors.surface }]}
              onPress={handleLogout}
            >
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: colors.error + '20' }]}>
                  <Ionicons name="log-out-outline" size={20} color={colors.error} />
                </View>
                <Text style={[styles.settingTitle, { color: colors.error }]}>
                  Log Out
                </Text>
              </View>
            </TouchableOpacity>
            
            <View style={[styles.separator, { backgroundColor: colors.border }]} />
            
            <TouchableOpacity
              style={[styles.settingItem, { backgroundColor: colors.surface }]}
              onPress={handleDeleteAccount}
            >
              <View style={styles.settingLeft}>
                <View style={[styles.settingIcon, { backgroundColor: colors.error + '20' }]}>
                  <Ionicons name="trash-outline" size={20} color={colors.error} />
                </View>
                <Text style={[styles.settingTitle, { color: colors.error }]}>
                  Delete Account
                </Text>
              </View>
            </TouchableOpacity>
          </Card>
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 50 }} />
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
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
  },
  section: {
    marginTop: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    marginBottom: Spacing.md,
    marginLeft: Spacing.sm,
  },
  sectionCard: {
    padding: 0,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: FontSizes.sm,
    lineHeight: 18,
  },
  settingRight: {
    marginLeft: Spacing.md,
  },
  separator: {
    height: 1,
    marginLeft: 68, // Align with text
  },
  dangerZone: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.lg,
  },
});
