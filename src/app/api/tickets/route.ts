import { ticketDb, Ticket } from '@/lib/couchdb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Explicitly typing the object ensures data matches the interface
    const newTicket: Ticket = {
      type: 'ticket',
      subject: data.subject,
      description: data.description,
      status: 'open',
      priority: data.priority || 'medium',
      created_at: new Date().toISOString(),
    };

    const response = await ticketDb.insert(newTicket);
    return NextResponse.json({ success: true, id: response.id });
  } catch (error) {
    // Narrowing the type from unknown to Error
    const message = error instanceof Error ? error.message : 'Failed to create ticket';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const result = await ticketDb.find({
      selector: { type: 'ticket' }
    });
    return NextResponse.json(result.docs);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: 'Fetch failed' }, { status: 500 });
  }
}