import { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import SinglePost from '../SinglePost';
import { useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null); // { id, url }
  let navigate = useNavigate();

  useEffect(() => {
    async function getPosts() {
      try {
        const backendApi = import.meta.env.VITE_BACKEND_API;
        console.log('Fetching posts from', `${backendApi}/api/posts`);
        const result = await axios.get(`${backendApi}/api/posts`);
        setPosts(result.data || []);
      } finally {
        setLoading(false);
      }
    }
    getPosts();
  }, []);

  return (
    <div className="min-h-screen  dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Explore</h2>
          <p className="text-gray-500 dark:text-gray-400">Click any photo to view larger.</p>
        </header>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading &&
            Array.from({ length: 8 }).map((_, i) => (
              <div key={`sk-${i}`} className="aspect-[4/3] rounded-2xl bg-gray-200/70 dark:bg-gray-800/50 animate-pulse" />
            ))}

          {!loading && posts.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-12 text-center">
              <p className="text-lg font-medium text-gray-700 dark:text-gray-200">No posts yet</p>
              <p className="text-gray-500 dark:text-gray-400">Start by adding your first photo.</p>
            </div>
          )}

          {!loading &&
            posts.map((post) => (
              <SinglePost key={`post-${post.id}`} post={post} onOpen={() => setSelected(post)} />
            ))}
        </div>
      </div>

      {/* Modal */}
      <Transition.Root show={!!selected} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setSelected(null)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {/* Backdrop with blur */}
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-2xl ring-1 ring-black/10 transition">
                  {selected && (
                    <div className="relative">
                      <img
                        src={selected.url}
                        alt={(selected.id || '').split('____')[1] || 'Photo'}
                        className="max-h-[80vh] w-full object-contain bg-black/5 dark:bg-black"
                      />
                      <button
                        onClick={() => setSelected(null)}
                        className="absolute right-3 top-3 rounded-full bg-white/90 dark:bg-gray-800/90 px-3 py-1 text-sm font-medium text-gray-800 dark:text-gray-200 shadow hover:bg-white dark:hover:bg-gray-700"
                      >
                        Close
                      </button>
                      <div className="px-4 py-3">
                        <Dialog.Title className="text-base font-semibold text-gray-900 dark:text-gray-100">
                          {(selected.id || '').split('____')[1] || 'Untitled'}
                        </Dialog.Title>
                      </div>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

export default App;
