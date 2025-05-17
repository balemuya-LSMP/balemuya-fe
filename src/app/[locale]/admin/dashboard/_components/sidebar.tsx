import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Drawer,
  Box,
  Typography,
  Button,
  useTheme,
  styled,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Groups as CustomersIcon,
  Person as ProfessionalsIcon,
  Payments as PaymentsIcon,
  Task as TaskIcon,
  Feedback as FeedbackIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { useRouter, Link } from "@/i18n/navigation";
import { useAuth } from "@/contexts/authContext";

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
  drawerWidth?: number;
  headerHeight?: number;
}

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    backgroundColor: theme.palette.background.paper,
    borderRight: "none",
    boxShadow: theme.shadows[3],
    top: "unset", 
  },
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "&.Mui-selected": {
    backgroundColor: theme.palette.action.selected,
    "&:hover": {
      backgroundColor: theme.palette.action.selected,
    },
  },
}));

export default function Sidebar({ 
  isOpen, 
  onClose, 
  drawerWidth = 264,
  headerHeight = 72
}: SidebarProps) {
  const [isManageUsersOpen, setIsManageUsersOpen] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();
  const theme = useTheme();

  const handleLogout = async () => {
    await logout();
    router.push("/auth/login");
  };

  return (
    <StyledDrawer
      variant={onClose ? "temporary" : "persistent"}
      open={isOpen}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: drawerWidth,
          height: `calc(100% - ${headerHeight}px)`, // Account for header height
          top: `${headerHeight}px`, // Position below header
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          p: 2,
        }}
      >
        <Typography variant="h6" component="div" sx={{ px: 2, py: 3, fontWeight: 600 }}>
          Dashboard
        </Typography>

        <List component="nav" sx={{ flexGrow: 1 }}>
          <Link href="/admin/dashboard" passHref legacyBehavior>
            <ListItem disablePadding>
              <StyledListItemButton>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </StyledListItemButton>
            </ListItem>
          </Link>

          {/* Manage Users Section */}
          <ListItem disablePadding>
            <StyledListItemButton onClick={() => setIsManageUsersOpen(!isManageUsersOpen)}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Users" />
              {isManageUsersOpen ? <ExpandLess /> : <ExpandMore />}
            </StyledListItemButton>
          </ListItem>
          <Collapse in={isManageUsersOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link href="/admin/dashboard/users/customers" passHref legacyBehavior>
                <ListItem disablePadding>
                  <StyledListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <CustomersIcon />
                    </ListItemIcon>
                    <ListItemText primary="Customers" />
                  </StyledListItemButton>
                </ListItem>
              </Link>
              <Link href="/admin/dashboard/users/professionals" passHref legacyBehavior>
                <ListItem disablePadding>
                  <StyledListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <ProfessionalsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Professionals" />
                  </StyledListItemButton>
                </ListItem>
              </Link>
            </List>
          </Collapse>

          <Link href="/admin/dashboard/fianance" passHref legacyBehavior>
            <ListItem disablePadding>
              <StyledListItemButton>
                <ListItemIcon>
                  <PaymentsIcon />
                </ListItemIcon>
                <ListItemText primary="Transactions" />
              </StyledListItemButton>
            </ListItem>
          </Link>

          <Link href="/admin/dashboard/works" passHref legacyBehavior>
            <ListItem disablePadding>
              <StyledListItemButton>
                <ListItemIcon>
                  <TaskIcon />
                </ListItemIcon>
                <ListItemText primary="Manage Works" />
              </StyledListItemButton>
            </ListItem>
          </Link>

          <Link href="/admin/dashboard/feedback" passHref legacyBehavior>
            <ListItem disablePadding>
              <StyledListItemButton>
                <ListItemIcon>
                  <FeedbackIcon />
                </ListItemIcon>
                <ListItemText primary="Feedback" />
              </StyledListItemButton>
            </ListItem>
          </Link>

          <Link href="/admin/dashboard/settings" passHref legacyBehavior>
            <ListItem disablePadding>
              <StyledListItemButton>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </StyledListItemButton>
            </ListItem>
          </Link>
        </List>

        <Divider sx={{ my: 1 }} />

        <Button
          variant="contained"
          color="primary"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          fullWidth
          sx={{
            mt: 2,
            py: 1.5,
            borderRadius: theme.shape.borderRadius,
            textTransform: "none",
            fontWeight: 500,
          }}
        >
          Logout
        </Button>
      </Box>
    </StyledDrawer>
  );
}