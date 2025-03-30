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
  const locale  = params.locale;
  
  console.log(locale);

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

          {/* Why Choose Us Card */}
          <Card sx={{ boxShadow: 1, borderRadius: 2, padding: 4, width: "100%" }}>
            <Typography variant="h5" align="center" gutterBottom>Why Choose Us?</Typography>
            {[
              { icon: ShieldCheck, title: "Secure Payments", desc: "All transactions are encrypted and safe.", color: "primary" },
              { icon: Star, title: "Premium Content", desc: "Access exclusive professional resources.", color: "warning" },
              { icon: UserCheck, title: "Career Growth", desc: "Boost your career with expert guidance.", color: "success" },
              { icon: TrendingUp, title: "Skill Improvement", desc: "Stay ahead with the latest industry trends.", color: "secondary" },
              { icon: Briefcase, title: "Professional Networking", desc: "Connect with industry experts and peers.", color: "error" }
            ].map(({ icon: Icon, title, desc, color }) => (
              <Box key={title} sx={{ display: "flex", alignItems: "flex-start", gap: 2, marginBottom: 2 }}>
                <Icon style={{ color: `${color}.main`, width: 30, height: 30 }} />
                <Box>
                  <Typography variant="body1" fontWeight={600}>{title}</Typography>
                  <Typography variant="body2">{desc}</Typography>
                </Box>
              </Box>
            ))}
          </Card>


          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 4, width: "100%", maxWidth: "lg" }}>
            {/* Subscription Card */}
            <Card sx={{ width: "100%", maxWidth: 600, padding: 4 }}>
              <Typography variant="h5" align="center" gutterBottom>Choose Your Plan</Typography>
              <Grid container spacing={2} justifyContent="center" marginBottom={3}>
                {["Silver", "Gold", "Diamond"].map((tab) => (
                  <Grid item key={tab}>
                    <Button
                      variant={activeTab === tab ? "contained" : "outlined"}
                      color="primary"
                      onClick={() => setActiveTab(tab as PlanType)}
                      fullWidth
                    >
                      {tab}
                    </Button>
                  </Grid>
                ))}
              </Grid>
              <FormControl fullWidth>
                <InputLabel>Duration</InputLabel>
                <Select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(Number(e.target.value))}
                  label="Duration"
                >
                  {activePlan.durations.map(({ label, value }) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography variant="h6" align="center" marginTop={2}>Total Amount: <span style={{ color: "#673ab7" }}>{totalAmount} Birr</span></Typography>
              <Button
                onClick={handleSubscribe}
                disabled={isLoading}
                fullWidth
                variant="contained"
                color="primary"
                sx={{ marginTop: 3 }}
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : "Subscribe Now"}
              </Button>
              <Typography variant="body2" align="center" marginTop={2}>
                <CheckCircle style={{ fontSize: 18, color: "green", marginRight: 8 }} /> Secure Payment
              </Typography>
            </Card>

            {/* Subscription Steps Card */}
            <Card sx={{ width: "100%", maxWidth: 600, padding: 4 }}>
              <Typography variant="h6" gutterBottom align="center">Subscription Steps</Typography>
              {[
                { icon: ListOrdered, title: "Select a plan and duration", desc: "Choose the subscription plan that best suits your needs." },
                { icon: User, title: "Create an account", desc: "Sign up or log in to proceed." },
                { icon: CreditCard, title: "Make payment securely", desc: "Complete your payment through our secure gateway." },
                { icon: Mail, title: "Get confirmation", desc: "Receive confirmation email with plan details." }
              ].map(({ icon: Icon, title, desc }) => (
                <Box key={title} sx={{ display: "flex", alignItems: "flex-start", gap: 2, marginBottom: 2 }}>
                  <Icon style={{ width: 24, height: 24, color: "primary.main" }} />
                  <Box>
                    <Typography variant="body1" fontWeight={600}>{title}</Typography>
                    <Typography variant="body2">{desc}</Typography>
                  </Box>
                </Box>
              ))}
            </Card>
          </Box>
        </Box>
      </Box>

      <Footer />
    </>
  );
}
