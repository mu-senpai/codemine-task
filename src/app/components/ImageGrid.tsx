"use client";

import { useState, useEffect } from "react";
import { Box, Pagination, Typography, IconButton, TextField } from "@mui/material";
import ImageCard from "./ImageCard";
import ImageModal from "./ImageModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchImages } from "@/store/imageSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { supabase } from "@/utils/supabaseClient";

export default function ImageGrid() {
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const images = useSelector((state: RootState) => state.images.data);
  const loading = useSelector((state: RootState) => state.images.loading);

  useEffect(() => {
    dispatch(fetchImages(page));
  }, [page, dispatch]);

  const handleDelete = async (id: string, url: string) => {
    await supabase.from("images").delete().eq("id", id);

    const path = url.split("/storage/v1/object/public/")[1];
    await supabase.storage.from("images").remove([path]);

    dispatch(fetchImages(page));
  };

  const filteredImages = images.filter((img) =>
    img.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    img.tags?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box className="relative min-h-screen pb-6">
      <TextField
        fullWidth
        label="Search by title or tags"
        sx={{ mb: 3 }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading ? (
        <Typography textAlign="center" mt={10}>
          Loading...
        </Typography>
      ) : filteredImages.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredImages.map((img) => (
            <div key={img.id} className="relative group">
              <ImageCard
                url={img.url}
                title={img.title}
                onClick={() => setSelectedImage(img.url)}
              />
              <IconButton
                onClick={() => handleDelete(img.id, img.url)}
                className="absolute bottom-8 left-1 bg-black/50 text-white opacity-50 group-hover:opacity-100 transition"
                size="small"
              >
                <DeleteIcon fontSize="small" className="text-white" />
              </IconButton>
            </div>
          ))}
        </div>
      ) : (
        <Typography textAlign="center" mt={10}>
          No images found
        </Typography>
      )}

      <Box display="flex" justifyContent="center" className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <Pagination
          count={Math.ceil(images.length / 12)}
          page={page}
          onChange={(e, val) => setPage(val)}
        />
      </Box>

      <ImageModal
        open={Boolean(selectedImage)}
        handleClose={() => setSelectedImage(null)}
        url={selectedImage || ""}
      />
    </Box>
  );
}