import React from 'react';
import Layout from './Layout';
import { BookOpen } from 'lucide-react';
import IntroHeader from './IntroHeader';

const AllCoursesPage: React.FC = () => {
  return (
    <Layout>
      <div className="page-hero-container">
        <IntroHeader 
          title="All Courses"
          tagline="Explore our comprehensive course catalog"
          icon={<BookOpen />}
        />
      </div>
      <div className="text-2xl font-semibold">
        This is the All Courses Page (coming soon).
      </div>
      <h1 className="main-title">BluePrint</h1>
    </Layout>
  );
};

export default AllCoursesPage;
