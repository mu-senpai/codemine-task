"use client";

import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  CircularProgress,
  TextField,
} from "@mui/material";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { supabase } from "@/utils/supabaseClient";
import { v4 as uuidv4 } from "uuid";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { fetchImages } from "@/store/imageSlice";
import { AppDispatch } from "@/store/store";

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

export default function UploadModal() {
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const handleOpen = () => {
    setOpen(true);
    setUploadSuccess(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!title) {
      alert("Please enter image title before uploading.");
      return;
    }

    setUploading(true);

    for (const file of acceptedFiles) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${uuidv4()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(fileName, file);

      if (uploadError) {
        console.error("Upload Error:", uploadError.message);
        continue;
      }

      const { data } = supabase.storage
        .from("images")
        .getPublicUrl(fileName);

      const publicUrl = data.publicUrl;

      const { error: insertError } = await supabase.from("images").insert([
        {
          title,
          url: publicUrl,
          tags,
        },
      ]);

      if (insertError) {
        console.error("DB Insert Error:", insertError.message);
        continue;
      }
    }

    setTitle("");
    setTags("");
    setUploading(false);
    setUploadSuccess(true);
    dispatch(fetchImages(1));

    setTimeout(() => {
      setUploadSuccess(false);
    }, 3000);
  }, [title, tags, dispatch]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="info"
        startIcon={<AddPhotoAlternateIcon />}
      >
        Upload
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <TextField
            fullWidth
            label="Image Title"
            sx={{ mb: 2 }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            fullWidth
            label="Tags (comma separated)"
            sx={{ mb: 2 }}
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          <Box
            {...getRootProps()}
            sx={{ border: "2px dashed #888", p: 3, cursor: "pointer" }}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <Typography>Drop the files here...</Typography>
            ) : (
              <Typography>
                Drag & drop images here, or click to select
              </Typography>
            )}
          </Box>

          {uploading && <CircularProgress sx={{ mt: 2 }} />}
          {uploadSuccess && (
            <Typography color="green" sx={{ mt: 2 }}>
              Upload Successful ✅
            </Typography>
          )}

          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: 3, right: 3 }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Modal>
    </>
  );
}