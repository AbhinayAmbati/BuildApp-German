/**
 * Dating App Color Scheme - Comprehensive color system for light and dark modes
 * Inspired by modern dating apps with warm, inviting colors and smooth gradients
 */

// Primary brand colors
const primaryLight = '#FF6B6B'; // Warm coral/pink
const primaryDark = '#FF5252';  // Slightly brighter for dark mode
const secondaryLight = '#4ECDC4'; // Teal accent
const secondaryDark = '#26A69A';  // Darker teal for dark mode

// Gradient colors
const gradientColors = {
  primary: ['#FF6B6B', '#FF8E53'], // Coral to orange
  secondary: ['#4ECDC4', '#44A08D'], // Teal to green
  sunset: ['#FF9A9E', '#FECFEF'], // Pink sunset
  ocean: ['#667eea', '#764ba2'], // Blue to purple
  warm: ['#FFA726', '#FF7043'], // Orange gradient
};

export const Colors = {
  light: {
    // Basic colors
    text: '#2C3E50',
    textSecondary: '#7F8C8D',
    textMuted: '#BDC3C7',
    background: '#FFFFFF',
    backgroundSecondary: '#F8F9FA',
    backgroundTertiary: '#F1F3F4',

    // Brand colors
    primary: primaryLight,
    primaryLight: '#FF8A8A',
    primaryDark: '#E55A5A',
    secondary: secondaryLight,
    secondaryLight: '#6EEEE6',
    secondaryDark: '#3CBCB4',

    // UI colors
    surface: '#FFFFFF',
    surfaceSecondary: '#F8F9FA',
    border: '#E1E8ED',
    borderLight: '#F0F3F7',
    shadow: 'rgba(0, 0, 0, 0.1)',

    // Status colors
    success: '#27AE60',
    warning: '#F39C12',
    error: '#E74C3C',
    info: '#3498DB',

    // Tab bar
    tint: primaryLight,
    icon: '#95A5A6',
    tabIconDefault: '#95A5A6',
    tabIconSelected: primaryLight,
    tabBarBackground: '#FFFFFF',

    // Card colors
    cardBackground: '#FFFFFF',
    cardShadow: 'rgba(0, 0, 0, 0.08)',

    // Chat colors
    messageOwn: primaryLight,
    messageOther: '#F1F3F4',
    messageOwnText: '#FFFFFF',
    messageOtherText: '#2C3E50',

    // Like/Dislike colors
    like: '#27AE60',
    dislike: '#E74C3C',
    superLike: '#3498DB',

    // Gradients
    gradients: gradientColors,
  },
  dark: {
    // Basic colors
    text: '#FFFFFF',
    textSecondary: '#B0BEC5',
    textMuted: '#78909C',
    background: '#121212',
    backgroundSecondary: '#1E1E1E',
    backgroundTertiary: '#2C2C2C',

    // Brand colors
    primary: primaryDark,
    primaryLight: '#FF7A7A',
    primaryDark: '#E04848',
    secondary: secondaryDark,
    secondaryLight: '#4DD0C7',
    secondaryDark: '#1E8E85',

    // UI colors
    surface: '#1E1E1E',
    surfaceSecondary: '#2C2C2C',
    border: '#37474F',
    borderLight: '#455A64',
    shadow: 'rgba(0, 0, 0, 0.3)',

    // Status colors
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',

    // Tab bar
    tint: primaryDark,
    icon: '#78909C',
    tabIconDefault: '#78909C',
    tabIconSelected: primaryDark,
    tabBarBackground: '#1E1E1E',

    // Card colors
    cardBackground: '#1E1E1E',
    cardShadow: 'rgba(0, 0, 0, 0.4)',

    // Chat colors
    messageOwn: primaryDark,
    messageOther: '#2C2C2C',
    messageOwnText: '#FFFFFF',
    messageOtherText: '#FFFFFF',

    // Like/Dislike colors
    like: '#4CAF50',
    dislike: '#F44336',
    superLike: '#2196F3',

    // Gradients (same as light mode, they work well in both)
    gradients: gradientColors,
  },
};

// Common styles and dimensions
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const FontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const Shadows = {
  light: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  heavy: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
};
