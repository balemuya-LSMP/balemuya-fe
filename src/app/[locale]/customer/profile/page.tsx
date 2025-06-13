'use client'
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  useUpdateProfileMutation,
  useUserProfileQuery,
  useAddAddressesMutation,
  useUpdateAddressesMutation,
} from "@/store/api/userProfile.api";
import { useGeolocation } from "@/hooks/useGeolocation";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  InputAdornment,
  Modal,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import {
  Edit as EditIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Person as PersonIcon,
  LocationOn as LocationIcon,
  Upload as UploadIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import Loader from "../../(features)/_components/loader";
import Header from "../_components/header";
import Footer from "../../(features)/_components/footer";

const StyledModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& .modal-content": {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: theme.shadows[24],
    padding: theme.spacing(4),
    width: "100%",
    maxWidth: "450px",
    outline: "none",
    position: "relative",
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  border: `4px solid ${theme.palette.primary.main}`,
  boxShadow: theme.shadows[6],
}));

const UserProfile = () => {
  const userProfile = useUserProfileQuery({});
  const [updateProfile] = useUpdateProfileMutation();
  const { position, getPosition } = useGeolocation();
  const [addAddress] = useAddAddressesMutation();
  const [updateAddress] = useUpdateAddressesMutation();

  const { data, isLoading } = userProfile;
  const userData = data?.user?.user;
  const address = userData?.address;

  console.log(address);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const handleEditClick = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  useEffect(() => {
    if (isAddressModalOpen) {
      getPosition();
    }
  }, [isAddressModalOpen]);

  if (isLoading) return <Loader />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    if (selectedFile) {
      formData.append("profile_image", selectedFile);
    }

    updateProfile({ updated: formData });
    handleModalClose();
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const addressData = {
      city: formData.get("city") as string,
      region: formData.get("region") as string,
      country: formData.get("country") as string,
      latitude: position?.lat,
      longitude: position?.lng,
    };

    if (address) {
      const res = await updateAddress({ address: addressData });
      console.log(res)
    } else {
      await addAddress({ address: addressData });
    }

    setIsAddressModalOpen(false);
  };

  const avatarSrc = userData.profile_image_url || "/images/user.jpg";

  return (
    <>
      <Header searchQuery={""} setSearchQuery={function (query: string): void {
        throw new Error("Function not implemented.");
      }} />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
          backgroundColor: 'background.default',
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 600,
            borderRadius: 4,
            boxShadow: 3,
            position: "relative",
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              zIndex: 1,
            }}
            onClick={handleEditClick}
          >
            <EditIcon fontSize="medium" />
          </IconButton>

          <CardContent sx={{ p: 4 }}>
            <Stack spacing={4} alignItems="center">
              <StyledAvatar src={avatarSrc} alt="User Avatar" />

              <Typography variant="h4" component="h1" textAlign="center" fontWeight={600}>
                {userData.user_type === "organization"
                  ? userData.org_name
                  : `${userData.first_name} ${userData.last_name}`}
              </Typography>
              {/* bio */}
              <Typography variant="body1" textAlign="center" color="text.secondary">
                {userData.bio ?? ""}
              </Typography>

              <Stack spacing={2} width="100%">
                <Stack
                  spacing={2}
                  sx={{
                    p: 3,
                    bgcolor: "background.default",
                    borderRadius: 2,
                    width: "100%",
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <EmailIcon color="primary" />
                    <Typography variant="body1">{userData.email}</Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={2}>
                    <PhoneIcon color="primary" />
                    <Typography variant="body1">{userData.phone_number}</Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" spacing={2}>
                    <PersonIcon color="primary" />
                    <Typography variant="body1" textTransform="capitalize">
                      {userData.user_type || "User"}
                    </Typography>
                  </Stack>
                </Stack>

                {address ? (
                  <Stack
                    spacing={2}
                    sx={{
                      p: 3,
                      bgcolor: "background.default",
                      borderRadius: 2,
                      width: "100%",
                    }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <LocationIcon color="primary" />
                        <Typography variant="h6">Address</Typography>
                      </Stack>
                      <IconButton onClick={() => setIsAddressModalOpen(true)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                    <Typography variant="body1">
                      {`${address.city}, ${address.region}, ${address.country}`}
                    </Typography>
                  </Stack>
                ) : (
                  <Button
                    variant="outlined"
                    startIcon={<LocationIcon />}
                    onClick={() => setIsAddressModalOpen(true)}
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Add Address
                  </Button>
                )}
              </Stack>
            </Stack>
          </CardContent>

          {/* Edit Profile Modal */}
          <StyledModal open={isModalOpen} onClose={handleModalClose}>
            <Box className="modal-content">
              <IconButton
                sx={{ position: "absolute", top: 16, right: 16 }}
                onClick={handleModalClose}
              >
                <CloseIcon />
              </IconButton>

              <Typography variant="h5" component="h2" mb={3} textAlign="center">
                Edit Profile
              </Typography>

              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  {userData.user_type === "organization" ? (
                    <TextField
                      name="org_name"
                      label="Organization Name"
                      defaultValue={userData.org_name}
                      fullWidth
                      variant="outlined"
                    />
                  ) : (
                    <>
                      <TextField
                        name="first_name"
                        label="First Name"
                        defaultValue={userData.first_name}
                        fullWidth
                        variant="outlined"
                      />
                      <TextField
                        name="last_name"
                        label="Last Name"
                        defaultValue={userData.last_name}
                        fullWidth
                        variant="outlined"
                      />
                    </>
                  )}
                  <Box>
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="profile-image-upload"
                      type="file"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    />
                    <label htmlFor="profile-image-upload">
                      <Button
                        component="span"
                        variant="outlined"
                        fullWidth
                        startIcon={<UploadIcon />}
                      >
                        {selectedFile ? selectedFile.name : "Upload Profile Picture"}
                      </Button>
                    </label>
                  </Box>

                  <TextField
                    name="email"
                    label="Email"
                    defaultValue={userData.email}
                    fullWidth
                    variant="outlined"
                    type="email"
                  />

                  <TextField
                    name="phone_number"
                    label="Phone Number"
                    defaultValue={userData.phone_number}
                    fullWidth
                    variant="outlined"
                  />
                  <TextField
                    name="bio"
                    label="Bio"
                    defaultValue={userData.bio ?? ""}
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={2}
                  />

                  <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
                    <Button variant="outlined" onClick={handleModalClose}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                      Save
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </Box>
          </StyledModal>

          {/* Edit Address Modal */}
          <StyledModal open={isAddressModalOpen} onClose={() => setIsAddressModalOpen(false)}>
            <Box className="modal-content">
              <IconButton
                sx={{ position: "absolute", top: 16, right: 16 }}
                onClick={() => setIsAddressModalOpen(false)}
              >
                <CloseIcon />
              </IconButton>

              <Typography variant="h5" component="h2" mb={3} textAlign="center">
                Edit Address
              </Typography>

              <form onSubmit={handleAddressSubmit}>
                <Stack spacing={3}>
                  <TextField
                    name="city"
                    label="City"
                    defaultValue={address?.city || ""}
                    fullWidth
                    variant="outlined"
                  />

                  <TextField
                    name="region"
                    label="Region"
                    defaultValue={address?.region || ""}
                    fullWidth
                    variant="outlined"
                  />

                  <TextField
                    name="country"
                    label="Country"
                    defaultValue={address?.country || ""}
                    fullWidth
                    variant="outlined"
                  />

                  <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
                    <Button variant="outlined" onClick={() => setIsAddressModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                      Save
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </Box>
          </StyledModal>
        </Card>
      </Box>
      <Footer />
    </>
  );
};

export default UserProfile;