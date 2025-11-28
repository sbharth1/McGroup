import {Router,type Router as RouterType} from 'express'


const router:RouterType = Router();

// GET
router.get("/book",(req,res)=> res.send("book"));

// POST
export default router;