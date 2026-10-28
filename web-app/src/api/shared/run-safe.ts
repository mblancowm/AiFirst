import type { Context } from "hono";
import { ZodError } from "zod";
import { AppError } from "../../core-logic/shared/errors";

export const errorResponse = (context: Context, error: unknown): Response => {
  if (error instanceof AppError) {
    return context.json({ error: error.message }, error.status);
  }
  if (error instanceof ZodError) {
    return context.json({
      error: "Revisa los datos del formulario.",
      details: error.issues.map((issue) => ({ field: issue.path.join("."), message: issue.message })),
    }, 400);
  }
  if (error instanceof SyntaxError) {
    return context.json({ error: "El cuerpo de la solicitud no contiene JSON válido." }, 400);
  }
  console.error("Admin API request failed", error);
  return context.json({ error: "Ocurrió un error inesperado." }, 500);
};

export const runSafe = async <T>(context: Context, action: () => Promise<T> | T): Promise<Response> => {
  try {
    return context.json(await action());
  } catch (error) {
    return errorResponse(context, error);
  }
};
