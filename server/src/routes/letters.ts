import type { Request, Response, Router } from 'express';
import { Router as createRouter } from 'express';
import { PRE_LEGAL_NOTICE_TEMPLATE, renderLetter } from '@lexhub/templates';
import type { LetterFieldValues } from '@lexhub/types';
import type {
  LetterDraft,
  LetterForm,
  LetterType,
  HandlerType,
  ApiResponse,
} from '@lexhub/api-client/types';
import { createLetterService, getLetterService } from '../services/lettersService';

const router: Router = createRouter();

router.get('/templates', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: [
      {
        id: PRE_LEGAL_NOTICE_TEMPLATE.id,
        title: PRE_LEGAL_NOTICE_TEMPLATE.title,
        category: PRE_LEGAL_NOTICE_TEMPLATE.category,
        requiresLawyerReview: PRE_LEGAL_NOTICE_TEMPLATE.requiresLawyerReview,
        fields: PRE_LEGAL_NOTICE_TEMPLATE.fields,
        disclaimer: PRE_LEGAL_NOTICE_TEMPLATE.disclaimer,
      },
    ],
  });
});

router.post('/draft', (req: Request, res: Response) => {
  const values = req.body as LetterFieldValues;

  const content: string = renderLetter(PRE_LEGAL_NOTICE_TEMPLATE, values);

  res.json({
    success: true,
    data: {
      templateId: PRE_LEGAL_NOTICE_TEMPLATE.id,
      content,
      disclaimer: PRE_LEGAL_NOTICE_TEMPLATE.disclaimer,
    },
  });
});

router.post('/', async (req: Request, res: Response<ApiResponse<LetterDraft>>) => {
  const { type, form, handler } = req.body as {
    type: LetterType;
    form: LetterForm;
    handler: HandlerType;
  };

  try {
    const letter = await createLetterService(type, form, handler);
    res.json({ success: true, data: letter });
  } catch (error) {
    res.json({
      success: false,
      error: (error as Error).message,
    });
  }
});

router.get('/:id', async (req: Request, res: Response<ApiResponse<LetterDraft>>) => {
  try {
    const letter = await getLetterService(req.params.id);
    res.json({ success: true, data: letter });
  } catch (error) {
    res.json({
      success: false,
      error: (error as Error).message,
    });
  }
});

export default router;

