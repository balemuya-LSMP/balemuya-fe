/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState } from 'react';
import {
  useGetPostByIdQuery,
  useLikePostMutation,
  useAddCommentMutation,
  useGetCommentsQuery
} from "@/store/api/blog.api";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  Box,
  Typography,
  Container,
  Avatar,
  Divider,
  Chip,
  Skeleton,
  Stack,
  IconButton,
  Paper,
  useTheme,
  alpha,
  Button,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import {
  CalendarMonth as CalendarIcon,
  ThumbUp as LikeIcon,
  Bookmark as BookmarkIcon,
  Share as ShareIcon,
  ArrowBack as BackIcon,
  Send as SendIcon
} from '@mui/icons-material';
import { formatDate } from '@/shared/formatDate';

export default function BlogPostPage() {
  const { id } = useParams();
  const { data: post, isLoading, error } = useGetPostByIdQuery(id as string);
  const [likePost] = useLikePostMutation();
  const [addComment] = useAddCommentMutation();
  const [commentText, setCommentText] = useState<{ [postId: string]: string }>({});


  const { data: comments } = useGetCommentsQuery(id as string);

  const router = useRouter();
  const theme = useTheme();
  const handleLike = async (postId: string) => {
    try {
      await likePost(postId).unwrap();
    } catch (err) {
      console.error("Failed to like post", err);
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

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper elevation={0} sx={{
          p: 4,
          textAlign: 'center',
          backgroundColor: alpha(theme.palette.error.light, 0.1)
        }}>
          <Typography color="error" variant="h6">
            Error loading post. Please try again later.
          </Typography>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => router.push('/blog')}
          >
            Back to Blog
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {/* Back button */}
      <IconButton
        onClick={() => router.push('/customer/blog')}
        sx={{
          mb: 4,
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, 0.1)
          }
        }}
      >
        <BackIcon />
      </IconButton>

      {isLoading ? (
        <>
          <Skeleton variant="rectangular" width="60%" height={60} sx={{ mb: 3 }} />
          <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Box>
              <Skeleton width={120} height={24} />
              <Skeleton width={180} height={20} />
            </Box>
          </Stack>
          <Skeleton variant="rectangular" height={400} sx={{ mb: 4, borderRadius: 2 }} />
          <Box sx={{ mb: 4 }}>
            {Array.from(new Array(8)).map((_, i) => (
              <Skeleton key={i} width="100%" height={24} sx={{ mb: 1 }} />
            ))}
          </Box>
        </>
      ) : post ? (
        <>
          {/* Post Header */}
          <Typography variant="h2" sx={{
            fontWeight: 800,
            mb: 3,
            lineHeight: 1.2,
            color: 'text.primary'
          }}>
            {post.title}
          </Typography>

          {/* Author and Metadata */}
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
            <Avatar
              src={post?.author?.profile_image_url}
              alt={post?.author?.email}
              sx={{ width: 56, height: 56 }}
            >
              {post?.author?.email.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" fontWeight="600">
                {post?.author?.email.split('@')[0]}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <CalendarIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {formatDate(post?.created_at)}
                </Typography>
                <Chip
                  label={post?.author?.user_type}
                  size="small"
                  color="secondary"
                  sx={{ ml: 1, fontWeight: 500 }}
                />
              </Stack>
            </Box>
          </Stack>

          {/* Featured Image */}
          {post.medias?.length > 0 && (
            <Box
              sx={{
                mb: 5,
                borderRadius: 3,
                overflow: 'hidden',
                position: 'relative',
                height: '300px',
                '&:hover .media-arrow': {
                  opacity: 1,
                },
              }}
            >
              {/* Media Slider */}
              <Box
                className="media-container"
                sx={{
                  display: 'flex',
                  overflowX: 'scroll',
                  scrollSnapType: 'x mandatory',
                  scrollBehavior: 'smooth',
                  height: '100%',
                  // Hide scrollbar
                  scrollbarWidth: 'none', // Firefox
                  '&::-webkit-scrollbar': {
                    display: 'none', // Chrome/Safari
                  },
                }}
              >
                {post.medias.map((media: any) => (
                  <Box
                    key={media.id}
                    sx={{
                      flex: '0 0 100%',
                      scrollSnapAlign: 'start',
                      position: 'relative',
                      minWidth: '100%',
                      height: '100%',
                    }}
                  >
                    <img
                      src={media?.media_file_url}
                      alt={`${post?.title} - Media`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover', // Ensures proper fill without distortion
                        display: 'block',
                      }}
                    />
                  </Box>
                ))}
              </Box>

              {/* Navigation Arrows */}
              {post.medias.length > 1 && (
                <>
                  <IconButton
                    className="media-arrow"
                    onClick={() => {
                      const container = document.querySelector('.media-container');
                      if (container) {
                        container.scrollBy({
                          left: -container.clientWidth,
                          behavior: 'smooth',
                        });
                      }
                    }}
                    sx={{
                      position: 'absolute',
                      left: 16,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      backgroundColor: alpha(theme.palette.common.black, 0.5),
                      color: theme.palette.common.white,
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.common.black, 0.7),
                      },
                    }}
                  >
                    <ChevronLeftIcon />
                  </IconButton>

                  <IconButton
                    className="media-arrow"
                    onClick={() => {
                      const container = document.querySelector('.media-container');
                      if (container) {
                        container.scrollBy({
                          left: container.clientWidth,
                          behavior: 'smooth',
                        });
                      }
                    }}
                    sx={{
                      position: 'absolute',
                      right: 16,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      backgroundColor: alpha(theme.palette.common.black, 0.5),
                      color: theme.palette.common.white,
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.common.black, 0.7),
                      },
                    }}
                  >
                    <ChevronRightIcon />
                  </IconButton>

                  {/* Dot Indicators */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 16,
                      left: 0,
                      right: 0,
                      display: 'flex',
                      justifyContent: 'center',
                      gap: 1,
                    }}
                  >
                    {post.medias.map((_: any, index: number) => (
                      <Box
                        key={index}
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: theme.palette.common.white,
                          opacity: 0.7,
                          cursor: 'pointer',
                          '&:hover': {
                            opacity: 1,
                          },
                        }}
                        onClick={() => {
                          const container = document.querySelector('.media-container');
                          if (container) {
                            container.scrollTo({
                              left: container.clientWidth * index,
                              behavior: 'smooth',
                            });
                          }
                        }}
                      />
                    ))}
                  </Box>
                </>
              )}
            </Box>
          )}

          {/* Content */}
          <Paper elevation={0} sx={{
            mb: 6,
            p: { xs: 3, md: 5 },
            borderRadius: 3,
            backgroundColor: alpha(theme.palette.background.paper, 0.7)
          }}>
            <Typography
              variant="body1"
              paragraph
              sx={{
                lineHeight: 1.8,
                fontSize: '1.1rem',
                whiteSpace: 'pre-line'
              }}
            >
              {post.content}
            </Typography>
          </Paper>

          {/* Tags and Actions */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 6 }}>
            <Stack direction="row" spacing={1}>
              <Chip label="Technology" size="small" />
              <Chip label="Design" size="small" />
              <Chip label="Innovation" size="small" />
            </Stack>
            <Stack direction="row" spacing={1}>
              <IconButton aria-label="like"
                onClick={() => handleLike(post.id)}
              >
                <LikeIcon />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {post.likes_count}
                </Typography>
              </IconButton>
              <IconButton aria-label="bookmark">
                <BookmarkIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </Stack>
          </Stack>

          <Divider sx={{ my: 6 }} />

          {/* Author Bio */}
          <Paper elevation={0} sx={{
            p: 4,
            borderRadius: 3,
            mb: 6,
            backgroundColor: alpha(theme.palette.primary.light, 0.05)
          }}>
            <Stack direction="row" spacing={3} alignItems="center">
              <Avatar
                src={post?.author?.profile_image_url}
                sx={{ width: 80, height: 80, cursor: 'pointer' }}
                onClick={() => router.push(`/customer/professionals/${post?.author?.id}`)}
              />
              <Box>
                <Typography variant="h6" gutterBottom>
                  About {post?.author?.email.split('@')[0]}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {post?.author?.bio || 'No biography available.'}
                </Typography>
                {post.author.address && (
                  <Typography variant="caption" color="text.secondary">
                    {[post?.author?.address?.city, post?.author?.address?.region, post?.author?.address?.country]
                      .filter(Boolean).join(', ')}
                  </Typography>
                )}
              </Box>
            </Stack>
          </Paper>

          {/* Comments Section */}
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 700 }}>
            Comments ({post.comments_count})
          </Typography>

          {/* Comment Form */}
          <Box component="form" sx={{ mb: 4 }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Share your thoughts..."
              variant="outlined"
              value={commentText[post.id] || ''}
              onChange={(e) => handleCommentChange(post.id, e.target.value)}

              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              sx={{ float: 'right' }}
              onClick={() => handleAddComment(post.id)}
            >
              Post Comment
            </Button>
          </Box>

          {/* Comments List */}
          <List sx={{ width: '100%' }}>
            {comments?.data?.map((comment: any) => (
              <ListItem key={comment.id} alignItems="flex-start" sx={{ px: 0 }}>
                <ListItemAvatar>
                  <Avatar
                    src={comment?.user?.profile_image_url}
                    alt={comment?.user?.full_name}
                  >
                    {comment?.user?.full_name?.charAt(0).toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography fontWeight="600" component="span">
                        {comment?.user?.full_name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                        {formatDate(comment.created_at)}
                      </Typography>
                    </Box>
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
        </>
      ) : (
        <Typography variant="h6" color="text.secondary" textAlign="center" sx={{ py: 8 }}>
          Post not found
        </Typography>
      )}
    </Container>
  );
}