import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { BorderRadius, FontSizes, Spacing } from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const premiumFeatures = [
  {
    icon: 'eye',
    title: 'See Who Likes You',
    description: 'No more guessing - see everyone who\'s already interested',
    highlight: true,
  },
  {
    icon: 'infinite',
    title: 'Unlimited Swipes',
    description: 'Swipe as much as you want without daily limits',
    highlight: true,
  },
  {
    icon: 'refresh',
    title: 'Rewind Last Swipe',
    description: 'Made a mistake? Go back and change your mind',
    highlight: false,
  },
  {
    icon: 'rocket',
    title: 'Monthly Boost',
    description: 'Be the top profile in your area for 30 minutes',
    highlight: false,
  },
  {
    icon: 'star',
    title: '5 Super Likes per Day',
    description: 'Stand out with Super Likes to get 3x more matches',
    highlight: false,
  },
  {
    icon: 'shield-checkmark',
    title: 'Priority Support',
    description: 'Get help faster with premium customer support',
    highlight: false,
  },
];

const subscriptionPlans = [
  {
    id: 'monthly',
    duration: '1 Month',
    price: '$19.99',
    pricePerMonth: '$19.99/month',
    savings: null,
    popular: false,
  },
  {
    id: 'quarterly',
    duration: '3 Months',
    price: '$39.99',
    pricePerMonth: '$13.33/month',
    savings: 'Save 33%',
    popular: true,
  },
  {
    id: 'yearly',
    duration: '12 Months',
    price: '$99.99',
    pricePerMonth: '$8.33/month',
    savings: 'Save 58%',
    popular: false,
  },
];

export default function PremiumScreen() {
  const { colors } = useTheme();
  const [selectedPlan, setSelectedPlan] = useState('quarterly');

  const handleSubscribe = () => {
    const plan = subscriptionPlans.find(p => p.id === selectedPlan);
    Alert.alert(
      'Subscribe to Premium',
      `You selected ${plan?.duration} for ${plan?.price}. This would normally open the payment flow.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Continue', onPress: () => console.log('Payment flow') }
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Premium</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <Card style={[styles.heroCard, { backgroundColor: colors.primary }]}>
          <LinearGradient
            colors={colors.gradients.primary}
            style={styles.heroGradient}
          >
            <Text style={styles.heroTitle}>Upgrade to Premium</Text>
            <Text style={styles.heroSubtitle}>
              Get unlimited access and find your perfect match faster
            </Text>
            <View style={styles.heroIcon}>
              <Text style={styles.heroEmoji}>⭐</Text>
            </View>
          </LinearGradient>
        </Card>

        {/* Features List */}
        <View style={styles.featuresSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Premium Features
          </Text>
          {premiumFeatures.map((feature, index) => (
            <Card key={index} style={[
              styles.featureCard,
              feature.highlight && { borderColor: colors.primary, borderWidth: 2 }
            ]}>
              <View style={styles.featureContent}>
                <View style={[
                  styles.featureIcon,
                  { backgroundColor: feature.highlight ? colors.primary + '20' : colors.surface }
                ]}>
                  <Ionicons 
                    name={feature.icon as any} 
                    size={24} 
                    color={feature.highlight ? colors.primary : colors.textSecondary} 
                  />
                </View>
                <View style={styles.featureText}>
                  <Text style={[styles.featureTitle, { color: colors.text }]}>
                    {feature.title}
                  </Text>
                  <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>
                    {feature.description}
                  </Text>
                </View>
                {feature.highlight && (
                  <View style={[styles.highlightBadge, { backgroundColor: colors.primary }]}>
                    <Text style={styles.highlightText}>Popular</Text>
                  </View>
                )}
              </View>
            </Card>
          ))}
        </View>

        {/* Subscription Plans */}
        <View style={styles.plansSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Choose Your Plan
          </Text>
          {subscriptionPlans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[
                styles.planCard,
                {
                  borderColor: selectedPlan === plan.id ? colors.primary : colors.border,
                  backgroundColor: selectedPlan === plan.id ? colors.primary + '10' : colors.surface,
                }
              ]}
              onPress={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <View style={[styles.popularBadge, { backgroundColor: colors.primary }]}>
                  <Text style={styles.popularText}>Most Popular</Text>
                </View>
              )}
              
              <View style={styles.planContent}>
                <View style={styles.planHeader}>
                  <Text style={[styles.planDuration, { color: colors.text }]}>
                    {plan.duration}
                  </Text>
                  {plan.savings && (
                    <View style={[styles.savingsBadge, { backgroundColor: colors.success }]}>
                      <Text style={styles.savingsText}>{plan.savings}</Text>
                    </View>
                  )}
                </View>
                
                <Text style={[styles.planPrice, { color: colors.text }]}>
                  {plan.price}
                </Text>
                <Text style={[styles.planPricePerMonth, { color: colors.textSecondary }]}>
                  {plan.pricePerMonth}
                </Text>
              </View>

              {selectedPlan === plan.id && (
                <View style={styles.selectedIndicator}>
                  <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Terms */}
        <View style={styles.termsSection}>
          <Text style={[styles.termsText, { color: colors.textMuted }]}>
            Subscription automatically renews unless auto-renew is turned off at least 24 hours before the end of the current period.
          </Text>
          <View style={styles.termsLinks}>
            <TouchableOpacity>
              <Text style={[styles.linkText, { color: colors.primary }]}>Terms of Service</Text>
            </TouchableOpacity>
            <Text style={[styles.separator, { color: colors.textMuted }]}>•</Text>
            <TouchableOpacity>
              <Text style={[styles.linkText, { color: colors.primary }]}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Subscribe Button */}
      <View style={[styles.footer, { backgroundColor: colors.background }]}>
        <Button
          title={`Subscribe for ${subscriptionPlans.find(p => p.id === selectedPlan)?.price}`}
          onPress={handleSubscribe}
          variant="gradient"
          size="large"
          fullWidth
          icon={<Ionicons name="star" size={20} color="#FFFFFF" />}
        />
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
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
  },
  heroCard: {
    marginVertical: Spacing.lg,
    padding: 0,
    overflow: 'hidden',
  },
  heroGradient: {
    padding: Spacing.xxl,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: FontSizes.xxxl,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: FontSizes.md,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing.lg,
  },
  heroIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroEmoji: {
    fontSize: 32,
  },
  featuresSection: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    marginBottom: Spacing.lg,
  },
  featureCard: {
    marginBottom: Spacing.md,
  },
  featureContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  featureDescription: {
    fontSize: FontSizes.sm,
    lineHeight: 20,
  },
  highlightBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  highlightText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  plansSection: {
    marginBottom: Spacing.xl,
  },
  planCard: {
    borderWidth: 2,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
    position: 'relative',
    overflow: 'hidden',
  },
  popularBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderBottomLeftRadius: BorderRadius.md,
  },
  popularText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  planContent: {
    padding: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  planDuration: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
  },
  savingsBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  savingsText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  planPrice: {
    fontSize: FontSizes.xxl,
    fontWeight: 'bold',
    marginBottom: Spacing.xs,
  },
  planPricePerMonth: {
    fontSize: FontSizes.sm,
  },
  selectedIndicator: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
  },
  termsSection: {
    marginBottom: Spacing.xl,
  },
  termsText: {
    fontSize: FontSizes.sm,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  termsLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  linkText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  separator: {
    fontSize: FontSizes.sm,
  },
  footer: {
    padding: Spacing.xl,
    paddingTop: Spacing.lg,
  },
});
