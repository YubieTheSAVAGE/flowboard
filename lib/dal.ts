import 'server-only';
import { cookies } from 'next/headers';
import { decrypt } from './session';
import { cache } from 'react';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config'

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({ adapter });
export const verifySession = cache(async () => {
    const cookie = (await cookies()).get('session')?.value;
    const session = await decrypt(cookie);

    if (!session?.id)
        redirect('/signin');

    return { isAuthenticated: true, userId: session.id };
});

export const getUser = cache(async () => {
    const session = await verifySession()
    if (!session) return null
   
    try {
      const data = await prisma.user.findUnique({
        where: {
            id: session.userId as string,
        },
      })
   
      return {
        id: data?.id,
        name: data?.name,
        email: data?.email,
        role: data?.role,
      }
    } catch (error) {
      console.log('Failed to fetch user')
      return null
    }
  })