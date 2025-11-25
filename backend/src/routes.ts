import {Router,type Router as RouterType} from 'express'
import { check } from './modules/index.ts';


const router:RouterType = Router();

// GET
router.get("/book",check);

// POST
export default router;