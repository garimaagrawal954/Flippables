import { Box } from "@mui/material";

function Footer({ darkMode }) {
  return (
    <Box
      position="fixed"
      bottom={10}
      right={10}
      display="flex"
      alignItems="center"
      sx={{
        fontSize: "14px",
        fontFamily: "Fredoka, sans-serif",
        color: darkMode ? "#ddd" : "#333",
      }}
    >
      {/* <span>Design by MerakiM</span>
      {darkMode ? (
        <img
          src="/Merakilogo.JPG"
          alt="Meraki Logo"
          style={{ height: 40, marginLeft: 6 }}
        />
      ) : (
        <img
          src="/logo.png"
          alt="Meraki Logo"
          style={{ height: 40, marginLeft: 6 }}
        />
      )} */}
    </Box>
  );
}
export default Footer;
