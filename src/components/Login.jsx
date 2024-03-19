// import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { Container, Box } from "./index.jsx";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  padding: theme.spacing(1),
  textAlign: "center",
}));

const Login = () => {
  const theme = useTheme();
  return (
    <>
      <Container>
        <Box></Box>
        <Grid container spacing={2} columns={12}>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2 }}>
              <Container
                maxWidth="sm"
                sx={{ gap: 2, display: "flex", flexDirection: "column" }}
              >
                <TextField
                  fullWidth
                  id="outlined-basic"
                  variant="outlined"
                  //   helperText="Email"
                  placeholder="email"
                  //   sx={{ marginBottom: theme.spacing(2) }}
                />

                <TextField
                  fullWidth
                  id="outlined-basic"
                  variant="outlined"
                  //   helperText="Email"
                  placeholder="password"
                />

                <Button variant="contained" fullWidth>
                  {" "}
                  Login{" "}
                </Button>

                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="body2" color="text.secondary">
                    Don&apos;t have an account? <a href="#">Sign up</a>
                  </Typography>
                </Box>
              </Container>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Login;
