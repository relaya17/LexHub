import React, { useRef, useState } from 'react';
import { Alert, Box, Button, CircularProgress, Divider, Paper, Typography } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { alpha } from '@mui/material/styles';
import { contractsApi } from '../../api/contracts';

export interface UploadContractProps {
  onUpload: (content: string) => void;
}

const UploadContract: React.FC<UploadContractProps> = ({ onUpload }) => {
  const [text, setText] = useState<string>('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  const handleUseText = () => {
    const trimmed = text.trim();
    if (trimmed.length > 0) {
      onUpload(trimmed);
    }
  };

  const handlePickFile = () => fileInputRef.current?.click();
  const handlePickCamera = () => cameraInputRef.current?.click();

  const handleFile = async (file: File) => {
    setError(null);
    setBusy(true);
    try {
      const res = await contractsApi.extractText(file);
      if (!res.success || !res.data?.text) {
        setError(res.error ?? 'לא הצלחנו לקרוא טקסט מהקובץ. נסי קובץ אחר או הדביקי טקסט.');
        return;
      }
      setText(res.data.text);
      onUpload(res.data.text);
    } catch (e) {
      setError((e as Error).message ?? 'אירעה שגיאה בעת העלאת הקובץ');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box dir="rtl" sx={{ mb: 3 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2, textAlign: 'right' }}>
          {error}
        </Alert>
      )}

      {/* Top actions (responsive tiles) */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 1.5,
          mb: 2,
        }}
      >
        <Paper
          component="button"
          type="button"
          onClick={handlePickFile}
          disabled={busy}
          variant="outlined"
          sx={(t) => ({
            textAlign: 'right',
            borderRadius: 12,
            p: 2,
            cursor: busy ? 'not-allowed' : 'pointer',
            opacity: busy ? 0.7 : 1,
            borderColor: 'divider',
            transition: 'border-color 160ms ease, background-color 160ms ease, transform 160ms ease',
            '&:hover': busy
              ? undefined
              : {
                  borderColor: 'primary.main',
                  backgroundColor: alpha(t.palette.primary.main, 0.06),
                  transform: 'translateY(-1px)',
                },
          })}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 10,
                bgcolor: 'primary.main',
                color: 'common.white',
                display: 'grid',
                placeItems: 'center',
                flex: '0 0 auto',
              }}
              aria-hidden="true"
            >
              <UploadFileIcon />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontWeight: 800, color: 'text.primary' }}>העלאת קובץ</Typography>
              <Typography variant="body2" color="text.secondary">
                PDF / TXT / DOCX
              </Typography>
            </Box>
            {busy && (
              <Box sx={{ mr: 'auto' }}>
                <CircularProgress size={18} />
              </Box>
            )}
          </Box>
        </Paper>

        <Paper
          component="button"
          type="button"
          onClick={handlePickCamera}
          disabled={busy}
          variant="outlined"
          sx={(t) => ({
            textAlign: 'right',
            borderRadius: 12,
            p: 2,
            cursor: busy ? 'not-allowed' : 'pointer',
            opacity: busy ? 0.7 : 1,
            borderColor: 'divider',
            transition: 'border-color 160ms ease, background-color 160ms ease, transform 160ms ease',
            '&:hover': busy
              ? undefined
              : {
                  borderColor: 'warning.main',
                  backgroundColor: alpha(t.palette.warning.main, 0.08),
                  transform: 'translateY(-1px)',
                },
          })}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 10,
                bgcolor: 'warning.main',
                color: 'common.white',
                display: 'grid',
                placeItems: 'center',
                flex: '0 0 auto',
              }}
              aria-hidden="true"
            >
              <CameraAltIcon />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontWeight: 800, color: 'text.primary' }}>צילום / סריקה</Typography>
              <Typography variant="body2" color="text.secondary">
                מובייל (ללא OCR כרגע)
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography
        variant="subtitle2"
        sx={{ textAlign: 'center', mb: 1, fontWeight: 800, color: 'text.primary' }}
      >
        או הדביקי טקסט
      </Typography>

      <Box
        component="textarea"
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
        placeholder="הדביקי כאן את טקסט החוזה…"
        style={{
          width: '100%',
          minHeight: 220,
          resize: 'vertical',
          direction: 'rtl',
          textAlign: 'right',
          padding: 12,
          borderRadius: 12,
          border: '1px solid #E0DED8',
          fontFamily: 'inherit',
        }}
      />

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleUseText}
          disabled={busy || text.trim().length === 0}
          sx={{ borderRadius: 999, minWidth: 160 }}
        >
          {busy ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CircularProgress size={18} color="inherit" />
              טוען…
            </Box>
          ) : (
            'המשך'
          )}
        </Button>
      </Box>

      <input
        ref={fileInputRef}
        type="file"
        hidden
        accept=".pdf,.txt,.docx,application/pdf,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void handleFile(f);
          e.currentTarget.value = '';
        }}
      />

      <input
        ref={cameraInputRef}
        type="file"
        hidden
        accept="image/*"
        capture="environment"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) {
            setError('צילום נתמך להעלאה, אבל כרגע אין OCR. מומלץ לסרוק ל‑PDF ולהעלות אותו.');
          }
          e.currentTarget.value = '';
        }}
      />
    </Box>
  );
};

export default UploadContract;


