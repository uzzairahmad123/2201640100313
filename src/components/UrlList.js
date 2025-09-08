import React, { useEffect, useState } from 'react';
import { loadUrls, saveUrls } from '../utils/storage';
import { Card, CardContent, Typography, IconButton, Stack, Chip, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import { useLogger } from '../context/LoggerContext';

export default function UrlList() {
  const [items, setItems] = useState([]);
  const { logEvent } = useLogger();

  const refresh = () => setItems(loadUrls());

  useEffect(() => { refresh(); }, []);

  const copy = (txt) => {
    navigator.clipboard.writeText(txt);
    logEvent('copied', { value: txt });
  };

  const remove = (code) => {
    const next = items.filter(i => i.code !== code);
    saveUrls(next);
    setItems(next);
    logEvent('deleted', { code });
  };

  const isExpired = (it) => Date.now() > it.expiresAt;

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Your Short Links</Typography>
        {items.length === 0 && <Typography color="text.secondary">No links yet.</Typography>}
        <Stack spacing={2}>
          {items.map(it => {
            const shortUrl = `${window.location.origin}/${it.code}`;
            return (
              <Card key={it.code} variant="outlined">
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                    <Stack spacing={1}>
                      <Typography variant="subtitle1">{shortUrl}</Typography>
                      <Typography variant="body2" color="text.secondary">→ {it.longUrl}</Typography>
                      <Stack direction="row" spacing={1}>
                        <Chip label={`Clicks: ${it.clicks}`} />
                        <Chip label={isExpired(it) ? 'Expired' : 'Active'} color={isExpired(it) ? 'default' : 'success'} />
                        <Chip label={`Expires: ${new Date(it.expiresAt).toLocaleString()}`} />
                      </Stack>
                    </Stack>
                    <Stack direction="row" spacing={1}>
                      <Tooltip title="Copy short URL">
                        <IconButton onClick={() => copy(shortUrl)}><ContentCopyIcon /></IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => remove(it.code)}><DeleteIcon /></IconButton>
                      </Tooltip>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
}
