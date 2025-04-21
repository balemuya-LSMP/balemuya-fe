"use client";

import { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHeart } from "react-icons/fa";
import { useGiveFeedbackMutation } from "@/store/api/userProfile.api";
import { toast, ToastContainer } from "react-toastify";
import {
  AppBar,
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
  Divider,
  useTheme,
} from "@mui/material";
import { useTranslations } from "next-intl";

export default function Footer() {
  const [giveFeedback] = useGiveFeedbackMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState<number | null>(0);
  const theme = useTheme();
  const t = useTranslations("footer");

  const handleSubmit = async () => {
    const newData = { message, rating };

    try {
      await giveFeedback({ data: newData }).unwrap();
      toast.success(t("feedbackSuccess"));
      setIsOpen(false);
      setMessage("");
      setRating(0);
    } catch (error) {
      console.error(error);
      toast.error(t("feedbackError"));
    }
  };

  return (
    <AppBar
      position="static"
      component="footer"
      sx={{
        backgroundColor: "#183B4E",
        py: 4,
        mt: 'auto',
        boxShadow: 'none',
        borderTop: `1px solid ${theme.palette.divider}`
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
            gap: 4,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Social Media Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-start" },
              gap: 2
            }}
          >
            <Typography variant="h6" color="white" fontWeight="bold">
              {t("connectWithUs")}
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                href="https://www.facebook.com/balemuya"
                target="_blank"
                sx={{
                  color: "white",
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)'
                  }
                }}
              >
                <FaFacebook size={18} />
              </IconButton>
              <IconButton
                href="https://www.twitter.com/balemuya"
                target="_blank"
                sx={{
                  color: "white",
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)'
                  }
                }}
              >
                <FaTwitter size={18} />
              </IconButton>
              <IconButton
                href="https://www.instagram.com/balemuya"
                target="_blank"
                sx={{
                  color: "white",
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)'
                  }
                }}
              >
                <FaInstagram size={18} />
              </IconButton>
              <IconButton
                href="https://www.linkedin.com/company/balemuya"
                target="_blank"
                sx={{
                  color: "white",
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.2)'
                  }
                }}
              >
                <FaLinkedin size={18} />
              </IconButton>
            </Box>
          </Box>

          {/* Company Info Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              fontSize: { xs: "0.875rem", md: "1rem" },
              alignItems: "center",
              gap: 1,
              textAlign: "center"
            }}
          >
            <Typography variant="body2" color="white" sx={{ opacity: 0.9 }}>
              {t("contact")}{" "}
              <a
                href="mailto:support@balemuya.com"
                style={{
                  color: "white",
                  textDecoration: "underline",
                }}
              >
                support@balemuya.com
              </a>
            </Typography>
            <Typography
              variant="caption"
              color="white"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                opacity: 0.7,
                mt: 1
              }}
            >
              {t("designedBy")} <FaHeart size={12} color={theme.palette.error.main} />
            </Typography>
          </Box>

          {/* Feedback Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-end" },
              gap: 2
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: "white",
                px: 4,
                py: 1,
                borderRadius: 1,
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                  transform: "translateY(-1px)",
                  boxShadow: theme.shadows[2]
                },
                transition: "all 0.2s ease-in-out"
              }}
              onClick={() => setIsOpen(true)}
            >
              {t("feedbackButton")}
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 3, backgroundColor: 'rgba(255,255,255,0.1)' }} />

        <Typography
          variant="caption"
          color="white"
          sx={{
            display: "block",
            textAlign: "center",
            opacity: 0.6
          }}
        >
          © {new Date().getFullYear()} Balemuya. {t("allRightsReserved")}
        </Typography>
      </Container>

      {/* Feedback Dialog */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            p: 1
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 600, pb: 1 }}>
          {t("feedbackTitle")}
        </DialogTitle>

        <DialogContent>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t("ratingLabel")}
            </Typography>
            <Rating
              value={rating}
              onChange={(_, newValue) => setRating(newValue)}
              size="large"
            />
          </Box>

          <TextField
            fullWidth
            multiline
            rows={4}
            label={t("feedbackLabel")}
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
              }
            }}
          />
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button
            onClick={() => setIsOpen(false)}
            color="inherit"
            sx={{
              px: 3,
              py: 1,
              borderRadius: 1,
              textTransform: "none",
              border: `1px solid ${theme.palette.divider}`
            }}
          >
            {t("cancel")}
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            sx={{
              px: 3,
              py: 1,
              borderRadius: 1,
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
              "&:disabled": {
                backgroundColor: theme.palette.action.disabledBackground
              }
            }}
            disabled={!message || rating === 0}
          >
            {t("submit")}
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer
        position="top-center"
        toastStyle={{
          borderRadius: 8,
          boxShadow: theme.shadows[3]
        }}
      />
    </AppBar>
  );
}