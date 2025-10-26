import React, { useState, useEffect } from "react";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  // إضافة أو إزالة كلاس dark من <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="transition-all ease-in-out p-2 rounded-md">
      <div className=" flex-row justify-between toggle">
        <label htmlFor="dark-toggle" className="flex items-center cursor-pointer">
          <div className="relative">
            {/* ✅ الزرار */}
            <input
              type="checkbox"
              id="dark-toggle"
              className="hidden"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <div className="block border-[2px] dark:border-white border-gray-900 w-13 h-6 rounded-full"></div>
            <div
              className={`absolute left-1 top-1 w-6 h-6 rounded-full transition 
                ${ darkMode ? "translate-x-6 fa-solid fa-sun text-yellow-300 " : " fa-solid fa-moon"
              }`}
            ></div>
          </div>
        </label>
      </div>
    </div>
  );
}
