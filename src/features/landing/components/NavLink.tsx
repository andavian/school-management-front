import React from "react";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

export default function NavLink({
  href,
  children,
  isActive = false,
  onClick,
}: NavLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`px-4 py-2 font-medium transition-colors rounded-lg ${
        isActive
          ? "bg-primary-100 text-primary-700"
          : "text-gray-700 hover:text-primary-600 hover:bg-primary-50"
      }`}
    >
      {children}
    </a>
  );
}
