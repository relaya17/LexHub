import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Snackbar,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';

import { createLetter } from '@lexhub/api-client/api';
import type {
  LetterType as ApiLetterType,
  LetterForm,
  HandlerType,
} from '@lexhub/api-client/types';

import { PageLayout } from '../components/PageLayout';
import { localStorageUtils } from '../utils/localStorage';
import { useAppSelector } from '../redux/hooks';

/* =========================
   סוג מכתב רשמי – שלב ראשון
========================= */
const OFFICIAL_LETTER_KINDS = [
  'תלונה',
  'אזהרה',
  'דרישה',
  'המלצה',
  'אחר',
] as const;

type OfficialLetterKind = (typeof OFFICIAL_LETTER_KINDS)[number];

/* =========================
   תחום המכתב
========================= */
const LETTER_TYPES = ['כללי', 'דיור', 'חובות', 'עבודה', 'משפחה', 'צרכנות'] as const;
type UiLetterType = (typeof LETTER_TYPES)[number];

const mapUiTypeToApiType = (uiType: UiLetterType): ApiLetterType => {
  switch (uiType) {
    case 'חובות':
      return 'debt';
    case 'משפחה':
      return 'family';
    case 'עבודה':
      return 'work';
    default:
      return 'general';
  }
};

type DraftState = {
  officialKind: OfficialLetterKind;
  type: UiLetterType;
  purpose: string;
  recipientName: string;
  fullName: string;
  content: string;
  generated: string;
};

/* =========================
   תבנית בסיס למכתב
========================= */
const createBaseTemplate = (
  officialKind: OfficialLetterKind,
  type: UiLetterType,
  fullName: string,
  recipientName: string,
  purpose: string,
  content: string,
): string => {
  const subject =
    purpose?.trim() || `מכתב ${officialKind} בנושא ${type}`;

  const header = `נושא: ${subject}

לכבוד: ${recipientName || 'הנמען/ת'}
מאת: ${fullName || '________________'}

`;

  const body = content?.trim()
    ? `${content.trim()}\n\n`
    : 'אבקש להתייחס לפנייתי בהתאם.\n\n';

  const closing = `בברכה,
${fullName || '________________'}
`;

  return `${header}${body}${closing}`;
};

const buildLetterForm = (draft: DraftState): LetterForm => {
  const subject =
    draft.purpose?.trim() ||
    `מכתב ${draft.officialKind} בנושא ${draft.type}`;

  const details =
    draft.generated?.trim() ||
    createBaseTemplate(
      draft.officialKind,
      draft.type,
      draft.fullName,
      draft.recipientName,
      draft.purpose,
      draft.content,
    );

  return {
    fullName: draft.fullName || 'לקוח/ה',
    subject,
    details,
  };
};

