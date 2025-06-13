'use client';

import {
    Box,
    Typography,
    Divider,
    Stack,
    FormControlLabel,
    Switch,
    Paper,
    Container
} from '@mui/material';
import { useThemeToggle } from '@/hooks/useTheme';
import LanguageSelector from '../../(features)/_components/LanguageSelector';

export default function Settings() {
    const { toggleTheme, currentTheme } = useThemeToggle();

    return (

        <Box
            component="main"
            sx={{
                py: { xs: 4, md: 6 },
                backgroundColor: 'background.default',
                minHeight: 'calc(100vh - 120px)'
            }}
        >
            <Container maxWidth="md">
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                    Settings
                </Typography>

                <Paper elevation={2} sx={{ p: { xs: 2, sm: 3, md: 4 }, borderRadius: 2 }}>
                    {/* Appearance Section */}
                    <Box mb={4}>
                        <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                            Appearance
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2}
                        >
                            <Box>
                                <Typography variant="subtitle1" component="h3">
                                    Theme
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Current: {currentTheme === 'dark' ? 'Dark' : 'Light'} mode
                                </Typography>
                            </Box>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={currentTheme === 'dark'}
                                        onChange={toggleTheme}
                                        color="primary"
                                    />
                                }
                                label={currentTheme === 'dark' ? 'Dark' : 'Light'}
                                labelPlacement="start"
                                sx={{ ml: 0 }}
                            />
                        </Stack>
                    </Box>

                    {/* Language Section */}
                    <Box mb={4}>
                        <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                            Language
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2}
                        >
                            <Box>
                                <Typography variant="subtitle1" component="h3">
                                    Application Language
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Change the display language
                                </Typography>
                            </Box>
                            <LanguageSelector />
                        </Stack>
                    </Box>

                    {/* System Preferences Section */}
                    <Box>
                        <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                            System Preferences
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        <Stack spacing={3}>
                            <Stack
                                direction={{ xs: 'column', sm: 'row' }}
                                justifyContent="space-between"
                                alignItems="center"
                                spacing={2}
                            >
                                <Box>
                                    <Typography variant="subtitle1" component="h3">
                                        Auto-update
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Keep application up to date automatically
                                    </Typography>
                                </Box>
                                <FormControlLabel
                                    control={<Switch defaultChecked color="primary" />}
                                    label="Enabled"
                                    labelPlacement="start"
                                    sx={{ ml: 0 }}
                                />
                            </Stack>

                            <Stack
                                direction={{ xs: 'column', sm: 'row' }}
                                justifyContent="space-between"
                                alignItems="center"
                                spacing={2}
                            >
                                <Box>
                                    <Typography variant="subtitle1" component="h3">
                                        Usage Statistics
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Help improve the application
                                    </Typography>
                                </Box>
                                <FormControlLabel
                                    control={<Switch defaultChecked color="primary" />}
                                    label="Enabled"
                                    labelPlacement="start"
                                    sx={{ ml: 0 }}
                                />
                            </Stack>
                        </Stack>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}