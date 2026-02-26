import Nano from 'nano';

const USER = process.env.COUCHDB_USER || 'admin';
const PASS = process.env.COUCHDB_PASSWORD || 'admin123';

// Use 127.0.0.1 for local Windows connection to Docker
const url = `http://${USER}:${PASS}@127.0.0.1:5984`;

const nano = Nano(url);

// This interface defines exactly what a "Ticket" looks like in your system
export interface Ticket {
  _id?: string;
  _rev?: string;
  type: 'ticket';
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'closed';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
}

// We "use" the database and tell Nano to expect the Ticket type
export const ticketDb = nano.db.use<Ticket>('tickets');

export default nano;