import type { Request, Response } from "express";
import argon2 from "argon2";
import { eq } from "drizzle-orm";
import { loginSchema, registerSchema } from "../zod/user.ts";
import { db } from "../config/db.config.ts";
import { users } from "../models/user.model.ts";
import { createTokens } from "../utils/jwt.ts";

//register

export const register = async (req: Request, res: Response) => {
  const parsed = registerSchema.safeParse(req.body);

  if (!parsed.success) {
    const errors = parsed.error.issues.map((issue) => ({
      path: issue.path[0],
      message: issue.message,
    }));

    return res.status(422).json({ errors });
  }
  const { name, email, password, number } = parsed.data;

  try {
    const existingEmail = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingEmail.length > 0) {
      return res.status(409).json({
        errors: [{ path: "email", message: "Email already in use" }],
      });
    }

    const existingNumber = await db
      .select()
      .from(users)
      .where(eq(users.number, number))
      .limit(1);

    if (existingNumber.length > 0) {
      return res.status(409).json({
        errors: [{ path: "number", message: "Phone number already in use" }],
      });
    }

    const passwordHash = await argon2.hash(password);

    const inserted = await db
      .insert(users)
      .values({
        name,
        email,
        number,
        passwordHash,
      })
      .returning();

    const user = inserted[0];

    delete (user as any).passwordHash;
    return res.status(201).json({
      message: "Registered successfully",
      user,
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

//login

export const login = async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    const errors = parsed.error.issues.map((issue) => ({
      path: issue.path[0],
      message: issue.message,
    }));

    return res.status(422).json({ errors });
  }

  const { email, number, password } = parsed.data;

  try {
    const query = email
      ? eq(users.email, email)
      : eq(users.number, number as string);

    const result = await db.select().from(users).where(query).limit(1);

    if (result.length === 0) {
      return res.status(401).json({
        message: "Invalid email/number or password",
      });
    }

    const user = result[0];
    if (!user) {
      return res.status(401).json({
        message: "Invalid email/number or password",
      });
    }
    const isValid = await argon2.verify(user.passwordHash, password);

    if (!isValid) {
      return res.status(401).json({
        message: "Invalid email/number or password",
      });
    }

    const { passwordHash, ...safeUser } = user as any;

    //token
    const { accessToken, refreshToken } = createTokens(user);

    return res.status(200).json({
      message: "Login successful",
      user: { id: user.id, email: user.email },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
