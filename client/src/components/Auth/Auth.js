import React from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import styles from "./styles.js";
import LockIcon from "@mui/icons-material/Lock";
const Auth = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Paper style={styles.paper} elevation={3}>
        <Avatar style={styles.avatar}>
          <LockIcon />
        </Avatar>
      </Paper>
    </Container>
  );
};

export default Auth;
