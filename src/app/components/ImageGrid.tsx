"use client";

import { useState, useEffect } from "react";
import { Box, Pagination, Typography, TextField } from "@mui/material";
import ImageCard from "./ImageCard";
import ImageModal from "./ImageModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchImages } from "@/store/imageSlice";

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

  const filteredImages = images.filter((img) =>
    img.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    img.tags?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box className="relative min-h-screen pb-12">
      <div className="mb-4 sm:mb-6 lg:mb-8">
        <TextField
          fullWidth
          label="Search by title or tags"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <Typography textAlign="center" mt={10}>
          Loading...
        </Typography>
      ) : filteredImages.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredImages.map((img) => (
            <ImageCard
              key={img.id}
              url={img.url}
              title={img.title}
              page={page}
              img={img}
              onClick={() => setSelectedImage(img.url)}
            />
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