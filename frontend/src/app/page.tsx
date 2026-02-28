'use client';

import { useEffect, useState } from 'react';

export default function GreetingPage() {
  const [greeting, setGreeting] = useState('Loading...');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/greeting')
      .then((res) => res.json())
      .then((data) => setGreeting(`Hello, ${data.name}!`))
      .catch(() => setGreeting('Error loading greeting.'));
  }, []);

  async function handleSubmit() {
    if (!name.trim()) return;
    setError('');
    try {
      const res = await fetch('/api/greeting', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Update failed');
      setGreeting(`Hello, ${data.name}!`);
      setName('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating name.');
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSubmit();
  }

  return (
    <div className="flex flex-col items-center justify-center pt-16">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-10 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">{greeting}</h1>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter a name"
            className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
