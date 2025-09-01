// components/ThemeSwitcher.tsx
import { Button } from "@heroui/button";
import { Switch } from "@heroui/switch";
import { Moon, MoonIcon, Sun, SunIcon } from "lucide-react";
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
        // <Button className="" radius="sm" onPress={()=>setTheme(theme==='light' ? 'dark' : 'light')}>
        //     {theme==='light' ? <Sun /> : <Moon />}
        // </Button>
        // <div className="w-10 h-10 flex items-center justify-center text-white cursor-pointer bg-gray-700/50 rounded-md shadow-lg inset-shadow-gray-100" onClick={()=>setTheme(theme==='light' ? 'dark' : 'light')}>
        //     {theme==='light' ? <Sun /> : <Moon />}
        // </div>
        
        <Switch
            isSelected={theme === 'dark'}
            onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            color="success"
            endContent={<MoonIcon />}
            size="lg"
            startContent={<SunIcon />}
        >
        </Switch>
    )
};