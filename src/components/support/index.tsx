'use client';

import { useEffect } from 'react';
import { Box, Typography, Container } from "@mui/material";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";

export default function Support() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.hsforms.net/forms/embed/9311119.js';
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      {/* Icon and Heading Section */}
      <Box display="flex" flexDirection="column" alignItems="center" mb={5}>
        <HeadsetMicIcon
          sx={{
            fontSize: 80,
            color: "#FFCC00",
          }}
        />
        <Typography variant="h4" fontWeight="medium" sx={{ mt: 2, textAlign: "center" }}>
          How can we help you?
        </Typography>
      </Box>

      <Box id="hubspotForm">
        <div
          className="hs-form-frame"
          data-region="na1"
          data-form-id="0e179218-eef1-45a3-8108-b83b6239581f"
          data-portal-id="9311119"
        ></div>
      </Box>
    </Container>
  );
}
