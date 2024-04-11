import { CiDark } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import { UseDarkMode } from "../hooks/UseDarkMode";
import { useState } from "react";

export const ThemeSwitcher = () => {
  const [colorTheme, setTheme] = UseDarkMode();
  const [darkMode, setDarkMode] = useState(
    colorTheme === "light" ? false : true
  );

  return (
    <div className="fixed bottom-0 right-0 p-4 z-50">
      <button
        onClick={() => {
          setDarkMode(!darkMode);
          setTheme(colorTheme);
        }}
        className="bg-gray-800 p-2 rounded-lg text-white"
      >
        {darkMode ? <CiLight /> : <CiDark />}
      </button>
    </div>
  );
};
