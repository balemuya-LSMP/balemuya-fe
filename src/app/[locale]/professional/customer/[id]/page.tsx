/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaLocationDot } from "react-icons/fa6";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  Grid,
  TextField,
  Modal,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Rating,
  IconButton,
  Container,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useGetCustomerByIdQuery } from "@/store/api/user.api";
import { useRequestProfessionalServiceMutation } from "@/store/api/services.api";
import { getDistanceFromLatLon } from "@/shared/utils";
import Loader from "@/app/[locale]/(features)/_components/loader";
import MapComponent from "@/app/[locale]/(features)/_components/map";

const job = {
  id: 1,
  reviews: [
    { client: "Jane", rating: 5, comment: "Great work!" },
    { client: "Bob", rating: 4, comment: "Quick and professional." },
    { client: "Bob", rating: 4, comment: "Quick and professional." },
    { client: "Bob", rating: 4, comment: "Quick and professional." },
    { client: "Bob", rating: 4, comment: "Quick and professional." },
  ],
  previous_work: [
    "/images/main.jpg",
    "/images/main.jpg",
    "/images/main.jpg",
    "/images/main.jpg",
  ],
};

export default function ProfessionalDetailsPage() {
  const theme = useTheme();
  const { id } = useParams();
  const { data: customerData, isLoading } = useGetCustomerByIdQuery(id);
  const { position, getPosition } = useGeolocation();
  const [requestService] = useRequestProfessionalServiceMutation();
  const [requestModal, setRequestModal] = useState(false);
  const [message, setMessage] = useState("");

  const customerInfo = customerData?.data;

  useEffect(() => {
    getPosition();
  }, []);

  const lat = customerInfo?.customer?.user?.address?.latitude;
  const lng = customerInfo?.customer?.user?.address?.longitude;

  const userLocations = [
    {
      latitude: lat,
      longitude: lng,
      name: customerInfo?.customer?.user?.first_name,
    },
  ];

  const handleRequest = () => {
    const newData = {
      professional_id: customerInfo?.customer?.user?.id,
      detail: message,
    };
    requestService({ data: newData }).unwrap();
    toast.success("Request sent successfully");
    setMessage("");
    setRequestModal(false);
  };

  if (isLoading) return <Loader />;

  return (
    <Container maxWidth={false} sx={{ display: "flex", gap: 3, p: 3, height: "calc(100vh - 64px)" }}>
      {/* Left Side - Details */}
      <Box sx={{ width: "50%", height: "100%", overflowY: "auto", pr: 2 }}>
        {/* Job Details Card */}
        <Card sx={{ mb: 3 }}>
          <CardHeader
            avatar={
              <Avatar
                src={customerInfo?.customer?.user?.profile_image_url}
                alt={customerInfo?.customer?.user?.first_name}
                sx={{ width: 56, height: 56 }}
              />
            }
            title={
              <Typography variant="h6" component="div">
                {customerInfo?.customer?.user?.first_name}
              </Typography>
            }
            subheader={
              <Typography variant="subtitle1" color="text.secondary">
                {customerInfo?.customer?.user?.user_type}
              </Typography>
            }
            action={
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Rating
                    value={customerInfo?.customer?.rating}
                    precision={0.5}
                    readOnly
                  />
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    {customerInfo?.customer?.rating}
                  </Typography>
                </Box>
                <Typography variant="body2">
                  {customerInfo?.customer?.user?.address?.country}
                </Typography>
              </Box>
            }
          />
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <FaLocationDot color={theme.palette.primary.main} />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {getDistanceFromLatLon(
                  position?.lat ?? 11.6,
                  position?.lng ?? 37.3833333,
                  lat,
                  lng
                )}
              </Typography>
            </Box>

            <Typography variant="subtitle1" sx={{ fontWeight: "medium" }}>
              Bio
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {customerInfo?.customer?.user?.bio}
            </Typography>
          </CardContent>
        </Card>

        {/* Previous Work Section */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Previous Work
            </Typography>
            <Grid container spacing={2}>
              {job.previous_work.map((photo, index) => (
                <Grid item xs={6} sm={4} md={3} key={index}>
                  <Paper elevation={2}>
                    <Box
                      component="img"
                      src={photo}
                      alt={`Previous work ${index + 1}`}
                      sx={{
                        width: "100%",
                        height: 150,
                        objectFit: "cover",
                      }}
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* Reviews Section */}
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Customer Reviews
            </Typography>
            <List sx={{ maxHeight: 300, overflow: "auto" }}>
              {job.reviews.map((review, index) => (
                <div key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar>{review.client.charAt(0)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <>
                          <Typography component="span" fontWeight="medium">
                            {review.client}
                          </Typography>
                          <Rating
                            value={review.rating}
                            readOnly
                            size="small"
                            sx={{ ml: 1 }}
                          />
                        </>
                      }
                      secondary={
                        <Typography variant="body2" color="text.secondary">
                          {review.comment}
                        </Typography>
                      }
                    />
                  </ListItem>
                  {index < job.reviews.length - 1 && <Divider variant="inset" component="li" />}
                </div>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* Request Service Button */}
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          onClick={() => setRequestModal(true)}
        >
          Request Service
        </Button>
      </Box>

      {/* Right Side - Map */}
      <Box sx={{ width: "50%", height: "100%" }}>
        <Paper elevation={3} sx={{ height: "100%" }}>
          <MapComponent userLocations={userLocations} />
        </Paper>
      </Box>

      {/* Request Service Modal */}
      <Modal open={requestModal} onClose={() => setRequestModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "33%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Request Service
          </Typography>
          <TextField
            multiline
            rows={4}
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your request details..."
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={handleRequest}
            disabled={!message}
          >
            Send Request
          </Button>
        </Box>
      </Modal>
    </Container>
  );
}