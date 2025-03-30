/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
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
import { AppBar, Drawer, Box, Menu, MenuItem, TextField, Typography, Checkbox, ListItemText, Badge, Avatar, IconButton } from "@mui/material";
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
  const [dropdownOpen, setDropdownOpen] = useState<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { logout } = useAuth();
  const { toggleTheme, currentTheme } = useThemeToggle();
  const unreadCount = notificationData?.notifications?.filter((notif: any) => !notif.is_read).length ?? 0;
  const [mobileOpen, setMobileOpen] = useState(false);

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
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: { xs: 2, sm: 4 }, py: 2 }}>
        {/* Logo and Mobile Menu Icon */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton sx={{ display: { xs: "block", sm: "none" } }} onClick={() => setMobileOpen(true)}>
            <FaBars size={24} color="gray" />
          </IconButton>
          <Link href="/professional" passHref>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <img
                src="/images/logo.jpg"
                alt="Logo"
                width={60}
                height={60}
                style={{ cursor: "pointer", backgroundColor: "transparent", borderRadius: "50%" }}
              />
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "purple.800", display: { xs: "none", sm: "block" } }}>
                Balamuya
              </Typography>
            </Box>
          </Link>
        </Box>

        {/* Desktop Navigation Links */}
        <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 4 }}>
          <Link href="/professional" passHref>
            <Typography variant="body1" sx={{ color: "text.primary", "&:hover": { color: "purple.700" } }}>
              Home
            </Typography>
          </Link>
          <Link href="/professional/subscription" passHref>
            <Typography variant="body1" sx={{ color: "text.primary", "&:hover": { color: "purple.700" } }}>
              Subscription
            </Typography>
          </Link>
          <Link href="/professional/jobs" passHref>
            <Typography variant="body1" sx={{ color: "text.primary", "&:hover": { color: "purple.700" } }}>
              Job
            </Typography>
          </Link>
          <Link href="/professional/requests" passHref>
            <Typography variant="body1" sx={{ color: "text.primary", "&:hover": { color: "purple.700" } }}>
              Requests
            </Typography>
          </Link>
        </Box>

        {/* Search, Filter, Notification, and Profile Section */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Search Bar */}
          <Box sx={{ position: "relative", display: { xs: "none", sm: "block" } }}>
            <TextField
              variant="outlined"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ width: { xs: 150, sm: 250 } }}
            />
            <IconButton sx={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)" }}>
              <FaSearch size={20} color="gray" />
            </IconButton>
          </Box>

          {/* Filter Icon */}
          <Box sx={{ position: "relative" }}>
            <IconButton onClick={() => setShowFilter(!showFilter)}>
              <FaFilter size={20} color="gray" />
            </IconButton>
            {showFilter && (
              <Box
                sx={{
                  position: "absolute",
                  top: 35,
                  right: 0,
                  backgroundColor: "background.paper",
                  boxShadow: 2,
                  borderRadius: 1,
                  padding: 2,
                  zIndex: 10,
                  width: 250,
                }}
              >
                {categories?.map((category: any, index: any) => (
                  <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Checkbox
                      checked={filter.includes(category.name)}
                      onChange={() => handleCategoryChange(category.name)}
                      color="primary"
                    />
                    <ListItemText primary={category.name} />
                  </Box>
                ))}
              </Box>
            )}
          </Box>

          {/* Notifications Icon */}
          <Badge
            badgeContent={unreadCount}
            color="error"
            sx={{ "& .MuiBadge-dot": { width: 12, height: 12, borderRadius: "50%" } }}
          >
            <IconButton onClick={() => setIsOpen(true)}>
              <FaBell size={20} color="gray" />
            </IconButton>
          </Badge>

          {/* User Profile */}
          <Box sx={{ position: "relative" }}>
            <Avatar
              alt="User"
              src={userProfile?.user?.user?.profile_image_url ?? "/images/user.png"}
              sx={{ width: 40, height: 40, cursor: "pointer" }}
              onClick={(event) => setDropdownOpen(event.currentTarget)}
            />
            <Menu
              anchorEl={dropdownOpen}
              open={Boolean(dropdownOpen)}
              onClose={() => setDropdownOpen(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem sx={{ display: "flex", alignItems: "center", gap: 1 }} onClick={() => router.push("/professional/profile")}>
                <FiUser size={18} />
                Profile
              </MenuItem>
              <MenuItem sx={{ display: "flex", alignItems: "center", gap: 1 }} onClick={toggleTheme}>
                {currentTheme === "light" ? <DarkMode /> : <LightMode />} Theme
              </MenuItem>
              <MenuItem sx={{ display: "flex", alignItems: "center", gap: 1 }} onClick={handleLogout}>
                <FiLogOut size={18} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Box>

      {/* Mobile Navigation Drawer */}
      <Drawer anchor="left" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: 250, padding: 2 }}>
          {[
            { label: "Home", path: "/professional" },
            { label: "Subscription", path: "/professional/subscription" },
            { label: "Job", path: "/professional/jobs" },
            { label: "Requests", path: "/professional/requests" }
          ].map((item) => (
            <MenuItem key={item.label} onClick={() => { router.push(item.path); setMobileOpen(false); }}>
              {item.label}
            </MenuItem>
          ))}
        </Box>
      </Drawer>

      {/* Notifications Panel */}
      <NotificationsPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </AppBar>
  );
}