/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
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
} from "@mui/material";

import { FiLogOut, FiUser } from "react-icons/fi";
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
      <AppBar position="sticky" color="default" elevation={2}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            {/* Logo - Desktop */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              <Link href="/customer" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <img src="/images/logo.jpg" alt="Logo" style={{ width: 60, height: 60, borderRadius: '50%' }} />
                <Typography variant="h6" color="primary" sx={{ ml: 1, fontWeight: 600 }}>
                  Balamuya
                </Typography>
              </Link>
            </Box>

            {/* Mobile menu */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <FaBars />
              </IconButton>
              <Menu
                id="menu-appbar"
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
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu} component={Link} href={page.href}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Logo - Mobile */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', flexGrow: 1 }}>
              <Link href="/customer" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <img src="/images/logo.jpg" alt="Logo" style={{ width: 40, height: 40, borderRadius: '50%' }} />
                <Typography variant="h6" color="primary" sx={{ ml: 1, fontWeight: 600 }}>
                  Balamuya
                </Typography>
              </Link>
            </Box>

            {/* Navigation Links - Desktop */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  component={Link}
                  href={page.href}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'text.primary', display: 'block', '&:hover': { color: 'primary.main' } }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            {/* Search & Actions */}
            <Box display="flex" alignItems="center" gap={2}>
              <Paper
                component="form"
                sx={{
                  p: '2px 8px',
                  display: 'flex',
                  alignItems: 'center',
                  width: isMobile ? 180 : 300,
                  borderRadius: 3,
                  boxShadow: 'none',
                  border: '1px solid #ccc',
                  backgroundColor: theme.palette.mode === 'dark' ? '#2c2c2c' : '#fff',
                }}
              >
                <InputBase
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  fullWidth
                  sx={{ ml: 1, flex: 1 }}
                  endAdornment={
                    <IconButton type="button" sx={{ p: '6px', color: 'gray' }}>
                      <FaSearch />
                    </IconButton>
                  }
                />
              </Paper>

              <IconButton onClick={() => setIsOpen(true)} size="large">
                <Badge badgeContent={unreadCount} color="error">
                  <FaBell />
                </Badge>
              </IconButton>

              {/* Profile Avatar */}
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="User"
                  src={userProfile?.user?.user?.profile_image_url ?? "/images/user.png"}
                />
              </IconButton>

              {/* User Menu */}
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
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
              >
                <MenuItem onClick={handleCloseUserMenu} component={Link} href="/customer/profile">
                  <FiUser style={{ marginRight: 8 }} /> Profile
                </MenuItem>
                <MenuItem onClick={() => { toggleTheme(); handleCloseUserMenu(); }}>
                  {currentTheme === "light" ? <DarkMode sx={{ mr: 1 }} /> : <LightMode sx={{ mr: 1 }} />} Theme
                </MenuItem>
                <MenuItem onClick={() => { handleLogout(); handleCloseUserMenu(); }}>
                  <FiLogOut style={{ marginRight: 8 }} /> Logout
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