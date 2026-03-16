import type { MaybeDocument } from 'nano';

export interface Ticket extends MaybeDocument {
  type: 'ticket';
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

