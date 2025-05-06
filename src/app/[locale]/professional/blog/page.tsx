/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import {
  useGetAllPostsQuery,
  useCreatePostMutation,
  useLikePostMutation,
  useAddCommentMutation,
  useGetCommentsQuery
} from "@/store/api/blog.api";
import {
  Box,
  Typography,
  Container,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  CardActions,
  Button,
  Skeleton,
  Divider,
  Chip,
  Grid,
  Stack,
  Paper,
  useTheme,
  alpha,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Collapse,
  DialogContent,
  Input,
  DialogActions,
  Dialog,
  DialogTitle
} from '@mui/material';
import {
  CalendarMonth as CalendarIcon,
  Person as PersonIcon,
  ThumbUp as LikeIcon,
  Comment as CommentIcon,
  ReadMore as ReadMoreIcon,
  Send as SendIcon,
  ExpandMore as ExpandMoreIcon,
  Add as PlusIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import { useRouter } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import Footer from '../../(features)/_components/footer';
import Header from '../_components/header';

const MotionCard = motion(Card);

export default function BlogPage() {
  const { data: posts, isLoading, error } = useGetAllPostsQuery();
  const [createPost] = useCreatePostMutation();
  const [likePost] = useLikePostMutation();
  const [commentText, setCommentText] = useState<{ [postId: string]: string }>({});
  const [expandedComments, setExpandedComments] = useState<{ [postId: string]: boolean }>({});
  const [addComment] = useAddCommentMutation();
  const [openAddPost, setOpenAddPost] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    media: [] as File[]
  });

  const router = useRouter();
  const theme = useTheme();

  console.log("posts", posts)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewPost(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setNewPost(prev => ({
        ...prev,
        media: Array.from(files),
      }));
    }
  };

  const handleSubmitPost = async () => {
    const formData = new FormData();
    formData.append('title', newPost.title);
    formData.append('content', newPost.content);
    newPost.media.forEach(file => formData.append('media', file));

    try {
      await createPost(formData).unwrap();
      setOpenAddPost(false);
      setNewPost({ title: '', content: '', media: [] });
    } catch (err) {
      console.error('Failed to create post', err);
    }
  };


  const handleCommentChange = (postId: string, value: string) => {
    setCommentText((prev) => ({ ...prev, [postId]: value }));
  };

  const handleAddComment = async (postId: string) => {
    if (!commentText[postId]?.trim()) return;

    try {
      await addComment({
        postId,
        data: { content: commentText[postId] }
      }).unwrap();
      setCommentText((prev: any) => ({ ...prev, [postId]: "" }));
    } catch (err) {
      console.error("Failed to add comment", err);
    }
  };

  const handleLike = async (postId: string) => {
    try {
      await likePost(postId).unwrap();
    } catch (err) {
      console.error("Failed to like post", err);
    }
  };

  const toggleComments = (postId: string) => {
    setExpandedComments((prev) => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper elevation={0} sx={{
          p: 4,
          textAlign: 'center',
          backgroundColor: alpha(theme.palette.error.light, 0.1)
        }}>
          <Typography color="error" variant="h6">
            Error loading posts. Please try again later.
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <>
      <Header searchQuery={''} setSearchQuery={function (query: string): void {
        throw new Error('Function not implemented.');
      }} filter={[]} setFilter={function (filter: string[]): void {
        throw new Error('Function not implemented.');
      }} />
      <Container maxWidth="lg" sx={{ py: 6 }}>

        {/* how add post button */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mb: 4,
          width: '100%'
        }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenAddPost(true)}
            startIcon={<PlusIcon />}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              px: 2,
              py: 1.5,
              borderRadius: 2,
              boxShadow: theme.shadows[2],
              minWidth: '180px'
            }}
          >
            New Post
          </Button>
        </Box>
        {/* Featured Post */}
        {!isLoading && posts?.length > 0 && (
          <MotionCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            sx={{
              mb: 6,
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: theme.shadows[10],
              backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))',
              color: 'common.white',
              position: 'relative',
              minHeight: 400,
              display: 'flex',
              alignItems: 'flex-end',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%)',
              zIndex: 1
            }} />

            <Box sx={{
              position: 'relative',
              zIndex: 2,
              p: 5,
              width: '100%'
            }}>
              <Chip
                label="Featured"
                color="primary"
                size="small"
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  backdropFilter: 'blur(4px)',
                  backgroundColor: alpha(theme.palette.primary.main, 0.2)
                }}
              />
              <Typography variant="h3" sx={{
                fontWeight: 700,
                mb: 2,
                lineHeight: 1.2
              }}>
                {posts[0].title}
              </Typography>
              <Typography variant="body1" sx={{
                mb: 3,
                fontSize: '1.1rem',
                opacity: 0.9,
                maxWidth: '80%'
              }}>
                {posts[0].content.substring(0, 150)}...
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => router.push(`/blog/${posts[0].id}`)}
                sx={{
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none'
                }}
              >
                Read Featured Story
              </Button>
            </Box>
          </MotionCard>
        )}

        {/* Main Content */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{
            fontWeight: 600,
            mb: 3,
            display: 'flex',
            alignItems: 'center',
            '&:after': {
              content: '""',
              flex: 1,
              ml: 2,
              height: '1px',
              backgroundColor: 'divider'
            }
          }}>
            Latest Articles
          </Typography>

          <Grid container spacing={4} alignItems="stretch">
            {isLoading ? (
              Array.from(new Array(3)).map((_, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <Card sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    overflow: 'hidden'
                  }}>
                    <Skeleton variant="rectangular" height={200} />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Skeleton width="60%" height={32} />
                      <Skeleton width="100%" height={24} sx={{ mt: 1.5 }} />
                      <Skeleton width="100%" height={24} sx={{ mt: 0.5 }} />
                      <Skeleton width="80%" height={24} sx={{ mt: 0.5 }} />
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                      <Skeleton width="40%" height={32} />
                      <Skeleton width="30%" height={32} />
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              posts?.map((post: any, index: number) => (
                <Grid item xs={12} lg={6} key={post.id}>
                  <MotionCard
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 3,
                      overflow: 'hidden',
                      height: 'auto',
                      position: 'relative',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow: theme.shadows[6]
                      }
                    }}
                  >
                    <Box sx={{
                      height: 200,
                      backgroundColor: alpha(theme.palette.primary.light, 0.2),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'text.secondary'
                    }}>
                      {post.medias?.length > 0 ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={post.medias[0].url}
                          alt={post.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      ) : (
                        <Typography variant="h6">No Image</Typography>
                      )}
                    </Box>

                    <CardContent sx={{ flexGrow: 1 }}>
                      <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
                        <Chip
                          label={post.author.user_type}
                          size="small"
                          color="secondary"
                          sx={{ fontWeight: 500 }}
                        />
                      </Stack>

                      <Typography variant="h5" component="h2" sx={{
                        fontWeight: 700,
                        mb: 1.5,
                        lineHeight: 1.3
                      }}>
                        {post.title}
                      </Typography>

                      <Typography variant="body1" color="text.secondary" sx={{
                        mb: 2,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {post.content}
                      </Typography>
                    </CardContent>

                    <Divider sx={{ mx: 2 }} />

                    <CardActions sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      px: 2,
                      py: 1.5
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          src={post?.author?.profile_image_url}
                          alt={post.author.full_name}
                          sx={{ width: 32, height: 32, mr: 1 }}
                        >
                          {post.author.full_name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <Typography variant="body2">{post.author.full_name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {formatDate(post.created_at)}
                          </Typography>
                        </Box>
                      </Box>

                      <Box>
                        <Button
                          size="small"
                          startIcon={<LikeIcon fontSize="small" />}
                          onClick={() => handleLike(post.id)}
                          sx={{
                            color: 'text.secondary',
                            '&:hover': {
                              color: 'error.main'
                            }
                          }}
                        >
                          {post.likes_count}
                        </Button>

                        <Button
                          size="small"
                          startIcon={<CommentIcon fontSize="small" />}
                          onClick={() => toggleComments(post.id)}
                          sx={{
                            color: 'text.secondary',
                            '&:hover': {
                              color: 'primary.main'
                            }
                          }}
                        >
                          {post.comments_count}
                        </Button>
                      </Box>
                    </CardActions>

                    <CardActions sx={{
                      display: 'flex',
                      justifyContent: 'end',
                      px: 2,
                      pb: 2,
                      pt: 0
                    }}>
                      <Button
                        size="small"
                        onClick={() => router.push(`/professional/blog/${post.id}`)}
                        sx={{
                          textTransform: 'none',
                          fontWeight: 600,
                          color: 'primary.main',
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.1)
                          }
                        }}
                      >
                        <ReadMoreIcon/>
                      </Button>
                    </CardActions>

                    {/* Comments Section */}
                    <Collapse
                      in={expandedComments[post.id]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Box sx={{ px: 2, pb: 2 }}>
                        <PostComments postId={post.id} />

                        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                          <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            placeholder="Add a comment..."
                            value={commentText[post.id] || ''}
                            onChange={(e) => handleCommentChange(post.id, e.target.value)}
                            sx={{
                              mr: 1,
                              '& .MuiOutlinedInput-root': {
                                borderRadius: 20,
                                backgroundColor: alpha(theme.palette.primary.light, 0.05)
                              }
                            }}
                          />
                          <IconButton
                            color="primary"
                            onClick={() => handleAddComment(post.id)}
                            disabled={!commentText[post.id]?.trim()}
                          >
                            <SendIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </Collapse>
                  </MotionCard>
                </Grid>
              ))
            )}
          </Grid>
        </Box>
      </Container>
      <Dialog
        open={openAddPost}
        onClose={() => setOpenAddPost(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          style: {
            borderRadius: 12,
            padding: 0,
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          },
        }}
      >
        <DialogTitle
          style={{
            fontWeight: 600,
            fontSize: '1.25rem',
            padding: '20px 24px',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          Add New Post
        </DialogTitle>

        <DialogContent
          dividers
          style={{
            padding: '24px',
            backgroundColor: '#fafafa',
          }}
        >
          <Stack spacing={3}>
            <TextField
              label="Title"
              name="title"
              value={newPost.title}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              InputProps={{
                style: {
                  borderRadius: 8,
                  backgroundColor: '#fff',
                },
              }}
            />
            <TextField
              label="Content"
              name="content"
              value={newPost.content}
              onChange={handleInputChange}
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              InputProps={{
                style: {
                  borderRadius: 8,
                  backgroundColor: '#fff',
                },
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{ fontSize: '0.875rem', color: '#555' }}>Attachments</label>
              <Input
                type="file"
                inputProps={{ multiple: true, accept: 'image/*,video/*' }}
                onChange={handleFileChange}
                style={{
                  fontSize: '0.9rem',
                  border: '1px solid #ccc',
                  borderRadius: 6,
                  padding: '6px 12px',
                  backgroundColor: '#fff',
                }}
              />
            </div>
          </Stack>
        </DialogContent>

        <DialogActions
          style={{
            padding: '16px 24px',
            backgroundColor: '#f5f5f5',
            borderTop: '1px solid #e0e0e0',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            onClick={handleSubmitPost}
            variant="contained"
            style={{
              backgroundColor: 'primary.main',
              color: '#fff',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: 8,
              padding: '6px 20px',
            }}
          >
            Post
          </Button>
          <Button
            onClick={() => setOpenAddPost(false)}
            variant="outlined"
            style={{
              backgroundColor: 'gray',
              color: '#fff',
              marginRight: 8,
              fontWeight: 500,
              textTransform: 'none',
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </>
  );
}

// Separate component for displaying comments
function PostComments({ postId }: { postId: string }) {
  const { data: comments, isLoading, error } = useGetCommentsQuery(postId);
  const theme = useTheme();
  console.log(comments);
  if (isLoading) {
    return (
      <Box>
        {Array.from(new Array(2)).map((_, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Skeleton width="60%" height={20} />
              <Skeleton width="100%" height={40} sx={{ mt: 1 }} />
            </Box>
          </Box>
        ))}
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="body2" color="error" sx={{ textAlign: 'center', py: 2 }}>
        Error loading comments
      </Typography>
    );
  }

  if (!comments || comments.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
        No comments yet
      </Typography>
    );
  }

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {comments?.data?.map((comment: any) => (
        <ListItem key={comment.id} alignItems="flex-start" sx={{ px: 0 }}>
          <ListItemAvatar>
            <Avatar
              src={comment?.author?.profile_image_url}
              alt={comment?.author?.email}
            >
              {comment?.author?.email.charAt(0).toUpperCase()}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="subtitle2"
                  color="text.primary"
                  sx={{ fontWeight: 600 }}
                >
                  {comment?.author?.email}
                </Typography>
                <Typography
                  component="span"
                  variant="caption"
                  color="text.secondary"
                  sx={{ ml: 1 }}
                >
                  {format(new Date(comment.created_at), 'MMM d, yyyy')}
                </Typography>
              </React.Fragment>
            }
            secondary={
              <Typography
                component="span"
                variant="body2"
                color="text.primary"
                sx={{ display: 'inline-block', mt: 0.5 }}
              >
                {comment.content}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}