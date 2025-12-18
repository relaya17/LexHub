import type { Request, Response, Router } from 'express';
import { Router as createRouter } from 'express';
import type { ApiResponse, ContractCheckResult } from '@lexhub/api-client/types';
import multer from 'multer';
import * as pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import { analyzeContract, saveContractAnalysis } from '../services/contractService';

const router: Router = createRouter();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 6 * 1024 * 1024 }, // 6MB
});

router.post(
  '/extract',
  upload.single('file'),
  async (
    req: Request,
    res: Response<ApiResponse<{ text: string }>>,
  ) => {
    try {
      const file = (req as unknown as { file?: Express.Multer.File }).file;
      if (!file) {
        return res.status(400).json({ success: false, error: 'Missing file' });
      }

      const filename = (file.originalname ?? '').toLowerCase();
      const mime = (file.mimetype ?? '').toLowerCase();

      const isPdf = mime.includes('pdf') || filename.endsWith('.pdf');
      const isTxt = mime.startsWith('text/') || filename.endsWith('.txt');
      const isDocx =
        mime.includes('officedocument.wordprocessingml.document') || filename.endsWith('.docx');

      if (!isPdf && !isTxt && !isDocx) {
        return res.status(415).json({
          success: false,
          error: 'Unsupported file type. Please upload PDF / TXT / DOCX.',
        });
      }

      let text = '';
      if (isTxt) {
        text = file.buffer.toString('utf-8');
      } else if (isPdf) {
        const parsed = await (pdfParse as unknown as (buf: Buffer) => Promise<{ text?: string }>)(file.buffer);
        text = parsed.text ?? '';
      } else if (isDocx) {
        const result = await mammoth.extractRawText({ buffer: file.buffer });
        text = result.value ?? '';
      }

      const normalized = text.replace(/\u0000/g, '').trim();
      if (!normalized) {
        return res.status(422).json({
          success: false,
          error: 'Could not extract text from file. Try a different file or paste the text.',
        });
      }

      return res.json({ success: true, data: { text: normalized } });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: (error as Error).message,
      });
    }
  },
);

router.post(
  '/check',
  async (
    req: Request,
    res: Response<ApiResponse<ContractCheckResult>>,
  ) => {
    const { text, clientId } = req.body as { text: string; clientId?: string };

    try {
      const analysis = await analyzeContract(text);

      if (clientId) {
        await saveContractAnalysis(text, clientId, analysis.summary);
      }

      return res.json({
        success: true,
        data: analysis,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: (error as Error).message,
      });
    }
  },
);

export default router;

