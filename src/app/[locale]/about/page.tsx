'use client';
/* eslint-disable react/no-unescaped-entities */
import { Button, Typography, Box, Divider } from '@mui/material';
import { Link } from "@/i18n/navigation";
import Header from "../(features)/_components/header";
import Footer from "../(features)/_components/footer";
import { useTranslations } from 'next-intl';

export default function AboutUs() {
  const t = useTranslations("about");

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
          px: { xs: 3, sm: 6, md: 8 },
          py: { xs: 4, md: 6 },
        }}
      >
        <Box
          sx={{
            maxWidth: 'lg',
            width: '100%',
            bgcolor: 'background.paper',
            background: (theme) =>
              theme.palette.mode === 'light'
                ? 'linear-gradient(180deg, #ffffff 0%, #f3e5f5 100%)'
                : 'linear-gradient(180deg, #1a1a1a 0%, #2e1a47 100%)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            borderRadius: 3,
            p: { xs: 3, sm: 4, md: 6 },
            textAlign: 'center',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              mb: 3,
              fontWeight: 700,
              color: (theme) => (theme.palette.mode === 'light' ? '#6a1b9a' : '#e1bee7'),
              letterSpacing: '0.5px',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            }}
          >
            {t("title")}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              color: (theme) => (theme.palette.mode === 'light' ? '#333' : '#e0e0e0'),
              fontSize: { xs: '1rem', sm: '1.1rem' },
              lineHeight: 1.8,
              maxWidth: '800px',
              mx: 'auto',
            }}
          >
            {t("intro")}
          </Typography>

          <Divider
            sx={{
              my: 4,
              borderColor: (theme) => (theme.palette.mode === 'light' ? '#6a1b9a' : '#e1bee7'),
              borderWidth: '1px',
              opacity: 0.3,
              maxWidth: '400px',
              mx: 'auto',
            }}
          />

          <Typography
            variant="h5"
            sx={{
              mb: 2,
              fontWeight: 600,
              color: (theme) => (theme.palette.mode === 'light' ? '#6a1b9a' : '#e1bee7'),
              fontSize: { xs: '1.5rem', sm: '1.75rem' },
            }}
          >
            {t("missionTitle")}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              color: (theme) => (theme.palette.mode === 'light' ? '#333' : '#e0e0e0'),
              fontSize: { xs: '1rem', sm: '1.1rem' },
              lineHeight: 1.8,
              maxWidth: '800px',
              mx: 'auto',
            }}
          >
            {t("mission")}
          </Typography>

          <Divider
            sx={{
              my: 4,
              borderColor: (theme) => (theme.palette.mode === 'light' ? '#6a1b9a' : '#e1bee7'),
              borderWidth: '1px',
              opacity: 0.3,
              maxWidth: '400px',
              mx: 'auto',
            }}
          />

          <Typography
            variant="h5"
            sx={{
              mb: 2,
              fontWeight: 600,
              color: (theme) => (theme.palette.mode === 'light' ? '#6a1b9a' : '#e1bee7'),
              fontSize: { xs: '1.5rem', sm: '1.75rem' },
            }}
          >
            {t("whyChooseUsTitle")}
          </Typography>
          <Box
            sx={{
              mb: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 1.5,
              maxWidth: '800px',
              mx: 'auto',
              textAlign: 'left',
            }}
          >
            {[1, 2, 3, 4].map((index) => (
              <Typography
                key={index}
                variant="body1"
                sx={{
                  color: (theme) => (theme.palette.mode === 'light' ? '#333' : '#e0e0e0'),
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  lineHeight: 1.8,
                  position: 'relative',
                  pl: 3,
                  '&:before': {
                    content: '"•"',
                    position: 'absolute',
                    left: 0,
                    color: '#6a1b9a',
                    fontSize: '1.5rem',
                  },
                }}
              >
                {t(`reasons.${index}`)}
              </Typography>
            ))}
          </Box>

          <Divider
            sx={{
              my: 4,
              borderColor: (theme) => (theme.palette.mode === 'light' ? '#6a1b9a' : '#e1bee7'),
              borderWidth: '1px',
              opacity: 0.3,
              maxWidth: '400px',
              mx: 'auto',
            }}
          />

          <Typography
            variant="h5"
            sx={{
              mb: 2,
              fontWeight: 600,
              color: (theme) => (theme.palette.mode === 'light' ? '#6a1b9a' : '#e1bee7'),
              fontSize: { xs: '1.5rem', sm: '1.75rem' },
            }}
          >
            {t("joinTitle")}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              mb: 4,
              color: (theme) => (theme.palette.mode === 'light' ? '#333' : '#e0e0e0'),
              fontSize: { xs: '1rem', sm: '1.1rem' },
              lineHeight: 1.8,
              maxWidth: '800px',
              mx: 'auto',
            }}
          >
            {t("joinText")}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'center',
              gap: 2,
              mt: 2,
            }}
          >
            <Link href="/auth/signup" passHref>
              <Button
                variant="contained"
                sx={{
                  width: { xs: '100%', sm: '200px' },
                  bgcolor: '#6a1b9a',
                  color: 'white',
                  borderRadius: 6,
                  py: 1.5,
                  fontWeight: 600,
                  textTransform: 'none',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: '#8e24aa',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                  },
                }}
              >
                {t("getStarted")}
              </Button>
            </Link>
            <Link href="/contact" passHref>
              <Button
                variant="outlined"
                sx={{
                  width: { xs: '100%', sm: '200px' },
                  borderColor: '#6a1b9a',
                  color: '#6a1b9a',
                  borderRadius: 6,
                  py: 1.5,
                  fontWeight: 600,
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#8e24aa',
                    color: '#8e24aa',
                    bgcolor: 'rgba(106, 27, 154, 0.05)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                {t("contactUs")}
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
}