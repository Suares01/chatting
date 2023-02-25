import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LoadingButton from "@mui/lab/LoadingButton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ControlledTextInput from "../../components/controlled-text-input";
import Link from "../../components/link";
import Copyright from "../../components/copyright";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useLogin } from "../../features/authentication/api/react-query-auth";

const validationSchema = z.object({
  email: z.string().email("E-mail inválido."),
  password: z.string().min(1, "Forneça sua senha."),
});

type FormData = z.infer<typeof validationSchema>;

export default function Login() {
  const [, setCookie] = useCookies([
    "chatting:accesstoken",
    "chatting:refreshtoken",
  ]);
  const { mutateAsync, isLoading } = useLogin();

  const { control, handleSubmit, setError } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  async function handleLogin(data: FormData) {
    const { email, password } = data;

    await mutateAsync(
      {
        email,
        password,
      },
      {
        onError(error: any) {
          if (error.status === 401) {
            setError("email", { message: "E-mail ou senha incorreta." });
            setError("password", { message: "E-mail ou senha incorreta." });
          }
        },
        onSuccess(data) {
          const { accessToken, refreshToken } = data;

          setCookie("chatting:accesstoken", accessToken, {
            maxAge: 86400, // 1 day
            secure: true,
            sameSite: "none",
          });
          setCookie("chatting:refreshtoken", refreshToken, {
            maxAge: 604800, // 7 days
            secure: true,
            sameSite: "none",
          });

          navigate("/chats");
        },
      }
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Entrar
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(handleLogin)}
          noValidate
          sx={{ mt: 1 }}
        >
          <ControlledTextInput
            control={control}
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            autoComplete="email"
          />
          <ControlledTextInput
            control={control}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <LoadingButton
            type="submit"
            loading={isLoading}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Entrar
          </LoadingButton>
          <Grid container>
            <Grid item>
              <Link to="/register" variant="body2">
                Não tem uma conta? Cadastre-se
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
