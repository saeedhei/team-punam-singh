"use client";
import { Ticket } from "@/types/ticket";

interface TicketTableProps {
  tickets: Ticket[];
  onDelete: (id: string | undefined) => void;
  isLoading: boolean;
}
export default function TicketTable({ tickets, onDelete, isLoading }: TicketTableProps) {
  
  if (isLoading) {
    return (
      <div className="p-10 text-center text-gray-500 animate-pulse">
        Updating table from Nano DB...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="p-5 text-sm font-semibold text-gray-600">Ticket Details</th>
            <th className="p-5 text-sm font-semibold text-gray-600">Status</th>
            <th className="p-5 text-sm font-semibold text-gray-600">Priority</th>
            <th className="p-5 text-sm font-semibold text-gray-600 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <tr key={ticket._id} className="hover:bg-blue-50/30 transition-all group">
                <td className="p-5">
                  <div className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {ticket.subject || ticket.title || "Untitled"}
                  </div>
                  <div className="text-xs text-gray-400 mt-1 font-mono">ID: {ticket._id}</div>
                </td>
                <td className="p-5">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${
                    ticket.status === 'closed' 
                      ? 'bg-gray-100 text-gray-500' 
                      : 'bg-green-100 text-green-700 border border-green-200'
                  }`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="p-5">
                  <span className={`text-sm font-medium ${
                    ticket.priority === 'high' ? 'text-red-500' : 'text-gray-600'
                  } capitalize`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="p-5 text-right">
                  <button 
                    onClick={() => onDelete(ticket._id)}
                    className="opacity-0 group-hover:opacity-100 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-20 text-center text-gray-400 italic">
                No active tickets found in the database.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}