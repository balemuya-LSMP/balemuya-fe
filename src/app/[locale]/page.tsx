/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Footer from "./(features)/_components/footer";
import Header from "./(features)/_components/header";
import { Container, Box, Typography, Button, Card, CardContent, Avatar, Grid } from "@mui/material";
import { Search, People, Lock, PhoneIphone } from "@mui/icons-material";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { useGetFeedbackQuery } from "@/store/api/auth.api";

export default function Landing() {
  const router = useRouter();
  const { data: feedbackData } = useGetFeedbackQuery();
  const t = useTranslations("Landing");



  const testimonials = feedbackData?.results?.slice(0, 5).map((item: any) => ({
    image: item.user.profile_image_url || "https://via.placeholder.com/150",
    name: item.user.full_name ?? item.user.username,
    feedback: item.message,
  })) ?? [];

  const heroImages = [
    "https://img.freepik.com/free-photo/person-front-computer-working-html-concept_23-2150040132.jpg",
    "/images/balem.png",
    "https://img.freepik.com/free-photo/close-up-people-having-business-meeting_23-2147861950.jpg",

  ];

  return (
    <Box bgcolor="background.default" minHeight="100vh">
      <Header />
      <Box
        sx={{
          position: "relative",
          height: "80vh",
          width: "100%",
        }}
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          style={{ height: "100%", width: "100%" }}
        >
          {heroImages.map((image, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  backgroundImage: `url(${image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            zIndex: 1,
          }}
        >
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
              sx={{ fontSize: { xs: "2.5rem", md: "3.5rem" }, color: "whitesmoke", lineHeight: 1.2 }}
            >
              {t("title")}
            </Typography>
            <Typography
              variant="body1"
              mb={4}
              sx={{ fontSize: { xs: "1rem", md: "1.25rem" }, color: "whitesmoke", maxWidth: "600px", mx: "auto" }}
            >
              {t("description")}
            </Typography>
            <Box display="flex" gap={2} justifyContent="center">
              <Button
                onClick={() => router.push("/auth/login")}
                variant="contained"
                color="primary"
                size="large"
                sx={{ borderRadius: "25px", px: 4, py: 1.5, fontWeight: "bold" }}
              >
                {t("findProfessionals")}
              </Button>
              <Button
                onClick={() => router.push("/auth/signup")}
                variant="outlined"
                color="inherit"
                size="large"
                sx={{ borderRadius: "25px", px: 4, py: 1.5, fontWeight: "bold" }}
              >
                {t("offerServices")}
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
          sx={{ fontSize: { xs: "2rem", md: "2.5rem" } }}
        >
          {t("keyFeatures")}
        </Typography>
        <Grid container spacing={4} textAlign="center">
          {[t("features.0"), t("features.1"), t("features.2")].map((title, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card
                sx={{
                  p: 3,
                  textAlign: "center",
                  borderRadius: 3,
                  boxShadow: 2,
                  transition: "transform 0.3s",
                  "&:hover": { transform: "translateY(-5px)" },
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: "1.25rem" }}>
                    {title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {index === 0 ? t("featuresDesc.0") : index === 1 ? t("featuresDesc.1") : t("featuresDesc.2")}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Benefits Section */}
      <Box py={8}>
        <Container>
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
            sx={{ fontSize: { xs: "2rem", md: "2.5rem" } }}
          >
            {t("benefitsTitle")}
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              { title: t("benefits.0"), icon: <Search sx={{ fontSize: 50, color: "primary.main" }} /> },
              { title: t("benefits.1"), icon: <People sx={{ fontSize: 50, color: "primary.main" }} /> },
              { title: t("benefits.2"), icon: <Lock sx={{ fontSize: 50, color: "primary.main" }} /> },
            ].map((benefit, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    boxShadow: 2,
                    borderRadius: 3,
                    transition: "transform 0.3s",
                    "&:hover": { transform: "translateY(-5px)" },
                  }}
                >
                  <CardContent sx={{ textAlign: "center", flexGrow: 1 }}>
                    <Box sx={{ mb: 2 }}>{benefit.icon}</Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ fontSize: "1.25rem" }}>
                      {benefit.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {index === 0 ? t("benefitsDesc.0") : index === 1 ? t("benefitsDesc.1") : t("benefitsDesc.2")}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box py={8} textAlign="center">
        <Container>
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ fontSize: { xs: "2rem", md: "2.5rem" } }}
          >
            {t("testimonialsTitle")}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: 'auto', mt: 2 }}
          >
            {t("testimonialSubtitle")}
          </Typography>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
          >
            {testimonials.map((testimonial: any, index: any) => (
              <SwiperSlide key={index}>
                <Card
                  sx={{ p: 3, maxWidth: 400, mx: "auto", textAlign: "center", borderRadius: 3, boxShadow: 2 }}
                >
                  <Avatar
                    src={testimonial.image}
                    alt={testimonial.name}
                    sx={{ width: 72, height: 72, mb: 2, mx: "auto" }}
                  />
                  <Typography
                    variant="body1"
                    fontStyle="italic"
                    gutterBottom
                    sx={{
                      fontSize: '1.1rem',
                      lineHeight: 1.7,
                      color: 'text.secondary',
                      mb: 3,
                      position: 'relative',
                      '&:before, &:after': {
                        content: '"\\201C"',
                        fontSize: '3rem',
                        color: 'rgba(0,0,0,0.1)',
                        position: 'absolute',
                        top: -20,
                        left: -15
                      },
                      '&:after': {
                        content: '"\\201D"',
                        left: 'auto',
                        right: -15,
                        top: 'auto',
                        bottom: -40
                      }
                    }}
                  >
                    {testimonial.feedback}
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {testimonial.name}
                  </Typography>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </Box>

      {/* App Download Section */}
      {/* App Download Section */}
      <Box textAlign="center" py={8} sx={{ bgcolor: "background.paper" }}>
        <Container maxWidth="md" sx={{ bgcolor: "background.paper", p: 4, borderRadius: 3, boxShadow: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}>
            {t("appTitle")}
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            mb={3}
            sx={{ fontSize: { xs: "1rem", md: "1.125rem" } }}
          >
            {t("appDesc")}
          </Typography>
          <Box display="flex" justifyContent="center" gap={2} mb={4} flexWrap="wrap">
            <Button
              variant="contained"
              color="primary"
              endIcon={<PhoneIphone />}
              size="large"
              onClick={() => window.open("https://link-to-your-app-store", "_blank")}
              sx={{ borderRadius: "25px", px: 4, py: 1.5, fontWeight: "bold" }}
            >
              {t("downloadBtn")}
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => window.open("https://t.me/balemuyaBot", "_blank")}
              sx={{ borderRadius: "25px", px: 4, py: 1.5, fontWeight: "bold" }}
            >
              {t("contactTelegram")}
            </Button>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}