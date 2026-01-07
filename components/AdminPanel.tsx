import React, { useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useContent } from '../context/ContentContext';
import { ContentCategory, ContentInput, ContentItem } from '../types';

type FormState = ContentInput & { imageUrl: string };

const defaultForm: FormState = {
  title: '',
  description: '',
  category: 'Lifestyle',
  videoUrl: '',
  imageUrl: '',
  thumbnailFile: null,
};

const AdminPanel: React.FC = () => {
  const { isAuthenticated, status, user, login, logout } = useAuth();
  const { items, createContent, updateContent, deleteContent, loading } = useContent();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [form, setForm] = useState<FormState>(defaultForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  React.useEffect(() => {
    const openLogin = () => setShowLogin(true);
    window.addEventListener('open-owner-login', openLogin);
    return () => window.removeEventListener('open-owner-login', openLogin);
  }, []);

  const sortedItems = useMemo(
    () => [...items].sort((a, b) => (b.updatedAt || b.createdAt || '').localeCompare(a.updatedAt || a.createdAt || '')),
    [items]
  );

  const resetForm = () => {
    setForm(defaultForm);
    setEditingId(null);
    setMessage(null);
    setError(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(loginEmail.trim(), loginPassword);
      setLoginPassword('');
      setMessage('Signed in as owner.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setMessage(null);

    const payload: ContentInput = {
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      videoUrl: form.videoUrl?.trim() || undefined,
      imageUrl: form.imageUrl?.trim() || undefined,
      thumbnailFile: form.thumbnailFile || undefined,
    };

    try {
      if (editingId) {
        await updateContent(editingId, payload);
        setMessage('Content updated.');
      } else {
        await createContent(payload);
        setMessage('New content added.');
      }
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save content');
    } finally {
      setBusy(false);
    }
  };

  const startEdit = (item: ContentItem) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      description: item.description,
      category: item.category as ContentCategory,
      videoUrl: item.videoUrl || '',
      imageUrl: item.imageUrl || '',
      thumbnailFile: null,
    });
    setMessage(null);
    setError(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this content item? This cannot be undone.')) return;
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      await deleteContent(id);
      setMessage('Content deleted.');
      if (editingId === id) {
        resetForm();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to delete content');
    } finally {
      setBusy(false);
    }
  };

  if (status === 'checking') {
    return (
      <div className="mb-8 p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
        <p className="text-sm text-slate-600 dark:text-slate-300">Checking admin session…</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="mb-6">
        {showLogin && (
          <div className="mt-3 p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
            <h3 className="text-lg font-semibold mb-2 text-slate-800 dark:text-white">Owner Login</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
              Admin controls are only available to Rupanta Mazumder Kona.
            </p>
            {error && (
              <div className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}
            <form className="grid gap-3" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="owner email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="inline-flex justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-60"
                disabled={busy}
              >
                Sign In
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mb-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Owner Access
          </p>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
            Welcome, {user?.name || 'Admin'}
          </h3>
        </div>
        <button
          onClick={logout}
          className="self-start rounded-md border border-slate-300 dark:border-slate-600 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700"
        >
          Sign Out
        </button>
      </div>

      {(message || error) && (
        <div
          className={`mt-3 rounded-md px-3 py-2 text-sm ${
            message
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {message || error}
        </div>
      )}

      <form className="mt-4 grid gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Title</label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              placeholder="Content title"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Category</label>
            <select
              value={form.category}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, category: e.target.value as ContentCategory }))
              }
              className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            >
              <option value="Lifestyle">Lifestyle</option>
              <option value="Study">Study</option>
              <option value="UGC">UGC</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Description
          </label>
          <textarea
            required
            value={form.description}
            onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
            className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            rows={3}
            placeholder="Short summary"
          />
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Content link
            </label>
            <input
              value={form.videoUrl || ''}
              onChange={(e) => setForm((prev) => ({ ...prev, videoUrl: e.target.value }))}
              className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              placeholder="YouTube/Instagram/Any URL"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Thumbnail URL (optional)
            </label>
            <input
              value={form.imageUrl || ''}
              onChange={(e) => setForm((prev) => ({ ...prev, imageUrl: e.target.value }))}
              className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              placeholder="https://..."
            />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              You can either paste an image URL or upload a thumbnail file.
            </p>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Upload thumbnail (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                thumbnailFile: e.target.files?.[0] || null,
              }))
            }
            className="block text-sm text-slate-600 dark:text-slate-300"
          />
          {form.thumbnailFile && (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Selected: {form.thumbnailFile.name} ({Math.round(form.thumbnailFile.size / 1024)} KB)
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={busy}
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-60"
          >
            {editingId ? 'Update Content' : 'Create Content'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:underline"
              disabled={busy}
            >
              Cancel edit
            </button>
          )}
        </div>
      </form>

      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-md font-semibold text-slate-800 dark:text-white">Current content</h4>
          {loading && (
            <p className="text-xs text-slate-500 dark:text-slate-400">Refreshing content…</p>
          )}
        </div>
        {sortedItems.length === 0 ? (
          <p className="text-sm text-slate-600 dark:text-slate-400">No content yet.</p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {sortedItems.map((item) => (
              <div
                key={item.id}
                className="rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 flex flex-col gap-2"
              >
                <div className="flex items-start gap-3">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-20 h-20 rounded-md object-cover border border-slate-200 dark:border-slate-700"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-md bg-slate-100 dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center text-xs text-slate-500">
                      No image
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      {item.category}
                    </p>
                    <p className="font-semibold text-slate-800 dark:text-white">{item.title}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => startEdit(item)}
                    className="rounded-md border border-slate-300 dark:border-slate-600 px-3 py-1 text-xs font-semibold text-slate-700 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700"
                    disabled={busy}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="rounded-md border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-100 disabled:opacity-60"
                    disabled={busy}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;

