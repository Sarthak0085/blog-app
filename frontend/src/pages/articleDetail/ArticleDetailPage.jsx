import { Link, useParams } from "react-router-dom"
import BreadCrumb from "../../components/BreadCrumb"
import MainLayout from "../../components/MainLayout"
import images from "../../constants/images"
import SuggestedPosts from "./container/SuggestedPosts"
import CommentsContainer from "../../components/comments/CommentsContainer"
import SocialShareButton from "../../components/SocialShareButton"
import { useQuery } from "@tanstack/react-query";
import { generateHTML } from "@tiptap/html";
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Italic from "@tiptap/extension-italic";
import parse from "html-react-parser"
import { getAllPosts, getSinglePost } from "../../services/PostsServices"
import { useEffect, useState } from "react"
import { stables } from "../../constants"
import ArticleDetailSkeleton from "./components/ArticleDetailSkeleton"
import ErrorMessage from "../../components/ErrorMessage"
import { useSelector } from "react-redux"

// const breadCrumbData = [
//     { name: "Home", link: "/" },
//     { name: "Blog", link: "/blog" },
//     { name: "Article name", link: "/blog/1" }
// ]

const tagsData = [
    "Health",
    "Food",
    "Sports",
    "Education",
    "Business",
    "History"
]

const ArticleDetailPage = () => {
    const { slug } = useParams();

    const [breadCrumbsData, setBreadCrumbsData] = useState([]);
    const [body, setBody] = useState(null);

    const userState = useSelector(state => state.user);

    const { data, isLoading, isError } = useQuery({
        queryFn: () => getSinglePost({ slug }),
        queryKey: ["blog", slug],
        onSuccess: (data) => {
            console.log("working fine");
            const newBreadCrumbsData = [
                { name: "Home", link: "/" },
                { name: "Blog", link: "/blog" },
                { name: data.title, link: `/blog/${data.slug}` },
            ];

            // Log newBreadCrumbsData to verify it's set correctly
            console.log("newBreadCrumbsData", newBreadCrumbsData);

            setBreadCrumbsData(newBreadCrumbsData);

            console.log(breadCrumbsData);
            setBody(
                parse(
                    generateHTML(data?.body, [Bold, Italic, Text, Paragraph, Document])
                )
            );
        },
        onError: (error) => {
            console.error("Error fetching data:", error);
        },
    });

    const { data: postsData } = useQuery({
        queryFn: () => getAllPosts(),
        queryKey: ["posts"],
    });

    return (
        <MainLayout>
            {isLoading ?
                (<ArticleDetailSkeleton />)
                : isError ?
                    (<ErrorMessage message="Couldn't fetch the posts details" />
                    )
                    :
                    (
                        <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
                            <article className="flex-1">
                                <BreadCrumb data={breadCrumbsData} />
                                <img
                                    className="rounded-xl w-full"
                                    src={data?.photo ? stables.UPLOAD_FOLDER_BASE_URL + data?.photo : images.Post1Image}
                                    alt={data?.title}
                                />
                                <div className="mt-4 flex gap-2">
                                    {
                                        data?.categories.map((category) => (
                                            <Link
                                                key={category._id}
                                                to={`/blog?category=${category.name}`}
                                                className="font-roboto text-primary inline-block uppercase md:text-base"
                                            >
                                                {category.name}
                                            </Link>
                                        ))}
                                </div>

                                <h1 className="text-xl font-medium font-roboto text-dark-hard mt-4 md:text-[26px]">
                                    {data?.title}
                                </h1>
                                <div className="mt-4 prose prose-sm sm:prose-base">
                                    {body}
                                </div>
                                <CommentsContainer
                                    comments={data?.comments}
                                    className="mt-8"
                                    logginedUserId={userState?.userInfo?._id}
                                    postSlug={slug}
                                />
                            </article>
                            <div>
                                <SuggestedPosts
                                    header="Latest Article"
                                    posts={postsData}
                                    tags={data?.tags}
                                    className="mt-8 lg:mt-0 lg:max-w-xs"
                                />

                                <div className="mt-7">
                                    <h2 className="font-roboto font-medium text-dark-hard mb-4 mb:text-xl">
                                        Share on:
                                    </h2>
                                    <SocialShareButton
                                        url={encodeURI(window.location.href)}
                                        title={encodeURIComponent(data?.title)}
                                    />
                                </div>
                            </div>
                        </section>
                    )

            }
        </MainLayout>
    )
}

export default ArticleDetailPage