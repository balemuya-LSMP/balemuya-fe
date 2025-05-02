/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useGetAllPostsQuery } from "@/store/api/blog.api";
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
  alpha
} from '@mui/material';
import { 
  CalendarMonth as CalendarIcon, 
  Person as PersonIcon,
  ThumbUp as LikeIcon,
  Comment as CommentIcon,
  Bookmark as BookmarkIcon,
  Share as ShareIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import { useRouter } from '@/i18n/navigation';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);

export default function BlogPage() {
  const { data: posts, isLoading, error } = useGetAllPostsQuery();
  const router = useRouter();
  const theme = useTheme();

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMMM dd, yyyy');
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
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Hero Section */}
      <Box sx={{ 
        textAlign: 'center', 
        mb: 8,
        px: { xs: 2, md: 0 }
      }}>
        <Typography variant="h2" component="h1" sx={{ 
          fontWeight: 800,
          mb: 2,
          background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.5px'
        }}>
          Insights & Stories
        </Typography>
        
        <Typography variant="h6" sx={{ 
          maxWidth: 700,
          mx: 'auto',
          color: 'text.secondary',
          lineHeight: 1.6
        }}>
          Discover the latest industry trends, expert opinions, and valuable resources from our team of professionals.
        </Typography>
      </Box>

      {/* Featured Post (you can modify to show actual featured post) */}
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

        <Grid container spacing={4}>
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
              <Grid item xs={12} md={6} lg={4} key={post.id}>
                <MotionCard
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: theme.shadows[8]
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
                        src={post.author.profile_image_url} 
                        alt={post.author.email}
                        sx={{ width: 32, height: 32, mr: 1 }}
                      >
                        {post.author.email.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(post.created_at)}
                      </Typography>
                    </Box>
                    
                    <Box>
                      <Button 
                        size="small" 
                        startIcon={<BookmarkIcon fontSize="small" />}
                        sx={{ 
                          minWidth: 0,
                          color: 'text.secondary',
                          '&:hover': {
                            color: 'primary.main'
                          }
                        }}
                      />
                      <Button 
                        size="small" 
                        startIcon={<ShareIcon fontSize="small" />}
                        sx={{ 
                          minWidth: 0,
                          color: 'text.secondary',
                          '&:hover': {
                            color: 'primary.main'
                          }
                        }}
                      />
                    </Box>
                  </CardActions>
                  
                  <CardActions sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    px: 2,
                    pb: 2,
                    pt: 0
                  }}>
                    <Box>
                      <Chip 
                        icon={<LikeIcon fontSize="small" />} 
                        label={post.likes_count} 
                        size="small" 
                        variant="outlined"
                        sx={{ 
                          mr: 1,
                          '& .MuiChip-icon': {
                            color: theme.palette.error.main
                          }
                        }}
                      />
                      <Chip 
                        icon={<CommentIcon fontSize="small" />} 
                        label={post.comments_count} 
                        size="small" 
                        variant="outlined"
                      />
                    </Box>
                    
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
                      Read More
                    </Button>
                  </CardActions>
                </MotionCard>
              </Grid>
            ))
          )}
        </Grid>
      </Box>

      {/* Newsletter CTA */}
      <Paper elevation={0} sx={{ 
        p: 4, 
        borderRadius: 3,
        backgroundColor: alpha(theme.palette.primary.light, 0.05),
        textAlign: 'center',
        mt: 8,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
      }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          Stay Updated
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 3 }}>
          Subscribe to our newsletter to receive the latest blog posts and industry insights directly to your inbox.
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          maxWidth: 500, 
          mx: 'auto',
          '& .MuiTextField-root': {
            flexGrow: 1
          }
        }}>
          <Button 
            variant="contained" 
            size="large"
            sx={{
              px: 4,
              borderRadius: 2,
              fontWeight: 600,
              textTransform: 'none'
            }}
          >
            Subscribe
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}