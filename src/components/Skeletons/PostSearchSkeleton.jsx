import {
  IconButton,
  ImageListItem,
  ImageListItemBar,
  Skeleton,
} from "@mui/material";

export default function PostSearchSkeleton() {
  return (
    <>
      <ImageListItem
        sx={{
          overflow: "hidden",
          height: {
            xs: "70px !important",
            sm: "160px !important",
            md: "200px !important",
          },
        }}>
        <Skeleton sx={{ width: "500px" }} height={"100%"} />
        <ImageListItemBar
          sx={{
            "& .MuiImageListItemBar-title": {
              fontSize: { xs: "8px", sm: "18px" },
            },
            "& .MuiImageListItemBar-subtitle": {
              fontSize: { xs: "6px", sm: "12px" },
            },
          }}
          title={<Skeleton />}
          subtitle={<Skeleton />}
          actionIcon={
            <IconButton
              sx={{
                color: "rgba(255, 255, 255, 0.54)",
                fontSize: { xs: "10px", sm: "20px" },
              }}>
              <i className="bi bi-info-circle"></i>
            </IconButton>
          }
        />
      </ImageListItem>
    </>
  );
}
