"use client";

import { useEffect, useState, useCallback } from "react";
import { Ticket } from "@/types/ticket";
//  components import 
import TicketForm from "@/components/TicketForm";
import TicketTable from "@/components/TicketTable";

export default function TicketDashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // --- Fetch Function ---
  const fetchTickets = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/tickets");
      const data = await res.json();
      setTickets(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch failed", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  // --- Delete Function ---
  const handleDelete = async (id: string | undefined) => {
    if (!id || !confirm(" confirm delete?")) return;
    try {
      const res = await fetch(`/api/tickets/${id}`, { method: "DELETE" });
      if (res.ok) {
        // UI se turant hata do (Optimistic Update)
        setTickets((prev) => prev.filter((t) => t._id !== id));
      }
    } catch (err) {
         console.error("Delete operation failed:", err);
      alert("Delete operation failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-black text-gray-900">Dashboard</h1>
            <p className="text-gray-500 text-sm"> CRUD Management</p>
          </div>
          
          <button 
            onClick={() => setShowForm(!showForm)}
            className={`px-6 py-2 rounded-full font-bold transition-all shadow-md ${
              showForm ? "bg-red-500 text-white" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {showForm ? "Close Form" : "+ Add Ticket"}
          </button>
        </div>

        {/* 2. Form  ( showForm true ) */}
        {showForm && (
          <div className="mb-10 transition-all">
            <TicketForm 
              onSuccess={() => {
                setShowForm(false); // Form 
                fetchTickets();    // List 
              }} 
              onCancel={() => setShowForm(false)} 
            />
          </div>
        )}

        {/* 3. Table  data/functions  */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <TicketTable 
            tickets={tickets} 
            onDelete={handleDelete} 
            isLoading={loading} 
          />
        </div>

      </div>
    </div>
  );
}