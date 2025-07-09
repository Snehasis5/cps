// Deveploed by Manjistha Bidkar
import express, { Request } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs-extra';
import { config } from '../config';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload-cookies', upload.single('cookie'), async (req: Request & { file?: Express.Multer.File }, res: express.Response): Promise<void> => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }

  const targetPath = path.resolve(config.COOKIES_PATH);
  await fs.move(req.file.path, targetPath, { overwrite: true });
  res.send('Cookies file updated successfully.');
});

export default router;
