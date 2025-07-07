import { Box, Typography, Container } from '@mui/material';

const Footer = () => (
  <Box
    component="footer"
    sx={{
      py: 4,
      mt: 8,
      background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
      color: 'white',
      textAlign: 'center',
    }}
  >
    <Container maxWidth="md">
      <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 1, mb: 2 }}>
        Query2Concept
      </Typography>
      <Typography variant="body2" mb={1}>
        Empowering learners through AI-driven query analysis and personalized DSA concept journeys.
      </Typography>
      <Typography variant="caption" color="white" sx={{ opacity: 0.8 }}>
        © {new Date().getFullYear()} Query2Concept. All rights reserved.
      </Typography>
    </Container>
  </Box>
);

export default Footer;
