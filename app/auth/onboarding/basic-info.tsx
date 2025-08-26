import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Spacing, FontSizes, BorderRadius } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function BasicInfoScreen() {
  const { colors } = useTheme();
  const [firstName, setFirstName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState('');
  const [showGender, setShowGender] = useState(true);

  const genderOptions = [
    { value: 'woman', label: 'Woman', icon: '♀️' },
    { value: 'man', label: 'Man', icon: '♂️' },
    { value: 'non-binary', label: 'Non-binary', icon: '⚧️' },
    { value: 'other', label: 'Other', icon: '🌈' },
  ];

  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };

  const handleContinue = () => {
    if (!firstName.trim()) {
      alert('Please enter your first name');
      return;
    }
    
    const age = calculateAge(dateOfBirth);
    if (age < 18) {
      alert('You must be at least 18 years old to use this app');
      return;
    }
    
    if (!gender) {
      alert('Please select your gender');
      return;
    }

    // TODO: Save user data
    router.push('/auth/onboarding/intent');
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDateOfBirth(selectedDate);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.title, { color: colors.text }]}>
            Basic Information
          </Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { backgroundColor: colors.borderLight }]}>
            <View style={[styles.progressFill, { backgroundColor: colors.primary, width: '20%' }]} />
          </View>
          <Text style={[styles.progressText, { color: colors.textSecondary }]}>
            Step 1 of 5
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* First Name */}
          <Card style={styles.inputCard}>
            <Text style={[styles.label, { color: colors.text }]}>First Name</Text>
            <TextInput
              style={[styles.input, { color: colors.text, borderColor: colors.border }]}
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Enter your first name"
              placeholderTextColor={colors.textMuted}
              maxLength={50}
            />
          </Card>

          {/* Date of Birth */}
          <Card style={styles.inputCard}>
            <Text style={[styles.label, { color: colors.text }]}>Date of Birth</Text>
            <TouchableOpacity
              style={[styles.dateButton, { borderColor: colors.border }]}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={[styles.dateText, { color: colors.text }]}>
                {dateOfBirth.toLocaleDateString()} (Age: {calculateAge(dateOfBirth)})
              </Text>
              <Ionicons name="calendar-outline" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={dateOfBirth}
                mode="date"
                display="default"
                onChange={onDateChange}
                maximumDate={new Date()}
                minimumDate={new Date(1950, 0, 1)}
              />
            )}
          </Card>

          {/* Gender */}
          <Card style={styles.inputCard}>
            <View style={styles.genderHeader}>
              <Text style={[styles.label, { color: colors.text }]}>Gender</Text>
              <TouchableOpacity
                style={styles.genderToggle}
                onPress={() => setShowGender(!showGender)}
              >
                <Text style={[styles.toggleText, { color: colors.textSecondary }]}>
                  {showGender ? 'Hide on profile' : 'Show on profile'}
                </Text>
                <Ionicons 
                  name={showGender ? 'eye-outline' : 'eye-off-outline'} 
                  size={16} 
                  color={colors.textSecondary} 
                />
              </TouchableOpacity>
            </View>
            <View style={styles.genderOptions}>
              {genderOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.genderOption,
                    { 
                      borderColor: gender === option.value ? colors.primary : colors.border,
                      backgroundColor: gender === option.value ? colors.primary + '10' : 'transparent'
                    }
                  ]}
                  onPress={() => setGender(option.value)}
                >
                  <Text style={styles.genderIcon}>{option.icon}</Text>
                  <Text style={[
                    styles.genderLabel,
                    { 
                      color: gender === option.value ? colors.primary : colors.text 
                    }
                  ]}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={[styles.footer, { backgroundColor: colors.background }]}>
        <Button
          title="Continue"
          onPress={handleContinue}
          variant="gradient"
          size="large"
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
  },
  progressContainer: {
    marginBottom: Spacing.xxl,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    marginBottom: Spacing.sm,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressText: {
    fontSize: FontSizes.sm,
    textAlign: 'center',
  },
  form: {
    gap: Spacing.lg,
  },
  inputCard: {
    padding: Spacing.lg,
  },
  label: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderRadius: BorderRadius.sm,
    padding: Spacing.md,
    fontSize: FontSizes.md,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: BorderRadius.sm,
    padding: Spacing.md,
  },
  dateText: {
    fontSize: FontSizes.md,
  },
  genderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  genderToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  toggleText: {
    fontSize: FontSizes.sm,
  },
  genderOptions: {
    gap: Spacing.sm,
  },
  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderWidth: 1,
    borderRadius: BorderRadius.sm,
    gap: Spacing.md,
  },
  genderIcon: {
    fontSize: 20,
  },
  genderLabel: {
    fontSize: FontSizes.md,
    fontWeight: '500',
  },
  footer: {
    padding: Spacing.xl,
    paddingTop: Spacing.lg,
  },
});
