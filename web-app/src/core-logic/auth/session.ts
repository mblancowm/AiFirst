import { z } from "zod";
import { AppError } from "../shared/errors";

const ADMIN_EMAILS = new Set([
  "ohurtado@westmonroe.com",
  "mblanco@westmonroe.com",
  "kmartinez@westmonroe.com",
]);
const GATEWAY_PROFILE_URL = "https://westmonroe-cloud.com/users/me";
const gatewayProfileSchema = z.object({ email: z.string().trim().email() });

export interface CurrentSession {
  email: string | null;
  isAdmin: boolean;
  isLocalMode: boolean;
}

const isLocalAdminMode = () => process.env.ADMIN_ACCESS_MODE?.trim().toLowerCase() === "local";

const readGatewayEmail = async (cookie: string | null): Promise<string | null> => {
  if (!cookie) return null;

  let response: Response;
  try {
    response = await fetch(GATEWAY_PROFILE_URL, {
      headers: { cookie },
      redirect: "manual",
      signal: AbortSignal.timeout(5000),
    });
  } catch {
    throw new AppError("No se pudo consultar la identidad en el gateway.", 503);
  }

  if (response.status === 401 || response.status === 403) return null;
  if (!response.ok) throw new AppError("El gateway no pudo validar la identidad.", 503);

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw new AppError("El gateway devolvió una respuesta inválida.", 502);
  }
  const profile = gatewayProfileSchema.safeParse(payload);
  if (!profile.success) throw new AppError("El gateway no devolvió un email válido.", 502);
  return profile.data.email;
};

export const getCurrentSession = async (request: Request): Promise<CurrentSession> => {
  const localMode = isLocalAdminMode();

  if (localMode) {
    let email: string | null = null;
    try {
      email = await readGatewayEmail(request.headers.get("cookie"));
    } catch {
      // Local mode is intentionally usable without a gateway session.
    }
    return { email, isAdmin: true, isLocalMode: true };
  }

  const email = await readGatewayEmail(request.headers.get("cookie"));
  const isAdmin = email !== null && ADMIN_EMAILS.has(email.toLowerCase());
  return { email, isAdmin, isLocalMode: false };
};

export const assertAdminRequest = async (request: Request): Promise<void> => {
  const session = await getCurrentSession(request);
  if (session.isLocalMode) return;
  if (!session.email) throw new AppError("Inicia sesión en el gateway para continuar.", 401);
  if (!session.isAdmin) throw new AppError("Tu cuenta no tiene acceso al módulo Admin.", 403);
};
