
const ManagePost = () => {
    return (
        <div className="flexflex-col items-center justify-center w-2/3">
            <h2 className="text-center font-roboto my-6 font-bold text-primary">Manage Posts</h2>
            <div className="w-full flex items-center justify-between ">
                <h3 className="text-lg font-roboto">Posts</h3>
                <div>
                    <input type="text" placeholder="Search..." />
                    <button>Search</button>
                </div>
            </div>
        </div>
    )
}

export default ManagePost