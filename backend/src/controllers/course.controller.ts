import type { Request,Response } from "express";
import { db } from "../config/db.config.ts";
import { course } from "../models/course.model.ts";

export const courses = async(req:Request,res:Response) => {
    const allCourses = await db.select().from(course);
    return res.json({courses: allCourses});
}