import type { Request,Response } from "express";

export const check = async(req:Request,res:Response) =>{
    res.send("hello mcgroup");
}