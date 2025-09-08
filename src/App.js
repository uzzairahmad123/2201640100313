import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, Container } from '@mui/material';
import ShortenerPage from './pages/ShortenerPage';
import AnalyticsPage from './pages/AnalyticsPage';
import RedirectPage from './pages/RedirectPage';
import NotFound from './pages/NotFound';
import { LoggerProvider } from './context/LoggerContext';
import NavBar from './components/NavBar';

export default function App() {
  return (
    <LoggerProvider>
      <CssBaseline />
      <BrowserRouter>
        <NavBar />
        <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
          <Routes>
            <Route path="/" element={<ShortenerPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            {/* keep explicit routes above, then fallback for codes */}
            <Route path="/:code" element={<RedirectPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </LoggerProvider>
  );
}
