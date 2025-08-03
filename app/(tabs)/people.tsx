"use client"

import type React from "react"
import { useCallback, useState } from "react"
import { View, Text, StyleSheet, Dimensions, Image, Alert, StatusBar, Platform } from "react-native"
import { PanGestureHandler, GestureHandlerRootView } from "react-native-gesture-handler"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolate,
} from "react-native-reanimated"

import { Ionicons } from '@expo/vector-icons';


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25
const CARD_WIDTH = SCREEN_WIDTH * 0.92
const CARD_HEIGHT = SCREEN_HEIGHT * 0.82

// Status indicator component
const OnlineStatus = ({ lastActive }: { lastActive: string }) => {
  const isOnline = lastActive.includes("minutes") || lastActive.includes("hour")
  return (
    <View style={styles.statusContainer}>
      <View style={[styles.statusDot, { backgroundColor: isOnline ? "#4CAF50" : "#FFC107" }]} />
      <Text style={styles.statusText}>{isOnline ? "Online" : "Recently active"}</Text>
    </View>
  )
}

interface Profile {
  id: number
  name: string
  age: number
  image: string
  location: string
  bio: string
  interests: string[]
  matches: number
  messages: number
  profileViews: number
  lastActive: string
  profession: string
  education: string
  height: string
  distance: string
}

interface SwipeableCardProps {
  profile: Profile
  index: number
  totalCards: number
  onSwipeLeft: (id: number) => void
  onSwipeRight: (id: number) => void
  isTop: boolean
}

const SwipeableCard: React.FC<SwipeableCardProps> = ({
  profile,
  index,
  totalCards,
  onSwipeLeft,
  onSwipeRight,
  isTop,
}) => {
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const scale = useSharedValue(1)
  const opacity = useSharedValue(1)
  const rotation = useSharedValue(0)

  const gestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      if (!isTop) return
      scale.value = withSpring(1.02, { damping: 15, stiffness: 200 })
    },
    onActive: (event) => {
      if (!isTop) return
      translateX.value = event.translationX
      translateY.value = event.translationY * 0.05

      // Smooth rotation
      rotation.value = interpolate(event.translationX, [-SCREEN_WIDTH, 0, SCREEN_WIDTH], [-8, 0, 8], Extrapolate.CLAMP)
    },
    onEnd: (event) => {
      if (!isTop) return

      const { translationX, velocityX } = event
      const threshold = SWIPE_THRESHOLD

      if (Math.abs(translationX) > threshold || Math.abs(velocityX) > 600) {
        const direction = translationX > 0 ? "right" : "left"
        const targetX = direction === "right" ? SCREEN_WIDTH * 1.2 : -SCREEN_WIDTH * 1.2

        translateX.value = withTiming(targetX, { duration: 350 })
        translateY.value = withTiming(-80, { duration: 350 })
        opacity.value = withTiming(0, { duration: 350 })
        scale.value = withTiming(0.85, { duration: 350 })
        rotation.value = withTiming(direction === "right" ? 12 : -12, { duration: 350 })

        runOnJS(direction === "right" ? onSwipeRight : onSwipeLeft)(profile.id)
      } else {
        translateX.value = withSpring(0, { damping: 15, stiffness: 150 })
        translateY.value = withSpring(0, { damping: 15, stiffness: 150 })
        scale.value = withSpring(1, { damping: 15, stiffness: 200 })
        rotation.value = withSpring(0, { damping: 15, stiffness: 150 })
      }
    },
  })

  const animatedStyle = useAnimatedStyle(() => {
    const stackScale = isTop ? scale.value : 0.96 - index * 0.01
    const stackTranslateY = isTop ? translateY.value : index * 4
    const stackOpacity = isTop ? opacity.value : Math.max(0.4, 1 - index * 0.12)

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: stackTranslateY },
        { rotate: `${rotation.value}deg` },
        { scale: stackScale },
      ],
      opacity: stackOpacity,
      zIndex: totalCards - index,
    }
  })

  const likeIndicatorStyle = useAnimatedStyle(() => {
    const likeOpacity = interpolate(translateX.value, [0, SWIPE_THRESHOLD * 0.5], [0, 1], Extrapolate.CLAMP)

    const likeScale = interpolate(translateX.value, [0, SWIPE_THRESHOLD], [0.7, 1.1], Extrapolate.CLAMP)

    return {
      opacity: likeOpacity,
      transform: [{ scale: likeScale }],
    }
  })

  const nopeIndicatorStyle = useAnimatedStyle(() => {
    const nopeOpacity = interpolate(translateX.value, [-SWIPE_THRESHOLD * 0.5, 0], [1, 0], Extrapolate.CLAMP)

    const nopeScale = interpolate(translateX.value, [-SWIPE_THRESHOLD, 0], [1.1, 0.7], Extrapolate.CLAMP)

    return {
      opacity: nopeOpacity,
      transform: [{ scale: nopeScale }],
    }
  })

  return (
    <PanGestureHandler onGestureEvent={gestureHandler} onHandlerStateChange={gestureHandler} enabled={isTop}>
      <Animated.View style={[styles.card, animatedStyle]}>
        {/* Main Image */}
        <Image source={{ uri: profile.image }} style={styles.cardImage} resizeMode="cover" />

        {/* Gradient Overlay */}
        <View style={styles.gradientOverlay} />

        {/* Like Indicator */}
        <Animated.View style={[styles.likeContainer, likeIndicatorStyle]}>
          <View style={styles.likeIconWrapper}>
            <Ionicons size={28} name="checkmark" color="white" />
          </View>
          <Text style={styles.likeText}>LIKE</Text>
        </Animated.View>

        {/* Nope Indicator */}
        <Animated.View style={[styles.nopeContainer, nopeIndicatorStyle]}>
          <View style={styles.nopeIconWrapper}>
            <Ionicons size={28} name="close-circle" color="white" />
          </View>
          <Text style={styles.nopeText}>PASS</Text>
        </Animated.View>

        {/* Profile Info */}
        <View style={styles.profileInfo}>
          {/* Header with name and status */}
          <View style={styles.profileHeader}>
            <View style={styles.nameContainer}>
              <Text style={styles.profileName}>{profile.name}</Text>
              <Text style={styles.profileAge}>{profile.age}</Text>
            </View>
            <OnlineStatus lastActive={profile.lastActive} />
          </View>

          {/* Location and Distance */}
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>📍 {profile.location}</Text>
            <Text style={styles.distanceText}>{profile.distance} away</Text>
          </View>

          {/* Profession and Education */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Text style={styles.detailIcon}>💼</Text>
              <Text style={styles.detailText}>{profile.profession}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailIcon}>🎓</Text>
              <Text style={styles.detailText}>{profile.education}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailIcon}>📏</Text>
              <Text style={styles.detailText}>{profile.height}</Text>
            </View>
          </View>

          {/* Bio */}
          <Text style={styles.profileBio}>{profile.bio}</Text>

          {/* Interests */}
          <View style={styles.interestsContainer}>
            {profile.interests.slice(0, 6).map((interest, idx) => (
              <View key={idx} style={styles.interestTag}>
                <Text style={styles.interestText}>{interest}</Text>
              </View>
            ))}
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{profile.matches}</Text>
              <Text style={styles.statLabel}>Matches</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{profile.messages}</Text>
              <Text style={styles.statLabel}>Messages</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{Math.floor(profile.profileViews / 100)}k</Text>
              <Text style={styles.statLabel}>Views</Text>
            </View>
          </View>
        </View>
      </Animated.View>
    </PanGestureHandler>
  )
}

