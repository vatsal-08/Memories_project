import { AppBar, Container, Typography, Grow, Grid } from "@mui/material";
import memories from "./images/memories.png";
import Posts from "./components/Posts/Posts.js";
import Form from "./components/Form/Form.js";
import styles from "./styles.js";
import { getPosts } from "./actions/posts.js";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
const App = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  return (
    <Container maxWidth="lg">
      <AppBar sx={styles.appBar} position="static" color="inherit">
        <Typography sx={styles.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img
          className={styles.image}
          src={memories}
          alt="memories"
          height="60"
        />
      </AppBar>
      <Grow in>
        <Grid
          className={styles.mainContainer}
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Grow>
    </Container>
  );
};

export default App;
