/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
'use client';
import { FaUser, FaRegFileAlt, FaMapMarkerAlt } from "react-icons/fa";
import { MdVerifiedUser, MdPersonAdd, MdPayment } from "react-icons/md";
import { GrStatusGood } from "react-icons/gr";
import { FiClipboard } from "react-icons/fi";
import { HiOutlineBriefcase } from "react-icons/hi";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";
import { useGeolocation } from "@/hooks/useGeolocation";
import Footer from "../(features)/_components/footer";
import Header from "./_components/header";
import { useGetServicePostsQuery, useCreateApplicationMutation, useSearchServicesQuery, useServiceFilterMutation } from "@/store/api/services.api";
import { useUserProfileQuery } from "@/store/api/userProfile.api";
import Loader from "../(features)/_components/loader";
import { useEffect, useState } from "react";
import { getDistanceFromLatLon, timeDifference } from "@/shared/utils";
import { toast, ToastContainer } from "react-toastify";
import {
  Box,
  Typography,
  Grid,
  Card,
  Avatar,
  Button,
  CardContent,
  Container,
  Modal,
  TextField,
  Paper,
  Divider,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { purple } from "@mui/material/colors";

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { data: workPosts, error, isLoading } = useGetServicePostsQuery({});
  const { data: userProfile } = useUserProfileQuery({});
  const { position, getPosition } = useGeolocation();
  const [createApplication] = useCreateApplicationMutation();
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedWorkId, setSelectedWorkId] = useState("")
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<string[]>([]);

  const { data: searchResults } = useSearchServicesQuery(searchQuery);
  const [filterServices, { data: filteredResults }] = useServiceFilterMutation();

  const handleFilter = async (updatedFilter: string[]) => {
    const newData = {
      categories: updatedFilter,
    }
    await filterServices({ data: newData }).unwrap();
  };

  const handleApply = async (id: string) => {
    try {
      await createApplication({ service_id: id, message: message }).unwrap();
      toast.success("Application Sent Successfully");
      setMessage("");
      setModalOpen(false);
    } catch (err) {
      console.log(err);
      toast.error("Failed to send application");
    }
  };

  useEffect(() => {
    getPosition();
  }, []);

  const userLat = position?.lat ?? userProfile?.user?.user?.address.latitude;
  const userLng = position?.lng ?? userProfile?.user?.user?.address.longitude;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filter={filter}
        setFilter={setFilter}
        handleFilter={handleFilter}
      />

      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '60vh', md: '80vh' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("/images/balem.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'common.white',
          textAlign: 'center',
          px: 2
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            <Typography
              variant={isMobile ? "h3" : "h2"}
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                mb: 3,
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              Find & Hire Professional Services in Ethiopia
            </Typography>
            <Typography
              variant={isMobile ? "h6" : "h5"}
              component="p"
              sx={{
                mb: 4,
                color: 'primary.main',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)'
              }}
            >
              Connecting skilled professionals with clients who need their services
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 2,
                boxShadow: 4,
                '&:hover': {
                  boxShadow: 6
                }
              }}
            >
              Browse Services
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 8, backgroundColor: purple[50] }}>
        <Container maxWidth="lg">
          <Grid container spacing={3} justifyContent="center">
            {[
              { number: '500+', label: 'Professionals' },
              { number: '1,000+', label: 'Completed Jobs' },
              { number: '95%', label: 'Satisfaction Rate' },
              { number: '24/7', label: 'Support' }
            ].map((stat, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Paper elevation={0} sx={{
                  p: 3,
                  textAlign: 'center',
                  backgroundColor: 'transparent',
                  borderRadius: 3
                }}>
                  <Typography variant="h3" color="primary" fontWeight={700}>
                    {stat.number}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 10, backgroundColor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
            <Typography
              variant="h3"
              component="h2"
              fontWeight={700}
              gutterBottom
              sx={{ color: 'text.primary' }}
            >
              Why Choose Balemuya
            </Typography>
            <Typography
              variant="h6"
              component="p"
              color="text.secondary"
              sx={{ maxWidth: 700, mx: 'auto' }}
            >
              We provide the best platform for professionals and clients to connect
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              {
                icon: <FaMapMarkerAlt size={32} />,
                title: "Location-Based Search",
                description: "Find professionals near you with our advanced geolocation technology"
              },
              {
                icon: <FiClipboard size={32} />,
                title: "Service Registration",
                description: "Easy registration process for professionals to showcase their skills"
              },
              {
                icon: <MdPayment size={32} />,
                title: "Secure Payments",
                description: "Safe and reliable payment system for all transactions"
              },
              {
                icon: <HiOutlineBriefcase size={32} />,
                title: "Apply for Work",
                description: "Professionals can easily apply for available jobs"
              },
            ].map(({ icon, title, description }, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Card
                  sx={{
                    height: '100%',
                    p: 3,
                    borderRadius: 3,
                    boxShadow: 3,
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 6
                    }
                  }}
                >
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      bgcolor: 'primary.light',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '50%',
                      color: 'primary.main',
                      mb: 3,
                      mx: 'auto'
                    }}
                  >
                    {icon}
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom textAlign="center">
                    {title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" textAlign="center">
                    {description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Jobs Section */}
      <Box sx={{ py: 10, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
            <Typography variant="h3" component="h2" fontWeight={700} gutterBottom>
              Latest Job Postings
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
              Find the perfect job opportunity that matches your skills
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {(searchQuery && searchResults?.length > 0
              ? searchResults
              : filter.length > 0
                ? filteredResults
                : workPosts
            )?.slice(0, 8)?.map((work: any) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={work.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    boxShadow: 3,
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)'
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {work.title}
                    </Typography>

                    <Box display="flex" alignItems="center" color="text.secondary" mb={1}>
                      <IoIosTime size={20} color={purple[500]} style={{ marginRight: 8 }} />
                      <Typography variant="body2">
                        {timeDifference(new Date(), new Date(work.created_at))}
                      </Typography>
                    </Box>

                    <Box display="flex" justifyContent="space-between" my={2}>
                      <Box display="flex" alignItems="center" color="text.secondary">
                        <GrStatusGood size={20} color={purple[500]} style={{ marginRight: 8 }} />
                        <Typography variant="body2">{work.urgency}</Typography>
                      </Box>
                      <Box display="flex" alignItems="center" color="text.secondary">
                        <FaLocationDot size={20} color={purple[500]} style={{ marginRight: 8 }} />
                        <Typography variant="body2">
                          {getDistanceFromLatLon(userLat, userLng, work.location.latitude, work.location.longitude)}
                        </Typography>
                      </Box>
                    </Box>

                    <Typography
                      variant="body2"
                      color="text.primary"
                      sx={{
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {work.description}
                    </Typography>

                    <Box mt="auto">
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => {
                          setSelectedWorkId(work.id);
                          setModalOpen(true);
                        }}
                        sx={{
                          py: 1.5,
                          borderRadius: 2,
                          fontWeight: 600
                        }}
                      >
                        Apply Now
                      </Button>
                    </Box>

                    <Box
                      display="flex"
                      alignItems="center"
                      mt={3}
                      pt={2}
                      borderTop={1}
                      borderColor="divider"
                    >
                      <Avatar
                        src={work.customer_profile_image}
                        sx={{
                          width: 48,
                          height: 48,
                          border: `2px solid ${purple[500]}`
                        }}
                      />
                      <Box ml={2}>
                        <Typography variant="body2" fontWeight={500}>
                          <span style={{ color: purple[500] }}>Posted by:</span> {work.customer?.user?.first_name}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box textAlign="center" mt={6}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              sx={{
                px: 6,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: 2
              }}
            >
              View All Jobs
            </Button>
          </Box>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box sx={{ py: 10, backgroundColor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
            <Typography variant="h3" component="h2" fontWeight={700} gutterBottom>
              How It Works
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
              Get started in just a few simple steps
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {[
              {
                icon: <MdPersonAdd size={28} />,
                title: "Register",
                description: "Create your account as a professional or client"
              },
              {
                icon: <FaUser size={28} />,
                title: "Complete Profile",
                description: "Add your details, skills, and experience"
              },
              {
                icon: <MdVerifiedUser size={28} />,
                title: "Get Verified",
                description: "Verify your credentials for better opportunities"
              },
              {
                icon: <FaRegFileAlt size={28} />,
                title: "Start Working",
                description: "Apply for jobs or hire professionals"
              },
            ].map(({ icon, title, description }, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Box
                  sx={{
                    position: 'relative',
                    height: '100%',
                    p: 4,
                    textAlign: 'center',
                    borderRadius: 3,
                    backgroundColor: idx % 2 === 0 ? 'background.default' : 'background.paper',
                    boxShadow: 2,
                    '&:hover': {
                      boxShadow: 4
                    }
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -24,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 48,
                      height: 48,
                      bgcolor: 'primary.main',
                      color: 'common.white',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 20,
                      fontWeight: 700
                    }}
                  >
                    {idx + 1}
                  </Box>
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      bgcolor: 'primary.light',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: '50%',
                      color: 'primary.main',
                      mb: 3,
                      mx: 'auto'
                    }}
                  >
                    {icon}
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ py: 12, backgroundColor: 'background.default', color: 'common.white' }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" component="h2" fontWeight={700} gutterBottom>
            Ready to Get Started?
          </Typography>
          <Typography variant="h6" component="p" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of professionals and clients using our platform
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                px: 6,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: 2,
                boxShadow: 4
              }}
            >
              Register as Professional
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              
              size="large"
              sx={{
                px: 6,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: 2,
                borderColor: 'primary.main',
                color: 'primary.main',
                backgroundColor: 'transparent',
                ":hover": {
                  backgroundColor: 'secondary.main',
                  color: 'common.white'
                },
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2
                }
              }}
            >
              Find a Professional
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 3,
          width: { xs: '90%', sm: 500 },
          outline: 'none'
        }}>
          <Typography variant="h5" fontWeight={600} mb={2}>
            Apply for Job
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Write a message to introduce yourself and explain why you're the best fit for this job.
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (selectedWorkId !== null) {
                  handleApply(selectedWorkId);
                  setModalOpen(false);
                }
              }}
              sx={{
                px: 3,
                fontWeight: 600,
                borderRadius: 2
              }}
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              onClick={() => setModalOpen(false)}
              sx={{
                px: 3,
                fontWeight: 600,
                borderRadius: 2
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      <Footer />
      <ToastContainer position="bottom-right" />
    </Box>
  );
}