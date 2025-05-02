/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
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
} from '@mui/material';
import {
  FaClipboardList,
  FaHandshake,
  FaMapMarkerAlt,
  FaSearch,
  FaUserPlus,
} from 'react-icons/fa';
import { MdPayment } from 'react-icons/md';
import { FiArrowRight, FiClipboard } from 'react-icons/fi';
import { HiOutlineBriefcase } from 'react-icons/hi';
import { useGetNearByProfessionalsQuery } from '@/store/api/user.api';
import Footer from '../(features)/_components/footer';
import Header from './_components/header';
import StarRating from '../(features)/_components/StarRating';

export default function Home() {
  const router = useRouter();
  const { data: professionalsData } = useGetNearByProfessionalsQuery({});
  const [searchQuery, setSearchQuery] = useState('');
  const { data: searchResults } = useGetNearByProfessionalsQuery(searchQuery);

  const professionals = professionalsData?.nearby_professionals;
  const resultToDisplay = searchQuery ? searchResults : professionals;

  return (
    <Box bgcolor="background.paper" fontFamily="sans-serif">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'url("/images/hero.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: { xs: 300, md: 500 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Box maxWidth="sm">
          <Typography variant="h3" fontWeight="bold">
            Welcome to Balemuya
          </Typography>
          <Typography variant="h6" fontWeight="300" mt={2}>
            Connecting Professionals and Customers in Ethiopia
          </Typography>
          <Stack direction="row" spacing={2} mt={4} justifyContent="center">
            <Button variant="contained" sx={{ bgcolor: '#6a1b9a' }}>
              Get Started
            </Button>
            <Button variant="outlined" sx={{ bgcolor: '#fff', color: '#444' }}>
              Learn More
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8}}>
        <Typography variant="h4" textAlign="center" fontWeight="bold" mb={4}>
          FEATURES
        </Typography>
        <Grid container spacing={4}>
          {[
            { icon: <FaMapMarkerAlt />, text: 'Location-Based Search' },
            { icon: <FiClipboard />, text: 'Service Registration' },
            { icon: <MdPayment />, text: 'Secure Payments' },
            { icon: <HiOutlineBriefcase />, text: 'Apply for Work' },
          ].map(({ icon, text }, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                <Box fontSize={40} color="#6a1b9a" mb={2}>
                  {icon}
                </Box>
                <Typography fontWeight="medium">{text}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Professionals Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" textAlign="center" fontWeight="bold" mb={1}>
          PROFESSIONALS
        </Typography>
        <Typography textAlign="center" color="text.secondary" mb={4}>
          Browse available professionals for various services.
        </Typography>

        <Grid container spacing={3}>
          {resultToDisplay?.map((professional: any) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={professional.id}>
              <Paper sx={{ p: 3, borderRadius: 2 }}>
                <Stack direction="row" justifyContent="space-between">
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={professional.profile_image} sx={{ width: 60, height: 60 }} />
                    <Typography fontWeight="bold">{professional.name}</Typography>
                  </Stack>
                  <StarRating rating={professional?.rating} />
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center" mt={2}>
                  <FaMapMarkerAlt color="#6a1b9a" />
                  <Typography>{professional?.distance} Km</Typography>
                </Stack>

                <Typography fontWeight="bold" mt={2}>
                  {professional.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1} noWrap>
                  {professional?.bio}
                </Typography>

                <Box textAlign="right">
                  <Button
                    size="small"
                    sx={{ mt: 2, color: '#6a1b9a' }}
                    onClick={() => router.push(`/customer/professionals/${professional.id}`)}
                  >
                    Details
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Box bgcolor="background.default" py={8}>
        <Container>
          <Typography variant="h4" textAlign="center" fontWeight="bold" mb={4}>
            HOW IT WORKS
          </Typography>
          <Grid container alignItems="center" justifyContent="center" spacing={2}>
            {[
              { icon: <FaUserPlus />, text: 'Register as a Customer' },
              { icon: <FaClipboardList />, text: 'Post Work' },
              { icon: <FaSearch />, text: 'Review Applications' },
              { icon: <FaHandshake />, text: 'Connect with Professionals' },
            ].map(({ icon, text }, idx, arr) => (
              <React.Fragment key={idx}>
                <Grid item>
                  <Stack alignItems="center">
                    <Box
                      width={64}
                      height={64}
                      border="4px solid #6a1b9a"
                      borderRadius="50%"
                      bgcolor="white"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize={28}
                    >
                      {icon}
                    </Box>
                    <Typography mt={1} textAlign="center">
                      {text}
                    </Typography>
                  </Stack>
                </Grid>
                {idx < arr.length - 1 && (
                  <Grid item>
                    <Box fontSize={32} color="gray">
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
