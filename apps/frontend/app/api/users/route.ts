import { db } from '@repo/db/client'
import { NextResponse } from 'next/server'

export async function GET() {
    const users = await db.orm.public.User.all();

    return NextResponse.json(users);
}