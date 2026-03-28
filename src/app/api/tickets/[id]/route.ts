import { NextResponse } from 'next/server';
import { ticketDb } from '@/lib/couchdb';
import { DocumentGetResponse } from 'nano'; //  nano  built-in type 

//  interface  - _rev - include 
interface TicketDoc extends DocumentGetResponse {
  _rev: string;
  subject?: string;
  description?: string;
  status?: string;
  priority?: string;
  type?: string;
}

export async function DELETE(
  req: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // 'any' -'TicketDoc' 
    const doc = await ticketDb.get(id) as TicketDoc;

    await ticketDb.destroy(id, doc._rev);

    return NextResponse.json({ success: true, message: "Ticket deleted" });
  } catch (error: unknown) {
    const err = error as { statusCode?: number; message?: string };
    const status = err.statusCode === 404 ? 404 : 500;
    return NextResponse.json({ error: "Delete failed" }, { status });
  }
}

export async function PUT(
  req: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await req.json();

    // 'any' - 'TicketDoc'
    const doc = await ticketDb.get(id) as TicketDoc;

    const updatedTicket = { 
      ...doc, 
      ...data, 
      _id: id, 
      _rev: doc._rev 
    };

    await ticketDb.insert(updatedTicket);
    
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const err = error as { statusCode?: number; message?: string };
    const status = err.statusCode === 404 ? 404 : 500;
    return NextResponse.json({ error: "Update failed" }, { status });
  }
}