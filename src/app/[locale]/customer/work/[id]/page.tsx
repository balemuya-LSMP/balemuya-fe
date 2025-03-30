/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from "@/i18n/navigation";
import { format } from 'date-fns';
import { toast, ToastContainer } from 'react-toastify';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
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
  const [acceptApplication] = useAcceptApplicationMutation();
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

  const handleAcceptApplication = async (id: string) => {
    await acceptApplication(id);
    toast.success('Application accepted successfully');
  }

  const handleUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof id === 'string') {
      await updateService({ id, data: formData });
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
          backgroundColor: 'background.default',
          flexDirection: 'column',
          minHeight: '78vh',
        }}
      >
        <Container maxWidth="lg" sx={{ dispaly: "flex", py: 6, alignItems: 'center' }}>
          <Grid container spacing={3}>
            {/* Work Details Card */}
            <Grid item xs={12} md={8}>
              <Card elevation={3} sx={{ borderRadius: 2 }}>
                <CardHeader
                  avatar={
                    <Box
                      component="img"
                      src={work.customer_profile_image}
                      alt="Customer Profile"
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        border: '2px solid',
                        borderColor: 'primary.main'
                      }}
                    />
                  }
                  title={
                    <Typography variant="h5" component="div">
                      {work.title}
                    </Typography>
                  }
                  subheader={
                    <Typography variant="body2" color="text.secondary">
                      Customer ID: {work.customer_id}
                    </Typography>
                  }
                />

                <CardContent>
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={6} sm={3}>
                      <Box display="flex" alignItems="center">
                        <CheckIcon color="success" sx={{ mr: 1 }} />
                        <Typography variant="body2">{work.urgency}</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box display="flex" alignItems="center">
                        <ScheduleIcon color="primary" sx={{ mr: 1 }} />
                        <Typography variant="body2">
                          Due: {format(new Date(work.work_due_date), 'MMM dd, yyyy')}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box display="flex" alignItems="center">
                        <LocationIcon color="info" sx={{ mr: 1 }} />
                        <Typography variant="body2">
                          {work.location.city}, {work.location.region}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box display="flex" alignItems="center">
                        <StarIcon color="warning" sx={{ mr: 1 }} />
                        <Typography variant="body2">Rating: {work.customer_rating}</Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  <Typography variant="body1" paragraph>
                    {work.description}
                  </Typography>

                  <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
                    <Button
                      variant="contained"
                      startIcon={<EditIcon />}
                      onClick={handleEditClick}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={handleDelete}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Applications List */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Applications ({applications?.length || 0})
              </Typography>

              {applications?.length > 0 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {applications.map((application: any) => (
                    <Paper key={application.id} elevation={2} sx={{ p: 2 }}>
                      <Box display="flex" alignItems="center" gap={2} mb={2}>
                        <Box
                          component="img"
                          src={application.professional_profile_image}
                          alt="Applicant Profile"
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            border: '2px solid',
                            borderColor: 'primary.main'
                          }}
                        />
                        <Box>
                          <Typography variant="subtitle1">
                            {application.professional_name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Rating: ⭐ {application.rating}
                          </Typography>
                        </Box>
                      </Box>

                      <Typography variant="body2" paragraph>
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
                          color="success"
                          size="small"
                          onClick={() => handleAcceptApplication(application.id)}
                          startIcon={<CheckIcon />}
                        >
                          Accept
                        </Button>
                      </Box>
                    </Paper>
                  ))}
                </Box>
              ) : (
                <Typography variant="body1" color="text.secondary" textAlign="center" py={4}>
                  No applications yet
                </Typography>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Edit Dialog */}
      <Dialog open={showEditModal} onClose={() => setShowEditModal(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          Edit Job
          <IconButton
            aria-label="close"
            onClick={() => setShowEditModal(false)}
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

        <form onSubmit={handleUpdatePost}>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  fullWidth
                  required
                  margin="normal"
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
          <Button type="submit" variant="contained" color="primary">
              Update
          </Button>
            <Button onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <ToastContainer position='top-center' />
      <Footer />
    </>
  );
}