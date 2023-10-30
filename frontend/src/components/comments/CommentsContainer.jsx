import { useEffect, useState } from "react";
import CommentForm from "./CommentForm"
import { getCommentsData } from "../../data/Comments";
import Comment from "./Comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewComment, deleteComment, updateComment } from "../../services/CommentsServices";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

/* eslint-disable react/prop-types */
const CommentsContainer = ({ className, logginedUserId, postSlug, comments }) => {
    const queryClient = useQueryClient();
    const [affectedComment, setAffectedComment] = useState(null);
    const userState = useSelector((state) => state.user);

    console.log(comments);

    const { mutate: mutateNewComment, isLoading: isLoadingNewComment } = useMutation({
        mutationFn: ({ token, desc, slug, parent, replyOnUser }) => {
            return createNewComment({
                token, desc, slug, parent, replyOnUser
            });
        },
        onSuccess: () => {
            toast.success("Your comment is sent successfully, it will be visible after the confirmation of Admin")
        },
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        }
    })

    const { mutate: mutateUpdateComment } = useMutation({
        mutationFn: ({ token, desc, commentId }) => {
            return updateComment({
                token, desc, commentId
            });
        },
        onSuccess: () => {
            toast.success("Your comment is updated successfully")
            queryClient.invalidateQueries(["blog", postSlug])
        },
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        }
    })

    const { mutate: mutateDeleteComment } = useMutation({
        mutationFn: ({ token, commentId }) => {
            return deleteComment({
                token, commentId
            });
        },
        onSuccess: () => {
            toast.success("Your comment is deleted successfully")
            queryClient.invalidateQueries(["blog", postSlug])
        },
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        }
    })

    const addCommentHandler = (value, parent = null, replyOnUser = null) => {
        mutateNewComment({
            desc: value,
            parent,
            replyOnUser,
            token: userState?.userInfo?.token,
            slug: postSlug
        });
        setAffectedComment(null);
    }

    const updateCommentHandler = (value, commentId) => {
        mutateUpdateComment({
            token: userState?.userInfo?.token,
            desc: value,
            commentId
        })
        setAffectedComment(null);
    };

    const deleteCommentHandler = (commentId) => {
        mutateDeleteComment({
            token: userState?.userInfo?.token,
            commentId
        })
    };

    // const repliesHandler = (commentId) => {
    //     return comments.filter((comment) => comment.parent === commentId).sort((a, b) => {
    //         return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    //     });
    // }

    return (
        <div className={`${className}`}>
            <CommentForm
                buttonLabel="Send"
                formSubmitHandler={(value) => addCommentHandler(value)}
                loading={isLoadingNewComment}
            />
            <div className="space-y-4 mt-8">
                {comments.map((comment) => (
                    <Comment
                        key={comment._id}
                        comment={comment}
                        logginedUserId={logginedUserId}
                        affectedComment={affectedComment}
                        setAffectedComment={setAffectedComment}
                        addComment={addCommentHandler}
                        parentId={parent}
                        updateComment={updateCommentHandler}
                        deleteComment={deleteCommentHandler}
                        replies={comment.replies}
                    />
                ))}

            </div>
        </div>
    )
}

export default CommentsContainer;