const ScalesIcon: React.FC<{ size?: number }> = ({ size = 72 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M32 10v40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M16 18h32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M16 18l-8 14h16l-8-14Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M48 18l-8 14h16l-8-14Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path
        d="M20 34c0 3-2.7 6-6 6s-6-3-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M52 34c0 3-2.7 6-6 6s-6-3-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M24 54h16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
};

/* =========================
   קומפוננטה
========================= */
const WriteLetter: React.FC = () => {
  const auth = useAppSelector((s) => s.auth);

  const initial = useMemo<DraftState>(() => {
    const stored = localStorageUtils.loadWriteLetterDraft<DraftState>();
    if (stored) return stored;

    return {
      officialKind: 'תלונה',
      type: 'כללי',
      purpose: '',
      recipientName: '',
      fullName: auth.user?.name ?? '',
      content: '',
      generated: '',
    };
  }, [auth.user?.name]);

  const [officialKind, setOfficialKind] = useState(initial.officialKind);
  const [type, setType] = useState(initial.type);
  const [purpose, setPurpose] = useState(initial.purpose);
  const [recipientName, setRecipientName] = useState(initial.recipientName);
  const [fullName, setFullName] = useState(initial.fullName);
  const [content, setContent] = useState(initial.content);
  const [generated, setGenerated] = useState(initial.generated);

  const [busy, setBusy] = useState(false);
  const [snack, setSnack] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'warning' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const rtlTextFieldSx = useMemo(
    () => ({
      '& .MuiInputBase-input': {
        direction: 'rtl',
        textAlign: 'right',
      },
      '& textarea': {
        direction: 'rtl',
        textAlign: 'right',
      },
    }),
    [],
  );

  const rtlInputLabelSx = useMemo(
    () => ({
      direction: 'rtl',
      textAlign: 'right',
      transformOrigin: 'top right',
    }),
    [],
  );

  useEffect(() => {
    localStorageUtils.saveWriteLetterDraft({
      officialKind,
      type,
      purpose,
      recipientName,
      fullName,
      content,
      generated,
    });
  }, [officialKind, type, purpose, recipientName, fullName, content, generated]);

  const handleGenerateLetter = () => {
    const next = createBaseTemplate(
      officialKind,
      type,
      fullName,
      recipientName,
      purpose,
      content,
    );
    setGenerated(next);
    setSnack({ open: true, message: 'נוסח מכתב נוצר', severity: 'success' });
  };

  const sendLetter = async (handler: HandlerType) => {
    if (!purpose.trim() || !content.trim()) {
      setSnack({
        open: true,
        message: 'נא למלא מטרת מכתב ותוכן',
        severity: 'warning',
      });
      return;
    }

    try {
      setBusy(true);
      const apiType = mapUiTypeToApiType(type);
      const form = buildLetterForm({
        officialKind,
        type,
        purpose,
        recipientName,
        fullName,
        content,
        generated,
      });

      const response = await createLetter(apiType, form, handler);

      if (!response.success) {
        setSnack({
          open: true,
          message: response.error || 'שליחה נכשלה',
          severity: 'error',
        });
        return;
      }

      setSnack({
        open: true,
        message:
          handler === 'ai'
            ? 'המכתב נשלח ל-AI'
            : 'המכתב נשלח לעו״ד',
        severity: 'success',
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <PageLayout>
      <Box dir="rtl" sx={{ textAlign: 'right' }}>
        <Typography variant="h4" textAlign="center" sx={{ mb: 1, direction: 'rtl' }}>
          מכתב רשמי
        </Typography>

        <Typography
          variant="subtitle1"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 3, direction: 'rtl' }}
        >
          בחרי סוג מכתב ולאחר מכן מלאי את הפרטים
        </Typography>

        {/* שלב ראשון – סוג מכתב רשמי */}
        <Paper variant="outlined" sx={{ p: 2, mb: 3, borderRadius: 3 }}>
          <Typography sx={{ mb: 1, textAlign: 'center', direction: 'rtl' }}>
            סוג מכתב
          </Typography>
          <ToggleButtonGroup
            value={officialKind}
            exclusive
            onChange={(_, v) => v && setOfficialKind(v)}
            fullWidth
            sx={{
              direction: 'rtl',
              flexDirection: 'row-reverse',
              justifyContent: 'center',
              '& .MuiToggleButton-root': { textAlign: 'center' },
            }}
          >
            {OFFICIAL_LETTER_KINDS.map((k) => (
              <ToggleButton key={k} value={k}>
                {k}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Paper>

        <Grid container spacing={2}>
          {/* טופס */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
              <Typography sx={{ mb: 1, textAlign: 'center', direction: 'rtl' }}>
                תחום המכתב
              </Typography>
              <ToggleButtonGroup
                value={type}
                exclusive
                onChange={(_, v) => v && setType(v)}
                fullWidth
                sx={{
                  direction: 'rtl',
                  flexDirection: 'row-reverse',
                  justifyContent: 'center',
                  '& .MuiToggleButton-root': { textAlign: 'center' },
                }}
              >
                {LETTER_TYPES.map((lt) => (
                  <ToggleButton key={lt} value={lt}>
                    {lt}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>

              <TextField
                label="מטרת המכתב (הנדון)"
                fullWidth
                margin="normal"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                inputProps={{ dir: 'rtl' }}
                InputLabelProps={{ sx: rtlInputLabelSx }}
                sx={rtlTextFieldSx}
              />

              <TextField
                label="שם מלא"
                fullWidth
                margin="normal"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                inputProps={{ dir: 'rtl' }}
                InputLabelProps={{ sx: rtlInputLabelSx }}
                sx={rtlTextFieldSx}
              />

              <TextField
                label="שם הנמען"
                fullWidth
                margin="normal"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                inputProps={{ dir: 'rtl' }}
                InputLabelProps={{ sx: rtlInputLabelSx }}
                sx={rtlTextFieldSx}
              />

              <TextField
                label="תוכן המכתב"
                fullWidth
                multiline
                rows={6}
                margin="normal"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                inputProps={{ dir: 'rtl' }}
                InputLabelProps={{ sx: rtlInputLabelSx }}
                sx={rtlTextFieldSx}
              />

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  onClick={handleGenerateLetter}
                >
                  צור טיוטה
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => sendLetter('ai')}
                  disabled={busy}
                >
                  שלח ל-AI
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => sendLetter('lawyer')}
                  disabled={busy}
                >
                  שלח לעו״ד
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* תצוגה */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
              {!generated ? (
                <Box
                  sx={{
                    py: { xs: 5, md: 8 },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1.5,
                    color: 'text.secondary',
                    textAlign: 'center',
                  }}
                >
                  <Box sx={{ color: 'warning.main' }}>
                    <ScalesIcon size={72} />
                  </Box>
                  <Typography sx={{ direction: 'rtl' }}>
                    כאן תופיע טיוטת המכתב
                  </Typography>
                </Box>
              ) : (
                <Typography sx={{ whiteSpace: 'pre-line', textAlign: 'right', direction: 'rtl' }}>
                  {generated}
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>

        <Snackbar
          open={snack.open}
          autoHideDuration={3000}
          onClose={() => setSnack({ ...snack, open: false })}
        >
          <Alert severity={snack.severity}>{snack.message}</Alert>
        </Snackbar>
      </Box>
    </PageLayout>
  );
};

export default WriteLetter;
