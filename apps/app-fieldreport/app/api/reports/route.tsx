import { connectToDatabase } from '@/lib/mongodb';
import { getServerSession } from 'next-auth/next';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import { IReport } from '@/types/types'; // Import the IReport interface

// Fetch all reports for the authenticated user
export async function GET(request: Request) {
  const session = await getServerSession();
  if (!session) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
    });
  }

  const { searchParams } = new URL(request.url);
  const reportId = searchParams.get('id');

  const { db } = await connectToDatabase();

  if (reportId) {
    // Fetch specific report by ID
    const report = await db.collection<IReport>('reports').findOne({
      _id: new ObjectId(reportId),
      user_id: session.user?.email,
    });

    if (!report) {
      return new NextResponse(JSON.stringify({ error: 'Report not found' }), {
        status: 404,
      });
    }

    return NextResponse.json(report);
  } else {
    // Fetch all reports
    const reports: IReport[] = await db
      .collection<IReport>('reports')
      .find({ user_id: session.user?.email })
      .sort({ created_at: -1 })
      .toArray();

    return NextResponse.json(reports);
  }
}

// Delete an existing report for the authenticated user
export async function DELETE(request: Request) {
  const session = await getServerSession();
  if (!session) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
    });
  }

  const data = await request.json();
  const reportId = new ObjectId(data._id);
  const { db } = await connectToDatabase();

  // Find the report to get the report ID
  const report = await db.collection<IReport>('reports').findOne({
    _id: reportId,
    user_id: session.user?.email,
  });

  if (!report) {
    return new NextResponse(JSON.stringify({ error: 'Report not found' }), {
      status: 404,
    });
  }

  // Delete the report
  const result = await db.collection<IReport>('reports').deleteOne({
    _id: reportId,
    user_id: session.user?.email,
  });

  if (result.deletedCount === 0) {
    return new NextResponse(JSON.stringify({ error: 'Report not found' }), {
      status: 404,
    });
  }

  return new NextResponse(JSON.stringify({ success: true }), { status: 200 });
}
