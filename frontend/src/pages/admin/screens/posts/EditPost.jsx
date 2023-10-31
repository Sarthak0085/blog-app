import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ArticleDetailSkeleton from '../../../articleDetail/components/ArticleDetailSkeleton';
import ErrorMessage from '../../../../components/ErrorMessage';
import { getSinglePost, updatePost } from '../../../../services/PostsServices';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import parseJsonToHtml from '../../../../utils/parseJsonToHtml';
import { stables } from '../../../../constants';
import { AiOutlineCamera } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Editor from '../../../../components/editor/Editor';

const EditPost = () => {
    const { slug } = useParams();

    const [initialPhoto, setInitialPhoto] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [body, setBody] = useState(null);

    const queryClient = useQueryClient();
    const userState = useSelector(state => state.user);

    const { data, isLoading, isError } = useQuery({
        queryFn: () => getSinglePost({ slug }),
        queryKey: ["blog", slug],
    });

    const handleDeleteImage = () => {
        setInitialPhoto(null)
        setPhoto(null)
    }

    useEffect(() => {
        if (!isLoading || !isError) {
            setInitialPhoto(data?.photo);
        }
    }, [data, isError, isLoading])

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
    }

    const { mutate: mutateUpdatePostDetail, isLoading: isLoadingUpdatePostDetail } = useMutation({
        mutationFn: ({ updateData, slug, token }) => {
            return updatePost({
                updateData,
                slug,
                token
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["blog", slug]);
            toast.success("Post is updated");
        },
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        }
    })

    const handleUpdatePost = async () => {
        let updateData = new FormData();

        if (!initialPhoto && photo) {
            updateData.append("postPicture", photo);
        } else if (initialPhoto && !photo) {
            let urlToObject = async (url) => {
                let response = await fetch(url);
                let blob = response.blob();
                const file = new File([blob], initialPhoto, { type: blob });
                return file;
            }

            const picture = await urlToObject(stables.UPLOAD_FOLDER_BASE_URL + data?.photo);

            updateData.append("postPicture", picture);
        }

        updateData.append("document", JSON.stringify({ body }));

        mutateUpdatePostDetail({
            updateData,
            slug,
            token: userState?.userInfo?.token
        })
    }

    console.log(data?.body);

    return (
        <div>
            {
                isLoading ?
                    (<ArticleDetailSkeleton />)
                    : isError ?
                        (<ErrorMessage message="Couldn't fetch the posts details" />
                        )
                        :
                        (
                            <section className="container mx-auto max-w-5xl flex flex-col px-5 py-5 lg:flex-row lg:gap-x-5 lg:items-start">
                                <article className="flex-1">
                                    <label htmlFor='post-picture' className='w-full cursor-pointer'>
                                        {photo ?
                                            <img src={URL.createObjectURL(photo)} alt={data?.title} className="w-full rounded-xl" />
                                            : initialPhoto ?
                                                (
                                                    <img src={stables.UPLOAD_FOLDER_BASE_URL + data?.photo} alt={data?.title} className="w-full rounded-xl" />
                                                )
                                                : (
                                                    <div className='w-full min-h-[300px] bg-blue-50/50 flex justify-center items-center'>
                                                        <AiOutlineCamera className='w-10 h-auto text-primary' />
                                                    </div>
                                                )
                                        }
                                    </label>
                                    <input type='file' className='sr-only' id='post-picture' onChange={handleFileChange} />
                                    <button
                                        type='button'
                                        className='w-fit text-red-500 border border-red-500 text-sm font-semibold 
                                        px-2 py-1 rounded-lg hover:text-white hover:bg-red-500 my-5'
                                        onClick={handleDeleteImage}
                                    >
                                        Delete
                                    </button>
                                    <div className="mt-2 flex gap-2">
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
                                    <div className='w-full'>
                                        {!isLoading && !isError &&
                                            <Editor
                                                content={data?.body}
                                                editable={true}
                                                onDataChange={(data) => {
                                                    setBody(data);
                                                }}
                                            />
                                        }
                                    </div>

                                    {/* </div>
                                    {/* <div className="mt-4 prose prose-sm sm:prose-base">
                                        {/* {data?.body} */}
                                    {/* </div> */}
                                    <button
                                        disabled={isLoadingUpdatePostDetail}
                                        type="button"
                                        onClick={handleUpdatePost}
                                        className="w-full bg-primary text-white font-semibold rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:opacity-70"
                                    >
                                        Update Post
                                    </button>
                                </article>
                            </section>
                        )

            }
        </div >
    )
}

export default EditPost