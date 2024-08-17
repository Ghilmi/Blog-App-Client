import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Tooltip,
  Skeleton,
} from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/apis/categoryCallApi";
import { selectCategories } from "../../store/seloctors/slectCategories";
import { blue, grey } from "@mui/material/colors";
import { fetchPostsOnsearch } from "../../redux/apis/searchApi";
import { searchActions } from "../../redux/slices/sliceSearch";
import { selectPostsOnSearch } from "../../store/seloctors/selectPostOnSearch";
import { useNavigate } from "react-router-dom";
import PostSearchSkeleton from "../Skeletons/PostSearchSkeleton";

export default function Search() {
  const naveTo = useNavigate();
  const dispatch = useDispatch();
  //selec posts:start
  const postsOfSearch = useSelector(selectPostsOnSearch);
  //:end
  //fetch data :start
  //...categories :start
  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(getCategories());
  }, []);
  useEffect(() => {
    console.log(postsOfSearch);
  }, [postsOfSearch]);
  const [categoriesRequist, setCategoriesRequist] = useState(null);
  useEffect(() => {
    setCategoriesRequist(categories?.map((item) => item.title)?.join(","));
    return () => {
      setCategoriesRequist(null);
    };
  }, [categories]);

  //...:end
  //allingment:start
  const [alignment, setAlignment] = useState("createdAt");
  //:end
  //search bar:start
  const [serchbarValue, setSerchbarValue] = useState("");
  //:end
  //search button:start
  const [searchButton, setSearchButton] = useState(false);
  //:end
  useEffect(() => {
    setSearchButton(false);
    dispatch(fetchPostsOnsearch(serchbarValue, alignment, categoriesRequist));

    return () => {
      dispatch(searchActions.resetState());
      setSearchButton(false);
    };
  }, [categoriesRequist, alignment, serchbarValue, searchButton]);

  //:end

  //stats :start

  const [checked, setChecked] = useState(
    new Array(categories ? categories?.length : 10).fill(true)
  );

  //:end

  //togle buttons

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };
  //check box
  const handleChangecCheckBox = (event, index, title) => {
    const temp = checked.map((item, order) => {
      if (index === order) {
        return !item;
      } else {
        return item;
      }
    });
    if (event.target.checked) {
      setCategoriesRequist((prev) => prev + `,${title}`);
    } else {
      setCategoriesRequist((prev) => {
        let temp = prev?.split(",");
        const indexOfArry = temp.indexOf(title);
        if (indexOfArry !== -1) {
          temp.splice(index, 1);
          temp = temp.join(",");
        } else {
          console.log("error '-1'");
        }
        return temp;
      });
    }
    setChecked(temp);
  };
  const handelChangeAll = (event) => {
    setChecked(
      new Array(categories ? categories?.length : 10).fill(event.target.checked)
    );
    if (event.target.checked) {
      setCategoriesRequist(categories?.map((item) => item.title)?.join(","));
    } else {
      setCategoriesRequist("");
    }
  };

  //function to handel search bar:start
  const handelSearchbar = (event) => {
    console.log({ targetvalue: event.target.value });
    setSerchbarValue(event.target.value);
  };
  //:end
  return (
    <Box
      sx={{
        minHeight: "95vh",
        mb: 3,
      }}>
      <Grid container spacing={2}>
        <Grid item xs={8} sm={9}>
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Stack
              sx={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                width: "100%",
                gap: 0.1,
                mt: 2,
                ml: 2,
              }}>
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                  width: "100%",
                }}>
                <IconButton
                  sx={{
                    width: { xs: "20px", sm: "30px", md: "40px" },
                    height: { xs: "20px", sm: "30px", md: "40px" },
                    bgcolor: blue[200],
                    border: "1px solid " + blue[400],
                    "& i": {
                      color: grey[300],
                      fontSize: { xs: "9px", sm: "16px", md: "20px" },
                      "&:hover": {
                        color: blue[900],
                      },
                    },
                  }}
                  onClick={() => setSearchButton(true)}>
                  <i className="bi bi-search"></i>
                </IconButton>
                <TextField
                  fullWidth={true}
                  onChange={handelSearchbar}
                  sx={{
                    width: "100%",
                  }}
                  label="Search on..."
                  autoComplete={"on"}
                  autoFocus={true}
                  size="small"
                />
              </Stack>
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "nowrap",
                  gap: 1,
                  mt: 1,
                  "& span": {
                    opacity: 0.6,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "nowrap",
                  },
                  ml: 2,
                }}
                className="orderbox">
                <span>
                  <i className="bi bi-arrow-down-up"></i>:
                </span>
                <ToggleButtonGroup
                  color="primary"
                  value={alignment}
                  exclusive
                  onChange={handleChange}
                  aria-label="Platform"
                  sx={{
                    fontSize: {
                      xs: "0.4rem",
                      sm: "0.8rem",
                      md: "1rem",
                    },
                    "& button": {
                      fontSize: "inherit",
                      p: { xs: "5px", sm: "8px" },
                    },
                  }}>
                  <ToggleButton value="likes">Popular</ToggleButton>
                  <ToggleButton defaultChecked={true} value="createdAt">
                    New
                  </ToggleButton>
                  <ToggleButton value="title">Title</ToggleButton>
                </ToggleButtonGroup>
              </Stack>
            </Stack>

            <ImageList
              sx={{
                mt: 3,
                p: 1,
              }}>
              {postsOfSearch
                ? postsOfSearch?.map((item, index) => (
                    <ImageListItem
                      sx={{
                        overflow: "hidden",
                        height: {
                          xs: "70px !important",
                          sm: "160px !important",
                          md: "200px !important",
                        },
                      }}
                      key={index}>
                      <img
                        style={{
                          border: "1px solid",
                          objectPosition: "center",
                        }}
                        srcSet={`${item?.image.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        src={item?.image.url}
                        alt={item?.description}
                        loading="lazy"
                      />
                      <ImageListItemBar
                        sx={{
                          "& .MuiImageListItemBar-title": {
                            fontSize: { xs: "8px", sm: "18px" },
                          },
                          "& .MuiImageListItemBar-subtitle": {
                            fontSize: { xs: "6px", sm: "12px" },
                          },
                        }}
                        title={item?.title}
                        subtitle={`@ ${item?.user.name}`}
                        actionIcon={
                          <Tooltip title="Red More...">
                            <IconButton
                              onClick={() => {
                                naveTo(`/post/details/${item?._id}`);
                              }}
                              sx={{
                                color: "rgba(255, 255, 255, 0.54)",
                                fontSize: { xs: "10px", sm: "20px" },
                              }}
                              aria-label={`info about ${item?.title}`}>
                              <i className="bi bi-info-circle"></i>
                            </IconButton>
                          </Tooltip>
                        }
                      />
                    </ImageListItem>
                  ))
                : [1, 2, 3, 4, 5].map((item, index) => (
                    <PostSearchSkeleton key={index} />
                  ))}
            </ImageList>
          </Stack>
        </Grid>
        <Grid item xs={4} sm={3}>
          <Paper
            sx={{
              mt: 2,
              mr: 1,
              p: 0.5,
              "&  .MuiFormControlLabel-label": {
                fontSize: { xs: "0.6rem", sm: "1rem" },
              },
            }}>
            <FormControlLabel
              label="All"
              control={
                <Checkbox
                  checked={JSON.stringify(checked) === JSON.stringify(checked)}
                  indeterminate={
                    JSON.stringify(checked) !== JSON.stringify(checked)
                  }
                  onChange={handelChangeAll}
                  disabled={categories ? false : true}
                />
              }
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                m: { xs: 0, sm: 1 },
                ml: { xs: 1, sm: 2 },
              }}>
              {categories
                ? categories?.map((item, index) => {
                    return (
                      <FormControlLabel
                        sx={{
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textTransform: "unset",
                          p: 0,
                        }}
                        key={item?._id || index}
                        label={item && item?.title}
                        control={
                          <Checkbox
                            value={index}
                            name={item && item?.title}
                            checked={checked[index]}
                            onChange={(event) =>
                              handleChangecCheckBox(event, index, item?.title)
                            }
                          />
                        }
                      />
                    );
                  })
                : [1, 2, 3, 4, 5]?.map((item, index) => {
                    return (
                      <FormControlLabel
                        sx={{
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textTransform: "unset",
                          p: 0,
                        }}
                        key={item?._id || index}
                        label={<Skeleton width={100} />}
                        control={
                          <Checkbox
                            value={index}
                            defaultChecked={true}
                            disabled
                          />
                        }
                      />
                    );
                  })}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
