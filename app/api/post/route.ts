import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';
import {Pool} from 'pg';

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const data = await request.json();
  const createdBy = (await cookies()).get('logged_in');
  
  
  const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  if (data.surveyKey === 'feedback') {
    await db.query(`INSERT INTO "feedback_submissions"
        (surveyKey, createdBy, submissionId, rowVersion, creatorId, createdAt, modifiedBy, submissionData)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [data.surveyKey, createdBy?.value || 'user_unknown', data.submissionId, data.rowVersion, data.creatorId, data.createdAt, data.modifiedBy, JSON.stringify(data.submissionData)]
      )  } else {
    if (createdBy?.value === 'employee') {
      await db.query(
        `INSERT INTO "submissions"
        (surveyKey, createdBy, submissionId, rowVersion, creatorId, createdAt, modifiedBy, submissionData)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [data.surveyKey, createdBy?.value || 'user_unknown', data.submissionId, data.rowVersion, data.creatorId, data.createdAt, data.modifiedBy, JSON.stringify(data.submissionData)]
      )
    } 
    else {
      await db.query(
        `INSERT INTO "test_prod_submissions"
        (surveyKey, createdBy, submissionId, rowVersion, creatorId, createdAt, modifiedBy, submissionData)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [data.surveyKey, createdBy?.value || 'user_unknown', data.submissionId, data.rowVersion, data.creatorId, data.createdAt, data.modifiedBy, JSON.stringify(data.submissionData)]
      )
    }
  }
  
  return NextResponse.json({message: 'Submission received.', received: data})
}
