import React from 'react';
import bulb from '../../assets/logo.png'

function Footer() {
  return (
    <footer className="select-none panel m-4 relative bottom-0">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img src={bulb} className="h-8" alt="SkillSwap Logo" />
            <span className="self-center font-display text-2xl font-bold whitespace-nowrap text-slate-900 dark:text-white">Skill<span className="text-gradient">Swap</span></span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-slate-500 sm:mb-0 dark:text-slate-400">
            <li>
              <a href="https://github.com/Wellitsabhi/Skillswap/blob/main/README.md" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors me-4 md:me-6">About</a>
            </li>
            <li>
              <a href="https://github.com/Wellitsabhi/Skillswap" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors me-4 md:me-6">Github</a>
            </li>
            <li>
              <a href="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors me-4 md:me-6">Feedback</a>
            </li>
          </ul>
        </div>
        <hr className="my-6 divider sm:mx-auto lg:my-8" />
        <span className="block text-sm text-slate-500 sm:text-center dark:text-slate-400">Made with ❤️ &amp; swapped skills</span>
      </div>
    </footer>
  );
}

export default Footer;
