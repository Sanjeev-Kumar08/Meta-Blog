"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../SearchBar/SearchBar";
import Link from "next/link";

import "./Navbar.css";
import { logOut } from "@/app/store/authSlice";
import Cookies from "js-cookie";

function Navbar({ onSignOut }) {
  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch();
  const [theme, setTheme] = useState("light");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const userLogInStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    // const token = localStorage.getItem("authToken");
    const token = Cookies.get("authToken");
    if (token) {
      setIsLoggedIn(true);
      // console.log("LOGGED IN");
    } else {
      setIsLoggedIn(false);
      router.push("/login");
    }
  }, [userLogInStatus]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const navigateToUrl = (url) => {
    setIsMobileMenuOpen(false);
    router.push(url);
  };

  const handleSignOut = () => {
    // localStorage.removeItem("authToken");
    // Cookies.remove('authToken');
    setIsLoggedIn(false);
    // dispatch(logOut());
    onSignOut(); 
  };

  return (
    <header className="flex justify-center items-center p-2">
      {/* Navbar */}
      <nav className="dark:text-white w-[1216px]">
        <div className="flex items-center h-16 mb-3 justify-between">
          {/* Logo */}
          <Link href={"/"} className={`flex-1 lg:flex-grow-0`}>
            <div className="flex items-center gap-1 text-xl h-full">
              <img
                src="/Union.svg"
                alt="Logo"
                className="h-8 w-8 dark:bg-white rounded-3xl dark:border-none"
              />
              <span className="hidden sm500:block text-[#141624] dark:text-white tracking-wide font-sans">
                Meta
                <span className="text-[#141624] font-bold dark:text-white">
                  {""}
                  Blog
                </span>
              </span>
            </div>
          </Link>
          {/* lg:flex items-center justify-between */}

          {isLoggedIn ? (
            <div className="hidden lg:flex items-center justify-between text-boldTextcolor dark:text-white text-[16px]  gap-11 2xl:ml-32 h-full font-worksans font-normal">
              <p className="inline">
                <Link
                  href={"/"}
                  className={`${
                    pathName === "/"
                      ? "text-blue"
                      : "text-boldTextcolor dark:text-white"
                  } hover:text-blue dark:hover:text-blue transition`}
                >
                  Home
                </Link>
              </p>
              <p className="inline">
                <Link
                  href={"/blog"}
                  className={`${
                    pathName === "/blog"
                      ? "text-blue"
                      : "text-boldTextcolor dark:text-white"
                  } hover:text-blue dark:hover:text-blue transition`}
                >
                  Blog
                </Link>
              </p>
              <p className="inline">
                <Link
                  href={"/single-post"}
                  className={`${
                    pathName === "/single-post"
                      ? "text-blue"
                      : "text-boldTextcolor dark:text-white"
                  } hover:text-blue dark:hover:text-blue transition pointer-events-none`}
                >
                  Single Post
                </Link>
              </p>
              <p className="inline">
                <Link
                  href={"/author-page"}
                  className={`${
                    pathName === "/author-page"
                      ? "text-blue"
                      : "text-boldTextcolor dark:text-white"
                  } hover:text-blue dark:hover:text-blue transition pointer-events-none`}
                >
                  Pages
                </Link>
              </p>
              <p className="inline">
                <Link
                  href={"/contact"}
                  className={`${
                    pathName === "/contact"
                      ? "text-blue"
                      : "text-boldTextcolor dark:text-white"
                  } hover:text-blue dark:hover:text-blue transition`}
                >
                  Contact
                </Link>
              </p>
            </div>
          ) : null}

          {/* Search and Theme Toggle Button */}
          <div className="flex items-center gap-5 h-full">
            {isLoggedIn && <SearchBar />}

            <div className="toggle-container">
              <div className="toggle">
                <input
                  type="checkbox"
                  id="toggle1"
                  checked={theme === "dark"}
                  onChange={toggleTheme}
                />
                <label htmlFor="toggle1"></label>
              </div>
            </div>

            <button
              className="lg:hidden text-2xl flex items-center mt-[-2px] rounded text-gray-600"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <FontAwesomeIcon icon={faTimes} />
              ) : (
                <FontAwesomeIcon icon={faBars} />
              )}
            </button>
          </div>

          {isLoggedIn && (
            <div
              className="flex flex-col items-center justify-center px-2 md:flex-row gap-1 h-fit text-boldTextcolor font-PlusJakarta rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out cursor-pointer dark:text-white dark:hover:text-boldTextcolor ml-2 lg:ml-0"
              onClick={handleSignOut}
            >
              <button className="hidden pr-1 py-2 border-none rounded-md md769:flex gap-2">
                Sign Out
              </button>
              <FontAwesomeIcon icon={faRightFromBracket} className="text-xl lg:text-[14px]"/>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden dark:bg-[#212121] bg-white px-4 py-2 mt-2 space-y-4 transition-all duration-500 z-20 min-h-screen absolute w-full top-12 right-0 dark:text-white font-worksans ${
            isMobileMenuOpen ? "max-h-[300px] opacity-100" : "hidden"
          }`}
        >
          <p className="border-b-2 border-gray-300 flex justify-between items-center">
            <Link
              href={"/"}
              className={`${
                pathName === "/"
                  ? "text-blue"
                  : "text-boldTextcolor dark:text-white"
              } hover:text-blue dark:hover:text-blue transition`}
              onClick={() => navigateToUrl("/")}
            >
              Home
            </Link>
            <span className="ml">
              <FontAwesomeIcon icon={faArrowRight} />
            </span>{" "}
          </p>
          <p className="border-b-2 border-gray-300 flex justify-between items-center">
            <Link
              href={"/blog"}
              className={`${
                pathName === "/blog"
                  ? "text-blue"
                  : "text-boldTextcolor dark:text-white"
              } hover:text-blue dark:hover:text-blue transition`}
              onClick={() => navigateToUrl("/blog")}
            >
              Blog
            </Link>
            <span className="ml-auto">
              <FontAwesomeIcon icon={faArrowRight} />
            </span>
          </p>
          <p className="border-b-2 border-gray-300 flex justify-between items-center">
            <Link
              href={"/single-post"}
              className={`${
                pathName === "/single-post"
                  ? "text-blue"
                  : "text-boldTextcolor dark:text-white"
              } hover:text-blue dark:hover:text-blue transition`}
              onClick={() => navigateToUrl("/single-post")}
            >
              Single Post
            </Link>
            <span className="ml-auto">
              <FontAwesomeIcon icon={faArrowRight} />
            </span>
          </p>
          <p className="border-b-2 border-gray-300 flex justify-between items-center">
            <Link
              href={"/author-page"}
              className={`${
                pathName === "/pages"
                  ? "text-blue"
                  : "text-boldTextcolor dark:text-white"
              } hover:text-blue dark:hover:text-blue transition`}
              onClick={() => navigateToUrl("/author-page")}
            >
              Pages
            </Link>
            <span className="ml-auto">
              <FontAwesomeIcon icon={faArrowRight} />
            </span>
          </p>
          <p className="border-b-2 border-gray-300 flex justify-between items-center">
            <Link
              href={"/contact"}
              className={`${
                pathName === "/contact"
                  ? "text-blue"
                  : "text-boldTextcolor dark:text-white"
              } hover:text-blue dark:hover:text-blue transition`}
              onClick={() => navigateToUrl("/contact")}
            >
              Contact
            </Link>
            <span className="ml-auto">
              <FontAwesomeIcon icon={faArrowRight} />
            </span>
          </p>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;