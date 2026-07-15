import React, { useState, useEffect } from 'react';

function ThemeToggle({isDark, setIsDark}) {
  // const [isDark, setisDark] = useState(
  //   localStorage.getItem('color-theme') === 'dark' || (!localStorage.getItem('color-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  // );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('color-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  function toggleTheme() {
    setIsDark((previsDark) => !previsDark);
  }

  return (
    <div>
      <button
        id="theme-toggle"
        type="button"
        aria-label="Toggle dark mode"
        className="flex items-center justify-center w-10 h-10 rounded-full text-slate-500 dark:text-amber-300 border border-slate-200/70 dark:border-slate-700/70 bg-white/60 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-700 hover:scale-105 active:scale-95 transition-all duration-200"
        onClick={toggleTheme}
      >
        <svg className={`w-5 h-5 transition-transform duration-500 ${isDark ? 'hidden' : 'rotate-0'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
        </svg>
        <svg className={`w-5 h-5 transition-transform duration-500 ${!isDark ? 'hidden' : 'rotate-0'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path>
        </svg>
      </button>
    </div>
  );
}

export default ThemeToggle;
