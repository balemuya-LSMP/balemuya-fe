/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { FaBell, FaFilter, FaSearch, FaBars } from "react-icons/fa";
import { FiUser, FiLogOut } from "react-icons/fi";
import { useUserProfileQuery } from "@/store/api/userProfile.api";
import { useGetNotificationsQuery, useGetCategoriesQuery } from "@/store/api/services.api";
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
  Button
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

export default function Header({ searchQuery, setSearchQuery, filter, setFilter, handleFilter }: HeaderProps) {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { data: userProfile, isLoading } = useUserProfileQuery({});
  const { data: categories } = useGetCategoriesQuery();
  const { data: notificationData } = useGetNotificationsQuery();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { logout } = useAuth();
  const { toggleTheme, currentTheme } = useThemeToggle();
  const unreadCount = notificationData?.notifications?.filter((notif: any) => !notif.is_read).length ?? 0;
  const pages = [
    { name: 'Home', path: '/professional' },
    { name: 'Subscription', path: '/professional/subscription' },
    { name: 'Job', path: '/professional/jobs' },
    { name: 'Requests', path: '/professional/requests' }
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

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "background.default", boxShadow: 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop Logo */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <Link href="/professional" passHref>
              <img
                src="/images/logo.jpg"
                alt="Logo"
                width={50}
                height={50}
                style={{ cursor: "pointer", backgroundColor: "transparent", borderRadius: "50%" }}
              />
            </Link>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/professional"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'purple.800',
              textDecoration: 'none',
            }}
          >
            Balamuya
          </Typography>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="primary"
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
                <MenuItem key={page.name} onClick={() => {
                  handleCloseNavMenu();
                  router.push(page.path);
                }}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Mobile Logo */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
            <Link href="/professional" passHref>
              <img
                src="/images/logo.jpg"
                alt="Logo"
                width={40}
                height={40}
                style={{ cursor: "pointer", backgroundColor: "transparent", borderRadius: "50%" }}
              />
            </Link>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/professional"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'purple.800',
              textDecoration: 'none',
            }}
          >
            Balamuya
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, justifyContent:'center', display: { xs: 'none', md: 'flex' }, ml: 2 }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => {
                  handleCloseNavMenu();
                  router.push(page.path);
                }}
                sx={{ my: 2, color: 'text.primary', display: 'block', '&:hover': { color: 'purple.700' } }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* Search and Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
            {/* Search - Desktop */}
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, position: 'relative' }}>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ width: { sm: 150, md: 200 } }}
              />
              <IconButton sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}>
                <FaSearch size={16} color="gray" />
              </IconButton>
            </Box>

            {/* Filter */}
            <Box sx={{ position: 'relative' }}>
              <IconButton onClick={() => setShowFilter(!showFilter)} size="small">
                <FaFilter size={18} color="gray" />
              </IconButton>
              {showFilter && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 40,
                    right: 0,
                    backgroundColor: 'background.paper',
                    boxShadow: 2,
                    borderRadius: 1,
                    p: 2,
                    zIndex: 10,
                    width: 250,
                  }}
                >
                  {categories?.map((category: any, index: any) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Checkbox
                        checked={filter.includes(category.name)}
                        onChange={() => handleCategoryChange(category.name)}
                        color="primary"
                        size="small"
                      />
                      <ListItemText primary={category.name} />
                    </Box>
                  ))}
                </Box>
              )}
            </Box>

            {/* Notifications */}
            <Badge
              badgeContent={unreadCount}
              color="error"
              sx={{ '& .MuiBadge-badge': { width: 16, height: 16, borderRadius: '50%' } }}
            >
              <IconButton onClick={() => setIsOpen(true)} size="small">
                <FaBell size={18} color="gray" />
              </IconButton>
            </Badge>

            {/* User Profile */}
            <Box>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="User"
                  src={userProfile?.user?.user?.profile_image_url ?? "/images/user.png"}
                  sx={{ width: 36, height: 36 }}
                />
              </IconButton>
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
                <MenuItem onClick={() => {
                  handleCloseUserMenu();
                  router.push("/professional/profile");
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FiUser size={16} />
                    <Typography>Profile</Typography>
                  </Box>
                </MenuItem>
                <MenuItem onClick={() => {
                  handleCloseUserMenu();
                  toggleTheme();
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {currentTheme === 'light' ? <DarkMode fontSize="small" /> : <LightMode fontSize="small" />}
                    <Typography>Theme</Typography>
                  </Box>
                </MenuItem>
                <MenuItem onClick={() => {
                  handleCloseUserMenu();
                  handleLogout();
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FiLogOut size={16} />
                    <Typography>Logout</Typography>
                  </Box>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Search - Only shown on small screens */}
      <Box sx={{ px: 2, pb: 2, display: { xs: 'block', sm: 'none' } }}>
        <Box sx={{ position: 'relative' }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <IconButton sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}>
            <FaSearch size={16} color="gray" />
          </IconButton>
        </Box>
      </Box>

      {/* Notifications Panel */}
      <NotificationsPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </AppBar>
  );
}