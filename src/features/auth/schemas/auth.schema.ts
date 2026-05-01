import { z } from "zod";

// ─── Reusable field helpers ───────────────────────────────────────────────────

/** Personal name: letters (including accented), spaces, hyphens and apostrophes only. */
const nameField = (label: string) =>
  z
    .string()
    .trim()
    .min(2, `${label} requerido`)
    .max(60, `${label} demasiado largo`)
    .regex(/^[a-zA-ZÀ-ÿ\s'\-]+$/, `${label} solo puede contener letras`);

/** Phone: optional, but if provided must be a plausible phone number (7-20 chars). */
const phoneField = z
  .string()
  .trim()
  .refine(
    (val) => val === "" || /^\+?[\d\s\-()\u00a0]{7,20}$/.test(val),
    { message: "Teléfono inválido" },
  )
  .optional();

// ─── Schemas ──────────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  // max 254 = RFC 5321 limit for email addresses
  email: z.string().trim().email("Email inválido").max(254, "Email inválido"),
  // max 128 prevents sending huge strings to bcrypt (DoS vector)
  password: z.string().min(8, "Mínimo 8 caracteres").max(128, "Contraseña demasiado larga"),
});

export const registerSchema = z
  .object({
    email: z.string().trim().email("Email inválido").max(254, "Email inválido"),
    password: z.string().min(8, "Mínimo 8 caracteres").max(128, "Contraseña demasiado larga"),
    first_name: nameField("Nombre"),
    last_name: nameField("Apellido"),
    document_type: z.enum(["DNI", "CE", "PASAPORTE"]),
    document_number: z.string().trim().min(1, "Número de documento requerido").max(20, "Número de documento inválido"),
    phone_number: phoneField,
    role_id: z.string().uuid("ID de rol inválido").optional(),
  })
  .superRefine(({ document_type, document_number }, ctx) => {
    // Validate document_number format per selected document type
    if (document_type === "DNI" && !/^\d{8}$/.test(document_number)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "El DNI debe tener exactamente 8 dígitos numéricos",
        path: ["document_number"],
      });
    }
    if (document_type === "CE" && !/^\d{9}$/.test(document_number)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "El carné de extranjería debe tener exactamente 9 dígitos numéricos",
        path: ["document_number"],
      });
    }
    if (document_type === "PASAPORTE" && !/^[A-Z0-9]{6,12}$/i.test(document_number)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "El pasaporte debe tener entre 6 y 12 caracteres alfanuméricos",
        path: ["document_number"],
      });
    }
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
