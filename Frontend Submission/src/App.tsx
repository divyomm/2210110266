import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ShortenerPage from './pages/ShortenerPage';
import StatsPage from './pages/StatsPage';
import RedirectHandler from './components/RedirectHandler';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export interface UrlEntry {
  longUrl: string;
  shortCode: string;
  shortUrl: string;
  createdAt: Date;
  clicks: number;
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [urls, setUrls] = useState<UrlEntry[]>([]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route 
          path="/" 
          element={<ShortenerPage urls={urls} setUrls={setUrls} />} 
        />
        <Route path="/stats" element={<StatsPage urls={urls} />} />
        
        <Route path="/:shortCode" element={<RedirectHandler urls={urls} setUrls={setUrls} />} />
        
        <Route path="/not-found" element={<h1>404 - URL Not Found</h1>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
