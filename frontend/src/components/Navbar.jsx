import React, { useState, useEffect, useRef } from "react";
import { navbarStyles } from "../assets/dummyStyles";
import logo from "../assets/logo.png";
import { Home, BookOpen, BookMarked, Users, Mail, Menu, X, BookOpenText } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useClerk, UserButton, useUser, useAuth } from "@clerk/clerk-react";

const baseNav = [
  { name: "Home", icon: Home, href: "/" },
  { name: "Courses", icon: BookOpen, href: "/courses" },
  { name: "About", icon: BookMarked, href: "/about" },
  { name: "Faculty", icon: Users, href: "/faculty" },
  { name: "Contact", icon: Mail, href: "/contact" },
];

const Navbar = () => {
  const { openSignUp } = useClerk();
  const { isSignedIn } = useUser();
  const { getToken } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);

  const menuRef = useRef(null);


  const navItems = isSignedIn
  ? [
      ...baseNav,
      {name: "My Courses", icon: BookOpenText, href: "/mycourses" },
  ]
  : baseNav;

  // 🔥 TOKEN LOGIC (kept)
  useEffect(() => {
    const loadToken = async () => {
      if (isSignedIn) {
        const token = await getToken();
        localStorage.setItem("clerk_token", token);
      }
    };
    loadToken();
  }, [isSignedIn, getToken]);

  //  REMOVE TOKEN ON LOGOUT (fixed syntax)
  useEffect(() => {
    if (!isSignedIn) {
      localStorage.removeItem("clerk_token");
    }
  }, [isSignedIn]);

  //  SCROLL + HIDE NAVBAR (YOUR DESIGN PRESERVED)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      setIsScrolled(scrollY > 20);

      if (scrollY > lastScrollY && scrollY > 100) {
        setShowNavbar(false); // hide
      } else {
        setShowNavbar(true); // show
      }

      setLastScrollY(scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // 🔥 OUTSIDE CLICK CLOSE
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const desktopLinkClass = (isActive) =>
    `${navbarStyles.desktopNavItem} ${
      isActive ? navbarStyles.desktopNavItemActive : ""
    }`;

  const mobileLinkClass = (isActive) =>
    `${navbarStyles.mobileMenuItem} ${
      isActive
        ? navbarStyles.mobileMenuItemActive
        : navbarStyles.mobileMenuItemHover
    }`;

  return (
    <nav
      className={`${navbarStyles.navbar} ${
        showNavbar
          ? navbarStyles.navbarVisible
          : navbarStyles.navbarHidden
      } ${
        isScrolled
          ? navbarStyles.navbarScrolled
          : navbarStyles.navbarDefault
      }`}
    >
      <div className={navbarStyles.container}>
        <div className={navbarStyles.innerContainer}>
          
          {/* LOGO */}
          <div className="flex items-center gap-3 select-none">
            <img src={logo} alt="Logo" className="w-12 h-12" />
            <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-700 to-cyan-600 font-serif">
              SkillForge
            </div>
          </div>

          {/* DESKTOP NAV */}
          <div className={navbarStyles.desktopNav}>
            <div className={navbarStyles.desktopNavContainer}>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      desktopLinkClass(isActive)
                    }
                  >
                    <div className="flex items-center gap-2">
                      <Icon size={16} />
                      {item.name}
                    </div>
                  </NavLink>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
            {!isSignedIn ? (
              <button
                onClick={() => openSignUp?.()}
                className={navbarStyles.loginButton}
              >
                Create Account
              </button>
            ) : (
              <UserButton afterSignOutUrl="/" />
            )}

            {/* MOBILE BUTTON */}
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className={navbarStyles.mobileMenuButton}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        ref={menuRef}
        className={`${navbarStyles.mobileMenu} ${
          isOpen
            ? navbarStyles.mobileMenuOpen
            : navbarStyles.mobileMenuClosed
        }`}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                mobileLinkClass(isActive)
              }
            >
              <Icon size={18} />
              {item.name}
            </NavLink>
          );
        })}
      </div>

      {/* BACKGROUND PATTERN (RESTORED) */}
      <div className={navbarStyles.backgroundPattern}>
        <div className={navbarStyles.pattern}></div>
      </div>
    </nav>
  );
};

export default Navbar;