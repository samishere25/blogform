'use client';

import { useState, useEffect } from 'react';

interface Comment {
  id: number;
  name: string;
  text: string;
  date: string;
  timestamp: number;
}

const STORAGE_KEY = 'blog_comments';

const defaultComments: Comment[] = [
  { id: 1, name: 'Sarah Mitchell', text: 'This is one of the best explanations of transformer architecture I\'ve read. The visual analogies really helped me understand attention mechanisms.', date: '2 days ago', timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000 },
  { id: 2, name: 'David Chen', text: 'The section on context windows was particularly insightful. It explains why chatbots sometimes "forget" earlier parts of conversation.', date: '1 day ago', timestamp: Date.now() - 24 * 60 * 60 * 1000 },
];

function getStoredComments(): Comment[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return defaultComments;
}

export default function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [name, setName] = useState('');
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    setComments(getStoredComments());
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
    }
  }, [comments, initialized]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now(),
      name: name.trim(),
      text: newComment.trim(),
      date: 'Just now',
      timestamp: Date.now(),
    };
    
    setComments([comment, ...comments]);
    setNewComment('');
    setName('');
  };

  return (
    <div className="space-y-6">
      <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white">
        Comments ({comments.length})
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts..."
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
        />
        <button
          type="submit"
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Post Comment
        </button>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold">
                {comment.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{comment.name}</p>
                <p className="text-xs text-gray-500">{comment.date}</p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
