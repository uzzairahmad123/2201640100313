import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material';
import { generateCode, isValidHttpUrl, minutesFromNow, isAlphanumeric } from '../utils/urlHelpers';
import { loadUrls, saveUrls, isCodeTaken } from '../utils/storage';
import { useLogger } from '../context/LoggerContext';

const blankRow = () => ({ longUrl: '', validity: 30, code: '' });

export default function UrlForm({ onCreated }) {
  const [rows, setRows] = useState([blankRow()]);
  const { logEvent } = useLogger();

  const addRow = () => {
    if (rows.length >= 5) return;
    setRows([...rows, blankRow()]);
  };

  const update = (i, key, val) => {
    const next = rows.map((r, idx) => (idx === i ? { ...r, [key]: val } : r));
    setRows(next);
  };

  const removeRow = (i) => {
    const next = rows.filter((_, idx) => idx !== i);
    setRows(next.length ? next : [blankRow()]);
  };

  const handleCreate = () => {
    const existing = loadUrls();
    const toCreate = [];

    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      if (!isValidHttpUrl(r.longUrl)) {
        alert(`Row ${i + 1}: Invalid URL`);
        logEvent('invalid_url', { row: i + 1, value: r.longUrl });
        return;
      }
      const minutes = Number(r.validity || 30);
      let code = (r.code || '').trim();
      if (code) {
        if (!isAlphanumeric(code) || code.length < 3 || code.length > 12) {
          alert(`Row ${i + 1}: Shortcode must be 3-12 alphanumeric characters`);
          logEvent('invalid_shortcode', { row: i + 1, code });
          return;
        }
      } else {
        // generate unique
        do { code = generateCode(6); } while (isCodeTaken(code) || toCreate.some(t => t.code === code));
      }
      // uniqueness across existing and current batch
      if (isCodeTaken(code) || toCreate.some(t => t.code === code)) {
        alert(`Row ${i + 1}: Shortcode collision - choose another`);
        logEvent('shortcode_collision', { row: i + 1, code });
        return;
      }

      toCreate.push({
        code,
        longUrl: r.longUrl.trim(),
        createdAt: Date.now(),
        expiresAt: minutesFromNow(minutes),
        clicks: 0,
      });
    }

    const next = [...existing, ...toCreate];
    saveUrls(next);
    logEvent('created_urls', { count: toCreate.length, codes: toCreate.map(t => t.code) });
    onCreated?.(toCreate);
    setRows([blankRow()]);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>Shorten up to 5 URLs</Typography>
        {rows.map((r, i) => (
          <Box key={i} sx={{ mb: 2, p: 2, borderRadius: 2, border: '1px solid #eee' }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField label="Long URL" fullWidth value={r.longUrl}
                  onChange={e => update(i, 'longUrl', e.target.value)} placeholder="https://example.com/page" />
              </Grid>
              <Grid item xs={6} md={2}>
                <TextField label="Validity (min)" type="number" fullWidth value={r.validity}
                  onChange={e => update(i, 'validity', e.target.value)} />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField label="Preferred Shortcode (optional)" fullWidth value={r.code}
                  onChange={e => update(i, 'code', e.target.value)} />
              </Grid>
              <Grid item xs={12} md={1}>
                <Button variant="outlined" onClick={() => removeRow(i)}>Remove</Button>
              </Grid>
            </Grid>
          </Box>
        ))}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" onClick={handleCreate}>Generate</Button>
          <Button variant="text" disabled={rows.length >= 5} onClick={addRow}>Add Row</Button>
        </Box>
      </CardContent>
    </Card>
  );
}
