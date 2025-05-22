/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from "@/i18n/navigation";
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Rating,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Check as CheckIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
  Star as StarIcon,
  Person as PersonIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useGetCategoriesQuery } from '@/store/api/services.api';
import {
  useGetServicePostByIdQuery,
  useUpdateServicePostMutation,
  useDeleteServicePostMutation,
  useGetApplicationforServicePostQuery,
  useAcceptApplicationMutation,
} from '@/store/api/services.api';
import Header from '../../_components/header';
import Loader from '@/app/[locale]/(features)/_components/loader';
import Footer from '@/app/[locale]/(features)/_components/footer';

export default function WorkDetails() {
  const router = useRouter();
  const { id } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { data: applicationsData } = useGetApplicationforServicePostQuery(id as string);
  const { data: work, isLoading, error } = useGetServicePostByIdQuery(id as string);
  const { data: categories } = useGetCategoriesQuery();
  const [acceptApplication, { isLoading: isLoadingaccept }] = useAcceptApplicationMutation();
  const [updateService] = useUpdateServicePostMutation();
  const [deleteService] = useDeleteServicePostMutation();

  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    urgency: '',
    work_due_date: '',
  });

  if (isLoading) {
    return <Loader />;
  }

  const applications = applicationsData?.data;

  const handleEditClick = () => {
    setFormData({
      title: work.title,
      description: work.description,
      category: work.category,
      urgency: work.urgency,
      work_due_date: work.work_due_date.split('T')[0],
    });
    setShowEditModal(true);
  };

  console.log("applications", applications);
  const handleAcceptApplication = async (id: string) => {
    await acceptApplication(id);
    toast.success('Application accepted successfully');
  }

  const handleUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof id === 'string') {
      await updateService({ id, data: formData });
      toast.success('Job updated successfully');
    }
    setShowEditModal(false);
  };

  const handleDelete = async () => {
    if (typeof id === 'string') {
      await deleteService(id);
    }
    router.push('/customer/work');
  };

  return (
    <>
      <Header searchQuery={''} setSearchQuery={function (query: string): void {
        throw new Error('Function not implemented.');
      }} />
      <Box
        sx={{
          display: 'flex',
          backgroundColor: '#f9fafb',
          flexDirection: 'column',
          minHeight: '78vh',
          py: 4
        }}
      >
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Grid container spacing={4}>
            {/* Work Details Card */}
            <Grid item xs={12} md={8}>
              <Card
                elevation={4}
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  background: 'linear-gradient(145deg, #ffffff, #f8fafc)'
                }}
              >
                <CardHeader
                  avatar={
                    <Box
                      component="img"
                      src={work.customer.user.profile_image_url}
                      alt="Customer Profile"
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        border: '3px solid',
                        borderColor: 'primary.main',
                        objectFit: 'cover'
                      }}
                    />
                  }
                  title={
                    <Typography variant="h4" component="div" fontWeight="bold" color="text.primary">
                      {work.title}
                    </Typography>
                  }
                  sx={{ pb: 2, pt: 3, px: 3, backgroundColor: 'primary.light', color: 'white' }}
                />
                <CardContent sx={{ p: 4 }}>
                  <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={6} sm={3}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <CheckIcon color="success" />
                        <Typography variant="body2" fontWeight="medium">{work.urgency}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <ScheduleIcon color="primary" />
                        <Typography variant="body2" fontWeight="medium">
                          Due: {format(new Date(work.work_due_date), 'MMM dd, yyyy')}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <LocationIcon color="info" />
                        <Typography variant="body2" fontWeight="medium">
                          {work.location.city}, {work.location.region}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <StarIcon color="warning" />
                        <Typography variant="body2" fontWeight="medium">Rating: {work.customer.rating}</Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, color: 'text.primary' }}>
                    {work.description}
                  </Typography>

                  <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
                    <Button
                      variant="contained"
                      startIcon={<EditIcon />}
                      onClick={handleEditClick}
                      sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 'medium',
                        px: 3
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={handleDelete}
                      sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 'medium',
                        px: 3
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Applications List */}
            <Grid item xs={12} md={4}>
              <Typography variant="h5" fontWeight="bold" gutterBottom color="text.primary">
                Applications ({applications?.length || 0})
              </Typography>

              {applications?.length > 0 ? (
                <Box
                  sx={{
                    maxHeight: '600px',
                    overflowY: 'auto',
                    pr: 1,
                    '&::-webkit-scrollbar': {
                      width: '8px'
                    },
                    '&::-webkit-scrollbar-track': {
                      background: '#f1f5f9'
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: '#cbd5e1',
                      borderRadius: '4px'
                    }
                  }}
                >
                  {applications.map((application: any) => (
                    <Paper
                      key={application.id}
                      elevation={3}
                      sx={{
                        p: 3,
                        mb: 2,
                        borderRadius: 2,
                        background: 'white',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 6px 20px rgba(0,0,0,0.12)'
                        }
                      }}
                    >
                      <Box display="flex" alignItems="center" gap={2} mb={2}>
                        <Box
                          component="img"
                          src={application.professional.professional_profile_image}
                          alt="Applicant Profile"
                          sx={{
                            width: 56,
                            height: 56,
                            borderRadius: '50%',
                            border: '2px solid',
                            borderColor: 'primary.main',
                            objectFit: 'cover'
                          }}
                        />
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {application.professional.professional_name}
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography variant="body2" color="text.secondary">
                              Rating:
                            </Typography>
                            <Rating
                              name="read-only"
                              value={application.professional.rating}
                              readOnly
                              precision={0.5}
                              size="small"
                              sx={{ ml: 1 }}
                            />
                          </Box>
                        </Box>
                      </Box>
                      <Typography variant="body2" paragraph sx={{ lineHeight: 1.6 }}>
                        {application.message}
                      </Typography>

                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Status: {application.status}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" display="block">
                            Applied: {new Date(application.created_at).toLocaleDateString()}
                          </Typography>
                        </Box>
                        <Button
                          variant="contained"
                          disabled={isLoadingaccept}
                          color="success"
                          size="small"
                          onClick={() => handleAcceptApplication(application.id)}
                          startIcon={<CheckIcon />}
                          sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 'medium'
                          }}
                        >
                          {isLoadingaccept ? <CircularProgress size={24} color="inherit" /> : 'Accept'}
                        </Button>
                      </Box>
                    </Paper>
                  ))}
                </Box>
              ) : (
                <Paper
                  elevation={2}
                  sx={{
                    p: 4,
                    borderRadius: 2,
                    textAlign: 'center',
                    background: 'white'
                  }}
                >
                  <Typography variant="body1" color="text.secondary">
                    No applications yet
                  </Typography>
                </Paper>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Edit Dialog */}
      <Dialog
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: { borderRadius: 3, p: 1 }
        }}
      >
        <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
          Edit Job
          <IconButton
            aria-label="close"
            onClick={() => setShowEditModal(false)}
            sx={{
              position: 'absolute',
              right: 12,
              top: 12,
              color: 'grey.500'
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <form onSubmit={handleUpdatePost}>
          <DialogContent dividers sx={{ pt: 3, pb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  fullWidth
                  required
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    sx: { borderRadius: 2 }
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  fullWidth
                  required
                  multiline
                  rows={4}
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    sx: { borderRadius: 2 }
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  fullWidth
                  required
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    sx: { borderRadius: 2 }
                  }}
                >
                  {categories?.map((category: { name: string }, index: number) => (
                    <MenuItem key={index} value={category.name}>
                      {category.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Urgency"
                  name="urgency"
                  value={formData.urgency}
                  onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                  fullWidth
                  required
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    sx: { borderRadius: 2 }
                  }}
                >
                  <MenuItem value="normal">Normal</MenuItem>
                  <MenuItem value="urgent">Urgent</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Work Due Date"
                  name="work_due_date"
                  type="date"
                  value={formData.work_due_date}
                  onChange={(e) => setFormData({ ...formData, work_due_date: e.target.value })}
                  fullWidth
                  required
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    sx: { borderRadius: 2 }
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions sx={{ p: 3 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 'medium',
                px: 3
              }}
            >
              Update
            </Button>
            <Button
              onClick={() => setShowEditModal(false)}
              variant="outlined"
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 'medium',
                px: 3
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Footer />
    </>
  );
}