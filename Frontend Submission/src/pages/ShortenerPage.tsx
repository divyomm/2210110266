import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper, Link } from '@mui/material';
import { Log } from '../utils/logger.js';
import type { UrlEntry } from '../App';
import { Link as RouterLink } from 'react-router-dom';

interface ShortenerPageProps {
  urls: UrlEntry[];
  setUrls: React.Dispatch<React.SetStateAction<UrlEntry[]>>;
}

export default function ShortenerPage({ urls, setUrls }: ShortenerPageProps) {
  const [longUrl, setLongUrl] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    Log('frontend', 'info', 'page', `User submitted URL: ${longUrl}`);

    if (!longUrl || !longUrl.startsWith('http')) {
      Log('frontend', 'error', 'page', 'Invalid URL format submitted');
      alert('Please enter a valid URL (e.g., https://google.com)');
      return;
    }

    const shortCode = Math.random().toString(36).substring(2, 8);
    const newUrlEntry: UrlEntry = {
      longUrl: longUrl,
      shortCode: shortCode,
      shortUrl: `${window.location.origin}/${shortCode}`,
      createdAt: new Date(),
      clicks: 0,
    };

    setUrls([...urls, newUrlEntry]);
    setLongUrl('');
    Log('frontend', 'info', 'page', `Successfully created short URL: ${newUrlEntry.shortUrl}`);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          URL Shortener
        </Typography>
        <Button component={RouterLink} to="/stats" variant="outlined" sx={{ mb: 2 }}>
          View Statistics
        </Button>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            fullWidth
            label="Enter Long URL"
            variant="outlined"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
          />
          <Button type="submit" variant="contained" size="large" sx={{ mt: 2 }}>
            Shorten
          </Button>
        </Box>

        {urls.length > 0 && (
          <Paper sx={{ mt: 4, p: 2 }}>
            <Typography variant="h6">Your Links:</Typography>
            {urls.map((url, index) => (
              <Box key={index} sx={{ mt: 2, p: 2, border: '1px solid #ddd', borderRadius: '4px', textAlign: 'left' }}>
                <Typography variant="body1">
                  <strong>Original:</strong> {url.longUrl}
                </Typography>
                <Typography variant="body1">
                  <strong>Short:</strong> <Link href={url.shortUrl} target="_blank" rel="noopener noreferrer">{url.shortUrl}</Link>
                </Typography>
              </Box>
            ))}
          </Paper>
        )}
      </Box>
    </Container>
  );
}