'use client';

import { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemText, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import TranslateIcon from "@mui/icons-material/Translate";
import { LightMode, DarkMode } from "@mui/icons-material";
import { Link,usePathname, getPathname } from "@/i18n/navigation";
import Image from "next/image";
import { useThemeToggle } from "@/hooks/useTheme";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";



export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toggleTheme, currentTheme } = useThemeToggle();
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname(); 
  const t = useTranslations("header");

  const locale = params.locale;

  const changeLanguage = (newLocale: string) => {
    if (newLocale !== locale) {
      const newPath = getPathname({ href: pathname, locale: newLocale });
      router.replace(newPath);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };


  return (
    <AppBar position="sticky" sx={{ bgcolor: "background.default", boxShadow: 1 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo & Branding */}
        <Box display="flex" alignItems="center">
          <Link href="/" passHref>
            <Box display="flex" alignItems="center" sx={{ cursor: "pointer" }}>
              <Image src="/images/logo.jpg" alt="Balamuya Logo" width={60} height={60} style={{ borderRadius: "50%" }} />
              <Typography variant="h6" color="primary" sx={{ ml: 1, fontWeight: "bold" }}>
                {t("logoText")}
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
              fontSize: "1.1rem", // Default font size
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "rgba(0, 0, 0, 0.1)", // Light background on hover
              },
            }}
          >
            {t("home")}
          </Button>
          <Button
            component={Link}
            href="/about"
            sx={{
              fontSize: "1.1rem",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            {t("about")}
          </Button>
          <Button
            component={Link}
            href="/contact"
            sx={{
              fontSize: "1.1rem",
              transition: "all 0.3s ease",
              "&:hover": {
                fontSize: "1.1rem",
                bgcolor: "rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            {t("contact")}
          </Button>
        </Box>

        {/* Right-side Actions (Desktop) */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
          {/* Login & Signup Buttons */}
          <Button component={Link} href="/auth/login" variant="contained" sx={{ bgcolor: "#6a1b9a", borderRadius:2, color: "white" }}>
            {t("login")}
          </Button>
          <Button component={Link} variant="outlined" href="/auth/signup" sx={{ borderColor: "#6a1b9a", borderRadius:2, color: "#6a1b9a" }}>
            {t("signup")}
          </Button>
          <IconButton color="inherit" onClick={toggleTheme} sx={{
            color: currentTheme === "light" ? "#000000" : "#ffffff", // Set color based on theme
          }}>
            {currentTheme === "light" ? <DarkMode /> : <LightMode />}
          </IconButton>

          {/* Language Toggle */}
          <IconButton color="primary" onClick={() => changeLanguage(locale === 'en' ? 'am' : 'en')}>
            <TranslateIcon />
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
            <ListItemText primary={t("home")} />
          </ListItem>
          <ListItem component={Link} href="/about" onClick={toggleMenu}>
            <ListItemText primary={t("about")} />
          </ListItem>
          <ListItem component={Link} href="/contact" onClick={toggleMenu}>
            <ListItemText primary={t("contact")} />
          </ListItem>
          <ListItem component={Link} href="/auth/login" onClick={toggleMenu}>
            <ListItemText primary={t("login")} />
          </ListItem>
          <ListItem component={Link} href="/auth/signup" onClick={toggleMenu}>
            <ListItemText primary={t("signup")} />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
}
