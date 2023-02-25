import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "../../components/copyright";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ControlledTextInput from "../../components/controlled-text-input";
import Link from "../../components/link";
import { useNavigate } from "react-router-dom";
import {
  useLogin,
  useRegister,
} from "../../features/authentication/api/react-query-auth";
import { useCookies } from "react-cookie";

const validationSchema = z
  .object({
    username: z
      .string()
      .min(4, "Deve conter no mínimo 4 caracteres.")
      .max(12, "Deve conter no máximo 12 caracteres.")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Pode conter apenas letras, números e sublinhados."
      ),
    email: z.string().email("E-mail inválido."),
    password: z
      .string()
      .min(6, "Deve ter pelo menos 6 caracteres")
      .regex(
        /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/,
        "Deve ter pelo menos uma letra minúscula/maiúscula e um número"
      ),
    confirmPassword: z.string().min(1, "Confirme a senha"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password)
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "As senhas não conferem.",
      });
  });

type FormData = z.infer<typeof validationSchema>;

export default function Register() {
  const [, setCookie] = useCookies([
    "chatting:accesstoken",
    "chatting:refreshtoken",
  ]);

  const login = useLogin();
  const register = useRegister();

  const { control, handleSubmit, setError } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
    },
  });

  const navigate = useNavigate();

  async function handleLogin(data: FormData) {
    const { email, password, username } = data;

    await register.mutateAsync(
      { email, password, username },
      {
        onError(error: any) {
          switch (error.data.message) {
            case "email has already been registered":
              setError("email", { message: "E-mail já cadastrado." });
              break;
            case "username has already been registered":
              setError("username", {
                message: "Nome de usuário já cadastrado.",
              });
              break;
          }
        },
        async onSuccess() {
          const { accessToken, refreshToken } = await login.mutateAsync({
            email,
            password,
          });

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
          Cadastrar-se
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
            id="username"
            label="Nome de usuário"
            name="username"
            autoComplete="email"
            disabled={register.isLoading || login.isLoading}
          />
          <ControlledTextInput
            control={control}
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            autoComplete="email"
            disabled={register.isLoading || login.isLoading}
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
            disabled={register.isLoading || login.isLoading}
          />
          <ControlledTextInput
            control={control}
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirmar Senha"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
            disabled={register.isLoading || login.isLoading}
          />
          <LoadingButton
            type="submit"
            fullWidth
            loading={register.isLoading || login.isLoading}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Cadastrar-se
          </LoadingButton>
          <Grid container>
            <Grid item>
              <Link to="/login" variant="body2">
                Já tem uma conta? Faça login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
