import type { Request, Response, Router } from 'express';
import { Router as createRouter } from 'express';
import { UserModel } from '../models/User';

const router: Router = createRouter();

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.params.id).select('-passwordHash').exec();

    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    return res.json({ success: true, data: user });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: (error as Error).message,
    });
  }
});

export default router;


