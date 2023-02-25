import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import animatedBackground from "../assets/animated-background.svg";
import LockIcon from "@mui/icons-material/Lock";

export default function NoOpenChat() {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundImage: `url(${animatedBackground})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        color: "rgba(17, 27, 33, 0.7)",
        borderBottom: "6px solid #005C4B",
        position: "relative",
      }}
    >
      <QuestionAnswerIcon sx={(theme) => ({ fontSize: theme.typography.h1 })} />
      <Typography
        sx={(theme) => ({
          fontSize: theme.typography.h5,
          fontWeight: theme.typography.fontWeightBold,
        })}
      >
        Envie mensagens rapidamente <br /> de onde e quando você quiser!
      </Typography>
      <Box
        sx={(theme) => ({
          position: "absolute",
          bottom: 10,
          left: "50%",
          transform: "translate(-50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: theme.spacing(),
        })}
      >
        <LockIcon sx={{ color: "#005C4B" }} fontSize="small" />
        <Typography
          sx={(theme) => ({
            fontSize: theme.typography.body1,
            fontWeight: theme.typography.fontWeightRegular,
            color: "#005C4B",
          })}
        >
          Mensagens criptografadas
        </Typography>
      </Box>
    </Box>
  );
}
