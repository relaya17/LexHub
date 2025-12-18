import React, { useRef, useState } from 'react';
import { Alert, Box, Button, CircularProgress, Divider, Typography } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
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
      <Typography variant="h6" sx={{ textAlign: 'right', mb: 1 }}>
        העלאה / סריקה
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2, textAlign: 'right' }}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button
          variant="outlined"
          startIcon={<UploadFileIcon />}
          onClick={handlePickFile}
          disabled={busy}
          sx={{ borderRadius: 999 }}
        >
          העלאת קובץ (PDF/TXT/DOCX)
        </Button>
        <Button
          variant="outlined"
          startIcon={<CameraAltIcon />}
          onClick={handlePickCamera}
          disabled={busy}
          sx={{ borderRadius: 999 }}
        >
          צילום/סריקה (מובייל)
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

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle2" sx={{ textAlign: 'right', mb: 1 }}>
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
    </Box>
  );
};

export default UploadContract;


