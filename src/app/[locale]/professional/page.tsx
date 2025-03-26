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
import { Box, Typography, Grid, Card, Avatar, Button, CardContent, Container, Modal, TextField } from "@mui/material";


export default function Home() {
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

  // it sends  the id and message to the server 
  const handleApply = async (id: string) => {
    try {
      await createApplication({ service_id: id, message: message }).unwrap();
      toast.success("Application Sent Successfully");
      setMessage("");
      setModalOpen(false);
    } catch (err) {
      console.log(err);
      toast.error("Please update your subscription plan to apply for this job");
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
    <div className="bg-gray-50 font-sans">
      <Header searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filter={filter}
        setFilter={setFilter}
        handleFilter={handleFilter}
      />

      {/* Hero Section */}
      <Box
        sx={{
          height: "24rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          backgroundImage: "url('/images/hero.jpeg')",
        }}
      >
        <Box
          // className="relative max-w-3xl text-center text-white space-y-6"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            maxWidth: "3xl",
            spaceY: 6,
          }}
        >
          <Typography variant="h2">Welcome to Balemuya</Typography>
          <Typography variant="body1">
            Connecting Professionals and Customers in Ethiopia
          </Typography>

        </Box>
      </Box>

      {/* Features Section */}
      <Box
        sx={{
          py: 12,
          bgcolor: "background.paper",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            mb: 10,
          }}
        >
          <Typography variant="h2" component="h2">
            Features
          </Typography>
        </Box>
        <Grid
          container
          spacing={4}
          justifyContent="center"
          sx={{
            px: 5,
          }}
        >
          {[
            { icon: <FaMapMarkerAlt />, text: "Location-Based Search" },
            { icon: <FiClipboard />, text: "Service Registration" },
            { icon: <MdPayment />, text: "Secure Payments" },
            { icon: <HiOutlineBriefcase />, text: "Apply for Work" },
          ].map(({ icon, text }, idx) => (
            <Grid item xs={12} sm={6} md={3} key={idx}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 4,
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: "box-shadow 0.3s",
                  "&:hover": {
                    boxShadow: 6,
                  },
                }}
              >
                <Card
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "purple",
                    fontSize: 40,
                    mb: 2,
                    p: 2,
                    bgcolor: "background.paper",
                    boxShadow: "none",
                  }}
                >        {icon}
                </Card>
                <Typography variant="h6" color="text.primary">
                  {text}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box py={6} bgcolor="background.paper">
        <Container>
          <Box textAlign="center" mb={4}>
            <Typography variant="h3" fontWeight={700} color="text.primary">
              New Jobs
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Work Posted by Customers
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {(searchQuery && searchResults?.length > 0
              ? searchResults
              : filter.length > 0
                ? filteredResults
                : workPosts
            )?.map((work: any) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={work.id}>
                <Card elevation={3} sx={{ borderRadius: 2, height: "100%", display: "flex", flexDirection: "column" }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {work.title}
                    </Typography>
                    <Box display="flex" alignItems="center" color="text.secondary">
                      <IoIosTime size={20} color="#6B21A8" style={{ marginRight: 8 }} />
                      <Typography variant="body2">
                        {timeDifference(new Date(), new Date(work.created_at))}
                      </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" my={2}>
                      <Box display="flex" alignItems="center" color="text.secondary">
                        <GrStatusGood size={20} color="#6B21A8" style={{ marginRight: 8 }} />
                        <Typography variant="body2">{work.urgency}</Typography>
                      </Box>
                      <Box display="flex" alignItems="center" color="text.secondary">
                        <FaLocationDot size={20} color="#6B21A8" style={{ marginRight: 8 }} />
                        <Typography variant="body2">
                          {getDistanceFromLatLon(userLat, userLng, work.location.latitude, work.location.longitude)}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.primary">
                      {work.description}
                    </Typography>
                    <Box mt={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => {
                          setSelectedWorkId(work.id);
                          setModalOpen(true);
                        }}
                      >
                        Apply Now
                      </Button>
                    </Box>
                    <Box display="flex" alignItems="center" mt={3} pt={2} borderTop={1} borderColor="grey.300">
                      <Avatar src={work.customer_profile_image} sx={{ width: 48, height: 48, border: "2px solid #6B21A8" }} />
                      <Box ml={2}>
                        <Typography variant="body2" fontWeight={500}>
                          <span style={{ color: "#6B21A8" }}>Posted by:</span> {work.customer?.user?.first_name}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
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
          borderRadius: 2,
          width: 400,
        }}>
          <Typography variant="h5" fontWeight={600} mb={2}>
            Apply for Job
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Write a message to the customer
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Write a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (selectedWorkId !== null) {
                  handleApply(selectedWorkId);
                  setModalOpen(false);
                }
              }}
            >
              Submit
            </Button>
            <Button variant="outlined" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* How It Works Section */}
      <Box py={6} bgcolor="background.paper" boxShadow={3}>
        <Container>
          <Box textAlign="center" mb={4}>
            <Typography variant="h4" fontWeight={600} marginBottom={4} color="text.primary">
              How It Works
            </Typography>
          </Box>
          <Grid container spacing={4} justifyContent="center">
            {[
              { icon: <MdPersonAdd />, text: "Register as a Professional" },
              { icon: <FaUser />, text: "Create a Profile" },
              { icon: <MdVerifiedUser />, text: "Verify Your Credentials" },
              { icon: <FaRegFileAlt />, text: "Apply for Job" },
            ].map(({ icon, text }, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Box
                  sx={{
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    boxShadow: 3,
                    p: 3,
                    transition: "box-shadow 0.3s",
                    "&:hover": { boxShadow: 6 },
                    textAlign: "center",
                  }}
                >
                  <Box
                    width={64}
                    height={64}
                    bgcolor="purple.100"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    borderRadius="50%"
                    color="primary.main"
                    fontSize={32}
                    mb={2}
                    mx="auto"
                  >
                    {icon}
                  </Box>
                  <Typography variant="body1" fontWeight={500}>
                    {text}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      {/* Footer */}
      <Footer />
    </div>
  );
}
