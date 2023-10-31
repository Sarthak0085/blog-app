import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePost, getAllPosts } from "../../../../services/PostsServices";
import { images, stables } from "../../../../constants";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Pagination from "../../../../components/Pagination";
import toast from "react-hot-toast";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useSelector } from "react-redux";

let firstTime = true

const ManagePost = () => {
    const queryClient = useQueryClient();
    const userState = useSelector((state) => state.user);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const {
        data: postsData,
        isLoading,
        isFetching,
        refetch,
    } = useQuery({
        queryFn: () => getAllPosts(searchKeyword, currentPage),
        queryKey: ["posts"],
    });
    console.log(searchKeyword);
    console.log(postsData);

    const { mutate: mutateDeletePost, isLoading: isLoadingDeletePost } = useMutation({
        mutationFn: ({ token, slug }) => {
            return deletePost({
                token,
                slug
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["posts"]);
            toast.success("Post deleted successfully");
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
        const { value } = e.target;
        setSearchKeyword(value);
    };

    const submitSearchKeywordHandler = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        refetch();
    };

    const deletePostHandler = ({ slug, token }) => {
        mutateDeletePost({ slug, token })
    }

    return (
        <div>
            <h1 className="text-2xl font-semibold">Manage Posts</h1>

            <div className="w-full px-4 mx-auto">
                <div className="py-8">
                    <div className="flex flex-row justify-between w-full mb-1 sm:mb-0">
                        <h2 className="text-2xl leading-tight">Posts</h2>
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
                            <table className="min-w-full leading-normal">
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
                                            Tags
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                                        ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoading || isFetching ? (
                                        <tr>
                                            <td colSpan={5} className="text-center py-10 w-full">
                                                Loading...
                                            </td>
                                        </tr>
                                    ) : postsData?.data?.data?.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="text-center py-10 w-full">
                                                No Posts Available
                                            </td>
                                        </tr>
                                    )
                                        : (
                                            postsData?.data?.data.map((post) => (
                                                <tr key={post._id}>
                                                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0">
                                                                <Link href="/" className="relative block">
                                                                    <img
                                                                        src={
                                                                            post?.image
                                                                                ? stables.UPLOAD_FOLDER_BASE_URL +
                                                                                post?.image
                                                                                : images.Post1Image
                                                                        }
                                                                        alt={post.title}
                                                                        className="mx-auto object-cover rounded-lg w-10 aspect-square"
                                                                    />
                                                                </Link>
                                                            </div>
                                                            <div className="ml-3">
                                                                <p className="text-gray-900 whitespace-no-wrap">
                                                                    {post.title}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {post?.categories?.length > 0
                                                                ? (<p className="px-2 py-2 gap-x-2 bg-primary text-white rounded-lg shadow-xl">{post?.categories[0]}</p>)
                                                                : (<p className="text-red-500 shadow-sm">Uncategorized</p>)}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0">
                                                                <Link href="/" className="relative block">
                                                                    <img
                                                                        src={
                                                                            post?.user?.image
                                                                                ? stables.UPLOAD_FOLDER_BASE_URL +
                                                                                post?.user?.image
                                                                                : images.PostProfileImage
                                                                        }
                                                                        alt={post?.user?._id}
                                                                        className="mx-auto object-cover rounded-lg w-10 aspect-square"
                                                                    />
                                                                </Link>
                                                            </div>
                                                            <div className="ml-3">
                                                                <p className="text-gray-900 whitespace-no-wrap">
                                                                    {post?.user?.name}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                        <p className="text-gray-900 whitespace-no-wrap">
                                                            {new Date(post.createdAt).toLocaleDateString(
                                                                "en-US",
                                                                {
                                                                    day: "numeric",
                                                                    month: "short",
                                                                    year: "numeric",
                                                                }
                                                            )}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-5 text-sm bg-white border-b flex-wrap border-gray-200">
                                                        <div className="flex flex-wrap gap-y-2 gap-x-2">
                                                            {post?.tags?.length > 0
                                                                ? post?.tags?.map((tag, index) => (
                                                                    <p key={index} className="px-2 py-2 gap-x-2 bg-primary text-white rounded-lg shadow-xl">
                                                                        {tag}
                                                                    </p>
                                                                ))
                                                                : (<p className="text-red-500 shadow-sm">No tags Available</p>)}
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                                                        <Link
                                                            to={`/admin/posts/manage/edit/${post?.slug}`}
                                                            className="text-yellow-300 mx-2 disabled:cursor-not-allowed disabled:opacity-70"
                                                        >
                                                            <AiFillEdit className="w-5 h-5" />
                                                        </Link>
                                                        <button
                                                            disabled={isLoadingDeletePost}
                                                            type="delete"
                                                            className="mx-2 text-red-500 disabled:cursor-not-allowed disabled:opacity-70"
                                                            onClick={() => deletePostHandler({ slug: post?.slug, token: userState?.userInfo?.token })}
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
                                        totalPageCount={postsData?.data?.totalPages}
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

export default ManagePost