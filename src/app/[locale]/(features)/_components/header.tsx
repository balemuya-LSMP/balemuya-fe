'use client';

import { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemText, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import TranslateIcon from "@mui/icons-material/Translate";
import { LightMode, DarkMode } from "@mui/icons-material";
import { Link, usePathname, getPathname } from "@/i18n/navigation";
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
    <AppBar
      position="sticky"
      sx={{
        bgcolor: "background.default",
        background: currentTheme === "light"
          ? "linear-gradient(90deg, #ffffff 0%, #f3e5f5 100%)"
          : "linear-gradient(90deg, #1a1a1a 0%, #2e1a47 100%)",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
        },
      }}
    >
      <Toolbar
        sx={{
          py: { xs: 1, md: 1.5 },
          px: { xs: 2, md: 4 },
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1400px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Logo & Branding */}
        <Box display="flex" alignItems="center">
          <Link href="/" passHref>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                cursor: "pointer",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <Image
                src="/images/logo.jpg"
                alt="Balamuya Logo"
                width={48}
                height={48}
                style={{ borderRadius: "50%", border: "2px solid #6a1b9a" }}
              />
              <Typography
                variant="h5"
                sx={{
                  ml: 1.5,
                  fontWeight: 700,
                  color: currentTheme === "light" ? "#6a1b9a" : "#e1bee7",
                  letterSpacing: "0.5px",
                }}
              >
                {t("logoText")}
              </Typography>
            </Box>
          </Link>
        </Box>

        {/* Center Menu (Desktop) */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: { md: 2, lg: 4 },
            alignItems: "center",
          }}
        >
          {[
            { href: "/", label: t("home") },
            { href: "/about", label: t("about") },
            { href: "/contact", label: t("contact") },
          ].map((item) => (
            <Button
              key={item.href}
              component={Link}
              href={item.href}
              sx={{
                fontSize: "1rem",
                fontWeight: 500,
                color: currentTheme === "light" ? "#333" : "#e0e0e0",
                textTransform: "none",
                px: 2,
                py: 0.5,
                borderRadius: 2,
                transition: "all 0.3s ease",
                bgcolor: pathname === item.href ? "rgba(106, 27, 154, 0.1)" : "transparent",
                "&:hover": {
                  bgcolor: "rgba(106, 27, 154, 0.2)",
                  transform: "translateY(-1px)",
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* Right-side Actions (Desktop) */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 1.5,
            alignItems: "center",
          }}
        >
          {/* Login Button */}
          <Button
            component={Link}
            href="/auth/login"
            variant="contained"
            sx={{
              bgcolor: "#6a1b9a",
              color: "white",
              borderRadius: 6,
              px: 3,
              fontWeight: 600,
              textTransform: "none",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "#8e24aa",
                transform: "translateY(-1px)",
                boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
              },
            }}
          >
            {t("login")}
          </Button>

          {/* Signup Button */}
          <Button
            component={Link}
            href="/auth/signup"
            variant="outlined"
            sx={{
              borderColor: "#6a1b9a",
              color: "#6a1b9a",
              borderRadius: 6,
              px: 3,
              fontWeight: 600,
              textTransform: "none",
              transition: "all 0.3s ease",
              "&:hover": {
                borderColor: "#8e24aa",
                color: "#8e24aa",
                bgcolor: "rgba(106, 27, 154, 0.05)",
                transform: "translateY(-1px)",
              },
            }}
          >
            {t("signup")}
          </Button>

          {/* Theme Toggle */}
          <IconButton
            onClick={toggleTheme}
            sx={{
              color: currentTheme === "light" ? "#333" : "#e0e0e0",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "rgba(106, 27, 154, 0.2)",
              },
            }}
          >
            {currentTheme === "light" ? <DarkMode /> : <LightMode />}
          </IconButton>

          {/* Language Toggle */}
          <IconButton
            onClick={() => changeLanguage(locale === "en" ? "am" : "en")}
            sx={{
              color: currentTheme === "light" ? "#6a1b9a" : "#e1bee7",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "rgba(106, 27, 154, 0.2)",
              },
            }}
          >
            <TranslateIcon />
          </IconButton>
        </Box>

        {/* Mobile Menu Toggle */}
        <IconButton
          edge="end"
          aria-label="menu"
          onClick={toggleMenu}
          sx={{
            display: { md: "none" },
            color: currentTheme === "light" ? "#333" : "#e0e0e0",
          }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* Mobile Menu */}
      <Drawer
        anchor="right"
        open={isMenuOpen}
        onClose={toggleMenu}
        sx={{
          "& .MuiDrawer-paper": {
            width: "80%",
            maxWidth: "300px",
            bgcolor: currentTheme === "light" ? "#fff" : "#1a1a1a",
            transition: "transform 0.3s ease-in-out",
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid rgba(106, 27, 154, 0.2)",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: currentTheme === "light" ? "#6a1b9a" : "#e1bee7",
              fontWeight: 600,
            }}
          >
          <MenuIcon/>
          </Typography>
          <IconButton onClick={toggleMenu}>
            <CloseIcon sx={{ color: currentTheme === "light" ? "#333" : "#e0e0e0" }} />
          </IconButton>
        </Box>
        <List sx={{ p: 2 }}>
          {[
            { href: "/", label: t("home") },
            { href: "/about", label: t("about") },
            { href: "/contact", label: t("contact") },
            { href: "/auth/login", label: t("login") },
            { href: "/auth/signup", label: t("signup") },
          ].map((item) => (
            <ListItem
              key={item.href}
              component={Link}
              href={item.href}
              onClick={toggleMenu}
              sx={{
                py: 1.5,
                borderRadius: 2,
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: "rgba(106, 27, 154, 0.1)",
                },
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: "1.1rem",
                  fontWeight: 500,
                  color: currentTheme === "light" ? "#333" : "#e0e0e0",
                }}
              />
            </ListItem>
          ))}
          <ListItem sx={{ mt: 2 }}>
            <Button
              fullWidth
              onClick={() => changeLanguage(locale === "en" ? "am" : "en")}
              startIcon={<TranslateIcon />}
              sx={{
                justifyContent: "flex-start",
                color: currentTheme === "light" ? "#6a1b9a" : "#e1bee7",
                textTransform: "none",
                fontSize: "1.1rem",
              }}
            >
              {locale === "en" ? "Amharic" : "English"}
            </Button>
          </ListItem>
          <ListItem>
            <Button
              fullWidth
              onClick={toggleTheme}
              startIcon={currentTheme === "light" ? <DarkMode /> : <LightMode />}
              sx={{
                justifyContent: "flex-start",
                color: currentTheme === "light" ? "#333" : "#e0e0e0",
                textTransform: "none",
                fontSize: "1.1rem",
              }}
            >
              {currentTheme === "light" ? "Dark Mode" : "Light Mode"}
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
}