import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

export interface PartnerTokenPayload {
    partnerId: string;
    email: string;
    referenceNo: string;
    name: string;
    role: "partner";
}

export function signToken(payload: { id: string; username: string }): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function signPartnerToken(payload: PartnerTokenPayload): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "30d" });
}

export function verifyToken(token: string): { id: string; username: string } | null {
    try {
        return jwt.verify(token, JWT_SECRET) as { id: string; username: string };
    } catch {
        return null;
    }
}

export function verifyPartnerToken(token: string): PartnerTokenPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET) as PartnerTokenPayload;
    } catch {
        return null;
    }
}

export async function getAdminFromToken(): Promise<{ id: string; username: string } | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    if (!token) return null;
    return verifyToken(token);
}

export async function getPartnerFromToken(): Promise<PartnerTokenPayload | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get("partner_token")?.value;
    if (!token) return null;
    return verifyPartnerToken(token);
}
