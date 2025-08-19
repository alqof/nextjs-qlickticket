// components/ThemeSwitcher.tsx
import { Button } from "@heroui/react";
import { Moon, Sun } from "lucide-react";
import {useTheme} from "next-themes";
import {useEffect, useState} from "react";

export const ThemeToggle = () => {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <Button className="" onPress={()=>setTheme(theme==='light' ? 'dark' : 'light')}>
            {theme==='light' ? <Sun /> : <Moon />}
        </Button>
    )
};