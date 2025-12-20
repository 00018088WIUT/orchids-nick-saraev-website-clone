"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-8 w-14 items-center rounded-full border-2 border-foreground/10 bg-muted/50 p-1 opacity-50" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative flex h-8 w-14 cursor-pointer items-center rounded-full border-2 border-foreground bg-background p-1 transition-colors duration-300",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      )}
      aria-label="Toggle theme"
    >
      <div className="flex w-full items-center justify-around">
        <Sun className={cn("z-0 size-3.5", isDark ? "text-muted-foreground" : "text-transparent")} />
        <Moon className={cn("z-0 size-3.5", isDark ? "text-transparent" : "text-muted-foreground")} />
      </div>
      <motion.div
        className="absolute left-1 flex size-5.5 items-center justify-center rounded-full bg-foreground"
        initial={false}
        animate={{
          x: isDark ? 24 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      >
        {isDark ? (
          <Moon className="size-3.5 text-background" />
        ) : (
          <Sun className="size-3.5 text-background" />
        )}
      </motion.div>
    </button>
  );
}
