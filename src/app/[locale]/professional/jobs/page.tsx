/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import Header from "../_components/header";
import { FaLocationDot } from "react-icons/fa6";
import { GrStatusGood } from "react-icons/gr";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { CheckCircle, MessageSquare, Flag, XCircle } from "lucide-react";
import { IoIosTime } from "react-icons/io";
import { useGetServicesQuery, useCreateApplicationMutation, useReviewServiceMutation, useGiveComplaintMutation, useCancelBookingMutation, useCompleteBookingMutation, useServiceFilterMutation, useSearchServicesQuery, useReportServiceMutation } from "@/store/api/services.api";
import { getDistanceFromLatLon, timeDifference } from "@/shared/utils";
import { useGeolocation } from "@/hooks/useGeolocation";
import { toast } from "react-toastify";
import { Box, Rating, Button, Grid, Typography, TextField, Modal, Paper, Avatar, IconButton, Tooltip, CircularProgress } from "@mui/material";
import Footer from "../../(features)/_components/footer";
import { Face2 } from "@mui/icons-material";

export default function JobsPage() {
  const { position, getPosition } = useGeolocation();
  const [createApplication] = useCreateApplicationMutation();
  const [reviewService] = useReviewServiceMutation();
  const [giveComplaint] = useGiveComplaintMutation();
  const [cancelBooking] = useCancelBookingMutation();
  const [completeBooking] = useCompleteBookingMutation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<string[]>([]);
  const [reportService] = useReportServiceMutation();

  const [activeTab, setActiveTab] = useState("");
  const validStatuses = ["pending", "rejected", "booked", "canceled"];

  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [reason, setReason] = useState("");
  const [selectedWorkId, setSelectedWorkId] = useState("");
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportServiceModal, setReportServiceModal] = useState(false);

  const [bookId, setBookId] = useState("");
  const [rating, setRating] = useState<number | null>(0);
  const [review, setReview] = useState("");
  const [complaint, setComplaint] = useState("");

  const { data: servicesData, isLoading } = useGetServicesQuery(activeTab);
  const { data: searchResults } = useSearchServicesQuery(searchQuery);
  const [filterServices, { data: filteredResults }] = useServiceFilterMutation();



  const handleFilter = async (updatedFilter: string[]) => {
    const newData = {
      categories: updatedFilter,
    };
    await filterServices({ data: newData }).unwrap();
  };

  useEffect(() => {
    getPosition();
  }, []);

  const userLat = position?.lat ?? 11.6;
  const userLng = position?.lng ?? 37.3833333;

  const services = servicesData?.data || [];

  const handleApply = async (id: string) => {

    try {
      await createApplication({ service_id: id, message }).unwrap();
      toast.success("Application submitted successfully");
      setMessage("");
      setModalOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.[0] || "Error occurred");
      setModalOpen(false);
      setMessage("");
    }

  };


  const handeReportService = async (id: string) => {
    try {
      await reportService({ id, reason: reason }).unwrap();
      toast.success("Report submitted successfully");
      setReason("");
      setReportServiceModal(false);
    } catch (error) {
      toast.error("Error occurred while reporting");
      setReportServiceModal(false);
      setReason("");
    }
  }
  const handleReview = async () => {
    const reviewData = {
      booking: bookId,
      rating: rating,
      comment: review,
    };
    await reviewService({ data: reviewData }).unwrap();
    toast.success("Review submitted successfully");
    setRating(0);
    setReview("");
    setReviewModalOpen(false);
  };

  const handleComplaint = async () => {
    const complaintData = {
      booking: bookId,
      message: complaint,
    };
    await giveComplaint({ data: complaintData }).unwrap();
    toast.success("Complaint submitted successfully");
    setComplaint("");
    setReportModalOpen(false);
  };

  const handleCancel = async (id: string) => {
    await cancelBooking(id).unwrap();
    toast.success("Booking canceled successfully");
  };

  const handleComplete = async (id: string) => {
    await completeBooking(id).unwrap();
    toast.success("Booking completed successfully");
  };

  return (
    <>
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filter={filter}
        setFilter={setFilter}
        handleFilter={handleFilter}
      />
      <Box sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
        {/* Tabs Section */}
        <Box sx={{ maxWidth: "1200px", margin: "0 auto", padding: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
            {["", ...validStatuses].map((tab) => (
              <Button
                key={tab}
                onClick={() => setActiveTab(tab)}
                sx={{
                  px: 3,
                  py: 1,
                  color: activeTab === tab ? "purple.700" : "gray.700",
                  borderBottom: activeTab === tab ? "2px solid" : "none",
                  borderColor: "purple.700",
                  "&:hover": {
                    color: "purple.700",
                  },
                }}
              >
                {tab === "" ? "New Jobs" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Button>
            ))}
          </Box>
          <hr style={{ borderTop: "2px solid #e2e8f0" }} />

          {/* Jobs Section */}
          <Grid container spacing={3} sx={{ mt: 3 }}>
            {isLoading && (
              <Grid item xs={12} sx={{ textAlign: "center", mt: 5 }}>
                <Typography variant="h3" color="text.secondary">
                  <CircularProgress />
                </Typography>
              </Grid>
            )}
            {/* No services found */}
            {!isLoading && services.length === 0 && (
              <Grid item xs={12} sx={{ textAlign: "center", mt: 5 }}>
                <Typography variant="h3"><Face2 /></Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
                  No services found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Please refine your data try again later.
                </Typography>
              </Grid>
            )}
            {services?.map((job: any) => (
              <Grid item xs={12} sm={6} lg={4} key={job.id}>
                <Paper
                  sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    gap: 2,
                    "&:hover": {
                      boxShadow: 3,
                    },
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: "bold", color: "text.primary" }}>
                    {job.title ?? job?.service?.title}
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", color: "text.secondary" }}>
                      <GrStatusGood style={{ color: "purple.700" }} />
                      <Typography variant="body2" sx={{ px: 1, bgcolor: "purple.100", borderRadius: 1 }}>
                        {job?.status && job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", color: "text.secondary" }}>
                      <AiOutlineExclamationCircle style={{ color: "purple.700" }} />
                      <Typography variant="body2" sx={{ px: 1, bgcolor: "purple.100", borderRadius: 1 }}>{job.urgency ?? job.service.urgency}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", color: "text.secondary" }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IoIosTime style={{ color: "purple.700" }} />
                        <Typography variant="body2" sx={{ px: 1, bgcolor: "purple.100", borderRadius: 1 }}>
                          {timeDifference(new Date(), new Date(job?.created_at ?? job?.service?.created_at))}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <FaLocationDot style={{ color: "purple.700" }} />
                        <Typography variant="body2" sx={{ px: 1, bgcolor: "purple.100", borderRadius: 1 }}>
                          {getDistanceFromLatLon(
                            userLat,
                            userLng,
                            job.location?.latitude ?? job?.service?.location?.latitude,
                            job?.location?.longitude ?? job?.service?.location?.longitude
                          )}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Typography variant="body1" sx={{ color: "text.secondary", mt: 2 }}>
                    {job?.description ?? job?.service?.description}
                  </Typography>

                  <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
                    {job?.status === "active" && (
                      <>
                        <Button
                          variant="contained"
                          sx={{ bgcolor: "purple.700", "&:hover": { bgcolor: "purple.800" } }}
                          onClick={() => {
                            setSelectedWorkId(job?.id);
                            setModalOpen(true);
                          }}
                        >
                          Apply
                        </Button>
                        <Button
                          variant="contained"
                          sx={{ bgcolor: "gray", "&:hover": { bgcolor: "purple.800" } }}
                          onClick={() => {
                            setSelectedWorkId(job?.id);
                            setReportServiceModal(true);
                          }}
                        >
                          Report
                        </Button>
                      </>
                    )}
                    {job?.service?.status === "booked" && (
                      <Box sx={{ display: "flex", gap: 2, borderTop: 1, borderColor: "divider", pt: 2, mt: 3 }}>
                        <Tooltip title="Review">
                          <IconButton
                            onClick={() => { setBookId(job.id); setReviewModalOpen(true); }}>
                            <MessageSquare style={{ color: "purple.700" }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Report">
                          <IconButton onClick={() => { setBookId(job.id); setReportModalOpen(true); }}>
                            <Flag style={{ color: "red.500" }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Cancel">
                          <IconButton onClick={() => handleCancel(job.id)}>
                            <XCircle style={{ color: "gray.600" }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Complete">

                          <IconButton onClick={() => handleComplete(job.id)}>
                            <CheckCircle style={{ color: "gray.600" }} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    )}
                  </Box>
                  {job.customer && (
                    <Box sx={{ display: "flex", alignItems: "center", mt: 3, pt: 3, borderTop: 1, borderColor: "divider" }}>
                      <Link href={`/professional/customer/${job.customer.user?.id ?? job.customer.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                         <Avatar
                        src={job.customer.user?.profile_image_url ?? job.customer.customer_profile_image}
                        alt={job.customer.customer_name}
                        sx={{ width: 48, height: 48 }}
                      />
                      </Link>
                      <Typography variant="body1" sx={{ ml: 2, fontWeight: "medium" }}>
                        {job.customer?.user?.first_name ?? job.customer.customer_name}
                      </Typography>
                    </Box>
                  )}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Apply Modal */}
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              width: 400,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Apply for Job
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Write a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              sx={{ mb: 3 }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button variant="contained" onClick={() => handleApply(selectedWorkId)}>
                Submit
              </Button>
              <Button variant="outlined" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>

        <Modal open={reportServiceModal} onClose={() => setReportServiceModal(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              width: 400,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Report for the Job
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Write a report here..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              sx={{ mb: 3 }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button variant="contained" onClick={() => handeReportService(selectedWorkId)}>
                Submit
              </Button>
              <Button variant="outlined" onClick={() => setReportServiceModal(false)}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
        {/* Review Modal */}
        <Modal open={reviewModalOpen} onClose={() => setReviewModalOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              width: 400,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Review Service
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Write a review..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              sx={{ mb: 3 }}
            />
            <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
              <Rating value={rating} onChange={(_, newValue) => setRating(newValue)} />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button variant="contained" onClick={handleReview}>
                Submit
              </Button>
              <Button variant="outlined" onClick={() => setReviewModalOpen(false)}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>

        {/* Report Modal */}
        <Modal open={reportModalOpen} onClose={() => setReportModalOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              width: 400,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Report Complaint
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Write a report..."
              value={complaint}
              onChange={(e) => setComplaint(e.target.value)}
              sx={{ mb: 3 }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button variant="contained" onClick={handleComplaint}>
                Submit
              </Button>
              <Button variant="outlined" onClick={() => setReportModalOpen(false)}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
      <Footer />
    </>
  );
}