'use client';
/* eslint-disable react/no-unescaped-entities */
import { Button, Typography, Box, Divider } from '@mui/material';
import {Link} from "@/i18n/navigation";
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
            {t("title")}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 4 }}>
            {t("intro")}
          </Typography>

          <Divider />

          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            {t("missionTitle")}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 4 }}>
            {t("mission")}
          </Typography>

          <Divider />

          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            {t("whyChooseUsTitle")}
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
            <Typography variant="body1">{t("reasons.1")}</Typography>
            <Typography variant="body1">{t("reasons.2")}</Typography>
            <Typography variant="body1">{t("reasons.3")}</Typography>
            <Typography variant="body1">{t("reasons.4")}</Typography>
          </Box>

          <Divider />

          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            {t("joinTitle")}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 4 }}>
            {t("joinText")}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', gap: 4 }}>
            <Link href="/auth/signup" passHref>
              <Button variant="contained" sx={{ width: { xs: '100%', sm: 'auto' } }}>{t("getStarted")}</Button>
            </Link>
            <Link href="/contact" passHref>
              <Button variant="outlined" sx={{ width: { xs: '100%', sm: 'auto' } }}>{t("contactUs")}</Button>
            </Link>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
