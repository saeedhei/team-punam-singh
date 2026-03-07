'use client';

import React, { useState } from 'react';

export default function TicketForm() {
  const [subject, setSubject] = useState<string>('');
  const [priority, setPriority] = useState<string>('medium');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const res = await fetch('/api/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject, description: 'Created via TS form', priority }),
    });

    if (res.ok) {
      alert('Ticket Created!');
      setSubject('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow rounded-lg text-black">
      <input 
        type="text" 
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Subject"
        className="border p-2 w-full mb-4 rounded"
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
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Submit Ticket
      </button>
    </form>
  );
}