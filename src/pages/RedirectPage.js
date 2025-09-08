import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadUrls, saveUrls } from '../utils/storage';
import { CircularProgress, Stack, Typography } from '@mui/material';
import { useLogger } from '../context/LoggerContext';

export default function RedirectPage() {
  const { code } = useParams();
  const navigate = useNavigate();
  const { logEvent } = useLogger();

  useEffect(() => {
    const items = loadUrls();
    const idx = items.findIndex(i => i.code === code);
    if (idx === -1) {
      logEvent('redirect_not_found', { code });
      navigate('/', { replace: true });
      return;
    }
    const it = items[idx];
    if (Date.now() > it.expiresAt) {
      logEvent('redirect_expired', { code });
      navigate('/', { replace: true });
      return;
    }
    it.clicks = (it.clicks || 0) + 1;
    items[idx] = it;
    saveUrls(items);
    logEvent('redirect_success', { code, to: it.longUrl });
    window.location.replace(it.longUrl);
  }, [code, navigate, logEvent]);

  return (
    <Stack alignItems="center" spacing={2}>
      <CircularProgress />
      <Typography>Redirecting…</Typography>
    </Stack>
  );
}
