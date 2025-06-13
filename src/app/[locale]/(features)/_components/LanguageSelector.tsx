'use client';

import { Select, MenuItem } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { usePathname } from "@/i18n/navigation";
import { getPathname } from "@/i18n/navigation";
import { useThemeToggle } from "@/hooks/useTheme";

export default function LanguageSelector() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const { currentTheme } = useThemeToggle();

  const locale = params.locale;

  const changeLanguage = (newLocale: string) => {
    if (newLocale !== locale) {
      const newPath = getPathname({ href: pathname, locale: newLocale });
      router.replace(newPath);
    }
  };

  return (
    <Select
      value={locale}
      onChange={(e) => changeLanguage(e.target.value as string)}
      MenuProps={{ disablePortal: true }}
      variant="standard"
      disableUnderline
      sx={{
        height: 36,
        minHeight: 36,
        '& .MuiSelect-select': {
          padding: '6px 12px',
          display: 'flex',
          alignItems: 'center',
        },
        '& fieldset': {
          border: 'none',
        },
        backgroundColor: 'transparent',
        color: currentTheme === "light" ? "#6a1b9a" : "#e1bee7",
        textTransform: "none",
      }}
    >
      <MenuItem value="en">English</MenuItem>
      <MenuItem value="am">Amharic</MenuItem>
    </Select>
  );
}