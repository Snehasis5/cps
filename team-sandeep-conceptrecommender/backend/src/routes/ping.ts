//Author: Pentapati V V Satya Pavan Sandeep
import { Router, Request, Response } from 'express';
const router = Router();
router.get('/ping', async (req: Request, res: Response) => {
  try {
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error('Ping route error:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});
export default router;
