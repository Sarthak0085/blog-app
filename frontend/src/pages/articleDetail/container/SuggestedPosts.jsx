/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"
import { images, stables } from "../../../constants"

const SuggestedPosts = ({ className, header, posts = [], tags = [] }) => {
    return (
        <div className={`w-full rounded-lg p-4 ${className}`}>
            <h2 className="font-roboto font-medium text-dark-hard md:text-xl">
                {header}
            </h2>
            <div className="grid gap-y-5 mt-5 md:grid-cols-2 md:gap-x-5 lg:grid-cols-1">
                {posts.map((item) => (
                    <div
                        key={item._id}
                        className="flex space-x-3 flex-nowrap items-center"
                    >
                        <img
                            className="aspect-square rounded-lg object-cover w-1/5"
                            src={item.image ? stables.UPLOAD_FOLDER_BASE_URL + item.image : images.Post1Image}
                            alt={item.title}
                        />
                        <div className="text-sm font-roboto text-dark-hard font-medium">
                            <h3 className="text-sm font-roboto font-medium text-dark-hard md:text-base lg:text-lg">
                                <Link to={`/blog/${item.slug}`}>
                                    {item.title}
                                </Link>
                            </h3>
                            <span className="text-xs opacity-60">
                                {new Date(item.createdAt).toLocaleDateString("en-US", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric"
                                })}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <h2 className="mt-8 text-dark-hard font-medium font-roboto">
                Tags
            </h2>
            {tags.length === 0 ?
                (
                    <p className="text-blue-500 text-xs mt-2 md:text-sm">
                        There are no tags for this post
                    </p>
                )
                :
                (
                    <div className="flex flex-wrap gap-x-2 gap-y-2 mt-4 md:text-xs">
                        {tags?.map((item) => (
                            <Link
                                key={item}
                                to="/"
                                className="inline-block rounded-md px-3 py-1.5 bg-primary text-xs font-roboto text-white md:text-sm">
                                {item}
                            </Link>
                        ))}
                    </div>
                )
            }

        </div>
    )
}

export default SuggestedPosts