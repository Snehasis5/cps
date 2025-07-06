import React from 'react';
import Layout from './Layout';
import { GraduationCap } from 'lucide-react';
import IntroHeader from './IntroHeader';

const MyCoursesPage: React.FC = () => {
  return (
    <Layout>
      <div className="page-hero-container">
        <IntroHeader 
          title="My Courses"
          tagline="Track your enrolled courses and learning progress"
          icon={<GraduationCap />}
        />
      </div>
      <div className="text-2xl font-semibold">
        This is the My Courses Page (coming soon).
      </div>
    </Layout>
  );
};

export default MyCoursesPage;
