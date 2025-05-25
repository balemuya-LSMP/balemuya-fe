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

export default function ProfessionalDetailsPage() {
  const theme = useTheme();
  const { id } = useParams();
  const { data: customerData, isLoading } = useGetCustomerByIdQuery(id);
  const { position, getPosition } = useGeolocation();
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
                {customerInfo?.customer?.user?.full_name}
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
                    value={customerInfo?.customer?.rating || 0}
                    precision={0.5}
                    readOnly
                  />
                  <Typography variant="body1" sx={{ ml: 1 }}>
                    {customerInfo?.customer?.rating || "No ratings yet"}
                  </Typography>
                </Box>
                <Typography variant="body2">
                  {customerInfo?.customer?.user?.address?.city || customerInfo?.customer?.user?.address?.region || customerInfo?.customer?.user?.address?.country}
                </Typography>
              </Box>
            }
          />
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <FaLocationDot color={theme.palette.primary.main} />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {lat && lng && position?.lat && position?.lng ? (
                  `${getDistanceFromLatLon(
                    position.lat,
                    position.lng,
                    parseFloat(lat),
                    parseFloat(lng)
                  )} km away`
                ) : "Location not available"}
              </Typography>
            </Box>

            <Typography variant="subtitle1" sx={{ fontWeight: "medium" }}>
              Bio
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {customerInfo?.customer?.user?.bio || "No bio provided"}
            </Typography>

            <Typography variant="subtitle1" sx={{ fontWeight: "medium", mt: 2 }}>
              Contact
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Phone: {customerInfo?.customer?.user?.phone_number}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Email: {customerInfo?.customer?.user?.email}
            </Typography>
          </CardContent>
        </Card>

        {/* Active Service Posts Section */}
        {customerInfo?.active_service_posts?.length > 0 && (
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Active Service Posts ({customerInfo.active_service_posts.length})
              </Typography>
              <List sx={{ maxHeight: 300, overflow: "auto" }}>
                {customerInfo.active_service_posts.map((post: any, index: any) => (
                  <div key={post.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={
                          <Typography component="span" fontWeight="medium">
                            {post.title}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography component="span" variant="body2" color="text.secondary">
                              {post.description}
                            </Typography>
                            <Typography component="span" variant="caption" display="block">
                              Category: {post.category}
                            </Typography>
                            <Typography component="span" variant="caption" display="block">
                              Due: {new Date(post.work_due_date).toLocaleDateString()}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    {index < customerInfo.active_service_posts.length - 1 && (
                      <Divider variant="inset" component="li" />
                    )}
                  </div>
                ))}
              </List>
            </CardContent>
          </Card>
        )}

        {/* Completed Service Posts Section */}
        {customerInfo?.completed_service_posts?.length > 0 && (
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Completed Service Posts ({customerInfo.completed_service_posts.length})
              </Typography>
              <List sx={{ maxHeight: 300, overflow: "auto" }}>
                {customerInfo.completed_service_posts.map((post: any, index: any) => (
                  <div key={post.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={
                          <Typography component="span" fontWeight="medium">
                            {post.title}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography component="span" variant="body2" color="text.secondary">
                              {post.description}
                            </Typography>
                            <Typography component="span" variant="caption" display="block">
                              Category: {post.category}
                            </Typography>
                            <Typography component="span" variant="caption" display="block">
                              Due: {new Date(post.work_due_date).toLocaleDateString()}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    {index < customerInfo.completed_service_posts.length - 1 && (
                      <Divider variant="inset" component="li" />
                    )}
                  </div>
                ))}
              </List>
            </CardContent>
          </Card>
        )}

        {/* Reviews Section */}
        {customerInfo?.reviews?.length > 0 && (
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Customer Reviews ({customerInfo.reviews.length})
              </Typography>
              <List sx={{ maxHeight: 300, overflow: "auto" }}>
                {customerInfo.reviews.map((review: any, index: any) => (
                  <div key={review.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar src={review.user.profile_image_url}>
                          {review.user.full_name.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <>
                            <Typography component="span" fontWeight="medium">
                              {review.user.full_name}
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
                          <Typography component="span" variant="body2" color="text.secondary">
                            {review.comment}
                          </Typography>
                        }
                      />
                    </ListItem>
                    {index < customerInfo.reviews.length - 1 && (
                      <Divider variant="inset" component="li" />
                    )}
                  </div>
                ))}
              </List>
            </CardContent>
          </Card>
        )}
      </Box>

      {/* Right Side - Map */}
      <Box sx={{ width: "50%", height: "100%" }}>
        <Paper elevation={3} sx={{ height: "100%" }}>
          <MapComponent userLocations={userLocations} />
        </Paper>
      </Box>
    </Container>
  );
}