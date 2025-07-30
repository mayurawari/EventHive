import React from "react";
import { Link } from "react-router-dom";

// Accent colors. Tweak as desired!
// Gold: #FFD700, Rose: #ff4e8a, Platinum: #e5e4e2
const premiumAccent = "text-[#FFD700]";
const secondaryAccent = "text-[#ff4e8a]";
const linkColor = "hover:text-[#e5e4e2] transition-colors duration-150";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Footer: React.FC = () => (
  <footer className="fixed bottom-0 w-full bg-black py-6 px-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-[#22222a] shadow-lg z-50">
    {/* Brand */}
    <div className="flex items-center gap-2">
      {/* <span className={`uppercase font-extrabold tracking-widest text-2xl ${premiumAccent}`}>
        EventHive
      </span> */}
      <span className={`text-sm ${secondaryAccent} mt-1 ml-2 font-medium tracking-wide`}>
        Premium Events Platform
      </span>
    </div>
    {/* Navigation - minimalist */}
    <div className="flex gap-8 mt-2 md:mt-0">
      {/* {navLinks.map((link) => (
        <Link
          key={link.label}
          to={link.to}
          className={`text-[#b2b0c7] font-semibold text-md ${linkColor}`}
        >
          {link.label}
        </Link>
      ))} */}
       <span className={`uppercase font-extralight tracking-widest text-sm ${premiumAccent}`}>
        रससंगमम् एव प्रारम्भः – यत्र स्पन्दः न विरामति!
      </span>
    </div>
    {/* Copyright */}
    <div className="text-xs text-[#767488] font-light tracking-wide">
      © {new Date().getFullYear()} EventHive. All rights reserved.
    </div>
  </footer>
);

export default Footer;
