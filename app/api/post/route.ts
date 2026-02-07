import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';
import { db } from '../database/db';
import { CookieKeys, CookieValues, SurveyKey } from '../util';


export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const data = await request.json();
  const createdBy = (await cookies()).get(CookieKeys.LOGGED_IN);

  if (data.surveyKey === SurveyKey.FEEDBACK) {
    await db.query(`INSERT INTO "feedback_submissions"
        (surveyKey, createdBy, submissionId, rowVersion, creatorId, createdAt, modifiedBy, submissionData)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [data.surveyKey, createdBy?.value, data.submissionId, data.rowVersion, data.creatorId, data.createdAt, data.modifiedBy, JSON.stringify(data.submissionData)]
      )  } else {

    if (createdBy?.value === CookieValues.TEST_USER || createdBy?.value === CookieValues.INTEGRATION_TEST || createdBy?.value === CookieValues.ADMIN){
      await db.query(
        `INSERT INTO "test_submissions"
        (surveyKey, createdBy, submissionId, rowVersion, creatorId, createdAt, modifiedBy, submissionData)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [data.surveyKey, createdBy?.value, data.submissionId, data.rowVersion, data.creatorId, data.createdAt, data.modifiedBy, JSON.stringify(data.submissionData)]
      )
    } else if (createdBy?.value === CookieValues.EMPLOYEE) {
          await db.query(
        `INSERT INTO "submissions"
        (surveyKey, createdBy, submissionId, rowVersion, creatorId, createdAt, modifiedBy, submissionData)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [data.surveyKey, createdBy?.value, data.submissionId, data.rowVersion, data.creatorId, data.createdAt, data.modifiedBy, JSON.stringify(data.submissionData)]
      )
    } else {
       await db.query(
        `INSERT INTO "unverified_submissions"
        (surveyKey, createdBy, submissionId, rowVersion, creatorId, createdAt, modifiedBy, submissionData)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [data.surveyKey, 'unverified_user', data.submissionId, data.rowVersion, data.creatorId, data.createdAt, data.modifiedBy, JSON.stringify(data.submissionData)]
      )
    }
  }
  
  return NextResponse.json({message: 'Submission received.', received: data})
}
