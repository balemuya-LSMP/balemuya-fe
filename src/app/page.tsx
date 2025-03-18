/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
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

export default function Landing() {
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

      <Box
        sx={{
          backgroundImage: "url('/images/main.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          py: 12,
        }}
      >
        <Box sx={{ position: "absolute", inset: 0, bgcolor: "rgba(0, 0, 0, 0.5)" }} />
        <Container sx={{ position: "relative", textAlign: "center", color: "white" }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Connect Professionals with Customers
          </Typography>
          <Typography variant="body1" mb={4}>
            Whether you're a skilled professional seeking clients or a customer looking for reliable expertise nearby, we make it simple for both.
          </Typography>
          <Box display="flex" justifyContent="center" gap={2}>
            <Button variant="contained" color="primary" size="large">Find Professionals</Button>
            <Button variant="outlined" color="inherit" size="large">Offer Your Services</Button>
          </Box>
        </Container>
      </Box>

      {/* New Section: Features */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          Key Features
        </Typography>
        <Grid container spacing={4} textAlign="center">
          {["Find Experts", "Post Opportunities", "Connect Seamlessly"].map((title, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card sx={{ p: 3, textAlign: "center" }}>
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>{title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {index === 0 ? "Browse a wide range of professionals to meet your needs."
                      : index === 1 ? "Share your work requirements and let professionals come to you."
                        : "Communicate and collaborate with ease on our platform."}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* New Section: User Benefits Cards */}
      <Box bgcolor="#f9f9f9" py={6}>
        <Container>
          <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
            Benefits of Using Our Platform
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              { title: "Easy Search", icon: <Search sx={{ fontSize: 50 }} /> },
              { title: "Wide Range of Experts", icon: <People sx={{ fontSize: 50 }} /> },
              { title: "Secure Payments", icon: <Lock sx={{ fontSize: 50 }} /> },
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
                        ? "Quickly search and filter professionals."
                        : index === 1
                          ? "Choose from a variety of professionals for your needs."
                          : "Pay securely through trusted payment gateways."}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box bgcolor="#f3f4f6" py={6} textAlign="center">
        <Container>
          <Typography variant="h4" fontWeight="bold" gutterBottom>What Our Users Say</Typography>
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

      <Box textAlign="center" py={6}>
        <Container>
          <Typography variant="h5" gutterBottom>
            Ready to experience the power of our mobile app?
          </Typography>
          <Typography variant="body1" color="textSecondary" mb={3}>
            Download our mobile app today and take your business on the go! Available for both iOS and Android.
          </Typography>
          <Box display="flex" justifyContent="center" gap={2} mb={4}>
            <Button
              variant="contained"
              color="primary"
              endIcon={<PhoneIphone />}
              size="large"
              onClick={() => window.open("https://link-to-your-app-store", "_blank")} // Replace with your app store link
            >
              Download Now
            </Button>
          </Box>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
