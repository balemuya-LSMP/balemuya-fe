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
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useGetCustomerByIdQuery } from "@/store/api/user.api";
import { useRequestProfessionalServiceMutation } from "@/store/api/services.api";
import { getDistanceFromLatLon } from "@/shared/utils";
import Loader from "@/app/[locale]/(features)/_components/loader";
import MapComponent from "@/app/[locale]/(features)/_components/map";
import Header from "../../_components/header";
import Footer from "@/app/[locale]/(features)/_components/footer";


export default function CustomerDetailsPage() {
  const theme = useTheme();
  const { id } = useParams();
  const { data: customerData, isLoading } = useGetCustomerByIdQuery(id);
  const { position, getPosition } = useGeolocation();
  const [message, setMessage] = useState("");
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));

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
    <>
    <Header searchQuery={""} setSearchQuery={function (query: string): void {
        throw new Error("Function not implemented.");
      } } filter={[]} setFilter={function (filter: string[]): void {
        throw new Error("Function not implemented.");
      } }/>
    <Container
      maxWidth={false}
      sx={{
        p: { xs: 1, sm: 2, md: 3 },
        height: "auto",
        minHeight: "calc(100vh - 64px)",
      }}
    >
      <Grid container spacing={3} sx={{ height: "100%" }}>
        {/* Left Side - Details */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            height: "100%",
            overflowY: "auto",
            pr: { xs: 0, md: 2 },
            order: { xs: 2, md: 1 },
          }}
        >
          {/* Profile Card */}
          <Card
            sx={{
              mb: 3,
              borderRadius: 2,
              boxShadow: theme.shadows[2],
              "&:hover": {
                boxShadow: theme.shadows[4],
              },
              transition: "box-shadow 0.3s ease",
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  src={customerInfo?.customer?.user?.profile_image_url}
                  alt={customerInfo?.customer?.user?.first_name}
                  sx={{ width: 56, height: 56 }}
                />
              }
              title={
                <Typography variant="h6" component="div" fontWeight="bold">
                  {customerInfo?.customer?.user?.full_name}
                </Typography>
              }
              subheader={
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  sx={{ textTransform: "capitalize" }}
                >
                  {customerInfo?.customer?.user?.user_type}
                </Typography>
              }
              action={
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: { xs: "flex-start", sm: "flex-end" },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Rating
                      value={customerInfo?.customer?.rating || 0}
                      precision={0.5}
                      readOnly
                      size={isMobile ? "small" : "medium"}
                    />
                    <Typography variant="body1" sx={{ ml: 1 }}>
                      {customerInfo?.customer?.rating || "No ratings yet"}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    {customerInfo?.customer?.user?.address?.city ||
                      customerInfo?.customer?.user?.address?.region ||
                      customerInfo?.customer?.user?.address?.country}
                  </Typography>
                </Box>
              }
              sx={{
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-start", sm: "center" },
                "& .MuiCardHeader-action": {
                  mt: { xs: 1, sm: 0 },
                  ml: { xs: 0, sm: 2 },
                },
              }}
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

              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "medium", color: theme.palette.text.primary }}
              >
                Bio
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1, lineHeight: 1.6 }}
              >
                {customerInfo?.customer?.user?.bio || "No bio provided"}
              </Typography>

              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "medium",
                  mt: 2,
                  color: theme.palette.text.primary,
                }}
              >
                Contact
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1, display: "flex", alignItems: "center" }}
              >
                <Box
                  component="span"
                  sx={{
                    fontWeight: "medium",
                    minWidth: 80,
                    color: theme.palette.text.primary,
                  }}
                >
                  Phone:
                </Box>
                {customerInfo?.customer?.user?.phone_number || "Not provided"}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1, display: "flex", alignItems: "center" }}
              >
                <Box
                  component="span"
                  sx={{
                    fontWeight: "medium",
                    minWidth: 80,
                    color: theme.palette.text.primary,
                  }}
                >
                  Email:
                </Box>
                {customerInfo?.customer?.user?.email}
              </Typography>
            </CardContent>
          </Card>

          {/* Active Service Posts Section */}
          {customerInfo?.active_service_posts?.length > 0 && (
            <Card
              sx={{
                mb: 3,
                borderRadius: 2,
                boxShadow: theme.shadows[2],
                "&:hover": {
                  boxShadow: theme.shadows[4],
                },
                transition: "box-shadow 0.3s ease",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, color: theme.palette.text.primary }}
                >
                  Active Service Posts ({customerInfo.active_service_posts.length})
                </Typography>
                <List sx={{ maxHeight: 300, overflow: "auto" }}>
                  {customerInfo.active_service_posts.map(
                    (post: any, index: any) => (
                      <div key={post.id}>
                        <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                          <ListItemText
                            primary={
                              <Typography
                                component="span"
                                fontWeight="medium"
                                color="primary"
                              >
                                {post.title}
                              </Typography>
                            }
                            secondary={
                              <>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  color="text.secondary"
                                  display="block"
                                  sx={{ mt: 0.5 }}
                                >
                                  {post.description}
                                </Typography>
                                <Box
                                  component="span"
                                  sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 1,
                                    mt: 1,
                                  }}
                                >
                                  <Typography
                                    component="span"
                                    variant="caption"
                                    sx={{
                                      bgcolor: theme.palette.grey[200],
                                      px: 1,
                                      borderRadius: 1,
                                    }}
                                  >
                                    Category: {post.category}
                                  </Typography>
                                  <Typography
                                    component="span"
                                    variant="caption"
                                    sx={{
                                      bgcolor: theme.palette.grey[200],
                                      px: 1,
                                      borderRadius: 1,
                                    }}
                                  >
                                    Due:{" "}
                                    {new Date(
                                      post.work_due_date
                                    ).toLocaleDateString()}
                                  </Typography>
                                </Box>
                              </>
                            }
                          />
                        </ListItem>
                        {index < customerInfo.active_service_posts.length - 1 && (
                          <Divider variant="inset" component="li" />
                        )}
                      </div>
                    )
                  )}
                </List>
              </CardContent>
            </Card>
          )}

          {/* Completed Service Posts Section */}
          {customerInfo?.completed_service_posts?.length > 0 && (
            <Card
              sx={{
                mb: 3,
                borderRadius: 2,
                boxShadow: theme.shadows[2],
                "&:hover": {
                  boxShadow: theme.shadows[4],
                },
                transition: "box-shadow 0.3s ease",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, color: theme.palette.text.primary }}
                >
                  Completed Service Posts (
                  {customerInfo.completed_service_posts.length})
                </Typography>
                <List sx={{ maxHeight: 300, overflow: "auto" }}>
                  {customerInfo.completed_service_posts.map(
                    (post: any, index: any) => (
                      <div key={post.id}>
                        <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                          <ListItemText
                            primary={
                              <Typography
                                component="span"
                                fontWeight="medium"
                                color="primary"
                              >
                                {post.title}
                              </Typography>
                            }
                            secondary={
                              <>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  color="text.secondary"
                                  display="block"
                                  sx={{ mt: 0.5 }}
                                >
                                  {post.description}
                                </Typography>
                                <Box
                                  component="span"
                                  sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 1,
                                    mt: 1,
                                  }}
                                >
                                  <Typography
                                    component="span"
                                    variant="caption"
                                    sx={{
                                      bgcolor: theme.palette.grey[200],
                                      px: 1,
                                      borderRadius: 1,
                                    }}
                                  >
                                    Category: {post.category}
                                  </Typography>
                                  <Typography
                                    component="span"
                                    variant="caption"
                                    sx={{
                                      bgcolor: theme.palette.grey[200],
                                      px: 1,
                                      borderRadius: 1,
                                    }}
                                  >
                                    Due:{" "}
                                    {new Date(
                                      post.work_due_date
                                    ).toLocaleDateString()}
                                  </Typography>
                                </Box>
                              </>
                            }
                          />
                        </ListItem>
                        {index <
                          customerInfo.completed_service_posts.length - 1 && (
                          <Divider variant="inset" component="li" />
                        )}
                      </div>
                    )
                  )}
                </List>
              </CardContent>
            </Card>
          )}

          {/* Reviews Section */}
          {customerInfo?.reviews?.length > 0 && (
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: theme.shadows[2],
                "&:hover": {
                  boxShadow: theme.shadows[4],
                },
                transition: "box-shadow 0.3s ease",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, color: theme.palette.text.primary }}
                >
                  Customer Reviews ({customerInfo.reviews.length})
                </Typography>
                <List sx={{ maxHeight: 300, overflow: "auto" }}>
                  {customerInfo.reviews.map((review: any, index: any) => (
                    <div key={review.id}>
                      <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                        <ListItemAvatar>
                          <Avatar src={review.user.profile_image_url}>
                            {review.user.full_name.charAt(0)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box
                              component="span"
                              sx={{
                                display: "flex",
                                flexDirection: { xs: "column", sm: "row" },
                                alignItems: { xs: "flex-start", sm: "center" },
                              }}
                            >
                              <Typography
                                component="span"
                                fontWeight="medium"
                              >
                                {review.user.full_name}
                              </Typography>
                              <Rating
                                value={review.rating}
                                readOnly
                                size="small"
                                sx={{ ml: { xs: 0, sm: 1 }, mt: { xs: 0.5, sm: 0 } }}
                              />
                            </Box>
                          }
                          secondary={
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.secondary"
                              sx={{ display: "inline-block", mt: 0.5 }}
                            >
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
        </Grid>

        {/* Right Side - Map */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            height: { xs: "400px", md: "calc(100vh - 120px)" },
            order: { xs: 1, md: 2 },
            mb: { xs: 2, md: 0 },
          }}
        >
          <Paper
            elevation={3}
            sx={{
              height: "100%",
              borderRadius: 2,
              overflow: "hidden",
              "&:hover": {
                boxShadow: theme.shadows[6],
              },
              transition: "box-shadow 0.3s ease",
            }}
          >
            <MapComponent userLocations={userLocations} />
          </Paper>
        </Grid>
      </Grid>
      </Container>
      <Footer/>
      </>
  );
}