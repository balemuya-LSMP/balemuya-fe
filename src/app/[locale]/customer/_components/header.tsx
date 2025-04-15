/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useState } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { useUserProfileQuery } from "@/store/api/userProfile.api";
import { useAuth } from "@/contexts/authContext";
import { useGetNotificationsQuery } from "@/store/api/services.api";
import NotificationsPanel from "../../professional/_components/NotificationsPanel";
import { useThemeToggle } from "@/hooks/useTheme";

import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  InputBase,
  Badge,
  useMediaQuery,
  useTheme,
  Avatar,
  Paper,
  Container,
  Button,
  Divider,
} from "@mui/material";

import { FiLogOut, FiUser, FiSettings } from "react-icons/fi";
import { FaBell, FaSearch, FaBars } from "react-icons/fa";
import { DarkMode, LightMode } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Header({ searchQuery, setSearchQuery }: HeaderProps) {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { logout } = useAuth();
  const { data: userProfile } = useUserProfileQuery({});
  const { data: notificationData } = useGetNotificationsQuery();
  const { toggleTheme, currentTheme } = useThemeToggle();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const unreadCount = notificationData?.notifications?.filter((notif: any) => !notif.is_read).length ?? 0;

  const pages = [
    { name: 'Home', href: '/customer' },
    { name: 'Professionals', href: '/customer/professionals' },
    { name: 'Work Post', href: '/customer/work' }
  ];

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logout successful");
      router.push("/auth/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar 
        position="sticky" 
        color="default" 
        elevation={0}
        sx={{ 
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.divider}`,
          py: 1
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: "space-between", gap: 2 }}>
            {/* Logo - Desktop */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              <Link href="/customer" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <Avatar 
                  src="/images/logo.jpg" 
                  alt="Logo" 
                  sx={{ 
                    width: 48, 
                    height: 48,
                    mr: 1.5
                  }} 
                />
                <Typography 
                  variant="h6" 
                  color="primary" 
                  sx={{ 
                    fontWeight: 700,
                    letterSpacing: 0.5,
                    fontSize: '1.25rem'
                  }}
                >
                  Balamuya
                </Typography>
              </Link>
            </Box>

            {/* Mobile menu button */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
              <IconButton
                size="large"
                aria-label="menu"
                onClick={handleOpenNavMenu}
                color="inherit"
                sx={{ color: 'text.primary' }}
              >
                <FaBars />
              </IconButton>
              
              {/* Mobile Logo */}
              <Link 
                href="/customer" 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  textDecoration: 'none',
                  marginLeft: '12px'
                }}
              >
                <Avatar 
                  src="/images/logo.jpg" 
                  alt="Logo" 
                  sx={{ 
                    width: 36, 
                    height: 36,
                    mr: 1
                  }} 
                />
                <Typography 
                  variant="h6" 
                  color="primary" 
                  sx={{ 
                    fontWeight: 700,
                    fontSize: '1.1rem'
                  }}
                >
                  {!isSmallMobile && 'Balamuya'}
                </Typography>
              </Link>
            </Box>

            {/* Mobile Menu */}
            <Menu
              id="mobile-menu"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
              PaperProps={{
                sx: {
                  minWidth: 200,
                  boxShadow: theme.shadows[3],
                  mt: 1
                }
              }}
            >
              {pages.map((page) => (
                <MenuItem 
                  key={page.name} 
                  onClick={handleCloseNavMenu} 
                  component={Link} 
                  href={page.href}
                  sx={{
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover
                    }
                  }}
                >
                  <Typography>{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>

            {/* Navigation Links - Desktop */}
            <Box sx={{ 
              flexGrow: 1, 
              display: { xs: 'none', md: 'flex' }, 
              justifyContent: 'center',
              gap: 1
            }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  component={Link}
                  href={page.href}
                  sx={{ 
                    color: 'text.primary',
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    textTransform: 'none',
                    px: 2,
                    '&:hover': {
                      color: 'primary.main',
                      backgroundColor: 'transparent'
                    }
                  }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            {/* Search & Actions */}
            <Box display="flex" alignItems="center" gap={1}>
              {!isSmallMobile && (
                <Paper
                  component="form"
                  sx={{
                    p: '2px 8px',
                    display: 'flex',
                    alignItems: 'center',
                    width: isMobile ? 180 : 240,
                    borderRadius: 4,
                    boxShadow: 'none',
                    border: `1px solid ${theme.palette.divider}`,
                    backgroundColor: theme.palette.background.paper,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      borderColor: theme.palette.primary.main
                    }
                  }}
                >
                  <InputBase
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    fullWidth
                    sx={{ 
                      ml: 1, 
                      flex: 1,
                      fontSize: '0.9rem'
                    }}
                    endAdornment={
                      <IconButton 
                        type="button" 
                        sx={{ 
                          p: '6px', 
                          color: 'text.secondary',
                          '&:hover': {
                            color: 'primary.main'
                          }
                        }}
                      >
                        <FaSearch size={14} />
                      </IconButton>
                    }
                  />
                </Paper>
              )}

              <IconButton 
                onClick={() => setIsOpen(true)} 
                size="medium"
                sx={{
                  color: 'text.primary',
                  '&:hover': {
                    color: 'primary.main'
                  }
                }}
              >
                <Badge 
                  badgeContent={unreadCount} 
                  color="error"
                  sx={{
                    '& .MuiBadge-badge': {
                      right: 3,
                      top: 3,
                      fontSize: '0.6rem'
                    }
                  }}
                >
                  <FaBell size={16} />
                </Badge>
              </IconButton>

              {/* Theme Toggle */}
              <IconButton 
                onClick={toggleTheme}
                sx={{
                  color: 'text.primary',
                  '&:hover': {
                    color: 'primary.main'
                  }
                }}
              >
                {currentTheme === "light" ? (
                  <DarkMode fontSize="small" />
                ) : (
                  <LightMode fontSize="small" />
                )}
              </IconButton>

              {/* Profile Avatar */}
              <IconButton 
                onClick={handleOpenUserMenu} 
                sx={{ 
                  p: 0,
                  ml: 0.5
                }}
              >
                <Avatar
                  alt="User"
                  src={userProfile?.user?.user?.profile_image_url ?? "/images/user.png"}
                  sx={{
                    width: 36,
                    height: 36,
                    border: `1px solid ${theme.palette.divider}`
                  }}
                />
              </IconButton>

              {/* User Menu */}
              <Menu
                sx={{ mt: '45px' }}
                id="user-menu"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                PaperProps={{
                  sx: {
                    minWidth: 200,
                    boxShadow: theme.shadows[3],
                    mt: 1.5,
                    py: 0.5,
                    '& .MuiMenuItem-root': {
                      fontSize: '0.875rem',
                      py: 1.2
                    }
                  }
                }}
              >
                <MenuItem 
                  onClick={handleCloseUserMenu} 
                  component={Link} 
                  href="/customer/profile"
                  sx={{
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover
                    }
                  }}
                >
                  <FiUser style={{ marginRight: 12, fontSize: '1rem' }} /> 
                  Profile
                </MenuItem>
                <MenuItem 
                  onClick={handleCloseUserMenu} 
                  component={Link} 
                  href="/customer/settings"
                  sx={{
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover
                    }
                  }}
                >
                  <FiSettings style={{ marginRight: 12, fontSize: '1rem' }} /> 
                  Settings
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem 
                  onClick={() => { 
                    handleLogout(); 
                    handleCloseUserMenu(); 
                  }}
                  sx={{
                    color: theme.palette.error.main,
                    '&:hover': {
                      backgroundColor: theme.palette.error.light,
                      color: theme.palette.error.contrastText
                    }
                  }}
                >
                  <FiLogOut style={{ marginRight: 12, fontSize: '1rem' }} /> 
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Notification Panel */}
      <NotificationsPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <ToastContainer position="top-center" />
    </>
  );
}