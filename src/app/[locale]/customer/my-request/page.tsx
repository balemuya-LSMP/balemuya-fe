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
    Avatar
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Header from "../_components/header";

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
    const { position, getPosition } = useGeolocation();
    const [activeTab, setActiveTab] = useState("");
    const validStatuses = ["accepted", "canceled","completed", "rejected"];

    const { data: serviceRequests } = useGetMyRequestServicesQuery(activeTab);

    useEffect(() => {
        getPosition();
    }, []);


    const userLat = position?.lat ?? 11.60000000;
    const userLng = position?.lng ?? 37.38333330;

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setActiveTab(newValue);
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
                </Container>
            </Box>
            <Footer />
        </>
    );
}