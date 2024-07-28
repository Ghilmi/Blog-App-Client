/* eslint-disable react/prop-types */
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

export default function CreateForme({
  title,
  description,
  category,
  setCategory,
  setTitle,
  setDescription,
  categories = [],
}) {
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };
  return (
    <>
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        id="title"
        required
        label="Title"
        variant="outlined"
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">category</InputLabel>
        <Select
          labelId="demo-simple-select-label-category"
          id="demo-simple-select-category"
          value={category}
          label="category"
          onChange={handleChangeCategory}>
          {categories?.map((item) => (
            <MenuItem key={item._id} value={item.title}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        id="description"
        label="Description"
        multiline
        rows={6}
        defaultValue="Talk about your post"
      />
    </>
  );
}
