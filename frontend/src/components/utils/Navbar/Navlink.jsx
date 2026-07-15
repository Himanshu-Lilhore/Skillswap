import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navlink = ({ to, children }) => {
  const location = useLocation();

  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`block py-2 px-4 rounded-full text-sm font-medium transition-all duration-200 ${
        isActive
          ? 'text-white bg-gradient-to-br from-brand-500 to-brand-700 shadow-md shadow-brand-600/25'
          : 'text-slate-600 hover:text-brand-700 hover:bg-brand-50 dark:text-slate-300 dark:hover:text-brand-300 dark:hover:bg-brand-500/10'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </Link>
  );
};

export default Navlink;
