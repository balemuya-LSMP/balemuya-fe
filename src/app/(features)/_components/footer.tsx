"use client";

import { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useGiveFeedbackMutation } from "@/store/api/userProfile.api";
import { toast, ToastContainer } from "react-toastify";
import {
  AppBar,
  Toolbar,
  Container,
  IconButton,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating,
  Box,
} from "@mui/material";

export default function Footer() {
  const [giveFeedback] = useGiveFeedbackMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState<number | null>(0);

  const handleSubmit = async () => {
    const newData = { message, rating };

    try {
      await giveFeedback({ data: newData }).unwrap();
      toast("Feedback submitted successfully");
      setIsOpen(false);
      setMessage("");
      setRating(0);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#242424", py: 2 }}>
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {/* Social Media Icons */}
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mb: { xs: 2, sm: 0 } }}>
            <IconButton href="https://www.facebook.com/balemuya" target="_blank" color="inherit">
              <FaFacebook size={24} />
            </IconButton>
            <IconButton href="https://www.twitter.com/balemuya" target="_blank" color="inherit">
              <FaTwitter size={24} />
            </IconButton>
            <IconButton href="https://www.instagram.com/balemuya" target="_blank" color="inherit">
              <FaInstagram size={24} />
            </IconButton>
            <IconButton href="https://www.linkedin.com/company/balemuya" target="_blank" color="inherit">
              <FaLinkedin size={24} />
            </IconButton>
          </Box>

          {/* Footer Text & Feedback Button */}
          <Box sx={{ textAlign: "center", mb: { xs: 2, sm: 0 } }}>
            <Typography variant="body2" color="#7E22CE">
              © 2024 Balemuya. All rights reserved.
            </Typography>
            <Typography variant="body2" color="#7E22CE">
              Contact us at{" "}
              <a href="mailto:support@balemuya.com" style={{ color: "#7E22CE", textDecoration: "none" }}>
                support@balemuya.com
              </a>
            </Typography>
            <Typography variant="caption" color="gray.500">
              Designed with ❤️ by the Balemuya Team
            </Typography>
          </Box>

          {/* Feedback Button */}
          <Box sx={{ textAlign: "center" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "primary.main",
                "&:hover": { backgroundColor: "primary.dark" },
                width: { xs: "100%", sm: "auto" }, // Full width on mobile
              }}
              onClick={() => setIsOpen(true)}
            >
              Give Feedback
            </Button>
          </Box>
        </Toolbar>
      </Container>

      {/* Feedback Dialog (Modal) */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Give Feedback</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Write your feedback..."
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ mt: 2 }}
          />

          <Box sx={{ mt: 3, textAlign: "start" }}>
            <Typography variant="body2">Rate our app:</Typography>
            <Rating value={rating} onChange={(_, newValue) => setRating(newValue)} />
          </Box>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "end", pb: 2, mr:2 }}>
          <Button
            onClick={handleSubmit}
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              "&:hover": { backgroundColor: "primary.dark" },
            }}
          >
            Submit
          </Button>
          <Button onClick={() => setIsOpen(false)} color="secondary" variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer position="top-center" />
    </AppBar>
  );
}
