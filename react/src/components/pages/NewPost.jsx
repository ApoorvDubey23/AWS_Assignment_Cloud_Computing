import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function NewPost() {
  const [file, setFile] = useState();
  const [title, setTitle] = useState('');
  const [preview, setPreview] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!file || !title.trim()) return;

    const formData = new FormData();
    formData.append('post', file);
    formData.append('title', title);

    await axios.post(`${import.meta.env.VITE_BACKEND_API}/api/posts`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    navigate('/');
  };

  const fileSelected = (e) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="mx-auto max-w-xl rounded-2xl bg-white/90 p-8 shadow ring-1 ring-black/5">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">Create a new post</h2>

          <form onSubmit={submit} className="space-y-6">
            {/* Dropzone-ish input */}
            <label
              htmlFor="file"
              className="block cursor-pointer rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center hover:border-indigo-400 hover:bg-indigo-50 transition"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="mx-auto max-h-64 rounded-lg object-contain"
                />
              ) : (
                <>
                  <span className="block text-sm font-medium text-gray-700">Upload image</span>
                  <span className="mt-1 block text-xs text-gray-500">PNG, JPG, or WEBP</span>
                </>
              )}
              <input id="file" type="file" accept="image/*" onChange={fileSelected} className="sr-only" />
            </label>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="A short, punchy title"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
              />
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="rounded-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
