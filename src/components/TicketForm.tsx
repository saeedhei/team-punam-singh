"use client";
import { useState } from "react";

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function TicketForm({ onSuccess, onCancel }: Props) {
  const [formData, setFormData] = useState({ subject: "", description: "", priority: "medium" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        onSuccess(); // Refresh the list
      } else {
        alert("Failed to create ticket. Check Zod validation.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8 animate-in fade-in slide-in-from-top-4">
      <h2 className="text-xl font-bold mb-4">Create New Support Ticket</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Subject (e.g. Login Issue)"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            required
          />
          <select
            className="p-2.5 border rounded-lg bg-white"
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
        </div>
        <textarea
          className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Detailed description of the issue..."
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
        <div className="flex gap-3 justify-end">
          <button type="button" onClick={onCancel} className="px-4 py-2 text-gray-600 font-medium">Cancel</button>
          <button 
            type="submit" 
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? "Creating..." : "Save Ticket"}
          </button>
        </div>
      </form>
    </div>
  );
}