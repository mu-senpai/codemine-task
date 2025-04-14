"use client";

import { AppBar, Toolbar, Typography } from "@mui/material";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import UploadModal from "./UploadModal";

export default function Navbar() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <PhotoLibraryIcon sx={{ mr: 1 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Image Gallery
        </Typography>
        <UploadModal />
      </Toolbar>
    </AppBar>
  );
}