"use client";

import { Card, CardMedia } from "@mui/material";

export type ImageCardProps = {
  url: string;
  title: string;
  onClick: () => void;
};

export default function ImageCard({ url, title, onClick }: ImageCardProps) {
  return (
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
  );
}