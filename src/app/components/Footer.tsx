"use client"

import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: "auto",
        textAlign: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Image Gallery. All rights reserved.
      </Typography>
    </Box>
  );
}