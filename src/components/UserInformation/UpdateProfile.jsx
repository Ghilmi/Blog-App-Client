/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";
import { handelName, handelPassword } from "../../helpers/handellForm";
import { useState } from "react";
import { updateProfile } from "../../redux/apis/userCallApi";
import { useDispatch } from "react-redux";
import UpdateUserButton from "./UpdateUserButton";

export default function UpdateProfile({ userId, token, user }) {
  const [passwordValid, setPasswordValid] = useState(true);
  const [nameValid, setNameValid] = useState(true);
  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(user?.status || "");
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const validPassword = () => {
    if (password) {
      setPasswordValid(handelPassword(password));
    } else {
      setPasswordValid(true);
    }
  };

  const ValideName = () => {
    if (name) {
      setNameValid(handelName(name));
    } else {
      setNameValid(true);
    }
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    if (passwordValid && nameValid) {
      console.log({ name, password, status });
      updateProfile(
        userId,
        name,
        password,
        status,
        `Bearer ${token}`,
        dispatch
      );
    } else {
      dispatch({
        type: "user/setMessage",
        payload: {
          inLoading: false,
          error: true,
        },
      });
    }
    handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <UpdateUserButton handleClickOpen={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (e) => handleUpdate(e),
        }}>
        <Typography variant="h4" sx={{ textAlign: "center", my: 2 }}>
          Update Your Profile
        </Typography>
        <DialogContent>
          <FormControl variant="standard" sx={{ width: "100%" }}>
            <InputLabel htmlFor="name">
              {nameValid
                ? "Your Name"
                : "Invalid Name ,most be more than 3 characters"}
            </InputLabel>
            <Input
              error={!nameValid}
              value={name}
              onChange={(e) => {
                ValideName(e);
                setName(e.target.value);
              }}
              type="name"
              name="name"
              id="name"
              fullWidth
              placeholder="Enter New name"
              startAdornment={
                <InputAdornment position="start">
                  <i className="bi bi-pencil-square" />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl variant="standard" sx={{ width: "100%" }}>
            <InputLabel htmlFor="status">{"Your status"}</InputLabel>
            <Input
              onChange={(e) => setStatus(e.target.value)}
              value={status}
              type="text"
              name="status"
              id="status"
              fullWidth
              placeholder="Enter New status"
              startAdornment={
                <InputAdornment position="start">
                  <i className="bi bi-pencil-square" />
                </InputAdornment>
              }
            />
          </FormControl>

          <FormControl sx={{ width: "100%" }} variant="standard">
            <InputLabel htmlFor="password">
              {passwordValid
                ? "Your Password"
                : "Invalid Password, minimum 8 characters"}
            </InputLabel>
            <Input
              fullWidth
              type="password"
              placeholder="Enter New Password"
              id="password"
              onChange={(e) => {
                validPassword(e);
                setPassword(e.target.value);
              }}
              error={!passwordValid}
              name="password"
              startAdornment={
                <InputAdornment position="start">
                  <i className="bi bi-lock-fill" />
                </InputAdornment>
              }
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
