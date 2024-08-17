import { Skeleton, Stack, Typography } from "@mui/material";
import { grey, red } from "@mui/material/colors";
import { getCategories } from "../../redux/apis/categoryCallApi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectCategories } from "../../store/seloctors/slectCategories";
import { useNavigate } from "react-router-dom";
export default function CategoriesMenu() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  const categories = useSelector(selectCategories);
  const naveTo = useNavigate();
  return (
    <>
      <Stack
        className="Categories_Menu"
        sx={{
          "& li": {
            cursor: "pointer",
            mb: 2,
            bgcolor: grey[500],
            fontWeight: 500,
            fontSize: "1.2rem",
            p: 1,
            position: "relative",
            borderRadius: "3px",
            zIndex: 9,
            clipPath: "polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%)",
            pr: 4,
            transition: "all 0.3s ease",
            textOverflow: "ellipsis",
            witheSpace: "nowrap",
            "&:hover": {
              bgcolor: red[700],
            },

            "&::after": {
              content: "''",
              display: "inline-block",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              position: "absolute",
              top: "50%",
              right: "48px",
              transform: "translateY(-50%)",
              bgcolor: "#eee",
              zIndex: 1,
            },
          },
          "& ul": { width: "100%", px: 4 },
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#eee",
          px: 3,
          py: 1,
          height: "max-content",
          width: "100%",
        }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            borderBottom: "1px solid black",
            borderTop: "1px solid black",
            fontWeight: 600,
            mb: 3,
          }}>
          Ctaegories
        </Typography>
        <ul>
          {categories
            ? categories?.map((category) => (
                <li
                  onClick={() => naveTo(`category/${category?.title}`)}
                  key={category?._id}>
                  {category?.title}
                </li>
              ))
            : arrayCategorySkeleton.map((item, index) => (
                <li key={index}>
                  <Skeleton width={80} height={20} />
                </li>
              ))}
        </ul>
      </Stack>
    </>
  );
}
const arrayCategorySkeleton = new Array(5).fill("");
