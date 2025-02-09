import React, { useEffect } from 'react'
import { Paper, Typography, CircularProgress, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from "./styles.js"
import { getPost, getPostsBySearch } from '../../actions/posts';
import CommentSection from './CommentSection.jsx';
const PostDetails = () => {
    const { post, posts, isLoading } = useSelector(state => state.posts)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        if (post) {
            dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }))
        }
    }, [post])
    useEffect(() => {
        dispatch(getPost(id))
    }, [id])
    if (!post) {
        return null;
    }
    if (isLoading)
        return (<Paper elevation={6} sx={styles.loadingPaper}>
            <CircularProgress size="7em" />
        </Paper>);
    const recommendedPosts = posts?.filter(({ _id }) => _id !== post._id) || [];
    const openPost = (id) => navigate(`/posts/${id}`)
    return (
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
            <div style={styles.card}>
                <div style={styles.section}>
                    <Typography variant="h3" component="h2">{post.title}</Typography>
                    <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags && post.tags.map((tag) => `#${tag} `)}</Typography>
                    <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                    <Typography variant="h6">Created by:
                        <Link to={`/creators/${post.name}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
                            {` ${post.name}`}
                        </Link></Typography>
                    <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <CommentSection post={post} />
                    <Divider style={{ margin: '20px 0' }} />
                </div>
                <div style={styles.imageSection}>
                    <img style={styles.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
                </div>
            </div>
            {!!recommendedPosts?.length && (
                <div style={styles.section}>
                    <Typography gutterBottom variant='h5'>You might also like:</Typography>
                    <Divider />
                    <div style={styles.recommendedPosts}>
                        {recommendedPosts?.map(({ title, message, name, likes, selectedFile, _id }) => (
                            <div style={{ margin: '20px', cursor: "pointer" }} onClick={() => openPost(_id)} key={_id}>
                                <Typography gutterBottom variant="h6">{title}</Typography>
                                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                                <img src={selectedFile} width="200px" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Paper>
    )
}

export default PostDetails
