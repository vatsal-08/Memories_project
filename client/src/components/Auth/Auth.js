import React, { useState } from "react";
import { Avatar, Button, Paper,Grid,Typography,Container,TextField} from "@mui/material";
import styles from "./styles.js";
import LockIcon from "@mui/icons-material/Lock";
import Input from "./Input.js";
const Auth = () => {
  const isSignup=false;
  const [showPassword,setShowPassword]=useState(false)
  const handleSubmit=()=>{

  }
  const handleShowPassword=()=>setShowPassword((prevShowPassword)=>!prevShowPassword)
  const handleChange=()=>{

  }
  return (
    <Container component="main" maxWidth="xs">
      <Paper style={styles.paper} elevation={3}>
        <Avatar style={styles.avatar}>
          <LockIcon />
        </Avatar>
        <Typography variant="h5">{isSignup?'Sign Up':'Sign In'}</Typography>
        <form style={styles.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignup&&(
                <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                <Input name="firstName" label="First Name" handleChange={handleChange} half/>
                </>
              )
            }
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword?"text":"password"} handleShowPassword={handleShowPassword} />
            {isSignup &&<Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" style={styles.submit}>
            {isSignup?'Sign Up':'Sign In'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
