import { Link, useNavigate, useParams } from "react-router-dom"
import EditPost from "./EditPost"
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import ArticleDetailSkeleton from "../../../articleDetail/components/ArticleDetailSkeleton";
import ErrorMessage from "../../../../components/ErrorMessage";
import { AiOutlineCamera } from "react-icons/ai";
import Editor from "../../../../components/editor/Editor";
import { createPost } from "../../../../services/PostsServices";

const NewPost = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const queryClient = useQueryClient();
    const userState = useSelector(state => state.user);

    const { mutate: mutateCreatePost, isLoading: isLoadingCreatePost } =
        useMutation({
            mutationFn: ({ token }) => {
                return createPost({
                    token
                });
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries(["posts"]);
                toast.success("Post is created, edit that now!");
                navigate(`/admin/posts/manage/edit/${data?.slug}`)
            },
            onError: (error) => {
                toast.error(error.message);
                console.log(error);
            },
        });

    const handleCreateNewPost = ({ token }) => {
        mutateCreatePost({ token })
    }


    console.log(data);

    return (
        <div>
            <button className="w-auto top-0 left-0 border bg-white rounded-lg shadow-2xl border-gray-50 p-4 " onClick={() => handleCreateNewPost({ token: userState?.userInfo?.token })}>New Post</button>
        </div >
    )
}

export default NewPost