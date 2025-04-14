"use client";

import { Modal, Box } from "@mui/material";
import Image from "next/image";

type Props = {
  open: boolean;
  handleClose: () => void;
  url: string;
};

export default function ImageModal({ open, handleClose, url }: Props) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          width: "90vw",
          maxWidth: "100vh",
          aspectRatio: "4 / 3",
          position: "relative",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          border: "none"
        }}
      >
        <Image
          src={url}
          alt="Large Preview"
          fill
          style={{
            objectFit: "contain",
            borderRadius: "8px",
          }}
        />
      </Box>
    </Modal>
  );
}