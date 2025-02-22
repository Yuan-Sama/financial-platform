import type { Cookies } from '@sveltejs/kit';
import type { User } from '../user';

import * as jose from 'jose';
import bcrypt from 'bcrypt';
import { APP_NAME } from '$lib';
import { getUserById } from '../user/repo';

/**
 * @see {@link https://github.com/panva/jose/issues/210#jws-alg Algorithm Key Requirements}
 */
const alg = 'HS256';

// TODO: get from .env
const secret = new TextEncoder().encode(
	'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2'
);

export const AUTH_TOKEN = 'fp-auth-token';

export async function hashString(password: string, saltOrRounds: string | number = 12) {
	return bcrypt.hash(password, saltOrRounds);
}

export async function rawAndHashedStringMatch(rawString: string | Buffer, hashedString: string) {
	return bcrypt.compare(rawString, hashedString);
}

export async function createAuthToken(user: User, expiresAt: Date) {
	return new jose.SignJWT({ id: user.id })
		.setProtectedHeader({ alg })
		.setIssuedAt()
		.setIssuer(APP_NAME)
		.setAudience(APP_NAME)
		.setExpirationTime(expiresAt)
		.sign(secret);
}

export async function validateAuthToken(token: string | undefined) {
	if (!token) return;

	try {
		const verifiedToken = await jose.jwtVerify(token, secret, {
			issuer: APP_NAME,
			audience: APP_NAME
		});

		const userId = verifiedToken.payload.id as number;

		return getUserById(userId);
	} catch (err) {
		console.error('validateAuthToken():', err);
		return;
	}
}

export function setAuthTokenCookie(cookies: Cookies, token: string, expiresAt: Date): void {
	cookies.set(AUTH_TOKEN, token, {
		httpOnly: true,
		sameSite: 'lax',
		expires: expiresAt,
		path: '/'
	});
}

export function getExpiresAt(seconds: number = 3600 /** 1 hour */) {
	const expiresAtMillis = Date.now() + seconds * 1000;
	return new Date(expiresAtMillis);
}

export async function createAndSetAuthTokenCookie(
	cookies: Cookies,
	user: User,
	expiresAtSeconds: number = 3600 /** 1 hour */
) {
	const expiresAt = getExpiresAt(expiresAtSeconds);
	const authToken = await createAuthToken(user, expiresAt);

	setAuthTokenCookie(cookies, authToken, expiresAt);
}

export function deleteAuthTokenCookie(cookies: Cookies): void {
	cookies.set(AUTH_TOKEN, '', {
		httpOnly: true,
		sameSite: 'lax',
		maxAge: 0,
		path: '/'
	});
}
