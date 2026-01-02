import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { SessionPayload } from './definitions';
import { cookies } from 'next/headers';

const secretKey = process.env.SESSION_SECRET;
if(!secretKey) {
    throw new Error("SECRET_KEY is not set");
}

const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload, expiresAt: Date)
{
    return new SignJWT({ ...payload, exp: expiresAt.getTime() / 1000 })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(expiresAt.getTime() / 1000)
        .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '')
{
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        })
        return payload;
    } catch (error) {
        console.error(error);
    }
}

export async function createSession(payload: SessionPayload)
{
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const session = await encrypt(payload, expiresAt)
    const cookieStore = await cookies()
    
    cookieStore.set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })
}

export async function updateSession() {
    const session = (await cookies()).get('session')?.value
    const payload = await decrypt(session)
   
    if (!session || !payload) {
      return null
    }
   
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
   
    const cookieStore = await cookies()
    cookieStore.set('session', session, {
      httpOnly: true,
      secure: true,
      expires: expires,
      sameSite: 'lax',
      path: '/',
    })
}

export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete('session')
}