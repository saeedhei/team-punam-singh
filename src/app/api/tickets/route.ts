import { NextResponse } from 'next/server';
import { ticketDb } from '@/lib/couchdb'; 
import type { Ticket } from '@/types/ticket';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // 1. Validation Check (Professional touch)
    if (!data.subject || !data.description) {
      return NextResponse.json({ error: "Subject and Description are required" }, { status: 400 });
    }

    const newTicket: Ticket = {
      type: 'ticket',
      subject: data.subject,
      description: data.description,
      status: 'open',
      priority: data.priority || 'medium',
      created_at: new Date().toISOString(),
    };

    const response = await ticketDb.insert(newTicket);
    return NextResponse.json({ success: true, id: response.id }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create ticket';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  try {
    // 2. Fetching only ticket types
    const result = await ticketDb.find({
      selector: { type: 'ticket' }
    });
    return NextResponse.json(result.docs);
  } catch (error) {
    console.error("GET Error:", error); // Terminal mein error dekhne ke liye
    return NextResponse.json({ error: 'Fetch failed' }, { status: 500 });
  }
}