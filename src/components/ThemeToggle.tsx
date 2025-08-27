import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "./ThemeProvider";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function ThemeToggle() {
  const { theme, setTheme, actualTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="relative border-[var(--cookie-monster-blue)]/20 text-[var(--cookie-monster-blue)] hover:bg-[var(--cookie-monster-blue)]/10 transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          {actualTheme === "light" ? (
            <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
          ) : (
            <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className="cursor-pointer hover:bg-[var(--cookie-monster-blue)]/10 transition-colors"
        >
          <Sun className="mr-2 h-4 w-4" />
          <span>Light Mode</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className="cursor-pointer hover:bg-[var(--cookie-monster-blue)]/10 transition-colors"
        >
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark Mode</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className="cursor-pointer hover:bg-[var(--cookie-monster-blue)]/10 transition-colors"
        >
          <Monitor className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}