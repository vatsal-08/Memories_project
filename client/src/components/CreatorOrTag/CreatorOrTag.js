import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Typography, CircularProgress, Grid, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import Post from "../Posts/Post/Post";
import { getPostsByCreator, getPostsBySearch } from "../../actions/posts";

const CreatorOrTag = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/tags")) {
      dispatch(getPostsBySearch({ tags: name }));
    } else {
      dispatch(getPostsByCreator(name));
    }
  }, []);

  if (!posts?.length && !isLoading) return "No posts";

  return (
    <>
      {/* <Typography variant="h1" style={{ display: "inline" }}>
        <img src="#" alt="name" />
      </Typography> */}
      <Typography variant="h6" style={{ display: "inline", marginLeft: "8px" }}>
        {name}
      </Typography>
      <Typography variant="h6" style={{ display: "inline", marginLeft: "8px" }}>
        {posts?.length} post{posts?.length > 1 && "s"}
      </Typography>

      <Divider style={{ margin: "20px 0 50px 0" }} />
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Grid container alignItems="stretch" spacing={3}>
          {posts?.map((post) => (
            <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
              <Post post={post} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default CreatorOrTag;
