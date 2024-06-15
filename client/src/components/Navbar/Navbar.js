import React from "react";
import {Link} from "react-router-dom"
import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import styles from "./styles.js";
import memories from "../../../src/images/memories.png";
const Navbar = () => {
    const user=null;
  return (
    <AppBar sx={styles.appBar} position="static" color="inherit">
      <div style={styles.brandContainer}>
        <Typography component={Link} to="/" sx={styles.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img style={styles.image} src={memories} alt="memories" height="60" />
      </div>
      <Toolbar sx={styles.toolbar}>
        {user?(
            <div style={styles.profile}>
                <Avatar sx={styles.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                <Typography sx={styles.userName} variant="h6">{user.result.name}</Typography>
                <Button variant="contained" sx={styles.logout} color="secondary">Logout</Button>
            </div>
        ):(
            <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
