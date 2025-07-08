import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { BookOpen, Play } from 'lucide-react';
import IntroHeader from './IntroHeader';
import { motion } from 'framer-motion';
import { enrollInCourse, getAllCourses, getEnrolledCourses, type Course } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const AllCoursesPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  // Fetch all courses and enrolled course IDs together
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [allCoursesRes, enrolledCoursesRes] = await Promise.all([
          getAllCourses(),
          getEnrolledCourses(),
        ]);

        setCourses(allCoursesRes.data.courses);
        const enrolledIds = enrolledCoursesRes.data.courses.map((c: Course) => Number(c.courseId));
        setEnrolledCourses(enrolledIds);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCourseClick = async (course: Course) => {
    const isEnrolled = enrolledCourses.includes(course.courseId);

    if (isEnrolled) {
      navigate(`/course/${course.slug}`);
      return;
    }

    try {
      await enrollInCourse(course.courseId);
      setEnrolledCourses((prev) => [...prev, course.courseId]);
      alert(`Successfully enrolled in ${course.courseName}!`);
      navigate(`/course/${course.slug}`);
    } catch (error) {
      console.error('Error enrolling:', error);
    }
  };

  const getAnimationProps = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: {
      delay,
      duration: 0.6,
      type: 'spring' as const,
    },
  });

  return (
    <Layout>
      <div className="page-hero-container">
        <IntroHeader
          title="All Courses"
          tagline="Explore our comprehensive course catalog"
          icon={<BookOpen />}
        />
      </div>

      <motion.div className="content-wrapper courses-section" {...getAnimationProps(0.2)}>
        <div className="section-header">
          <h2>Available Courses</h2>
          <p>Explore our comprehensive course catalog</p>
        </div>

        <div className="w-full sm:w-96 mb-6">
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full sm:w-96 px-5 py-2.5 rounded-2xl shadow-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white transition-all duration-200 ease-in-out text-center"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <br />
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
            {courses
              .filter((course) =>
                course.courseName.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((course, index) => {
                const isEnrolled = enrolledCourses.includes(course.courseId);
                return (
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
                          {isEnrolled ? <Play size={16} /> : <BookOpen size={16} />}
                          {isEnrolled ? 'Start Learning' : 'Enroll Now'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
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
    </Layout>
  );
};

export default AllCoursesPage;
