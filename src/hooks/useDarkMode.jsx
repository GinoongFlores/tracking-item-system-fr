import { useEffect, useState } from "react";

export const useDarkMode = () => {
  const [theme, setTheme] = useState(localStorage.theme);
  const colorTheme = theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", colorTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);

    if (localStorage.theme === "dark") {
      localStorage.theme = "light";
    } else {
      localStorage.setItem("theme", "dark");
    }
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
};
