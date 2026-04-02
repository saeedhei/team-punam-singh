import type { MaybeDocument } from 'nano';

export interface Ticket extends MaybeDocument {
  type: 'ticket';
  subject?: string;     // '?' matlab optional
  title?: string;       
  description: string;
  status: 'open' | 'in-progress' | 'closed';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
}
