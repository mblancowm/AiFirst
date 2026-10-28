import { z } from "zod";

export const idSchema = z.coerce.number().int().positive();
const participantName = z.string().trim().min(1, "Escribe el nombre.").max(100, "El nombre es demasiado largo.");
const optionalEmail = z
  .union([z.string().trim().email("Escribe un email válido."), z.literal("")])
  .optional()
  .transform((email) => email || null);

export const participantWriteSchema = z.object({
  name: participantName,
  email: optionalEmail,
});

export const participantUpdateSchema = participantWriteSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  "Incluye al menos un campo para actualizar.",
);

export const teamWriteSchema = z
  .object({
    name: z.string().trim().min(1, "Escribe el nombre del equipo.").max(100, "El nombre del equipo es demasiado largo."),
    participantIds: z.array(z.number().int().positive()).max(4, "Un equipo puede tener hasta cuatro participantes."),
    mentorId: z.number().int().positive().nullable().optional(),
  })
  .superRefine(({ participantIds }, context) => {
    if (new Set(participantIds).size !== participantIds.length) {
      context.addIssue({ code: "custom", path: ["participantIds"], message: "No repitas participantes en el equipo." });
    }
  });

export type ParticipantWriteInput = z.input<typeof participantWriteSchema>;
export type ParticipantUpdateInput = z.input<typeof participantUpdateSchema>;
export type TeamWriteInput = z.input<typeof teamWriteSchema>;
