import { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemText, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { LightMode, DarkMode } from "@mui/icons-material"; 
import Link from "next/link";
import Image from "next/image";
import useThemeToggle from "@/hooks/useTheme";

export default function Landing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toggleTheme, currentTheme } = useThemeToggle();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "background.default", boxShadow: 1 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo & Branding */}
        <Box display="flex" alignItems="center">
          <Link href="/customer" passHref>
            <Box display="flex" alignItems="center" sx={{ cursor: "pointer" }}>
              <Image src="/images/logo.jpg" alt="Balamuya Logo" width={60} height={60} style={{ borderRadius: "50%" }} />
              <Typography variant="h6" color="primary" sx={{ ml: 1, fontWeight: "bold" }}>
                Balamuya
              </Typography>
            </Box>
          </Link>
        </Box>

        {/* Center Menu (Desktop) */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          <Button
            component={Link}
            href="/"
            sx={{
              color: "black",
              fontSize: "1.1rem", // Default font size
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "rgba(0, 0, 0, 0.1)", // Light background on hover
              },
            }}
          >
            Home
          </Button>
          <Button
            component={Link}
            href="/about"
            sx={{
              color: "black",
              fontSize: "1.1rem",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            About
          </Button>
          <Button
            component={Link}
            href="/contact"
            sx={{
              color: "black",
              fontSize: "1.1rem",
              transition: "all 0.3s ease",
              "&:hover": {
                fontSize: "1.1rem",
                bgcolor: "rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            Contact
          </Button>
        </Box>

        {/* Right-side Actions (Desktop) */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Login & Signup Buttons */}
          <Button variant="contained" href="/auth/login" sx={{ bgcolor: "#6a1b9a", color: "white" }}>
            Login
          </Button>
          <Button variant="outlined" href="/auth/signup" sx={{ borderColor: "#6a1b9a", color: "#6a1b9a" }}>
            Signup
          </Button>
          <IconButton color="inherit" onClick={toggleTheme}>
            {currentTheme === "light" ? <DarkMode/> : <LightMode/>} {/* Simple icon for light/dark mode */}
          </IconButton>
        </Box>

        {/* Mobile Menu Toggle */}
        <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleMenu} sx={{ display: { md: "none" } }}>
          <MenuIcon sx={{ color: "black" }} />
        </IconButton>
      </Toolbar>

      {/* Mobile Menu */}
      <Drawer anchor="top" open={isMenuOpen} onClose={toggleMenu}>
        <Box sx={{ width: "100%", p: 2, display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={toggleMenu}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          <ListItem component={Link} href="/" onClick={toggleMenu}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem component={Link} href="/about" onClick={toggleMenu}>
            <ListItemText primary="About" />
          </ListItem>
          <ListItem component={Link} href="/contact" onClick={toggleMenu}>
            <ListItemText primary="Contact" />
          </ListItem>
          <ListItem component={Link} href="/auth/login" onClick={toggleMenu}>
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem component={Link} href="/auth/signup" onClick={toggleMenu}>
            <ListItemText primary="Signup" />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
}
