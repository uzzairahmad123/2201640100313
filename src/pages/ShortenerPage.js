import React from 'react';
import { Stack } from '@mui/material';
import UrlForm from '../components/UrlForm';
import UrlList from '../components/UrlList';

export default function ShortenerPage() {
  return (
    <Stack spacing={3}>
      <UrlForm onCreated={() => { /* list auto refresh on mount */ }} />
      <UrlList />
    </Stack>
  );
}