const People: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([
    {
      id: 1,
      name: "Sruthi Hasan",
      age: 25,
      image: "https://w0.peakpx.com/wallpaper/251/952/HD-wallpaper-shruti-hassan-shruti-haasan.jpg",
      location: "Chennai, Tamil Nadu",
      bio: "Software engineer who loves to code and explore new technologies. Always up for an adventure! 🚀",
      interests: ["Coding", "Travel", "Photography", "Music", "Coffee", "Hiking"],
      matches: 147,
      messages: 23,
      profileViews: 892,
      lastActive: "2 hours ago",
      profession: "Software Engineer",
      education: "IIT Madras",
      height: "5'6\"",
      distance: "2.5 km",
    },
    {
      id: 2,
      name: "Samantha",
      age: 28,
      image: "https://i.pinimg.com/736x/cc/ee/7c/ccee7c674f6f8383916c934eec3ec370.jpg",
      location: "Mumbai, Maharashtra",
      bio: "Creative designer with a passion for art and good coffee. Let's create something beautiful together! ☕️",
      interests: ["Design", "Art", "Coffee", "Yoga", "Reading", "Movies"],
      matches: 203,
      messages: 45,
      profileViews: 1247,
      lastActive: "30 minutes ago",
      profession: "UX Designer",
      education: "NIFT Mumbai",
      height: "5'4\"",
      distance: "1.2 km",
    },
    {
      id: 3,
      name: "Kajal Agrawal",
      age: 26,
      image: "https://i.pinimg.com/1200x/c9/70/07/c970077a77da769fc664c68072126970.jpg",
      location: "Delhi, Delhi",
      bio: "Marketing professional who believes in living life to the fullest. Foodie and travel enthusiast! 🌍",
      interests: ["Marketing", "Food", "Travel", "Dancing", "Fitness", "Wine"],
      matches: 178,
      messages: 67,
      profileViews: 1156,
      lastActive: "5 minutes ago",
      profession: "Marketing Manager",
      education: "Delhi University",
      height: "5'5\"",
      distance: "3.8 km",
    },
    {
      id: 4,
      name: "Regina Cassandra",
      age: 29,
      image: "https://static.toiimg.com/thumb/imgsize-23456,msid-121378489,width-600,resizemode-4/121378489.jpg",
      location: "Mumbai, Maharashtra",
      bio: "Film enthusiast and aspiring director. Looking for someone who shares my love for cinema! 🎬",
      interests: ["Films", "Writing", "Theater", "Books", "Music", "Art"],
      matches: 234,
      messages: 89,
      profileViews: 1678,
      lastActive: "15 minutes ago",
      profession: "Film Director",
      education: "FTII Pune",
      height: "5'7\"",
      distance: "4.2 km",
    },
    {
      id: 5,
      name: "Ashika Ranganathan",
      age: 24,
      image: "https://i.pinimg.com/736x/8f/53/e8/8f53e83ddf9dfac26cfa1cc7848ad94b.jpg",
      location: "Kolkata, West Bengal",
      bio: "Data scientist by day, dancer by night. Love solving problems and expressing itself through movement! 💃",
      interests: ["Data Science", "Dancing", "Fitness", "Cooking", "AI", "Tech"],
      matches: 156,
      messages: 34,
      profileViews: 743,
      lastActive: "1 hour ago",
      profession: "Data Scientist",
      education: "ISI Kolkata",
      height: "5'3\"",
      distance: "6.1 km",
    },
  ])

  const handleSwipeLeft = useCallback(
    (profileId: number) => {
      const profile = profiles.find((p) => p.id === profileId)
      if (profile) {
        console.log(`Passed on ${profile.name}`)
        setTimeout(() => {
          setProfiles((prev) => prev.filter((p) => p.id !== profileId))
          if (profiles.length <= 1) {
            Alert.alert(
              "No more profiles! 🎉",
              "You've seen all available profiles. Check back later for more matches!",
              [{ text: "Got it!" }],
            )
          }
        }, 400)
      }
    },
    [profiles],
  )

  const handleSwipeRight = useCallback(
    (profileId: number) => {
      const profile = profiles.find((p) => p.id === profileId)
      if (profile) {
        Alert.alert(
          "💕 It's a Match!",
          `You and ${profile.name} liked each other! Start a conversation and see where it goes!`,
          [
            { text: "💬 Send Message", style: "default" },
            { text: "👋 Keep Swiping", style: "cancel" },
          ],
        )
        setTimeout(() => {
          setProfiles((prev) => prev.filter((p) => p.id !== profileId))
          if (profiles.length <= 1) {
            Alert.alert(
              "No more profiles! 🎉",
              "You've seen all available profiles. Check back later for more matches!",
              [{ text: "Got it!" }],
            )
          }
        }, 400)
      }
    },
    [profiles],
  )

  const visibleProfiles = profiles.slice(0, 3)

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>People</Text>
      </View>

      {visibleProfiles.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🎉</Text>
          <Text style={styles.emptyText}>All caught up!</Text>
          <Text style={styles.emptySubText}>Check back later for new profiles</Text>
        </View>
      ) : (
        <View style={styles.cardStack}>
          {visibleProfiles.map((profile, index) => (
            <SwipeableCard
              key={profile.id}
              profile={profile}
              index={index}
              totalCards={visibleProfiles.length}
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
              isTop={index === 0}
            />
          ))}
        </View>
      )}

      {/* Instructions */}
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsText}>Swipe right to like • Swipe left to pass</Text>
      </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingBottom: 20,
  },
  headerTitle: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  profileCounter: {
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  counterText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  cardStack: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  card: {
    position: "absolute",
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 24,
    backgroundColor: "#1a1a1a",
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 16 },
        shadowOpacity: 0.4,
        shadowRadius: 24,
      },
      android: {
        elevation: 16,
      },
    }),
  },
  cardImage: {
    width: "100%",
    height: "60%",
  },
  gradientOverlay: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  likeContainer: {
    position: "absolute",
    top: "15%",
    right: 20,
    alignItems: "center",
    zIndex: 10,
  },
  nopeContainer: {
    position: "absolute",
    top: "15%",
    left: 20,
    alignItems: "center",
    zIndex: 10,
  },
  likeIconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(76, 175, 80, 0.9)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#4CAF50",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  nopeIconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(244, 67, 54, 0.9)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#F44336",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  likeText: {
    color: "#4CAF50",
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "rgba(76, 175, 80, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  nopeText: {
    color: "#F44336",
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "rgba(244, 67, 54, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F44336",
  },
  profileInfo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
  },
  profileHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  profileName: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginRight: 8,
  },
  profileAge: {
    color: "white",
    fontSize: 24,
    fontWeight: "300",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  locationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  locationText: {
    color: "#ddd",
    fontSize: 16,
  },
  distanceText: {
    color: "#999",
    fontSize: 14,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  detailIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  detailText: {
    color: "#ccc",
    fontSize: 13,
    flex: 1,
  },
  profileBio: {
    color: "white",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  interestTag: {
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  interestText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 16,
    paddingVertical: 12,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#999",
    fontSize: 12,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  instructionsContainer: {
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
    alignItems: "center",
  },
  instructionsText: {
    color: "#999",
    fontSize: 14,
    textAlign: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  emptySubText: {
    color: "#999",
    fontSize: 16,
    textAlign: "center",
  },
})

export default People