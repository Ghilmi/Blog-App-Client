import { Box, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { blue, grey } from "@mui/material/colors";
import CreateForme from "../../components/CreateForme/CreateForme";
import CreatePostButton from "../../components/Details/CreatePostButton";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/apis/categoryCallApi";
import { selectCategories } from "../../store/seloctors/slectCategories";
import { selectUserFromAuth } from "../../store/seloctors/selectUserFromAuth";
import { useNavigate } from "react-router-dom";
import imgIcon from "../../../public/images/img-icon.jpg";
export default function Create() {
  const [image, setImage] = useState({ url: null, file: null });
  //inputs statuts
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  const categories = useSelector(selectCategories);
  const user = useSelector(selectUserFromAuth);
  const naveTo = useNavigate();
  useEffect(() => {
    if (!user) naveTo("/");
  }, [user]);
  const handelChangeImage = (event) => {
    if (!event.target.files[0]) return 0;
    const url = URL.createObjectURL(event.target.files[0]);
    setImage({ url, file: event.target.files[0] });
  };
  return (
    <Box>
      <Container
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          my: 5,
        }}>
        <Typography
          variant="h2"
          sx={{ textAlign: "center", marginTop: "50px" }}>
          Create New Post
        </Typography>
        <CreateForme
          categories={categories}
          title={title}
          description={description}
          category={category}
          setCategory={setCategory}
          setTitle={setTitle}
          setDescription={setDescription}
        />
        <Stack
          sx={{
            "& input": { display: "none" },
            "& label": {
              bgcolor: blue[700],
              borderRadius: 2,
              p: 1,
              color: "#eee",
              cursor: "pointer",
            },
            "&:hover label": { bgcolor: blue[800] },
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: 1,
            "& .containerImage": {
              transition: "all 0.5s",
              border: "1px solid #000",
              width: "100px",
              height: "100px",
              backgroundImage: `url(${imgIcon})`,
              backgroundColor: "#fff",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            },
            "& img": {
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              opacity: image.url ? 1 : 0,
              transition: "all 0.5s",
            },
          }}>
          <Stack>
            <label htmlFor="contained-button-file">
              <i className="bi bi-upload" />{" "}
              {!image.url ? "Choose Image" : "Replace"}
            </label>
            <Typography variant="caption" color={grey[300]}>
              Please chose picture , only type image, max size 3mb..
            </Typography>
          </Stack>
          <input
            onChange={handelChangeImage}
            accept="image/*"
            id="contained-button-file"
            type="file"
          />
          <div className="containerImage">
            <img src={image.url} />
          </div>
        </Stack>
        <CreatePostButton
          image={image.file ? image.file : null}
          title={title.length > 0 && title}
          description={description.length > 0 && description}
          category={category.length > 0 && category}
        />
      </Container>
    </Box>
  );
}
