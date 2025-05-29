import { Link, useLocation } from "react-router-dom";
import { ConnectionButton } from "dot-connect/react.js";
import { ChainSwitch } from "./ChainSwitch";
import { type ChainId } from "@reactive-dot/core";
import polkadotLogo from "../assets/polkadot-logo.svg";

interface HeaderProps {
  chainId: ChainId;
  setChainId: React.Dispatch<React.SetStateAction<ChainId>>;
}

export function Header({ chainId, setChainId }: HeaderProps) {
  const location = useLocation();
  
  const navigationItems = [
    { path: "/", label: "Home", icon: "🏠" },
    { path: "/contractors", label: "Contractors", icon: "👨‍💼" },
  ];

  const isActivePath = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src={polkadotLogo} className="h-8 w-8" alt="Polkadot logo" />
            <span className="font-bold text-xl text-gray-900">Polkadot App</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActivePath(item.path)
                    ? "bg-pink-100 text-pink-700 border border-pink-200"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            <ChainSwitch chainId={chainId} setChainId={setChainId} />
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
                    ? "bg-pink-100 text-pink-700 border border-pink-200"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
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