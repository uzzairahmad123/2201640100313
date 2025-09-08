import React, { useMemo } from 'react';
import { loadUrls } from '../utils/storage';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableHead, TableRow, Stack, Chip } from '@mui/material';

export default function AnalyticsPage() {
  const items = loadUrls();
  const totals = useMemo(() => ({
    totalLinks: items.length,
    totalClicks: items.reduce((s, i) => s + (i.clicks || 0), 0),
    expired: items.filter(i => Date.now() > i.expiresAt).length,
    active: items.filter(i => Date.now() <= i.expiresAt).length,
  }), [items]);

  return (
    <Stack spacing={3}>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Overview</Typography>
          <Stack direction="row" spacing={2}>
            <Chip label={`Total Links: ${totals.totalLinks}`} />
            <Chip label={`Total Clicks: ${totals.totalClicks}`} />
            <Chip label={`Active: ${totals.active}`} color="success" />
            <Chip label={`Expired: ${totals.expired}`} />
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>Per-Link Stats</Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Shortcode</TableCell>
                <TableCell>Short URL</TableCell>
                <TableCell>Clicks</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Expires</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map(it => (
                <TableRow key={it.code}>
                  <TableCell>{it.code}</TableCell>
                  <TableCell>{window.location.origin}/{it.code}</TableCell>
                  <TableCell>{it.clicks}</TableCell>
                  <TableCell>{new Date(it.createdAt).toLocaleString()}</TableCell>
                  <TableCell>{new Date(it.expiresAt).toLocaleString()}</TableCell>
                  <TableCell>{Date.now() > it.expiresAt ? 'Expired' : 'Active'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Stack>
  );
}
