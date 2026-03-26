import Nano from 'nano';
// 1. ADD THIS IMPORT (The 'Ticket' shape now lives in your types folder)
import type { Ticket } from '@/types/ticket'; 

const USER = process.env.COUCHDB_USER || 'admin';
const PASS = process.env.COUCHDB_PASSWORD || 'admin123';

// Use 127.0.0.1 for local Windows connection to Docker
const url = `http://${USER}:${PASS}@127.0.0.1:5984`;

const nano = Nano(url);

// 2. NOW THIS WORKS because we imported Ticket above
export const ticketDb = nano.db.use<Ticket>('tickets');

export default nano;