'use client';
/* eslint-disable react/no-unescaped-entities */
import { Button, Typography, Box, Divider } from '@mui/material';
import Link from 'next/link';
import Header from "../(features)/_components/header";
import Footer from "../(features)/_components/footer";

export default function AboutUs() {
  return (
    <>
      <Header />
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 6,
        }}
      >
        <Box
          sx={{
            maxWidth: 'md', // Minimized width
            backgroundColor: 'background.paper',
            boxShadow: 4,
            borderRadius: 2,
            padding: 4,
            textAlign: 'center',
            transform: 'scale(1)',
            transition: 'transform 0.3s',
            '&:hover': {
              transform: 'scale(1.05)',
            },
            width: '100%', // Ensuring it is 100% width on smaller screens
            marginX: 'auto', // Centered
          }}
        >
          <Typography variant="h3" sx={{ marginBottom: 2 }}>
            About Balemuya
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 4 }}>
            Balemuya is a local service marketplace that connects customers with
            skilled professionals. Whether you need home repairs, beauty
            services, tutoring, or other local services, Balemuya makes it easy to
            find trusted professionals near you.
          </Typography>

          <Divider />

          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Our Mission
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 4 }}>
            We aim to bridge the gap between service providers and customers by
            offering a seamless and reliable platform. We empower professionals to
            showcase their skills and grow their businesses while helping
            customers access high-quality services effortlessly.
          </Typography>

          <Divider />

          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Why Choose Us?
          </Typography>
          <Box
            sx={{
              marginBottom: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              maxWidth: '100%', // Removed the max width to allow responsiveness
              marginX: 'auto',
            }}
          >
            <Typography variant="body1">✅ Trusted and verified professionals</Typography>
            <Typography variant="body1">✅ Easy booking and secure transactions</Typography>
            <Typography variant="body1">✅ Wide range of services to choose from</Typography>
            <Typography variant="body1">✅ Customer reviews for transparency</Typography>
          </Box>

          <Divider />

          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Join Us Today
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 4 }}>
            Whether you're a professional looking to grow your business or a
            customer searching for top-notch local services, Balemuya is the
            perfect place for you. Sign up today and experience hassle-free local
            service booking.
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', gap: 4 }}>
            <Link href="/auth/signup" passHref>
              <Button variant="contained" sx={{ width: { xs: '100%', sm: 'auto' } }}>Get Started</Button>
            </Link>
            <Link href="/contact" passHref>
              <Button variant="outlined" sx={{ width: { xs: '100%', sm: 'auto' } }}>Contact Us</Button>
            </Link>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
