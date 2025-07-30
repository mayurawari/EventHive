import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Toggle from "../../components/buttons/Toggle";
import { useAppSelector } from "../../hooks/useAppSelector";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Movies", path: "/Movies" },
  { label: "Events", path: "/Events" },
  { label: "Sports", path: "/Sports" },
  { label: "Standups", path: "/Standups" },
  { label: "Streams", path: "/Streams" },
  { label: "Traditionals", path: "/Traditional" },
  { label: "Concerts", path: "/Concerts" },
  { label: "Health & Fitness", path: "/HealthandFitness" }
];

const Navbar: React.FC = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const menuItemClass =
    `p-2 flex justify-center items-center font-poppins font-[500] text-lg ` +
    (theme === "dark" ? "text-white" : "text-[#d6536d]");

  return (
    <motion.nav
      key={theme}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        width: "100%",
        backgroundColor: theme === "dark" ? "" : "#ebe9e1"
      }}
      transition={{ duration: 0.15, ease: "easeInOut" }}
      className="h-20 flex justify-between items-center px-6 md:px-10 relative"
    >
      {/* Hamburger always visible */}
      <button
        aria-label="Open menu"
        onClick={() => setSidebarOpen(true)}
        className="flex flex-col gap-1 focus:outline-none z-50"
      >
        <span className={`block h-[3px] w-7 rounded-full transition-all duration-200 ${theme === "dark" ? "bg-white" : "bg-[#d6536d]"}`}></span>
        <span className={`block h-[3px] w-7 rounded-full transition-all duration-200 ${theme === "dark" ? "bg-white" : "bg-[#d6536d]"}`}></span>
        <span className={`block h-[3px] w-7 rounded-full transition-all duration-200 ${theme === "dark" ? "bg-white" : "bg-[#d6536d]"}`}></span>
      </button>

      <div className="flex-1" />

      {/* Theme Toggle */}
      <Toggle />

      {/* EventHive logo ONLY on Home */}
      <AnimatePresence>
        {location.pathname === "/" && (
          <motion.div
            key="eventhive"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`absolute left-0 top-36 z-20 font-poppins font-extrabold text-[48px] md:text-[80px] text-white 
            ${theme === "dark" ? "bg-[#db3f88]" : "bg-black"}
             bg-[url('/textures/skulls.png')] bg-repeat rounded-bl-md rounded-tl-md p-3 md:p-4 rotate-270
             hidden md:flex justify-end items-start`}
          >
            EventHive
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar for nav (all screen sizes) */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.aside
              initial={{ x: -260, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -260, opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeInOut" }}
              className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-2xl z-40 flex flex-col p-7"
            >
              <button
                aria-label="Close menu"
                className="mb-8 self-end text-2xl"
                onClick={() => setSidebarOpen(false)}
              >
                ×
              </button>
              <ul className="flex flex-col gap-3 w-full">
                {navItems.map((item) => (
                  <li key={item.path} className={menuItemClass}>
                    <Link
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.aside>
            <motion.div
              className="fixed inset-0 bg-black/40 z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.14 }}
              onClick={() => setSidebarOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
