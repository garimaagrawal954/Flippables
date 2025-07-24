import React, { useRef, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Avatar,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { gsap } from "gsap";
import DeleteIcon from "@mui/icons-material/Delete";

function UserCard({ user, onEdit, onDelete, darkMode }) {
  const cardRef = useRef(null);
  const [flipped, setFlipped] = useState(false);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      scale: 1.05,
      boxShadow: "0px 12px 20px rgba(0,0,0,0.2)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      boxShadow: "0px 6px 12px rgba(0,0,0,0.1)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <Box
      sx={{
        perspective: "1000px",
        width: 250,
        height: 300,
        // margin: 2,
        cursor: "pointer",
      }}
      onClick={() => setFlipped((prev) => !prev)}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* FRONT */}
        <Box
          ref={cardRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            transform: "rotateY(0deg)",
          }}
        >
          <Card
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: 3,
              textAlign: "center",
              padding: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              src={user.avatar}
              alt={user.name}
              sx={{ width: 60, height: 60, mb: 1 }}
            />
            <CardContent>
              <Typography fontWeight="bold" variant="h6">
                {user.name}
              </Typography>
              <Typography>Age: {user.age}</Typography>
              <Typography>Profession: {user.profession}</Typography>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(user);
                }}
                color="primary"
                sx={{ mt: 1 }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={(e) => {
                  e.stopPropagation(); // ⛔️ prevent card flip
                  onDelete(user.id);
                }}
                size="small"
                sx={{
                  color: "error.main",
                }}
              >
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </Card>
        </Box>

        {/* BACK */}
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            backgroundColor: darkMode ? "#121212" : "#f0f0f0",
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="body2">
            More info about {user.name}! 💡 <br />
            Loves {user.likes}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default UserCard;
