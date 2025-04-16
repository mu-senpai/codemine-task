"use client";

import { useDispatch } from "react-redux";
import { fetchImages } from "@/store/imageSlice";
import { AppDispatch } from "@/store/store";
import { supabase } from "@/utils/supabaseClient";
import { Card, CardMedia, IconButton, Dialog, DialogActions, DialogTitle, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

export type ImageCardProps = {
  url: string;
  title: string;
  page: number;
  img: {
    id: string;
    url: string;
  };
  onClick: () => void;
};

export default function ImageCard({ url, title, onClick, page, img }: ImageCardProps) {

  const dispatch = useDispatch<AppDispatch>();
  const [delOpen, setDelOpen] = useState(false);

  const handleDelete = async (id: string, url: string) => {
    await supabase.from("images").delete().eq("id", id);

    const path = url.split("/storage/v1/object/public/")[1];
    await supabase.storage.from("images").remove([path]);

    dispatch(fetchImages(page));
  };

  const handleClose = () => setDelOpen(false);

  return (
    <div className="relative group">
      {/* Image Card */}
      <Card
        onClick={onClick}
        sx={{
          width: "100%",
          height: "300px",
          cursor: "pointer",
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          image={url}
          alt={title}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Card>

      {/* Delete Icon */}
      <IconButton
        onClick={() => setDelOpen(true)}
        className="absolute bottom-8 left-1 bg-black/50 text-white opacity-50 group-hover:opacity-100 transition"
        size="small"
      >
        <DeleteIcon fontSize="small" className="text-white" />
      </IconButton>
      
      {/* Dialog for delete confirmation */}
      <Dialog open={delOpen}>
        <DialogTitle>Are you sure you want to delete?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleDelete(img.id, img.url)} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}