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
const Auth = () => {
  
  return (<Container component="main" maxWidth="xs">
    <Paper style={styles.paper} elevation={3}>
      <Avatar style={styles.avatar}>
        <LockOutlinedIcon/>
      </Avatar>
    </Paper>
  </Container>)
};

export default Auth;
