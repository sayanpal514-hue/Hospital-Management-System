import React from 'react';

export const Header = () => {
  const [darkMode, setDarkMode] = React.useState(false);
  React.useEffect(() => { if (darkMode) document.documentElement.classList.add("dark-theme"); else document.documentElement.classList.remove("dark-theme"); }, [darkMode]);
  return (
    <header className="fixed top-0 left-60 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-md z-40 flex items-center justify-between px-space-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="flex-1 max-w-xl">
        <div className="relative flex items-center w-full">
          <span className="material-symbols-outlined absolute left-space-md text-outline pointer-events-none text-[20px]">
            search
          </span>
          <input
            type="text"
            className="w-full h-9 pl-10 pr-14 bg-surface-container-low rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary"
            placeholder="Search patients by name, UHID, doctors, orders..."
          />
          <div className="absolute right-space-sm flex items-center gap-space-xs">
            <kbd className="font-clinical-code text-clinical-code px-space-xs py-0.5 bg-surface-container-high text-on-surface-variant rounded text-[11px]">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-space-lg">
        <div className="flex items-center gap-space-sm">
          <div className="flex items-center gap-space-xs bg-error-container text-on-error-container px-space-md py-1 rounded-full font-body-sm text-body-sm font-semibold">
            <span className="material-symbols-outlined text-[16px] text-error">e911_emergency</span>
            <span>ER Alert: Level 2</span>
          </div>
          <button className="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-error"></span>
          </button>
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined text-[22px]">{darkMode ? "light_mode" : "dark_mode"}</span>
          </button>
        </div>
        
        <div className="flex items-center gap-space-md pl-space-md">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
            SJ
          </div>
          <div className="flex flex-col text-left">
            <span className="font-headline-sm text-body-sm font-semibold text-on-surface leading-tight">
              Dr. Sarah Jenkins, MD
            </span>
            <div className="flex items-center gap-space-xs">
              <span className="font-caption text-caption text-on-secondary-container bg-secondary-container px-1.5 py-0.5 rounded-full font-medium leading-none">
                Chief Medical Officer
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
