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
export default function Landing() {
  const router = useRouter();

  const t = useTranslations("Landing");

  const testimonials = [
    {
      image:
        "https://img.freepik.com/free-vector/young-prince-royal-attire_1308-176144.jpg?t=st=1734116405~exp=1734120005~hmac=9d83712b527a76bde4381cf825822c4256d5d6a1120aedcdc283d90792bb6556&w=740",
      name: "Ephrem Habtamu",
      feedback: "This platform helped me find great professionals quickly!",
    },
    {
      image:
        "https://img.freepik.com/free-vector/young-prince-royal-attire_1308-176144.jpg?t=st=1734116405~exp=1734120005~hmac=9d83712b527a76bde4381cf825822c4256d5d6a1120aedcdc283d90792bb6556&w=740",
      name: "Esubalew Kunta",
      feedback: "A fantastic experience! I found everything I needed!",
    },
    {
      image:
        "https://img.freepik.com/free-vector/young-prince-royal-attire_1308-176144.jpg?t=st=1734116405~exp=1734120005~hmac=9d83712b527a76bde4381cf825822c4256d5d6a1120aedcdc283d90792bb6556&w=740",
      name: "Alice Johnson",
      feedback: "The best platform for connecting with experts!",
    },
    {
      image:
        "https://img.freepik.com/free-vector/young-prince-royal-attire_1308-176144.jpg?t=st=1734116405~exp=1734120005~hmac=9d83712b527a76bde4381cf825822c4256d5d6a1120aedcdc283d90792bb6556&w=740",
      name: "Yikeber Misganaw",
      feedback: "I found the perfect professional for my project!",
    },
  ];

  return (
    <Box bgcolor="background.default" minHeight="100vh">
      <Header />

      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center", height: "80vh", color: "white", background: 'linear-gradient(135deg, #A084E8, #D0A2F7)' }}>
        <Box sx={{ flex: 1, textAlign: "left", pr: 4, pl: { xs: 2, sm: 4 } }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            {t("title")}
          </Typography>
          <Typography variant="body1" mb={4}>
            {t("description")}
          </Typography>
          <Box display="flex" gap={2}>
            <Button
              onClick={() => router.push("/auth/login")}
              variant="contained" color="primary" size="large">
              {t("findProfessionals")}
            </Button>
            <Button
              onClick={() => router.push("/auth/signup")}
              variant="outlined" color="inherit" size="large">
              {t("offerServices")}
            </Button>
          </Box>
        </Box>
        <Box sx={{ width: "50%", height: "100%", backgroundImage: "url('/images/hero.jpeg')", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center" }} />
      </Box>
      {/* New Section: Features */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          {t("keyFeatures")}
        </Typography>
        <Grid container spacing={4} textAlign="center">
          {[t("features.0"), t("features.1"), t("features.2")].map((title, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card sx={{ p: 3, textAlign: "center" }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>{title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {index === 0 ? t("featuresDesc.0")
                      : index === 1 ? t("featuresDesc.1")
                        : t("featuresDesc.2")}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* New Section: User Benefits Cards */}
      <Box py={6}>
        <Container>
          <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
            {t("benefitsTitle")}
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              { title: t("benefits.0"), icon: <Search sx={{ fontSize: 50 }} /> },
              { title: t("benefits.1"), icon: <People sx={{ fontSize: 50 }} /> },
              { title: t("benefits.2"), icon: <Lock sx={{ fontSize: 50 }} /> },
            ].map((benefit, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Card sx={{ display: "flex", flexDirection: "column", height: "100%", boxShadow: 3 }}>
                  <CardContent sx={{ textAlign: "center", flexGrow: 1 }}>
                    <Box sx={{ mb: 2 }}>
                      {benefit.icon}
                    </Box>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {benefit.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {index === 0
                        ? t("benefitsDesc.0")
                        : index === 1
                          ? t("benefitsDesc.1")
                          : t("benefitsDesc.2")}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box py={6} textAlign="center">
        <Container>
          <Typography variant="h4" fontWeight="bold" gutterBottom>{t("testimonialsTitle")}</Typography>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <Card sx={{ p: 3, maxWidth: 400, mx: "auto", textAlign: "center" }}>
                  <Avatar src={testimonial.image} alt={testimonial.name} sx={{ width: 72, height: 72, mb: 2, mx: "auto" }} />
                  <Typography variant="body1" fontStyle="italic" gutterBottom>
                    "{testimonial.feedback}"
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

      <Box textAlign="center" py={6} sx={{ bgcolor: "background.paper" }}>
        <Container maxWidth="md" sx={{ bgcolor: "background.paper", p: 4, borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h5" gutterBottom>
            {t("appTitle")}
          </Typography>
          <Typography variant="body1" color="textSecondary" mb={3}>
            {t("appDesc")}
          </Typography>
          <Box display="flex" justifyContent="center" gap={2} mb={4}>
            <Button
              variant="contained"
              color="primary"
              endIcon={<PhoneIphone />}
              size="large"
              onClick={() => window.open("https://link-to-your-app-store", "_blank")} // Replace with your app store link
            >
              {t("downloadBtn")}
            </Button>
          </Box>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
