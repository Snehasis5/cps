import React, { useEffect, useState } from 'react';
import { getAchievements } from '../api/api';
import EmbeddedStreakCalendar from '../components/EmbeddedStreakCalendar';
import BadgesGrid from '../components/BadgesGrid';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import Confetti from 'react-confetti'; // Import Confetti here
import { useTheme } from '../contexts/ThemeContext';
import { Flame, Trophy, CalendarCheck, Star, BadgeCheck, Medal, Award } from 'lucide-react';
import IntroHeader from './IntroHeader';
import './AchievementPage.css';

const AchievementPage: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [newBadge, setNewBadge] = useState<any>(null);
  const [showPoints, setShowPoints] = useState(false);
  const { darkMode } = useTheme();

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await getAchievements();
        console.log('✅ Received achievement data:', response.data);
        setData(response.data);

        const newUnlocked = response.data.unlockedBadges?.find((badge: any) => badge.justUnlocked);
        if (newUnlocked) {
          setNewBadge(newUnlocked);
          setShowPoints(true);
          // Hide points after animation (4s)
          setTimeout(() => setShowPoints(false), 4000);
        }
      } catch (error) {
        console.error('Error fetching achievement data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  // Dummy badges for new users
  const dummyUnlocked = [
    {
      name: 'Welcome Badge',
      description: 'Sign up to the platform',
      imageUrl: 'https://img.icons8.com/color/96/000000/medal2.png',
      condition: { field: 'signup', operator: '==', value: 1 },
    },
    {
      name: 'First Lesson',
      description: 'Complete your first lesson',
      imageUrl: 'https://img.icons8.com/color/96/000000/checked-checkbox.png',
      condition: { field: 'lessonsCompleted', operator: '>=', value: 1 },
    },
  ];
  const dummyLocked = [
    {
      name: 'Streak Master',
      description: 'Maintain a 7-day streak',
      imageUrl: 'https://img.icons8.com/color/96/000000/fire-element.png',
      condition: { field: 'loginStreak', operator: '>=', value: 7 },
    },
    {
      name: 'Quiz Whiz',
      description: 'Complete 10 quizzes',
      imageUrl: 'https://img.icons8.com/color/96/000000/brain.png',
      condition: { field: 'quizzesTaken', operator: '>=', value: 10 },
    },
    {
      name: 'Learning Champ',
      description: 'Finish 5 lessons',
      imageUrl: 'https://img.icons8.com/color/96/000000/open-book--v2.png',
      condition: { field: 'lessonsCompleted', operator: '>=', value: 5 },
    },
    {
      name: 'Study Pro',
      description: 'Study for 120 minutes',
      imageUrl: 'https://img.icons8.com/color/96/000000/reading.png',
      condition: { field: 'studyTime', operator: '>=', value: 120 },
    },
    {
      name: 'Consistency King',
      description: 'Log in every day for a month',
      imageUrl: 'https://img.icons8.com/color/96/000000/calendar--v2.png',
      condition: { field: 'loginStreak', operator: '>=', value: 30 },
    },
    {
      name: 'Night Owl',
      description: 'Study after midnight',
      imageUrl: 'https://img.icons8.com/color/96/000000/moon-symbol.png',
      condition: { field: 'studyTime', operator: '>=', value: 1 },
    },
    {
      name: 'Discussion Starter',
      description: 'Post your first comment',
      imageUrl: 'https://img.icons8.com/color/96/000000/speech-bubble.png',
      condition: { field: 'commentsPosted', operator: '>=', value: 1 },
    },
    {
      name: 'Helper',
      description: 'Help another user',
      imageUrl: 'https://img.icons8.com/color/96/000000/helping-hand.png',
      condition: { field: 'helpGiven', operator: '>=', value: 1 },
    },
    {
      name: 'Marathon Learner',
      description: 'Study for 5 hours in a week',
      imageUrl: 'https://img.icons8.com/color/96/000000/stopwatch.png',
      condition: { field: 'studyTime', operator: '>=', value: 300 },
    },
    {
      name: 'Perfect Score',
      description: 'Score 100% on a quiz',
      imageUrl: 'https://img.icons8.com/color/96/000000/trophy.png',
      condition: { field: 'quizScore', operator: '==', value: 100 },
    },
  ];

  // Dummy stats for new users
  const dummyStats = {
    currentStreak: 0,
    highestStreak: 0,
    totalActiveDays: 0,
    totalPoints: 0,
    level: 1,
  };

  if (loading) return <div className="text-center">Loading...</div>;

  // Use dummy stats and badges if no real data
  const stats = data || dummyStats;
  const unlockedBadges = data?.unlockedBadges || dummyUnlocked;
  const lockedBadges = data?.lockedBadges || dummyLocked;

  return (
    <Layout>
      <div className="achievement-page">
        <div className="page-hero-container">
          <IntroHeader 
            title="Your Achievements"
            tagline="Track your progress and celebrate your milestones"
            icon={<Award />}
          />
        </div>
        
        {/* Top Stats */}
        <div className="top-section">
          <div className={`stat-card ${darkMode ? 'streak' : 'soft-blue-card'}`}>
            <Flame size={28} className="stat-icon" />
            <h3>Current Streak</h3>
            <p>{stats.currentStreak} Days</p>
          </div>
          <div className={`stat-card ${darkMode ? 'higheststreak' : 'soft-green-card'}`}>
            <Trophy size={28} className="stat-icon" />
            <h3>Highest Streak</h3>
            <p>{stats.highestStreak} Days</p>
          </div>
          <div className={`stat-card ${darkMode ? 'active-days' : 'soft-purple-card'}`}>
            <CalendarCheck size={28} className="stat-icon" />
            <h3>Days Active</h3>
            <p>{stats.totalActiveDays}</p>
          </div>
          <div className={`stat-card ${darkMode ? 'points' : 'soft-pink-card'}`}>
            <Star size={28} className="stat-icon" />
            <h3>Total Points</h3>
            <p>{stats.totalPoints}</p>
          </div>
          <div className={`stat-card ${darkMode ? 'level' : 'soft-blue-card'}`}>
            <BadgeCheck size={28} className="stat-icon" />
            <h3>Level</h3>
            <p>{stats.level}</p>
          </div>
        </div>

        {/* Animate new badge */}
        <AnimatePresence>
          {newBadge && (
            <motion.div
              key="new-badge"
              className="badge-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setNewBadge(null)}
            >
              <motion.div
                className="badge-popup"
                initial={{ scale: 0.5, rotate: 0 }}
                animate={{ scale: 1.2, rotate: 360 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <img src={newBadge.imageUrl} alt={newBadge.name} />
                <h3>New Badge Unlocked!</h3>
                <p>{newBadge.name}</p>
              </motion.div>

              {/* Confetti on popup */}
              <Confetti
                width={300}
                height={300}
                recycle={false}
                numberOfPieces={150}
                className="confetti-container"
              />

              {/* Points earned animation */}
              <AnimatePresence>
                {showPoints && (
                  <motion.div
                    className="points-earned"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 1 }}
                  >
                    +{newBadge.pointsAwarded} Points Earned!
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Calendar + Badges */}
        <div className="main-content">
          <div className="calendar-section">
            <h2><CalendarCheck size={22} style={{marginBottom: -4, marginRight: 6}} /> July 2025</h2>
            <EmbeddedStreakCalendar />
          </div>

          <div className="badge-section">
            <h2><Medal size={22} style={{marginBottom: -4, marginRight: 6}} /> Badges</h2>
            <BadgesGrid
              unlocked={unlockedBadges}
              locked={lockedBadges}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AchievementPage;
