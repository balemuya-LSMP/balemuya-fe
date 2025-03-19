/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Container, TextField, Button, Typography, Box, Paper } from "@mui/material";
import Header from "../(features)/_components/header";
import Footer from "../(features)/_components/footer";

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    alert("Message Sent! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <Header />
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default", display: "flex", alignItems: "center", justifyContent: "center", padding: 4 }}>
        <Container maxWidth="sm">
          <Paper elevation={4} sx={{ padding: 4, textAlign: "center", borderRadius: 3, transition: "transform 0.3s", "&:hover": { transform: "scale(1.05)" } }}>
            <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Have a question or need assistance? Fill out the form below and we'll get back to you soon.
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} required margin="normal" variant="outlined" />
              <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required margin="normal" variant="outlined" />
              <TextField fullWidth label="Message" name="message" value={formData.message} onChange={handleChange} required margin="normal" variant="outlined" multiline rows={4} />
              <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2, py: 1.5, fontSize: "1rem" }}>
                Send Message
              </Button>
            </Box>
            <Box sx={{ mt: 4, textAlign: "left" }}>
              <Typography variant="body1"><strong>📍 Location:</strong> Addis Ababa, Ethiopia</Typography>
              <Typography variant="body1" mt={1}><strong>📞 Phone:</strong> +251 911 123 456</Typography>
              <Typography variant="body1" mt={1}><strong>📧 Email:</strong> support@balemuya.com</Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
