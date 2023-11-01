import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePost, getAllPosts } from "../../../../services/PostsServices";
import { images, stables } from "../../../../constants";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from "../../../../components/Pagination";
import toast from "react-hot-toast";
import { AiFillCheckCircle, AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import { deleteComment, getAllComments, updateComment, updateCommentByAdmin } from "../../../../services/CommentsServices";

let firstTime = true

const ManageComments = () => {
    const queryClient = useQueryClient();
    const userState = useSelector((state) => state.user);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [commentConfirmation, setCommentConfirmation] = useState(false);

    const {
        data: commentsData,
        isLoading,
        isFetching,
        refetch,
    } = useQuery({
        queryFn: () => getAllComments(),
        queryKey: ["comments"],
    });
    // console.log(searchKeyword);
    // console.log(commentsData);

    const { mutate: mutateDeleteComment, isLoading: isLoadingDeleteComment } = useMutation({
        mutationFn: ({ token, commentId }) => {
            return deleteComment({
                token,
                commentId
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["comments"]);
            toast.success("Comment deleted successfully");
        },
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        },
    });

    const { mutate: mutateUpdateComment, isLoading: isLoadingUpdateComment } = useMutation({
        mutationFn: ({ token, data, commentId }) => {
            return updateCommentByAdmin({
                token,
                data,
                commentId
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["comments"]);
            toast.success("Comment Confirmation updated");
        },
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        },
    });

    useEffect(() => {
        if (firstTime) {
            firstTime = false;
            return
        }
        refetch()
    }, [refetch, currentPage])

    const searchKeywordHandler = (e) => {
        const value = e.target.value;
        setSearchKeyword(value);
    };

    const submitSearchKeywordHandler = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        refetch();
    };

    const deleteCommentHandler = (commentId) => {
        mutateDeleteComment({
            token: userState?.userInfo?.token,
            commentId
        })
    };


    const handlerCheck = (comment, commentId) => {
        setCommentConfirmation((prev) => !prev)
        console.log(comment);
        const updatedComment = { ...comment, check: !comment.check };
        console.log(updatedComment);
        mutateUpdateComment({ token: userState?.userInfo?.token, data: updatedComment, commentId });
    }

    return (
        <div>
            <h1 className="text-2xl font-semibold">Manage Comments</h1>

            <div className="w-full px-4 mx-auto">
                <div className="py-8">
                    <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
                        <h2 className="text-2xl leading-tight">Comments</h2>
                        <div className="text-end flex flex-col lg:flex-row gap-x-4">
                            <input
                                type="text"
                                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary "
                                placeholder="Search by title..."
                                onChange={searchKeywordHandler}
                                value={searchKeyword}
                            />
                            <button
                                className="flex-shrink-0 px-4 py-2 text-base font-semibold text-primary rounded-lg shadow-md hover:bg-primary hover:text-white focus:outline-none focus:ring-2  focus:ring-offset-2 focus:ring-offset-purple-200"
                                type="submit"
                                onClick={submitSearchKeywordHandler}
                            >
                                Filter
                            </button>
                        </div>
                    </div>
                    <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
                        <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                            <table className="min-w-full leading-normal ">
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                        >
                                            Title
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                        >
                                            Category
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                        >
                                            Writer
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                        >
                                            Created Date
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                        >
                                            Check
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                        ></th>
                                    </tr>
                                </thead>
                                <tbody className="w-full bg-white border-b border-gray-200">
                                    {isLoading || isFetching ? (
                                        <tr>
                                            <td colSpan={5} className="text-center py-10 w-full">
                                                Loading...
                                            </td>
                                        </tr>
                                    ) : commentsData?.data?.data?.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="text-center py-10 w-full">
                                                No Comments Available
                                            </td>
                                        </tr>
                                    )
                                        : (
                                            commentsData?.data?.data?.map((comment) => (
                                                <tr key={comment._id}>
                                                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0">
                                                                <Link href="/" className="relative block">
                                                                    <img
                                                                        src={comment?.post?.photo ? stables.UPLOAD_FOLDER_BASE_URL + comment?.post?.photo : images.Post1Image}

                                                                        alt={comment?.post?.title}
                                                                        className="mx-auto object-cover rounded-lg w-10 aspect-square"
                                                                    />
                                                                </Link>
                                                            </div>
                                                            <div className="ml-3">
                                                                <p className="text-gray-900 whitespace-no-wrap">
                                                                    {comment?.post?.title}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {comment?.desc}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 flex flex-wrap">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0">
                                                                <Link href="/" className="relative block">
                                                                    <img
                                                                        src={
                                                                            comment?.user?.avatar
                                                                                ? stables.UPLOAD_FOLDER_BASE_URL +
                                                                                comment?.user?.avatar
                                                                                : images.PostProfileImage
                                                                        }
                                                                        alt={comment?.user?._id}
                                                                        className="mx-auto object-cover rounded-lg w-10 aspect-square"
                                                                    />
                                                                </Link>
                                                            </div>
                                                            <div className="ml-3">
                                                                <p className="text-gray-900 whitespace-no-wrap">
                                                                    {comment?.user?.name}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {new Date(comment?.createdAt).toLocaleDateString(
                                                                "en-US",
                                                                {
                                                                    day: "numeric",
                                                                    month: "short",
                                                                    year: "numeric",
                                                                }
                                                            )}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-5 text-sm bg-white border-b flex-wrap  border-gray-200">
                                                        <div className="flex flex-wrap items-center justify-center">
                                                            <button onClick={() => handlerCheck(comment, comment?._id)}>{comment?.check === true ? <AiFillCheckCircle className="text-green-500 shadow-2xl rounded-lg w-10" /> : <AiFillCheckCircle className="text-red-500 shadow-2xl rounded-lg w-10" />}</button>
                                                        </div>
                                                    </td>

                                                    <td className="flex flex-col lg:flex-row justify-center items-center text-sm">
                                                        <Link
                                                            to={`/admin/posts/manage/edit/${comment?.slug}`}
                                                            className="text-yellow-300 disabled:cursor-not-allowed disabled:opacity-70"
                                                        >
                                                            <AiFillEdit className="w-5 h-5" />
                                                            {console.log(comment?._id)}
                                                        </Link>
                                                        <button
                                                            disabled={isLoadingDeleteComment}
                                                            type="delete"
                                                            className="mx-2 text-red-500 disabled:cursor-not-allowed disabled:opacity-70"
                                                            onClick={() => {
                                                                if (comment && comment?._id) {
                                                                    deleteCommentHandler(comment?._id);
                                                                }
                                                            }}
                                                        >
                                                            <AiFillDelete className="w-5 h-5" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                </tbody>
                            </table>
                            {
                                !isLoading &&
                                (
                                    <Pagination
                                        onPageChange={(page) => setCurrentPage(page)}
                                        currentPage={currentPage}
                                        totalPageCount={commentsData?.data?.totalPages}
                                    />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ManageComments;