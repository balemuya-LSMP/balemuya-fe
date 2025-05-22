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
    { name: 'Work Post', href: '/customer/work' },
    { name: 'Blog', href: '/customer/blog' },
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
        elevation={0}
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.divider}`,
          py: 1.5,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: "space-between", gap: 3 }}>
            {/* Logo - Desktop */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              <Link href="/customer" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <Avatar
                  src="/images/logo.jpg"
                  alt="Logo"
                  sx={{
                    width: 52,
                    height: 52,
                    mr: 2,
                    border: '2px solid #e5e7eb',
                    transition: 'transform 0.2s ease',
                    '&:hover': { transform: 'scale(1.05)' },
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    color: "primary.main",
                    fontWeight: 800,
                    letterSpacing: 0.8,
                    fontSize: '1.5rem',
                    fontFamily: '"Inter", sans-serif',
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
                sx={{
                  color: 'text.primary',
                  '&:hover': { color: 'primary.main', transform: 'scale(1.1)' },
                  transition: 'all 0.2s ease',
                }}
              >
                <FaBars size={20} />
              </IconButton>

              {/* Mobile Logo */}
              <Link
                href="/customer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  marginLeft: '16px',
                }}
              >
                <Avatar
                  src="/images/logo.jpg"
                  alt="Logo"
                  sx={{
                    width: 40,
                    height: 40,
                    mr: 1.5,
                    border: '2px solid #e5e7eb',
                    transition: 'transform 0.2s ease',
                    '&:hover': { transform: 'scale(1.05)' },
                  }}
                />
                <Typography
                  variant="h6"
                  color="primary"
                  sx={{
                    fontWeight: 800,
                    fontSize: '1.25rem',
                    fontFamily: '"Inter", sans-serif',
                    background: 'linear-gradient(to right, #3b82f6, #7c3aed)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
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
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
              PaperProps={{
                sx: {
                  minWidth: 220,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  mt: 1.5,
                  borderRadius: 2,
                  background: 'white',
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  href={page.href}
                  sx={{
                    py: 1.5,
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    color: 'text.primary',
                    '&:hover': {
                      backgroundColor: '#f1f5f9',
                      color: 'primary.main',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  {page.name}
                </MenuItem>
              ))}
            </Menu>

            {/* Navigation Links - Desktop */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: 3 }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  component={Link}
                  href={page.href}
                  sx={{
                    color: 'text.primary',
                    fontWeight: 600,
                    fontSize: '1rem',
                    textTransform: 'none',
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: '#f1f5f9',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            {/* Search & Actions */}
            <Box display="flex" alignItems="center" gap={1.5}>
              {!isSmallMobile && (
                <Paper
                  component="form"
                  sx={{
                    p: '4px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    width: isMobile ? 200 : 280,
                    borderRadius: 8,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                    border: 'none',
                    backgroundColor: '#f1f5f9',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: '#e2e8f0',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    },
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
                      fontSize: '0.95rem',
                      fontFamily: '"Inter", sans-serif',
                      color: 'text.primary',
                    }}
                    endAdornment={
                      <IconButton
                        type="button"
                        sx={{
                          p: '8px',
                          color: 'text.secondary',
                          '&:hover': { color: 'primary.main', transform: 'scale(1.1)' },
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <FaSearch size={16} />
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
                  p: 1.2,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: '#f1f5f9',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <Badge
                  badgeContent={unreadCount}
                  color="error"
                  sx={{
                    '& .MuiBadge-badge': {
                      right: 2,
                      top: 2,
                      fontSize: '0.65rem',
                      minWidth: '16px',
                      height: '16px',
                      borderRadius: '50%',
                    },
                  }}
                >
                  <FaBell size={18} />
                </Badge>
              </IconButton>

              {/* Theme Toggle */}
              <IconButton
                onClick={toggleTheme}
                sx={{
                  color: 'text.primary',
                  p: 1.2,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: '#f1f5f9',
                    transform: 'scale(1.1)',
                  },
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
                  ml: 0.5,
                  transition: 'all 0.2s ease',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              >
                <Avatar
                  alt="User"
                  src={userProfile?.user?.user?.profile_image_url ?? "/images/user.png"}
                  sx={{
                    width: 40,
                    height: 40,
                    border: `2px solid ${theme.palette.primary.main}`,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                  }}
                />
              </IconButton>

              {/* User Menu */}
              <Menu
                sx={{ mt: '50px' }}
                id="user-menu"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                PaperProps={{
                  sx: {
                    minWidth: 220,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    mt: 2,
                    py: 1,
                    borderRadius: 2,
                    background: 'white',
                    '& .MuiMenuItem-root': {
                      fontSize: '0.9rem',
                      py: 1.5,
                      fontFamily: '"Inter", sans-serif',
                    },
                  },
                }}
              >
                <MenuItem
                  onClick={handleCloseUserMenu}
                  component={Link}
                  href="/customer/profile"
                  sx={{
                    color: 'text.primary',
                    '&:hover': {
                      backgroundColor: '#f1f5f9',
                      color: 'primary.main',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  <FiUser style={{ marginRight: 12, fontSize: '1.1rem' }} />
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={handleCloseUserMenu}
                  component={Link}
                  href="/customer/settings"
                  sx={{
                    color: 'text.primary',
                    '&:hover': {
                      backgroundColor: '#f1f5f9',
                      color: 'primary.main',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  <FiSettings style={{ marginRight: 12, fontSize: '1.1rem' }} />
                  Settings
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem
                  onClick={() => {
                    handleLogout();
                    handleCloseUserMenu();
                  }}
                  sx={{
                    color: 'error.main',
                    '&:hover': {
                      backgroundColor: '#fef2f2',
                      color: 'error.dark',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  <FiLogOut style={{ marginRight: 12, fontSize: '1.1rem' }} />
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Notification Panel */}
      <NotificationsPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}