import React, { useState, useRef } from 'react'
import { Typography, TextField, Button } from "@mui/material";
import styles from './styles';
import { useDispatch } from 'react-redux';

import { commentPost } from "../../actions/posts"
const CommentSection = ({ post }) => {
    // console.log("Post", post);
    const [comments, setComments] = useState(post?.comments)
    const [comment, setComment] = useState('')
    const user = JSON.parse(localStorage.getItem('profile'))
    const dispatch = useDispatch()
    const commentsRef = useRef()
    const handleClick = async (e) => {
        const finalComment = `${user.result.name}: ${comment}`

        const newComments = await dispatch(commentPost(finalComment, post._id))
        setComments(newComments)
        setComment('')
        commentsRef.current.scrollIntoView({ behavior: 'smooth' })
    }
    return (
        <div>
            <div className={styles.commentsOuterContainer}>
                <div className={styles.commentsInnerContainer}>
                    <Typography gutterBottom variant='h6'>Comments</Typography>
                    {comments.map((c, i) => (
                        <Typography key={i} gutterBottom variant='subtitle1'>
                            <strong>{c.split(': ')[0]} </strong>
                            {c.split(': ')[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </div>
                {(user?.result?.name) &&
                    <div style={{ width: '70%' }}>
                        <Typography gutterBottom variant='h6'>Write a comment</Typography>
                        <TextField fullWidth
                            rows={4}
                            variant='outlined'
                            multiline
                            value={comment}
                            onChange={(e => setComment(e.target.value))}
                        />
                        <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment} variant='contained' onClick={handleClick} color='primary'>Comment</Button>
                    </div>
                }
            </div>
        </div>
    )
}

export default CommentSection
