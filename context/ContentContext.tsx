import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { apiFetch } from '../services/api';
import { ContentInput, ContentItem } from '../types';

interface ContentContextValue {
  items: ContentItem[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  createContent: (input: ContentInput) => Promise<void>;
  updateContent: (id: string, input: ContentInput) => Promise<void>;
  deleteContent: (id: string) => Promise<void>;
}

const ContentContext = createContext<ContentContextValue | undefined>(undefined);

const normalizeItems = (items: ContentItem[]) =>
  [...items].sort((a, b) => {
    const aDate = a.updatedAt || a.createdAt || '';
    const bDate = b.updatedAt || b.createdAt || '';
    return bDate.localeCompare(aDate);
  });

const buildFormData = (input: ContentInput) => {
  const formData = new FormData();
  formData.append('title', input.title);
  formData.append('description', input.description);
  formData.append('category', input.category);
  if (input.videoUrl) formData.append('videoUrl', input.videoUrl);
  if (input.imageUrl) formData.append('imageUrl', input.imageUrl);
  if (input.thumbnailFile) formData.append('thumbnail', input.thumbnailFile);
  return formData;
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiFetch<{ items: ContentItem[] }>('/api/content');
      setItems(normalizeItems(response.items || []));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load content');
    } finally {
      setLoading(false);
    }
  }, []);

  const createContent = useCallback(
    async (input: ContentInput) => {
      const formData = buildFormData(input);
      const response = await apiFetch<{ item: ContentItem }>('/api/content', {
        method: 'POST',
        body: formData,
        isFormData: true,
      });
      setItems((prev) => normalizeItems([...(prev || []), response.item]));
    },
    [setItems]
  );

  const updateContent = useCallback(
    async (id: string, input: ContentInput) => {
      const formData = buildFormData(input);
      const response = await apiFetch<{ item: ContentItem }>(`/api/content/${id}`, {
        method: 'PUT',
        body: formData,
        isFormData: true,
      });
      setItems((prev) =>
        normalizeItems(prev.map((item) => (item.id === id ? response.item : item)))
      );
    },
    [setItems]
  );

  const deleteContent = useCallback(
    async (id: string) => {
      await apiFetch(`/api/content/${id}`, { method: 'DELETE' });
      setItems((prev) => prev.filter((item) => item.id !== id));
    },
    [setItems]
  );

  useEffect(() => {
    refresh();
  }, [refresh]);

  const value = useMemo(
    () => ({
      items,
      loading,
      error,
      refresh,
      createContent,
      updateContent,
      deleteContent,
    }),
    [items, loading, error, refresh, createContent, updateContent, deleteContent]
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
};

export const useContent = (): ContentContextValue => {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    throw new Error('useContent must be used within ContentProvider');
  }
  return ctx;
};


