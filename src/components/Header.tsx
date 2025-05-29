import { Link, useLocation } from "react-router-dom";
import { ConnectionButton } from "dot-connect/react.js";
import polkadotLogo from "../assets/polkadot-logo.svg";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const location = useLocation();
  
  const navigationItems = [
    { path: "/", label: "Home", icon: "��" },
    { path: "/talents", label: "Talents", icon: "👨‍💼" },
  ];

  const isActivePath = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src={polkadotLogo} className="h-8 w-8" alt="Polka Talent logo" />
            <span className="font-bold text-xl text-gray-900 dark:text-white">Polka Talent</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActivePath(item.path)
                    ? "bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-700"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <ConnectionButton />
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden pb-4">
          <div className="flex flex-wrap gap-2">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActivePath(item.path)
                    ? "bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-700"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
} 