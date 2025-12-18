import React, { useMemo, useState } from 'react';
import { Alert, Box, Button, CircularProgress, Divider, Paper, Typography } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import EmailIcon from '@mui/icons-material/Email';
import UploadContract from '../components/CheckContract/UploadContract';
import ContractSummary from '../components/CheckContract/ContractSummary';
import ContractIssues from '../components/CheckContract/ContractIssues';
import SubmitCheck from '../components/CheckContract/SubmitCheck';
import { contractsApi } from '../api/contracts';
import type { ContractCheckResult } from '@lexhub/api-client/types';
import { PageLayout } from '../components/PageLayout';

const CheckContract: React.FC = () => {
  const [contractText, setContractText] = useState<string>('');
  const [result, setResult] = useState<ContractCheckResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpload = (text: string) => {
    setContractText(text);
    setResult(null);
  };

  const handleCheck = async () => {
    if (!contractText) {
      return;
    }
    setLoading(true);

    try {
      const response = await contractsApi.check(contractText);
      if (response.success && response.data) {
        setResult(response.data);
      } else {
        // eslint-disable-next-line no-alert
        alert(response.error ?? 'בדיקת החוזה נכשלה');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      // eslint-disable-next-line no-alert
      alert('אירעה שגיאה בעת בדיקת החוזה');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveOrSend = () => {
    // TODO: לחבר לשמירה בבקאנד / שליחה לעו״ד
    // eslint-disable-next-line no-alert
    alert('החוזה נשמר / נשלח לעו״ד (דמו).');
  };

  const reportText = useMemo(() => {
    if (!result) return '';
    const issues = result.issues?.length ? `\n\nסיכונים/בעיות:\n- ${result.issues.join('\n- ')}` : '';
    return `דו״ח בדיקת חוזה (LexHub)\n\nסיכום:\n${result.summary}${issues}\n`;
  }, [result]);

  const handlePrint = () => {
    if (!result) return;
    const html = `
      <html lang="he" dir="rtl">
        <head>
          <meta charset="utf-8" />
          <title>דו״ח בדיקת חוזה</title>
          <style>
            body { font-family: Arial, sans-serif; direction: rtl; text-align: right; padding: 24px; }
            h1 { margin: 0 0 12px; }
            h2 { margin: 20px 0 8px; }
            pre { white-space: pre-wrap; }
          </style>
        </head>
        <body>
          <h1>דו״ח בדיקת חוזה</h1>
          <h2>סיכום</h2>
          <pre>${(result.summary ?? '').replace(/</g, '&lt;')}</pre>
          ${result.issues?.length ? `<h2>סיכונים/בעיות</h2><ul>${result.issues.map((i) => `<li>${i.replace(/</g, '&lt;')}</li>`).join('')}</ul>` : ''}
          <hr />
          <p style="color:#666;font-size:12px">הבהרה משפטית: המידע באתר הינו לצורכי מידע בלבד ואינו מהווה ייעוץ משפטי מחייב.</p>
        </body>
      </html>
    `;
    const w = window.open('', '_blank', 'noopener,noreferrer,width=900,height=700');
    if (!w) return;
    w.document.open();
    w.document.write(html);
    w.document.close();
    w.focus();
    w.print();
  };

  const handleDownload = () => {
    if (!reportText) return;
    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lexhub-contract-report.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleEmail = () => {
    if (!result) return;
    const subject = encodeURIComponent('דו״ח בדיקת חוזה – LexHub');
    const body = encodeURIComponent(reportText.slice(0, 1800));
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <PageLayout>
      <Box dir="rtl" sx={{ maxWidth: 980, mx: 'auto' }}>
        <Typography variant="h4" textAlign="center" sx={{ mb: 1 }}>
          בדיקת חוזה חכמה
        </Typography>
        <Box
          sx={{
            width: 84,
            height: 4,
            bgcolor: 'warning.main',
            borderRadius: 999,
            mx: 'auto',
            mb: 2,
          }}
        />
        <Typography variant="subtitle1" textAlign="center" color="text.secondary" sx={{ mb: 3 }}>
          העלי קובץ (PDF/TXT/DOCX) או הדביקי טקסט. ניתוח זה אינו ייעוץ משפטי מחייב.
        </Typography>

        <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, mb: 2 }}>
          <UploadContract onUpload={handleUpload} />

          {contractText && (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <SubmitCheck onCheck={handleCheck} disabled={loading} />
            </Box>
          )}

          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
              <CircularProgress aria-label="טוען ניתוח חוזה" />
            </Box>
          )}

          {!contractText && (
            <Alert severity="info" sx={{ textAlign: 'right' }}>
              כדי להתחיל, העלי קובץ או הדביקי טקסט ואז לחצי “בדיקת חוזה עם AI”.
            </Alert>
          )}
        </Paper>

        {!loading && result && (
          <>
            <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, mb: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<PrintIcon />}
                  onClick={handlePrint}
                  sx={{ borderRadius: 999 }}
                >
                  הדפס
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<DownloadIcon />}
                  onClick={handleDownload}
                  sx={{ borderRadius: 999 }}
                >
                  הורד דו״ח
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<EmailIcon />}
                  onClick={handleEmail}
                  sx={{ borderRadius: 999 }}
                >
                  שלח במייל
                </Button>
                <Button variant="contained" color="secondary" onClick={handleSaveOrSend} sx={{ borderRadius: 999 }}>
                  שמור / שלחי לעו״ד
                </Button>
              </Box>
              <Divider sx={{ my: 2 }} />
              {/* keeping existing result components to avoid breaking UI */}
              <ContractSummary summary={result.summary} />
              <ContractIssues issues={result.issues} />
            </Paper>
          </>
        )}
      </Box>
    </PageLayout>
  );
};

export default CheckContract;
