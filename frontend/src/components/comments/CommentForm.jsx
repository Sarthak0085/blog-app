/* eslint-disable react/prop-types */
import { useState } from "react";

const CommentForm = ({
    buttonLabel,
    formSubmitHandler,
    formCancelHandler = null,
    initialText = "",
    loading = false
}) => {

    const [value, setValue] = useState(initialText);

    const submitHandler = (e) => {
        e.preventDefault();
        formSubmitHandler(value);
        setValue("");
    }
    return (
        <form onSubmit={submitHandler}>
            <div className="flex flex-col items-end border p-4 border-primary rounded-lg">
                <textarea
                    className="w-full focus:outline-none bg-transparent"
                    rows={5}
                    placeholder="Leave your comment here...."
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <div className="flex flex-col-reverse gap-y-2 items-center gap-x-2 pt-2 min-[420px]:flex-row">
                    {
                        formCancelHandler &&
                        <button
                            onClick={formCancelHandler}
                            className="px-6 py-2.5 border border-red-500 text-red-500 rounded-lg hover:text-white hover:bg-red-500"
                        >
                            Cancel
                        </button>
                    }
                    <button
                        disabled={loading}
                        className="px-6 py-2.5 border border-primary text-primary hover:text-white
                         hover:bg-primary font-semibold rounded-lg disabled:cursor-not-allowed"
                        type="submit"
                    >
                        {buttonLabel}
                    </button>
                </div>

            </div>
        </form>
    )
}

export default CommentForm