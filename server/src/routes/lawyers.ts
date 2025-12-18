import type { Request, Response, Router } from 'express';
import { Router as createRouter } from 'express';
import type { ApiResponse, Lawyer } from '@lexhub/api-client/types';
import { listLawyers, searchLawyers } from '../services/lawyersService';
import { LawyerModel } from '../models/Lawyer';
import type { LawyerDocument } from '../models/Lawyer';

const router: Router = createRouter();

const mapToLawyer = (lawyer: LawyerDocument): Lawyer => ({
  id: lawyer.id ?? (lawyer._id as unknown as { toString(): string }).toString(),
  name: lawyer.name,
  avatarUrl: 'https://via.placeholder.com/150', // TODO: שדה אמיתי מהמודל
  specialties: lawyer.specialization,
  priceRange: {
    min: lawyer.pricePerLetter ?? 0,
    max: (lawyer.pricePerLetter ?? 0) * 1.5 || 0,
  },
  location: {
    lat: 0,
    lng: 0,
    city: lawyer.region,
  },
  rating: lawyer.rating ?? 0,
  bio: lawyer.bio,
  publications: [
    { title: 'מאמר לדוגמה: זכויות עובדים' },
    { title: 'פוסט בלוג: טיפים לפני חתימת חוזה' },
  ],
});

router.get('/', async (_req: Request, res: Response<ApiResponse<Lawyer[]>>) => {
  try {
    const lawyers = await listLawyers();
    return res.json({
      success: true,
      data: lawyers.map(mapToLawyer),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: (error as Error).message,
    });
  }
});

router.get(
  '/search',
  async (req: Request, res: Response<ApiResponse<Lawyer[]>>) => {
    const { q, region, specialization, minRating } = req.query as {
      q?: string;
      region?: string;
      specialization?: string;
      minRating?: string;
    };

    try {
      const lawyers = await searchLawyers({
        q,
        region,
        specialization,
        minRating: minRating ? Number(minRating) : undefined,
      });

      return res.json({
        success: true,
        data: lawyers.map(mapToLawyer),
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: (error as Error).message,
      });
    }
  },
);

router.get(
  '/:id',
  async (req: Request, res: Response<ApiResponse<Lawyer>>) => {
    try {
      const lawyer = await LawyerModel.findById(req.params.id).exec();
      if (!lawyer) {
        return res
          .status(404)
          .json({ success: false, error: 'Lawyer not found' });
      }
      return res.json({ success: true, data: mapToLawyer(lawyer) });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: (error as Error).message,
      });
    }
  },
);

router.post(
  '/:id/swipe',
  async (req: Request, res: Response<ApiResponse<null>>) => {
    const { id } = req.params;
    const { liked } = req.body as { liked: boolean };

    // TODO: לשמור ב-DB / Audit log
    // eslint-disable-next-line no-console
    console.log(`Swipe on lawyer ${id}: ${liked ? 'LIKE' : 'SKIP'}`);

    return res.json({ success: true });
  },
);

router.post(
  '/:id/favorite',
  async (req: Request, res: Response<ApiResponse<null>>) => {
    const { id } = req.params;
    // TODO: לשמור למועדפים עבור המשתמש המחובר
    // eslint-disable-next-line no-console
    console.log(`Favorite lawyer ${id}`);
    return res.json({ success: true });
  },
);

router.post(
  '/:id/message',
  async (req: Request, res: Response<ApiResponse<null>>) => {
    const { id } = req.params;
    const { message } = req.body as { message: string };
    // TODO: לשמור הודעה / לפתוח צ׳אט
    // eslint-disable-next-line no-console
    console.log(`Message to lawyer ${id}: ${message}`);
    return res.json({ success: true });
  },
);

export default router;

