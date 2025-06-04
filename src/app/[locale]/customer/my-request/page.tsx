/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";
import { FaLocationDot } from "react-icons/fa6";
import { GrStatusGood } from "react-icons/gr";
import { IoIosTime } from "react-icons/io";
import { useGetMyRequestServicesQuery } from "@/store/api/services.api";
import { getDistanceFromLatLon, timeDifference } from "@/shared/utils";
import { useGeolocation } from "@/hooks/useGeolocation";
import { toast, ToastContainer } from "react-toastify";
import Footer from "../../(features)/_components/footer";
import { useParams } from "next/navigation";

// MUI Imports
import {
    Box,
    Button,
    Card,
    CardContent,
    CardActions,
    Chip,
    Container,
    Divider,
    Grid,
    Typography,
    Tabs,
    Tab,
    Avatar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import Header from "../_components/header";
import { usePaymentServiceMutation } from "@/store/api/userProfile.api";
import { useCompleteServiceCustomerMutation } from "@/store/api/services.api";
const StyledTab = styled(Tab)(({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
    '&.Mui-selected': {
        color: theme.palette.primary.main,
    },
}));

export default function JobsPage() {
    const params = useParams();
    const locale = params.locale
    const { position, getPosition } = useGeolocation();
    const [activeTab, setActiveTab] = useState("");
    const validStatuses = ["accepted", "canceled", "completed", "rejected"];

    const { data: serviceRequests } = useGetMyRequestServicesQuery(activeTab);
    const [paymentService] = usePaymentServiceMutation();
    const [completeServiceCustomer] = useCompleteServiceCustomerMutation();

    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [paymentAmount, setPaymentAmount] = useState('');
    const [currentBookingId, setCurrentBookingId] = useState('');
    const [currentProfessionalId, setCurrentProfessionalId] = useState('');


    console.log("Service Requests:", serviceRequests);



    useEffect(() => {
        getPosition();
    }, []);


    const userLat = position?.lat ?? 11.60000000;
    const userLng = position?.lng ?? 37.38333330;

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setActiveTab(newValue);
    };



    const handlePaymentClick = (bookingId: string, professionalId: string) => {
        setCurrentBookingId(bookingId);
        setCurrentProfessionalId(professionalId);
        setPaymentModalOpen(true);
    };
    const handlePayment = async () => {
        try {
            if (!paymentAmount || isNaN(Number(paymentAmount))) {
                toast.error("Please enter a valid amount");
                return;
            }

            const response = await paymentService({
                professional: currentProfessionalId,
                amount: Number(paymentAmount),
                service_request: currentBookingId,
                payment_type: "direct_request",
                return_url: `${window.location.origin}/${locale}/customer/check`
            }).unwrap();

            if (response?.data?.payment_url) {
                window.location.href = response.data.payment_url;
            } else {
                throw new Error("Payment URL not found in response");
            }
        } catch (error) {
            console.error("Payment failed:", error);
            toast.error("Payment failed. Please try again.");
        } finally {
            setPaymentModalOpen(false);
            setPaymentAmount('');
        }
    };


    const handleComplete = async (id: string) => {
        try {
            await completeServiceCustomer({ id }).unwrap();
            toast.success("Service completed successfully");
        } catch (error) {
            console.error("Error completing service:", error);
            toast.error("Failed to complete service");
        }
    };


    return (
        <>
            <Header searchQuery={""} setSearchQuery={function (query: string): void {
                throw new Error("Function not implemented.");
            }} />
            <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
                {/* Tabs Section */}
                <Container maxWidth="lg" sx={{ py: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                        <Tabs
                            value={activeTab}
                            onChange={handleTabChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="job status tabs"
                        >
                            {["", ...validStatuses].map((tab) => (
                                <StyledTab
                                    key={tab}
                                    label={tab === "" ? "New Request" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    value={tab}
                                />
                            ))}
                        </Tabs>
                    </Box>
                    <Divider />

                    {serviceRequests?.length === 0 && (
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '384px' }}>
                            <Typography variant="h6" color="text.secondary">
                                No jobs found
                            </Typography>
                        </Box>
                    )}

                    {/* Jobs Section */}
                    <Grid container spacing={3} sx={{ mt: 2 }}>
                        {serviceRequests?.map((request: any) => (
                            <Grid item xs={12} sm={6} lg={4} key={request.id}>
                                <Card sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'box-shadow 0.3s',
                                    '&:hover': {
                                        boxShadow: 4
                                    }
                                }}>
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography variant="h6" component="p" gutterBottom>
                                            {request?.detail}
                                        </Typography>

                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 2 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <GrStatusGood style={{ color: '#7b1fa2', marginRight: 8 }} />
                                                <Chip
                                                    label={request?.status && request.status.charAt(0).toUpperCase() + request?.status.slice(1)}
                                                    size="small"
                                                    sx={{ backgroundColor: 'secondary.light', color: 'common.white' }}
                                                />
                                            </Box>

                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <IoIosTime style={{ color: '#7b1fa2', marginRight: 8 }} />
                                                    <Typography variant="body2" color="text.secondary">
                                                        {timeDifference(new Date(), new Date(request?.created_at))}
                                                    </Typography>
                                                </Box>

                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <FaLocationDot style={{ color: '#7b1fa2', marginRight: 8 }} />
                                                    <Typography variant="body2" color="text.secondary">
                                                        {getDistanceFromLatLon(
                                                            userLat,
                                                            userLng,
                                                            request.customer?.user?.address?.latitude,
                                                            request.customer?.user?.address?.longitude
                                                        )}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <CardActions sx={{ justifyContent: 'flex-end' }}>
                                                {
                                                    request.status === "accepted" && (
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={() => handleComplete(request.id)}
                                                        >
                                                            Complete
                                                        </Button>
                                                    )

                                                }
                                            </CardActions>
                                            <CardActions sx={{ justifyContent: 'center' }}>
                                                {
                                                    request.status === "completed" && (
                                                        <Button
                                                            variant="contained"
                                                            onClick={() => handlePaymentClick(request.id, request.professional.professional_id)}
                                                            sx={{
                                                                backgroundColor: '#ffffff',
                                                                color: 'primary.main',
                                                                border: '1px solid primary',
                                                                fontWeight: 600,
                                                                fontSize: '1rem',
                                                                textTransform: 'none',
                                                                borderRadius: 2,
                                                                paddingY: 1,
                                                                paddingX: 2,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: 1.5,
                                                                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                                                                '&:hover': {
                                                                    backgroundColor: '#f7f7f7',
                                                                    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                                                                },
                                                            }}
                                                        >
                                                            <img
                                                                src="/images/chapa.png"
                                                                alt="Chapa Logo"
                                                                style={{
                                                                    height: '1.75rem',
                                                                    width: 'auto',
                                                                    objectFit: 'contain',
                                                                    display: 'block',
                                                                }}
                                                            />
                                                            Pay Now
                                                        </Button>

                                                    )

                                                }
                                            </CardActions>
                                        </Box>

                                        {/* Poster info */}
                                        <Box sx={{ display: 'flex', alignItems: 'center', pt: 2, mt: 2, borderTop: 1, borderColor: 'divider' }}>
                                            <Link href={`/professional/customer/${request.customer?.user?.id}`}>
                                                <Avatar
                                                    src={request.customer.user?.profile_image_url}
                                                    alt={request.customer.user?.first_name}
                                                    sx={{ width: 48, height: 48 }}
                                                />
                                            </Link>
                                            <Box sx={{ ml: 1.5 }}>
                                                <Typography variant="subtitle2">
                                                    {request.customer?.user?.first_name}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Dialog
                        open={paymentModalOpen}
                        onClose={() => {
                            setPaymentModalOpen(false);
                            setPaymentAmount('');
                        }}
                        maxWidth="xs"
                        fullWidth
                    >
                        <DialogTitle sx={{ m: 0, p: 2 }}>
                            Enter Amount
                            <IconButton
                                aria-label="close"
                                onClick={() => {
                                    setPaymentModalOpen(false);
                                    setPaymentAmount('');
                                }}
                                sx={{
                                    position: 'absolute',
                                    right: 8,
                                    top: 8,
                                    color: (theme) => theme.palette.grey[500],
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>

                        <DialogContent dividers>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Amount (Birr)"
                                type="number"
                                fullWidth
                                variant="outlined"
                                value={paymentAmount}
                                onChange={(e) => setPaymentAmount(e.target.value)}
                                inputProps={{ min: 1, step: 0.01 }}
                            />
                        </DialogContent>

                        <DialogActions>
                            <Button
                                onClick={handlePayment}
                                color="primary"
                                variant="contained"
                            >
                                Pay Now
                            </Button>
                            <Button
                                onClick={() => {
                                    setPaymentModalOpen(false);
                                    setPaymentAmount('');
                                }}
                                color="secondary"
                                variant="outlined"
                            >
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Container>
            </Box>
            <Footer />
        </>
    );
}