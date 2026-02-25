'use client';

import { useState } from 'react';

export default function TicketForm() {
  const [subject, setSubject] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [email, setEmail] = useState<string>(''); // 1. Added email state
  const [priority, setPriority] = useState<string>('medium');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // 2. Added email to the JSON body
        body: JSON.stringify({ email, subject, description, priority }),
      });

      if (res.ok) {
        alert('Ticket Created!');
        setSubject('');
        setDescription('');
        setEmail(''); // Clear email on success
      } else {
        alert('Failed to create ticket');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow rounded-lg text-black"
    >
      <h2 className="text-xl font-bold mb-4">Create Support Ticket</h2>

      {/* 3. Added Email Input Field */}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your Email Address"
        className="border p-2 w-full mb-4 rounded"
        required
      />

      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Subject"
        className="border p-2 w-full mb-4 rounded"
        required
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="border p-2 w-full mb-4 rounded"
        required
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="border p-2 w-full mb-4 rounded"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
      >
        {loading ? 'Submitting...' : 'Submit Ticket'}
      </button>
    </form>
  );
}