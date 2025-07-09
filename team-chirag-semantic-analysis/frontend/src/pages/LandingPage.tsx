import { Box, Button, Container, Typography, Card, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import Navbar from '../landingp/Navbar';
import Footer from '../landingp/Footer';
import { 
  Search, 
  Target, 
  Users, 
  BookOpen, 
  ArrowRight, 
  MessageSquare, 
  Lightbulb, 
  TrendingUp, 
  Database, 
  Zap, 
  CheckCircle
} from 'lucide-react';

const LandingPage = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'white' }}>
      <Navbar />
      
      {/* Hero Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 800,
                fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                color: '#1e293b',
                mb: 3,
                lineHeight: 1.2,
              }}
            >
              Semantic Analysis of{' '}
              <span style={{ color: '#1976d2' }}>DSA Learning Queries</span>{' '}
              to Map Concept Gaps
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                color: '#64748b',
                mb: 6,
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.6,
                fontWeight: 400,
              }}
            >
              Transform DSA education by understanding what students really need to learn through 
              intelligent analysis of their questions and knowledge gaps in Data Structures & Algorithms.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center' }}>
              <Button
                component={Link}
                to="/signup"
                variant="contained"
                size="large"
                sx={{
                  bgcolor: '#1976d2',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  boxShadow: '0 4px 16px rgba(25, 118, 210, 0.3)',
                  '&:hover': {
                    bgcolor: '#1565c0',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 24px rgba(25, 118, 210, 0.4)',
                  },
                  transition: 'all 0.2s',
                }}
              >
                Get Started
                <ArrowRight style={{ marginLeft: 8, width: 20, height: 20 }} />
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Key Features Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'white' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#1e293b', mb: 3 }}>
              How It Works
            </Typography>
            <Typography variant="h6" sx={{ color: '#64748b', maxWidth: '600px', mx: 'auto' }}>
              Advanced natural language processing that understands the deeper meaning behind student DSA questions.
            </Typography>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            alignItems: 'center', 
            gap: 6 
          }}>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, mb: 4 }}>
                <Box sx={{ bgcolor: '#dbeafe', p: 2, borderRadius: 2 }}>
                  <Search style={{ width: 24, height: 24, color: '#1976d2' }} />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 1 }}>
                    Intelligent Query Processing
                  </Typography>
                  <Typography sx={{ color: '#64748b', lineHeight: 1.6 }}>
                    Analyze student DSA questions to understand not just what they're asking, but what underlying 
                    algorithms and data structures they're struggling with.
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, mb: 4 }}>
                <Box sx={{ bgcolor: '#dcfce7', p: 2, borderRadius: 2 }}>
                  <Target style={{ width: 24, height: 24, color: '#16a34a' }} />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 1 }}>
                    Concept Gap Identification
                  </Typography>
                  <Typography sx={{ color: '#64748b', lineHeight: 1.6 }}>
                    Automatically map queries to specific DSA knowledge gaps and prerequisite concepts that 
                    students need to master.
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                <Box sx={{ bgcolor: '#f3e8ff', p: 2, borderRadius: 2 }}>
                  <Lightbulb style={{ width: 24, height: 24, color: '#9333ea' }} />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 1 }}>
                    Personalized Learning Paths
                  </Typography>
                  <Typography sx={{ color: '#64748b', lineHeight: 1.6 }}>
                    Generate targeted learning recommendations with video content that address specific gaps 
                    and build foundational DSA understanding.
                  </Typography>
                </Box>
              </Box>
            </Box>
            
            <Box sx={{ flex: 1 }}>
              <Paper sx={{ bgcolor: '#f8fafc', p: 4, borderRadius: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box sx={{ 
                    bgcolor: '#1976d2', 
                    color: 'white', 
                    fontSize: '2rem', 
                    fontWeight: 700,
                    py: 2, 
                    px: 3, 
                    borderRadius: 2, 
                    mb: 3, 
                    display: 'inline-block' 
                  }}>
                    AI + DSA Education
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 600, color: '#1e293b', mb: 2 }}>
                    Understanding Beyond Code
                  </Typography>
                  <Typography sx={{ color: '#64748b', lineHeight: 1.6 }}>
                    Our semantic analysis technology goes beyond keyword matching to understand the true intent 
                    and learning needs behind every student question about algorithms and data structures.
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Technology Features */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#f8fafc' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#1e293b', mb: 3 }}>
              Advanced Technology Stack
            </Typography>
            <Typography variant="h6" sx={{ color: '#64748b', maxWidth: '600px', mx: 'auto' }}>
              Built with cutting-edge AI and machine learning technologies.
            </Typography>
          </Box>
          
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, 
            gap: 4 
          }}>
            <Card sx={{
              p: 4,
              borderRadius: 3,
              boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              bgcolor: 'white',
            }}>
              <Box sx={{ bgcolor: '#dbeafe', width: 56, height: 56, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                <Database style={{ width: 28, height: 28, color: '#1976d2' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 1, textAlign: 'center' }}>
                Vector Database
              </Typography>
              <Typography sx={{ color: '#64748b', textAlign: 'center', lineHeight: 1.6 }}>
                Semantic embeddings to capture the meaning behind questions and provide contextually relevant responses.
              </Typography>
            </Card>
            
            <Card sx={{
              p: 4,
              borderRadius: 3,
              boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              bgcolor: 'white',
            }}>
              <Box sx={{ bgcolor: '#e6f7ee', width: 56, height: 56, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                <Zap style={{ width: 28, height: 28, color: '#16a34a' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 1, textAlign: 'center' }}>
                Adaptive Learning Engine
              </Typography>
              <Typography sx={{ color: '#64748b', textAlign: 'center', lineHeight: 1.6 }}>
                Continuously learn from student interactions to improve concept mapping accuracy and personalization over time.
              </Typography>
            </Card>
            
            <Card sx={{
              p: 4,
              borderRadius: 3,
              boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              bgcolor: 'white',
            }}>
              <Box sx={{ bgcolor: '#f3e8ff', width: 56, height: 56, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                <TrendingUp style={{ width: 28, height: 28, color: '#9333ea' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 1, textAlign: 'center' }}>
                Learning Analytics
              </Typography>
              <Typography sx={{ color: '#64748b', textAlign: 'center', lineHeight: 1.6 }}>
                Comprehensive dashboards and insights that help educators understand class-wide learning patterns and common misconceptions.
              </Typography>
            </Card>
          </Box>
        </Container>
      </Box>

      {/* Applications Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'white' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#1e293b', mb: 3 }}>
              Real-World Applications
            </Typography>
            <Typography variant="h6" sx={{ color: '#64748b', maxWidth: '600px', mx: 'auto' }}>
              Transforming how students learn algorithms across different educational contexts.
            </Typography>
          </Box>
          
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, 
            gap: 4 
          }}>
            <Card sx={{
              p: 4,
              borderRadius: 3,
              boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              bgcolor: 'white',
            }}>
              <Box sx={{ bgcolor: '#dbeafe', width: 56, height: 56, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                <BookOpen style={{ width: 28, height: 28, color: '#1976d2' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 1, textAlign: 'center' }}>
                University CS Courses
              </Typography>
              <Typography sx={{ color: '#64748b', textAlign: 'center', lineHeight: 1.6 }}>
                Help professors identify common student misconceptions in algorithms and data structures courses.
              </Typography>
            </Card>
            
            <Card sx={{
              p: 4,
              borderRadius: 3,
              boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              bgcolor: 'white',
            }}>
              <Box sx={{ bgcolor: '#fef3c7', width: 56, height: 56, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                <Users style={{ width: 28, height: 28, color: '#d97706' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 1, textAlign: 'center' }}>
                Coding Bootcamps
              </Typography>
              <Typography sx={{ color: '#64748b', textAlign: 'center', lineHeight: 1.6 }}>
                Accelerate learning by quickly identifying and addressing individual student knowledge gaps.
              </Typography>
            </Card>
            
            <Card sx={{
              p: 4,
              borderRadius: 3,
              boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              bgcolor: 'white',
            }}>
              <Box sx={{ bgcolor: '#e6f7ee', width: 56, height: 56, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                <MessageSquare style={{ width: 28, height: 28, color: '#16a34a' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 1, textAlign: 'center' }}>
                Online Tutoring
              </Typography>
              <Typography sx={{ color: '#64748b', textAlign: 'center', lineHeight: 1.6 }}>
                Provide tutors with instant insights into student understanding levels and learning needs.
              </Typography>
            </Card>
            
            <Card sx={{
              p: 4,
              borderRadius: 3,
              boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)',
              border: 'none',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              bgcolor: 'white',
            }}>
              <Box sx={{ bgcolor: '#f3e8ff', width: 56, height: 56, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                <CheckCircle style={{ width: 28, height: 28, color: '#9333ea' }} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 1, textAlign: 'center' }}>
                Interview Prep
              </Typography>
              <Typography sx={{ color: '#64748b', textAlign: 'center', lineHeight: 1.6 }}>
                Help candidates understand their weaknesses and create personalized study plans for technical interviews.
              </Typography>
            </Card>
          </Box>
        </Container>
      </Box>

      {/* Why Choose Our Platform */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#f8fafc' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#1e293b', mb: 3 }}>
              Why Choose Our Platform?
            </Typography>
            <Typography variant="h6" sx={{ color: '#64748b', maxWidth: '600px', mx: 'auto' }}>
              Built for educators, students, and institutions who want to revolutionize DSA learning.
            </Typography>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            alignItems: 'center', 
            gap: 6 
          }}>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, mb: 4 }}>
                <Box sx={{ bgcolor: '#dbeafe', p: 2, borderRadius: 2 }}>
                  <CheckCircle style={{ width: 24, height: 24, color: '#1976d2' }} />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 1 }}>
                    Research-Backed Approach
                  </Typography>
                  <Typography sx={{ color: '#64748b', lineHeight: 1.6 }}>
                    Based on latest research in educational psychology and cognitive science for effective learning.
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3, mb: 4 }}>
                <Box sx={{ bgcolor: '#dcfce7', p: 2, borderRadius: 2 }}>
                  <Database style={{ width: 24, height: 24, color: '#16a34a' }} />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 1 }}>
                    Comprehensive DSA Coverage
                  </Typography>
                  <Typography sx={{ color: '#64748b', lineHeight: 1.6 }}>
                    Covers all major algorithms and data structures with detailed concept mapping and prerequisites.
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                <Box sx={{ bgcolor: '#fef3c7', p: 2, borderRadius: 2 }}>
                  <Zap style={{ width: 24, height: 24, color: '#d97706' }} />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b', mb: 1 }}>
                    Easy Integration
                  </Typography>
                  <Typography sx={{ color: '#64748b', lineHeight: 1.6 }}>
                    Easy to implement with existing educational technology infrastructure.
                  </Typography>
                </Box>
              </Box>
            </Box>
            
            <Box sx={{ flex: 1 }}>
              <Paper sx={{ bgcolor: 'white', p: 4, borderRadius: 3 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box sx={{ 
                    bgcolor: '#1976d2', 
                    color: 'white', 
                    fontSize: '2rem', 
                    fontWeight: 700,
                    py: 2, 
                    px: 3, 
                    borderRadius: 2, 
                    mb: 3, 
                    display: 'inline-block' 
                  }}>
                    Get Started Today
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 600, color: '#1e293b', mb: 2 }}>
                    Join the Learning Revolution
                  </Typography>
                  <Typography sx={{ color: '#64748b', lineHeight: 1.6, mb: 4 }}>
                    Transform how students learn algorithms and data structures. Start with our free trial.
                  </Typography>
                  <Button
                    component={Link}
                    to="/signup"
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: '#1976d2',
                      color: 'white',
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      boxShadow: '0 4px 16px rgba(25, 118, 210, 0.3)',
                      '&:hover': {
                        bgcolor: '#1565c0',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 24px rgba(25, 118, 210, 0.4)',
                      },
                      transition: 'all 0.2s',
                    }}
                  >
                    Start Free Trial
                    <ArrowRight style={{ marginLeft: 8, width: 20, height: 20 }} />
                  </Button>
                </Box>
              </Paper>
            </Box>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default LandingPage;
