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
    <AppBar position="static" sx={{ backgroundColor: "#1f2937", paddingY: 2 }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Social Media Icons */}
          <Box sx={{ display: "flex", gap: 2 }}>
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
          <Box textAlign="right">
            <Typography variant="body1" color="gray.300">
              © 2024 Balemuya. All rights reserved.
            </Typography>
            <Typography variant="body2" color="gray.500">
              Have questions? Contact us at{" "}
              <a href="mailto:support@balemuya.com" style={{ color: "#7E22CE", textDecoration: "none" }}>
                support@balemuya.com
              </a>
            </Typography>
            <Typography variant="caption" color="gray.500">
              Designed and developed with ❤️ by the Balemuya Team
            </Typography>

            {/* Feedback Button */}
            <Button
              variant="contained"
              sx={{ backgroundColor: "primary.main", mt: 2, ml: 2, "&:hover": { backgroundColor: "primary.main" } }}
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
          {/* Message Input */}
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

          {/* Rating Section */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="body2">Rate our app:</Typography>
            <Rating value={rating} onChange={(_, newValue) => setRating(newValue)} />
          </Box>
        </DialogContent>

        {/* Action Buttons */}
        <DialogActions>
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
