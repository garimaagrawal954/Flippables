import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  CssBaseline,
  IconButton,
  createTheme,
  ThemeProvider,
  DialogActions,
  DialogContent,
  Dialog,
  DialogTitle,
  DialogContentText,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import UserCard from "./UserCard";
import EditModal from "./EditModal";
import avatars from "./data/avatars";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "./Footer";
import { useSnackbar } from "notistack";

const initialUsers = [
  {
    id: 1,
    name: "Jenny Doe",
    age: 28,
    profession: "Teacher",
    avatar: avatars.female,
    likes: "painting, cats, and chocolate 🍫",
  },
  {
    id: 2,
    name: "John Doe",
    age: 32,
    profession: "Doctor",
    avatar: avatars.male1,
    likes: "Fishing, cats, and hiking 🐟",
  },
  {
    id: 3,
    name: "Josh Doe",
    age: 45,
    profession: "Engineer",
    avatar: avatars.bald,
    likes: "Swimming, Dogs, and reading 📚",
  },
  {
    id: 4,
    name: "Sam Anderson",
    age: 45,
    profession: "Developer",
    avatar: avatars.male1,
    likes: "Coding, Gaming, and Music 🎮",
  },
];

function App() {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    AOS.init({ duration: 800, offset: 100, once: true, easing: "ease-in-out" });
  }, []);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const handleEdit = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleSave = (updatedUser) => {
    if (updatedUser.id) {
      setUsers(
        users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
      enqueueSnackbar("User Updated", { variant: "info" }); // show toast
    } else {
      const newUser = {
        ...updatedUser,
        id: Date.now(),
      };
      setUsers([...users, newUser]);
      enqueueSnackbar("User Added", { variant: "success" }); // show toast
    }
    setOpen(false);
    setSelectedUser(null);
  };

  const handleAddUser = () => {
    setSelectedUser({
      name: "",
      age: "",
      profession: "",
      avatar: avatars.female,
    });
    setOpen(true);
  };
  const filteredUsers = users.filter((user) =>
    user.profession.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const confirmDeleteUser = (id) => {
    const user = users.find((u) => u.id === id);
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    setUsers(users.filter((user) => user.id !== userToDelete.id));
    setDeleteDialogOpen(false);
    setUserToDelete(null);
    enqueueSnackbar("User deleted", { variant: "warning" }); // show toast
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete{" "}
            <strong>{userToDelete?.name}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <CssBaseline />
      <Box
        sx={{
          fontFamily: "Fredoka, sans-serif",
          background: darkMode
            ? "linear-gradient(135deg, #333, #444)"
            : "linear-gradient(135deg, #FFEB3B, #FFF176), radial-gradient(#FFF9C4 1px, transparent 1px), radial-gradient(#FFF59D 1px, transparent 1px)",
          backgroundBlendMode: darkMode ? "normal" : "overlay",
          backgroundSize: darkMode ? "auto" : "20px 20px, 20px 20px",
          backgroundPosition: "0 0, 10px 10px",
          minHeight: "100vh",
          py: 5,
        }}
      >
        <Container>
          <Box
            component="header"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
            gap={2}
            mb={4}
            px={2}
            py={2}
            sx={{
              backgroundColor: darkMode ? "#1e1e1e" : "#fafafa",
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Typography
              variant="h4"
              fontWeight="700"
              sx={{
                color: darkMode ? "#fff" : "#333",
                fontFamily: "Fredoka, sans-serif",
                flexGrow: 1,
              }}
            >
              👥 User Cards Directory
            </Typography>

            <Box
              component="input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by profession..."
              sx={{
                flex: 1,
                minWidth: "200px",
                maxWidth: "300px",
                px: 2,
                py: 1,
                borderRadius: 2,
                border: "1px solid",
                borderColor: darkMode ? "#555" : "#ccc",
                backgroundColor: darkMode ? "#2c2c2c" : "#fff",
                color: darkMode ? "#eee" : "#000",
                fontFamily: "Fredoka",
                fontSize: "16px",
                outline: "none",
              }}
            />

            <IconButton
              onClick={() => setDarkMode(!darkMode)}
              color="inherit"
              sx={{
                border: "1px solid",
                borderColor: darkMode ? "#555" : "#ccc",
                ml: 1,
              }}
            >
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>

          <Grid container spacing={3}>
            {filteredUsers.map((user) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={user.id}>
                <UserCard
                  user={user}
                  onDelete={confirmDeleteUser}
                  darkMode={darkMode}
                  onEdit={handleEdit}
                />
              </Grid>
            ))}
          </Grid>

          <Box textAlign="center" mt={4}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: darkMode ? "#90CAF9" : "#FFCA28",
                color: darkMode ? "black" : "black",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: darkMode ? "#64B5F6" : "#FDD835",
                },
              }}
              onClick={handleAddUser}
            >
              ADD NEW USER
            </Button>
          </Box>
        </Container>

        {/* Footer branding */}
        <Footer darkMode={darkMode} />

        <EditModal
          open={open}
          handleClose={() => setOpen(false)}
          user={selectedUser}
          onSave={handleSave}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
