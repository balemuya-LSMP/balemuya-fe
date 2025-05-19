/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { FaBell, FaFilter, FaSearch, FaBars } from "react-icons/fa";
import { FiUser, FiLogOut } from "react-icons/fi";
import { useUserProfileQuery } from "@/store/api/userProfile.api";
import {
  useGetNotificationsQuery,
  useGetCategoriesQuery,
} from "@/store/api/services.api";
import { useAuth } from "@/contexts/authContext";
import NotificationsPanel from "./NotificationsPanel";
import {
  AppBar,
  Toolbar,
  Container,
  Drawer,
  Box,
  Menu,
  MenuItem,
  TextField,
  Typography,
  Checkbox,
  ListItemText,
  Badge,
  Avatar,
  IconButton,
  Button,
  Divider,
  Paper,
  useTheme,
  alpha,
} from "@mui/material";
import { useThemeToggle } from "@/hooks/useTheme";
import { DarkMode, LightMode } from "@mui/icons-material";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filter: string[];
  setFilter: (filter: string[]) => void;
  handleFilter?: (updatedFilter: string[]) => void;
}

export default function Header({
  searchQuery,
  setSearchQuery,
  filter,
  setFilter,
  handleFilter,
}: HeaderProps) {
  const [showFilter, setShowFilter] = useState(false);
  const { data: userProfile, isLoading } = useUserProfileQuery({});
  const { data: categories } = useGetCategoriesQuery();
  const { data: notificationData } = useGetNotificationsQuery();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { logout } = useAuth();
  const { toggleTheme, currentTheme } = useThemeToggle();
  const theme = useTheme();

  const unreadCount =
    notificationData?.notifications?.filter((notif: any) => !notif.is_read)
      .length ?? 0;

  const pages = [
    { name: "Home", path: "/professional" },
    { name: "Subscription", path: "/professional/subscription" },
    { name: "Job", path: "/professional/jobs" },
    { name: "Requests", path: "/professional/requests" },
    { name: "Blog", path: "/professional/blog" },
  ];

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

  const handleLogout = async () => {
    await logout();
    router.push("/auth/login");
  };

  const handleCategoryChange = (categoryName: string) => {
    const updatedFilter = filter.includes(categoryName)
      ? filter.filter((item: string) => item !== categoryName)
      : [...filter, categoryName];
    setFilter(updatedFilter);

    if (handleFilter) {
      handleFilter(updatedFilter);
    }
  };

  // Glassmorphism style for dropdowns
  const glassStyle = {
    background: alpha(theme.palette.background.paper, 0.85),
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
    backdropFilter: "blur(8px)",
    borderRadius: 2,
    border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: `linear-gradient(90deg, ${theme.palette.background.paper} 80%, ${alpha(
          theme.palette.primary.light,
          0.08
        )} 100%)`,
        boxShadow: "0 2px 12px 0 rgba(0,0,0,0.04)",
        borderBottom: `1px solid ${theme.palette.divider}`,
        zIndex: 1201,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 60, md: 72 },
            px: { xs: 1, md: 2 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo and Brand */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              flexGrow: { xs: 1, md: 0 },
            }}
          >
            <Link href="/professional" passHref>
              <img
                src="/images/logo.jpg"
                alt="Logo"
                width={48}
                height={48}
                style={{
                  cursor: "pointer",
                  borderRadius: "50%",
                  boxShadow: "0 2px 8px 0 rgba(0,0,0,0.08)",
                  border: `2px solid ${theme.palette.primary.main}`,
                  background: "#fff",
                }}
              />
            </Link>
            <Typography
              variant="h5"
              component="a"
              href="/professional"
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 800,
                letterSpacing: 1,
                color: "primary.main",
                textDecoration: "none",
                fontSize: { xs: "1.1rem", md: "1.5rem" },
                ml: 1,
                display: { xs: "none", sm: "block" },
              }}
            >
              Balamuya
            </Typography>
          </Box>

          {/* Navigation - Desktop */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              gap: 1,
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => {
                  handleCloseNavMenu();
                  router.push(page.path);
                }}
                sx={{
                  color: "text.primary",
                  fontWeight: 600,
                  fontSize: "1rem",
                  borderRadius: 2,
                  px: 2.5,
                  py: 1,
                  textTransform: "none",
                  transition: "all 0.2s",
                  "&:hover": {
                    color: "primary.main",
                    background: alpha(theme.palette.primary.main, 0.08),
                  },
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: "flex", md: "none" }, ml: 1 }}>
            <IconButton
              size="large"
              aria-label="open navigation"
              onClick={handleOpenNavMenu}
              color="primary"
              sx={{
                borderRadius: 2,
                background: alpha(theme.palette.primary.main, 0.08),
                "&:hover": {
                  background: alpha(theme.palette.primary.main, 0.18),
                },
              }}
            >
              <FaBars />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                mt: 1,
                ...glassStyle,
              }}
              PaperProps={{
                sx: { ...glassStyle, minWidth: 180 },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={() => {
                    handleCloseNavMenu();
                    router.push(page.path);
                  }}
                  sx={{
                    fontWeight: 500,
                    fontSize: "1rem",
                    "&:hover": {
                      color: "primary.main",
                      background: alpha(theme.palette.primary.main, 0.08),
                    },
                  }}
                >
                  {page.name}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Search, Filter, Notifications, Profile */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, sm: 2 },
              ml: { xs: 0, md: 2 },
            }}
          >
            {/* Search */}
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                position: "relative",
                background: alpha(theme.palette.primary.main, 0.04),
                borderRadius: 2,
                boxShadow: "0 1px 4px 0 rgba(0,0,0,0.04)",
                px: 1,
              }}
            >
              <FaSearch size={16} color={theme.palette.text.secondary} />
              <TextField
                variant="standard"
                size="small"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    ml: 1,
                    fontSize: "1rem",
                    background: "transparent",
                  },
                }}
                sx={{
                  width: { sm: 120, md: 180 },
                  "& input": { py: 1 },
                }}
              />
            </Box>

            {/* Filter */}
            <Box sx={{ position: "relative" }}>
              <IconButton
                onClick={() => setShowFilter((v) => !v)}
                size="small"
                sx={{
                  borderRadius: 2,
                  background: alpha(theme.palette.primary.main, 0.04),
                  "&:hover": {
                    background: alpha(theme.palette.primary.main, 0.12),
                  },
                }}
              >
                <FaFilter size={18} color={theme.palette.text.secondary} />
              </IconButton>
              {showFilter && (
                <Paper
                  elevation={8}
                  sx={{
                    ...glassStyle,
                    position: "absolute",
                    top: 40,
                    right: 0,
                    minWidth: 240,
                    maxHeight: 320,
                    overflowY: "auto",
                    p: 2,
                    zIndex: 1300,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      color: "primary.main",
                      letterSpacing: 0.5,
                    }}
                  >
                    Filter by Category
                  </Typography>
                  <Divider sx={{ mb: 1 }} />
                  {categories?.length ? (
                    categories.map((category: any, index: any) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 0.5,
                        }}
                      >
                        <Checkbox
                          checked={filter.includes(category.name)}
                          onChange={() => handleCategoryChange(category.name)}
                          color="primary"
                          size="small"
                        />
                        <ListItemText
                          primary={category.name}
                          sx={{ fontSize: "0.95rem" }}
                        />
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No categories found.
                    </Typography>
                  )}
                </Paper>
              )}
            </Box>

            {/* Notifications */}
            <Badge
              badgeContent={unreadCount}
              color="error"
              sx={{
                "& .MuiBadge-badge": {
                  minWidth: 18,
                  height: 18,
                  fontSize: "0.75rem",
                  borderRadius: "50%",
                  boxShadow: "0 1px 4px 0 rgba(0,0,0,0.08)",
                },
              }}
            >
              <IconButton
                onClick={() => setIsOpen(true)}
                size="small"
                sx={{
                  borderRadius: 2,
                  background: alpha(theme.palette.primary.main, 0.04),
                  "&:hover": {
                    background: alpha(theme.palette.primary.main, 0.12),
                  },
                }}
              >
                <FaBell size={18} color={theme.palette.text.secondary} />
              </IconButton>
            </Badge>

            {/* User Profile */}
            <Box>
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{
                  p: 0,
                  borderRadius: 2,
                  border: `2px solid ${alpha(
                    theme.palette.primary.main,
                    0.15
                  )}`,
                  boxShadow: "0 1px 4px 0 rgba(0,0,0,0.04)",
                }}
              >
                <Avatar
                  alt={userProfile?.user?.user?.first_name || "User"}
                  src={
                    userProfile?.user?.user?.profile_image_url ||
                    "/images/user.png"
                  }
                  sx={{ width: 38, height: 38 }}
                />
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                PaperProps={{
                  sx: { ...glassStyle, minWidth: 200 },
                }}
              >
                <Box sx={{ px: 2, py: 1.5 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, color: "primary.main" }}
                  >
                    {userProfile?.user?.user?.first_name || "User"}{" "}
                    {userProfile?.user?.user?.last_name || ""}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: "0.95rem" }}
                  >
                    {userProfile?.user?.user?.role || "Professional"}
                  </Typography>
                </Box>
                <Divider />
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    router.push("/professional/profile");
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <FiUser size={16} />
                    <Typography>Profile</Typography>
                  </Box>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    toggleTheme();
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {currentTheme === "light" ? (
                      <DarkMode fontSize="small" />
                    ) : (
                      <LightMode fontSize="small" />
                    )}
                    <Typography>Theme</Typography>
                  </Box>
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={() => {
                    handleCloseUserMenu();
                    handleLogout();
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <FiLogOut size={16} />
                    <Typography>Logout</Typography>
                  </Box>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Search */}
      <Box
        sx={{
          px: 2,
          pb: 2,
          display: { xs: "block", sm: "none" },
          background: alpha(theme.palette.primary.main, 0.02),
        }}
      >
        <Box sx={{ position: "relative", display: "flex", alignItems: "center" }}>
          <FaSearch
            size={16}
            color={theme.palette.text.secondary}
            style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}
          />
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              pl: 4,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                background: alpha(theme.palette.primary.main, 0.04),
              },
            }}
            InputProps={{
              sx: { pl: 3 },
            }}
          />
        </Box>
      </Box>

      {/* Notifications Panel */}
      <NotificationsPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </AppBar>
  );
}
