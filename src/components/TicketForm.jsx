'use client';

import { useState } from 'react';

export default function TicketForm() {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, description, priority }),
      });

      if (response.ok) {
        alert('Ticket created successfully!');
        setSubject('');
        setDescription('');
      } else {
        alert('Failed to create ticket.');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-bold mb-4">Create Support Ticket</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Subject</label>
        <input 
          type="text" 
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-2 border rounded border-gray-300 text-black"
          required 
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Priority</label>
        <select 
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-2 border rounded border-gray-300 text-black"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? 'Submitting...' : 'Submit Ticket'}
      </button>
    </form>
  );
}