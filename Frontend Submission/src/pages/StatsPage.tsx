import { Container, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow, Box, Button } from '@mui/material';
import type { UrlEntry } from '../App';
import { Link as RouterLink } from 'react-router-dom';

interface StatsPageProps {
  urls: UrlEntry[];
}

export default function StatsPage({ urls }: StatsPageProps) {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Statistics
        </Typography>
        <Button component={RouterLink} to="/" variant="outlined" sx={{ mb: 2 }}>
          Back to Shortener
        </Button>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Original URL</TableCell>
                <TableCell>Short URL</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell align="right">Clicks</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {urls.map((url) => (
                <TableRow key={url.shortCode}>
                  <TableCell sx={{ wordBreak: 'break-all' }}>{url.longUrl}</TableCell>
                  <TableCell>{url.shortUrl}</TableCell>
                  <TableCell>{url.createdAt.toLocaleString()}</TableCell>
                  <TableCell align="right">{url.clicks}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </Container>
  );
}