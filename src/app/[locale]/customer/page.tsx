/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from '@/i18n/navigation';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  Avatar,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  FaClipboardList,
  FaHandshake,
  FaMapMarkerAlt,
  FaSearch,
  FaUserPlus,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';
import { MdPayment } from 'react-icons/md';
import { FiArrowRight, FiClipboard } from 'react-icons/fi';
import { HiOutlineBriefcase } from 'react-icons/hi';
import { useGetNearByProfessionalsQuery } from '@/store/api/user.api';
import Footer from '../(features)/_components/footer';
import Header from './_components/header';
import StarRating from '../(features)/_components/StarRating';

const heroImages = [
  {
    url: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    alt: "Skilled professional at work"
  },
  {
    url: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", 
    alt: "Customer receiving professional service"
  },
  {
    url: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", 
    alt: "Team of skilled professionals"
  },
  {
    url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    alt: "Professional using high-quality tools"
  }
];

export default function Home() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { data: professionalsData } = useGetNearByProfessionalsQuery({});
  const [searchQuery, setSearchQuery] = useState('');
  const { data: searchResults } = useGetNearByProfessionalsQuery(searchQuery);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  const professionals = professionalsData?.nearby_professionals;
  const resultToDisplay = searchQuery ? searchResults : professionals;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextHero = () => {
    setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevHero = () => {
    setCurrentHeroIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <Box sx={{ backgroundColor: 'background.default', fontFamily: 'inherit' }}>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '60vh', md: '80vh' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Hero Image Slider */}
        {heroImages.map((image, index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: `url(${image.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              zIndex: 1,
              opacity: index === currentHeroIndex ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }
            }}
          />
        ))}
        
        {/* Navigation Arrows */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: 20,
            zIndex: 3,
            color: 'white',
            cursor: 'pointer',
            fontSize: '2rem',
            transform: 'translateY(-50%)',
            '&:hover': {
              color: theme.palette.primary.main,
            }
          }}
          onClick={prevHero}
        >
          <FaChevronLeft />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            right: 20,
            zIndex: 3,
            color: 'white',
            cursor: 'pointer',
            fontSize: '2rem',
            transform: 'translateY(-50%)',
            '&:hover': {
              color: theme.palette.primary.main,
            }
          }}
          onClick={nextHero}
        >
          <FaChevronRight />
        </Box>
        
        {/* Content */}
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ maxWidth: 800, mx: 'auto', px: { xs: 2, sm: 0 } }}>
            <Typography 
              variant={isMobile ? 'h4' : 'h2'} 
              fontWeight={700}
              gutterBottom
              sx={{ 
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                lineHeight: 1.2,
                animation: 'fadeIn 1s ease-in',
                color: 'white'
              }}
            >
              Find Trusted Professionals in Your Area
            </Typography>
            <Typography 
              variant={isMobile ? 'subtitle1' : 'h5'} 
              sx={{ 
                mb: 4,
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                fontWeight: 300,
                animation: 'fadeIn 1.5s ease-in',
                color: 'white'
              }}
            >
              Connecting skilled professionals with customers across Ethiopia
            </Typography>
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={2} 
              justifyContent="center"
              sx={{ animation: 'fadeInUp 1s ease-in' }}
            >
              <Button 
                variant="contained" 
                color="primary"
                size="large"
                sx={{ 
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: 2,
                  boxShadow: theme.shadows[4],
                  '&:hover': {
                    boxShadow: theme.shadows[8],
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease'
                }}
                onClick={() => router.push('/customer/professionals')}
              >
                Browse Professionals
              </Button>
              <Button 
                variant="outlined" 
                color="inherit"
                size="large"
                sx={{ 
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: 2,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease'
                }}
                onClick={() => window.scrollTo({ top: document.getElementById('how-it-works')?.offsetTop, behavior: 'smooth' })}
              >
                How It Works
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography 
          variant="h3" 
          textAlign="center" 
          fontWeight={700} 
          mb={2}
          color="text.primary"
        >
          Our Services
        </Typography>
        <Typography 
          variant="subtitle1" 
          textAlign="center" 
          color="text.secondary"
          mb={6}
          sx={{ maxWidth: 700, mx: 'auto' }}
        >
          Discover the benefits of using our platform to find or offer professional services
        </Typography>
        <Grid container spacing={4}>
          {[
            { 
              icon: <FaMapMarkerAlt size={32} />, 
              text: 'Location-Based Search',
              description: 'Find professionals near you with our advanced geolocation technology'
            },
            { 
              icon: <FiClipboard size={32} />, 
              text: 'Service Registration',
              description: 'Easily register your services and expand your customer base'
            },
            { 
              icon: <MdPayment size={32} />, 
              text: 'Secure Payments',
              description: 'Safe and reliable payment options for all transactions'
            },
            { 
              icon: <HiOutlineBriefcase size={32} />, 
              text: 'Apply for Work',
              description: 'Professionals can apply for available jobs in their field'
            },
          ].map(({ icon, text, description }, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 4, 
                  textAlign: 'center',
                  height: '100%',
                  borderRadius: 3,
                  backgroundColor: 'background.paper',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: theme.shadows[6],
                  }
                }}
              >
                <Box 
                  sx={{ 
                    width: 80,
                    height: 80,
                    mx: 'auto',
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'primary.light',
                    color: 'primary.main',
                    borderRadius: '50%',
                  }}
                >
                  {icon}
                </Box>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {text}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Professionals Section */}
      <Box sx={{ backgroundColor: 'background.paper', py: 10 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" textAlign="center" fontWeight={700} mb={2}>
            Featured Professionals
          </Typography>
          <Typography 
            variant="subtitle1" 
            textAlign="center" 
            color="text.secondary" 
            mb={6}
            sx={{ maxWidth: 700, mx: 'auto' }}
          >
            Browse our top-rated professionals ready to serve you
          </Typography>

          <Grid container spacing={4}>
            {Array.isArray(resultToDisplay) && resultToDisplay?.slice(0, 4).map((professional: any) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={professional.id}>
                <Paper 
                  sx={{ 
                    p: 3, 
                    borderRadius: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: theme.shadows[4],
                    }
                  }}
                >
                  <Stack direction="row" justifyContent="space-between">
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar 
                        src={professional.profile_image} 
                        sx={{ 
                          width: 60, 
                          height: 60,
                          border: '2px solid',
                          borderColor: 'primary.main'
                        }} 
                      />
                      <Box>
                        <Typography fontWeight={600}>{professional.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {professional.title}
                        </Typography>
                      </Box>
                    </Stack>
                    <StarRating rating={professional?.rating} />
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center" mt={2}>
                    <FaMapMarkerAlt color={theme.palette.primary.main} />
                    <Typography variant="body2">{professional?.distance} Km away</Typography>
                  </Stack>

                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    mt={2}
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      flexGrow: 1
                    }}
                  >
                    {professional?.bio}
                  </Typography>

                  <Box textAlign="right" mt={3}>
                    <Button
                      variant="outlined"
                      size="small"
                      color="primary"
                      onClick={() => router.push(`/customer/professionals/${professional.id}`)}
                      sx={{
                        fontWeight: 600,
                        textTransform: 'none',
                        borderRadius: 2,
                        px: 3
                      }}
                    >
                      View Profile
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
          
          <Box textAlign="center" mt={6}>
            <Button
              variant="outlined" 
                color="inherit"
                size="large"
                sx={{ 
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: 2,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease'
                }}
              onClick={() => router.push('/customer/professionals')}
         
            >
              View All Professionals
            </Button>
          </Box>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box id="how-it-works" sx={{ py: 10, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" textAlign="center" fontWeight={700} mb={2}>
            How It Works
          </Typography>
          <Typography 
            variant="subtitle1" 
            textAlign="center" 
            color="text.secondary" 
            mb={6}
            sx={{ maxWidth: 700, mx: 'auto' }}
          >
            Simple steps to get the service you need
          </Typography>
          
          <Grid 
            container 
            alignItems="center" 
            justifyContent="center" 
            spacing={isMobile ? 4 : 2}
            sx={{ mt: 4 }}
          >
            {[
              { 
                icon: <FaUserPlus size={24} />, 
                text: 'Register', 
                description: 'Create your account as a customer or professional' 
              },
              { 
                icon: <FaClipboardList size={24} />, 
                text: 'Post Work', 
                description: 'Describe the service you need' 
              },
              { 
                icon: <FaSearch size={24} />, 
                text: 'Review', 
                description: 'Evaluate professionals and their offers' 
              },
              { 
                icon: <FaHandshake size={24} />, 
                text: 'Connect', 
                description: 'Hire the right professional for the job' 
              },
            ].map(({ icon, text, description }, idx, arr) => (
              <React.Fragment key={idx}>
                <Grid item xs={12} sm={6} md={3}>
                  <Stack alignItems="center" sx={{ px: 2 }}>
                    <Box
                      width={72}
                      height={72}
                      border={`3px solid ${theme.palette.primary.main}`}
                      borderRadius="50%"
                      bgcolor="background.paper"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      color="primary.main"
                      fontSize={28}
                      mb={2}
                    >
                      {icon}
                    </Box>
                    <Typography variant="h6" fontWeight={600} textAlign="center" gutterBottom>
                      {text}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" textAlign="center">
                      {description}
                    </Typography>
                  </Stack>
                </Grid>
                {idx < arr.length - 1 && !isMobile && (
                  <Grid item md="auto">
                    <Box fontSize={32} color="divider">
                      <FiArrowRight />
                    </Box>
                  </Grid>
                )}
              </React.Fragment>
            ))}
          </Grid>
        </Container>
      </Box>
      {/* Footer */}
      <Footer />
    </Box>
  );
}