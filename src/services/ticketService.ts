import nano from 'nano';
import { UserProfile, UserDocument } from '../types/database';
import { Ticket } from '../types/ticket';

const url = `http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984`;
const couch = nano(url);
const db = couch.use<UserProfile | Ticket>('tickets');

export const TicketService = {
  
  // 1. Fetch ALL tickets (The missing function)
  async getAllTickets(): Promise<Ticket[]> {
    const response = await db.find({
      selector: { type: { "$eq": "ticket" } }
    });
    return response.docs as Ticket[];
  },

  // 2. Create a ticket
  async createTicket(ticketData: Ticket) {
    const newTicket: Ticket = {
      ...ticketData,
      type: 'ticket',
      status: ticketData.status || 'open',
     created_at: new Date().toISOString(),
    };
    return await db.insert(newTicket);
  },

  // 3. Get a single user (for your test route)
  async getUser(id: string): Promise<UserDocument> {
    if (!id) throw new Error("User ID is required");
    return await db.get(id) as UserDocument;
  },

  // ... (keep your other functions like registerUser here)
};