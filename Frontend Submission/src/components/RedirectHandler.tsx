import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { UrlEntry } from '../App';
import { Log } from '../utils/logger.js';

interface RedirectHandlerProps {
  urls: UrlEntry[];
  setUrls: React.Dispatch<React.SetStateAction<UrlEntry[]>>;
}

export default function RedirectHandler({ urls, setUrls }: RedirectHandlerProps) {
  const { shortCode } = useParams<{ shortCode: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const urlEntryIndex = urls.findIndex(url => url.shortCode === shortCode);

    if (urlEntryIndex !== -1) {
      const urlEntry = urls[urlEntryIndex];
      Log('frontend', 'info', 'redirect', `Redirecting ${shortCode} to ${urlEntry.longUrl}`);

      const updatedUrls = [...urls];
      updatedUrls[urlEntryIndex] = {
        ...urlEntry,
        clicks: urlEntry.clicks + 1,
      };
      setUrls(updatedUrls);
      
      window.location.replace(urlEntry.longUrl);
    } else {
      Log('frontend', 'error', 'redirect', `Short code not found: ${shortCode}`);
      navigate('/not-found');
    }
  }, [shortCode, urls, navigate, setUrls]);

  return null;
}