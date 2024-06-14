import React from "react";
import styles from "./styles.js";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import moment from "moment";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
const Post = ({ post, setCurrentId }) => {
  return (
    <Card style={styles.card}>
      <CardMedia
        className={styles.media}
        component="img"
        image={
          post.selectedFile ||
          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        }
        title={post.title}
      />
      <div style={styles.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div style={styles.overlay2}>
        <Button
          style={{ color: "white" }}
          size="md"
          onClick={() => {
            setCurrentId(post._id);
          }}
        >
          <MoreHorizIcon />
        </Button>
      </div>
      <div style={styles.details}>
        <Typography variant="body2" color="textSecondary" component="h2">
          {post.tags?.map((tag) => `#${tag}`)}
        </Typography>
      </div>
      <Typography style={styles.title} gutterBottom variant="h5" component="h2">
        {post.title}
      </Typography>
      <CardContent>
        <Typography style={styles.title} color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions style={styles.cardActions}>
        <Button size="small" color="primary" onClick={() => {}}>
          <ThumbUpAltIcon fontSize="small" />
          Like
          {post.likeCount}
        </Button>
        <Button size="small" color="primary" onClick={() => {}}>
          <DeleteIcon fontSize="small" />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};
export default Post;
