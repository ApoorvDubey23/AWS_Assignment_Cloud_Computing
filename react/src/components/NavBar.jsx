import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon, SunIcon, MoonIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function NavBar({ onHome, onNewPost }) {
  const navigation = [
    { name: 'Gallery', current: true, onClick: onHome },
    { name: 'New Post', current: false, onClick: onNewPost },
  ];

  // --- theme toggle (persisted) ---
  const getInitialTheme = () => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <Disclosure as="nav" className="sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur border-b border-gray-200 dark:border-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Brand */}
              <div className="flex items-center gap-2">
                <img className="h-8 w-8" src="https://img.icons8.com/ios-filled/50/000000/gallery.png" alt="Gallery"/>
                <span className="font-extrabold text-xl bg-clip-text text-transparent text-black dark:text-white">
                  CloudGallery
                </span>
              </div>

              {/* Desktop nav */}
              <div className="hidden sm:block">
                <div className="flex items-center gap-2">
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      onClick={item.onClick}
                      className={classNames(
                        item.current
                          ? 'bg-gray-900 text-white dark:bg-gray-700'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800',
                        'px-4 py-2 rounded-full text-sm font-medium transition'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right: theme toggle + mobile menu */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
                  className="rounded-full p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 transition"
                  aria-label="Toggle dark mode"
                >
                  {theme === 'dark' ? <SunIcon className="h-5 w-5"/> : <MoonIcon className="h-5 w-5"/>}
                </button>

                <div className="sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800 focus:outline-none">
                    <span className="sr-only">Open main menu</span>
                    {open ? <XIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <Disclosure.Panel className="sm:hidden border-t border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur">
            <div className="space-y-1 px-2 py-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="button"
                  onClick={item.onClick}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white dark:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800',
                    'block w-full text-left px-3 py-2 rounded-md text-base font-medium transition'
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
