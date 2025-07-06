import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Play, Award, Clock, Users, Home } from 'lucide-react';
import { getAllCourses } from '../api/api';
import type { Course } from '../api/api';
import Layout from './Layout';
import IntroHeader from './IntroHeader';

const UserHome: React.FC = () => {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const getAnimationProps = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: {
      delay,
      duration: 0.6,
      type: "spring" as const,
    },
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getAllCourses();
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseClick = (course: Course) => {
    navigate(`/course/${course.slug}`);
  };

  const stats = [
    { icon: BookOpen, label: 'Enrolled Courses', value: '3', color: 'blue' },
    { icon: Award, label: 'Certificates', value: '1', color: 'green' },
    { icon: Clock, label: 'Hours Learned', value: '24', color: 'purple' },
    { icon: Users, label: 'Study Groups', value: '2', color: 'pink' }
  ];

  return (
    <Layout>
      <div className="page-hero-container">
        <IntroHeader 
          title={`Welcome back, ${user?.username}!`}
          tagline="Continue your learning journey and explore new courses."
          icon={<Home />}
        />
      </div>
      <div className={`content-wrapper ${darkMode ? 'dark' : 'light'}`}>
        {/* Stats Grid */}
        <motion.div className="user-stats-grid" {...getAnimationProps(0.1)}>
          {stats.map((stat, index) => {
            // Define dark gradients and borders for each stat card
            let darkGradient = '';
            let darkBorder = '';
            if (stat.label === 'Enrolled Courses') {
              darkGradient = 'linear-gradient(135deg, #3b0764 0%, #a21caf 100%)';
              darkBorder = '2px solid #a21caf';
            } else if (stat.label === 'Certificates') {
              darkGradient = 'linear-gradient(135deg, #134e4a 0%, #0f766e 100%)';
              darkBorder = '2px solid #0f766e';
            } else if (stat.label === 'Hours Learned') {
              darkGradient = 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)';
              darkBorder = '2px solid #2563eb';
            } else if (stat.label === 'Study Groups') {
              darkGradient = 'linear-gradient(135deg, #a16207 0%, #fde68a 100%)';
              darkBorder = '2px solid #a16207';
            }
            return (
              <div
                key={index}
                className={`stat-card flex flex-col items-center justify-center transition-colors duration-300 animate-fade-in ${!darkMode ? `soft-${stat.color}-card` : ''}`}
                style={
                  darkMode
                    ? {
                        background: darkGradient,
                        border: darkBorder,
                        color: '#fff',
                        boxShadow: '0 4px 24px 0 rgba(0,0,0,0.18)',
                        borderRadius: 18,
                        minHeight: 120,
                        padding: '32px 24px',
                      }
                    : {
                        minHeight: 120,
                        padding: '32px 24px',
                        borderRadius: 18,
                      }
                }
              >
                <stat.icon
                  size={32}
                  className="stat-icon mb-4"
                  style={
                    darkMode
                      ? {
                          color:
                            stat.label === 'Enrolled Courses'
                              ? '#7dd3fc'
                              : stat.label === 'Certificates'
                              ? '#6ee7b7'
                              : stat.label === 'Hours Learned'
                              ? '#c4b5fd'
                              : stat.label === 'Study Groups'
                              ? '#fde68a'
                              : '#fff',
                        }
                      : undefined
                  }
                />
                <div className="stat-content flex flex-col items-center text-center">
                  <div
                    className="stat-label"
                    style={darkMode ? { color: '#d1d5db', fontWeight: 500, fontSize: 16 } : undefined}
                  >
                    {stat.label}
                  </div>
                  <div
                    className="stat-value"
                    style={darkMode ? { color: '#fff', fontWeight: 700, fontSize: 28 } : undefined}
                  >
                    {stat.value}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Available Courses */}
        <motion.div className="courses-section" {...getAnimationProps(0.2)}>
          <div className="section-header">
            <h2>Available Courses</h2>
            <p>Explore our comprehensive course catalog</p>
          </div>

          {loading ? (
            <div className="loading-grid">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="course-card-skeleton">
                  <div className="skeleton-header"></div>
                  <div className="skeleton-content">
                    <div className="skeleton-line"></div>
                    <div className="skeleton-line short"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="courses-grid">
              {courses.map((course, index) => (
                <motion.div
                  key={course._id}
                  className={`course-card ${!darkMode ? 'soft-course-card' : ''}`}
                  onClick={() => handleCourseClick(course)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="course-header">
                    <div className="course-id">Course {course.courseId}</div>
                    <BookOpen size={20} className="course-icon" />
                  </div>
                  <div className="course-content">
                    <h3 className="course-title">{course.courseName}</h3>
                    <div className="course-actions">
                      <button className={`course-btn primary ${!darkMode ? 'soft-primary-btn' : ''}`}>
                        <Play size={16} />
                        Start Learning
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && courses.length === 0 && (
            <div className="empty-state">
              <BookOpen size={48} />
              <h3>No courses available</h3>
              <p>Check back later for new courses!</p>
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default UserHome;
