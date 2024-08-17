import { Box, IconButton, Skeleton, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function PostSkeleton() {
  return (
    <>
      <Stack
        sx={{
          position: "relative",
          width: "100%",
          height: { md: "300px", sm: "250px", xs: "180px" },
          border: "1px solid",
          my: 2,
          justifyContent: "flex-start",
          alignItems: "flex-start",
          overflow: "hidden",
          bgcolor: "#ededed47",
          backdropFilter: "blur(3px)",
        }}>
        <Skeleton
          sx={{ bgcolor: grey[100] }}
          variant="rectangular"
          width={"100%"}
          height={"100%"}
        />
        <Box
          className="containt"
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            zIndex: 11,
            width: "100%",
            minHeight: "150px",
            p: 1,
            bgcolor: "#95959547",
            backdropFilter: "blur(3px)",
          }}>
          <Stack
            flexDirection={"row"}
            sx={{
              justifyContent: "flex-start",
              alignItems: "center",
              gap: { xs: 0, sm: 1, md: 4 },
            }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 600, fontSize: { xs: "1rem", sm: "1.5rem" } }}
              className="title">
              <Skeleton width={100} />
            </Typography>
            <IconButton
              sx={{
                color: "rgba(255, 255, 255, 0.54)",
                fontSize: { xs: "10px", sm: "20px" },
              }}>
              <i className="bi bi-info-circle"></i>
            </IconButton>
          </Stack>
          <Typography variant="caption" sx={{ opacity: 0.6 }} color="initial">
            <Skeleton />
          </Typography>
          <Typography
            sx={{
              mt: 1,
              mb: 1,

              fontSize: { xs: "0.8rem", sm: "1rem" },
              width: "100%",
            }}
            className="description"
            variant="h5"
            color="initial">
            <Skeleton />
          </Typography>
          <Stack
            flexDirection={"row"}
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <Typography variant="caption" color="initial">
              <Skeleton width={80} />
            </Typography>
            <Typography variant="caption" color="initial">
              <Skeleton width={80} />
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </>
  );
}
