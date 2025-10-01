import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

export function createOpaqueRefreshToken() {
  // token structure: <sessionId>.<randomBase64>
  const sessionId = uuidv4();
  const random = crypto.randomBytes(48).toString('base64url');
  const token = `${sessionId}.${random}`;
  return { sessionId, token };
}

export function parseOpaqueRefreshToken(token: string) {
  const [sessionId, random] = token.split('.');
  if (!sessionId || !random) return null;
  return { sessionId, random };
}
