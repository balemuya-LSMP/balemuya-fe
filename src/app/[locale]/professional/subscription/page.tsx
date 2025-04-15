/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
'use client';
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { ListOrdered, CheckCircle, CreditCard, ShieldCheck, Star, UserCheck, TrendingUp, Briefcase, User, Mail } from "lucide-react";
import { useSubscribeServiceMutation } from "@/store/api/userProfile.api";
import { toast } from "react-toastify";
import Header from "../_components/header";
import { useParams } from "next/navigation";
import { Box, Button, Card, CircularProgress, FormControl, InputLabel, MenuItem, Select, Typography, Grid } from "@mui/material";
import Footer from "../../(features)/_components/footer";

export default function ProfessionalCard() {
  type PlanType = "Silver" | "Gold" | "Diamond";
  const [activeTab, setActiveTab] = useState<PlanType>("Silver");
  const [selectedDuration, setSelectedDuration] = useState<number>(1);
  const params = useParams();
  const locale = params.locale;

  // Mutation hook
  const [subscribeService, { isLoading }] = useSubscribeServiceMutation();

  const handleSubscribe = async () => {
    const totalAmount = activePlan.price * selectedDuration;

    try {
      const response = await subscribeService({
        plan_type: activeTab.toLowerCase(),
        duration: selectedDuration,
        amount: totalAmount,
        return_url: `http://localhost:3000/${locale}/professional/check`,
      }).unwrap();

      if (response?.data?.payment_url) {
        window.location.href = response.data.payment_url;
      } else {
        throw new Error("Payment URL not found in response");
      }
    } catch (error) {
      console.error("Subscription failed:", error);
      toast.error("Subscription failed. Please try again.");
    }
  };

  const plans = {
    Silver: { price: 100, planType: "Silver", durations: [{ label: "1 month", value: 1 }, { label: "3 months", value: 3 }, { label: "6 months", value: 6 }, { label: "1 year", value: 12 }] },
    Gold: { price: 200, planType: "Gold", durations: [{ label: "1 month", value: 1 }, { label: "3 months", value: 3 }, { label: "6 months", value: 6 }, { label: "1 year", value: 12 }] },
    Diamond: { price: 300, planType: "Diamond", durations: [{ label: "1 month", value: 1 }, { label: "3 months", value: 3 }, { label: "6 months", value: 6 }, { label: "1 year", value: 12 }] },
  };

  const activePlan = plans[activeTab];
  const totalAmount = activePlan.price * selectedDuration;

  return (
    <>
      <Header searchQuery={""} setSearchQuery={function (query: string): void {
        throw new Error("Function not implemented.");
      }} filter={[]} setFilter={function (filter: string[]): void {
        throw new Error("Function not implemented.");
      }} />
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: "background.default", padding: 4 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, width: "100%", maxWidth: "lg" }}>
          
          {/* Subscription Plan Section - Now at the top */}
          <Box sx={{ width: "100%", display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
            {/* Subscription Card - Main Focus */}
            <Card sx={{ flex: 1, boxShadow: 3, borderRadius: 2, padding: 4 }}>
              <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 600, color: "primary.main" }}>
                Professional Subscription Plans
              </Typography>
              <Typography variant="subtitle1" align="center" gutterBottom sx={{ mb: 3 }}>
                Choose the plan that fits your professional needs
              </Typography>

              <Grid container spacing={2} justifyContent="center" marginBottom={3}>
                {["Silver", "Gold", "Diamond"].map((tab) => (
                  <Grid item key={tab}>
                    <Button
                      variant={activeTab === tab ? "contained" : "outlined"}
                      color="primary"
                      onClick={() => setActiveTab(tab as PlanType)}
                      sx={{
                        minWidth: 120,
                        fontWeight: 600,
                        textTransform: 'none',
                        fontSize: '1rem'
                      }}
                    >
                      {tab}
                    </Button>
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ mb: 3 }}>
                <FormControl fullWidth>
                  <InputLabel>Subscription Duration</InputLabel>
                  <Select
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(Number(e.target.value))}
                    label="Subscription Duration"
                  >
                    {activePlan.durations.map(({ label, value }) => (
                      <MenuItem key={value} value={value}>
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ 
                p: 2, 
                borderRadius: 1, 
                mb: 3,
                textAlign: 'center'
              }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Total Amount: <span style={{ color: "#673ab7" }}>{totalAmount} Birr</span>
                </Typography>
                <Typography variant="body2">
                  Billed {selectedDuration === 1 ? 'monthly' : `every ${selectedDuration} months`}
                </Typography>
              </Box>

              <Button
                onClick={handleSubscribe}
                disabled={isLoading}
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                sx={{ 
                  marginTop: 1,
                  py: 1.5,
                  fontSize: '1rem',
                  borderRadius: 2,
                  fontWeight: 600
                }}
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : "Subscribe Now"}
              </Button>

              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                mt: 2,
                color: 'success.main'
              }}>
                <CheckCircle style={{ marginRight: 8 }} />
                <Typography variant="body2">
                  Secure payment with 256-bit encryption
                </Typography>
              </Box>
            </Card>

            {/* Subscription Benefits Card */}
            <Card sx={{ flex: 1, boxShadow: 3, borderRadius: 2, padding: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: "primary.main" }}>
                Plan Benefits
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  {activeTab} Plan Includes:
                </Typography>
                <ul style={{ paddingLeft: 20 }}>
                  <li><Typography variant="body1">Priority listing in professional directory</Typography></li>
                  <li><Typography variant="body1">Enhanced profile visibility</Typography></li>
                  <li><Typography variant="body1">Access to premium job opportunities</Typography></li>
                  {activeTab === "Gold" || activeTab === "Diamond" ? (
                    <li><Typography variant="body1">Direct messaging with recruiters</Typography></li>
                  ) : null}
                  {activeTab === "Diamond" ? (
                    <li><Typography variant="body1">Featured profile placement</Typography></li>
                  ) : null}
                </ul>
              </Box>

              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
                Subscription Process
              </Typography>
              {[
                { icon: ListOrdered, title: "Select Plan", desc: "Choose the right subscription for your needs" },
                { icon: CreditCard, title: "Secure Payment", desc: "Complete payment with our encrypted system" },
                { icon: CheckCircle, title: "Instant Access", desc: "Get immediate access to premium features" }
              ].map(({ icon: Icon, title, desc }) => (
                <Box key={title} sx={{ display: "flex", alignItems: "flex-start", gap: 2, marginBottom: 2 }}>
                  <Icon style={{ width: 24, height: 24, color: "primary.main", flexShrink: 0 }} />
                  <Box>
                    <Typography variant="body1" fontWeight={600}>{title}</Typography>
                    <Typography variant="body2">{desc}</Typography>
                  </Box>
                </Box>
              ))}
            </Card>
          </Box>

          {/* Why Choose Us Section */}
          <Card sx={{ boxShadow: 3, borderRadius: 2, padding: 4, width: "100%" }}>
            <Typography variant="h5" align="center" gutterBottom sx={{ fontWeight: 600, color: "primary.main" }}>
              Why Professionals Choose Us
            </Typography>
            <Grid container spacing={3}>
              {[
                { icon: ShieldCheck, title: "Secure Platform", desc: "Enterprise-grade security for all your data", color: "primary" },
                { icon: Star, title: "Premium Network", desc: "Connect with top industry professionals", color: "warning" },
                { icon: UserCheck, title: "Career Growth", desc: "Tools and resources to advance your career", color: "success" },
                { icon: TrendingUp, title: "Market Insights", desc: "Access to exclusive industry trends and data", color: "secondary" },
                { icon: Briefcase, title: "Opportunities", desc: "Get matched with relevant job opportunities", color: "error" }
              ].map(({ icon: Icon, title, desc, color }) => (
                <Grid item xs={12} sm={6} md={4} key={title}>
                  <Box sx={{ 
                    display: "flex", 
                    alignItems: "flex-start", 
                    gap: 2,
                    p: 2,
                    height: '100%'
                  }}>
                    <Box sx={{
                      backgroundColor: `${color}.light`,
                      borderRadius: '50%',
                      width: 48,
                      height: 48,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Icon style={{ color: `${color}.main`, width: 24, height: 24 }} />
                    </Box>
                    <Box>
                      <Typography variant="body1" fontWeight={600}>{title}</Typography>
                      <Typography variant="body2" color="text.secondary">{desc}</Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Box>
      </Box>

      <Footer />
    </>
  );
}