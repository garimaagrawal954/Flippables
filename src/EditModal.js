// EditModal.js
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Avatar,
  Grid,
} from "@mui/material";
import avatars from "./data/avatars";

const avatarOptions = [
  { label: "Female", value: avatars.female },
  { label: "Male 1", value: avatars.male1 },
  //   { label: "Male 2", value: avatars.male2 },
  { label: "Bald", value: avatars.bald },
];

function EditModal({ open, handleClose, user, onSave }) {
  const [form, setForm] = useState(user || {});

  useEffect(() => {
    setForm(user || {});
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAvatarChange = (avatar) => {
    setForm({ ...form, avatar });
  };

  const handleSubmit = () => {
    onSave(form);
  };
  if (!user) return null; // 🛑 Do nothing if no user provided

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{form.id ? "Edit User" : "Add New User"}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Name"
          fullWidth
          name="name"
          value={form.name || ""}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Age"
          fullWidth
          name="age"
          type="number"
          value={form.age || ""}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Profession"
          fullWidth
          name="profession"
          value={form.profession || ""}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Likes"
          fullWidth
          name="likes"
          value={form.likes || ""}
          onChange={handleChange}
        />

        <Grid container spacing={2} mt={2} justifyContent="center">
          {avatarOptions.map((opt) => (
            <Grid item key={opt.label}>
              <Avatar
                src={opt.value}
                alt={opt.label}
                sx={{
                  width: 56,
                  height: 56,
                  cursor: "pointer",
                  border:
                    form.avatar === opt.value
                      ? "3px solid #FFCA28"
                      : "2px solid transparent",
                  transition: "all 0.2s",
                }}
                onClick={() => handleAvatarChange(opt.value)}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ backgroundColor: "#FFCA28", color: "black" }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditModal;
