import { useEffect, useState } from "react";
import { AiFillDashboard, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaComments } from "react-icons/fa";
import { MdDashboard, MdDeviceUnknown } from "react-icons/md"
import { Link } from "react-router-dom"
import NavItem from "./NavItem";
import NavItemCollapse from "./NavItemCollapse";

const MENU_ITEMS = [
    {
        title: "Dashboard",
        link: "/admin",
        icon: (<AiFillDashboard className="text-xl" />),
        name: "dashboard",
        type: "link",
    },
    {
        title: "Comments",
        link: "/admin/comments",
        icon: (<FaComments className="text-xl" />),
        name: "comments",
        type: "link",
    },
    {
        title: "Posts",
        content: [
            { title: "New", link: "/admin/posts/new" },
            { title: "Manage", link: "/admin/posts/manage" },
        ],
        icon: (<MdDashboard className="text-xl" />),
        name: "posts",
        type: "collapse",
    },
];

const Header = () => {
    const [isMenuActive, setIsMenuActive] = useState(false);
    const [activeNavName, setActiveNavName] = useState("dashboard");

    const handlerToggleMenu = () => {
        setIsMenuActive((prevState) => !prevState);
    }

    // useEffect(() => {
    //     if (windowSize.width < 1024) {
    //         setIsMenuActive(false);
    //     } else {
    //         setIsMenuActive(true);
    //     }
    // }, [windowSize.width]);

    return (
        <header className={`flex h-fit w-full items-center justify-between p-4 lg:h-full lg:max-w-[300px] 
        lg:flex-col lg:items-start lg:justify-start`}>
            {/* logo  */}
            <Link to="/">
                <MdDeviceUnknown className="cursor-pointer lg:hidden" />
            </Link>
            {/* menu burger icon  */}
            <div>
                {
                    isMenuActive ?
                        (<AiOutlineClose className="w-6 h-6" onClick={handlerToggleMenu} />) :
                        (<AiOutlineMenu className="w-6 h-6" onClick={handlerToggleMenu} />)}
            </div>
            {isMenuActive && (
                <div className="fixed inset-0 lg:static lg:h-full lg:w-full">
                    {/* underlay */}
                    <div className="fixed inset-0 bg-black opacity-50 lg:hidden" onClick={handlerToggleMenu} />
                    {/* sidebar  */}
                    <div className="fixed top-0 bottom-0 left-0 z-50 overflow-y-auto md:w-1/2 w-3/4 bg-white p-4
                         lg:static lg:h-full lg:w-full lg:p-6">
                        <Link to="/">
                            <MdDeviceUnknown />
                        </Link>
                        <h4 className="mt-10 font-bold text-gray-400">Main Menu</h4>
                        <div className="mt-6 flex flex-col gap-y-2">
                            {MENU_ITEMS.map((item) => (
                                item.type === "link" ? <NavItem
                                    key={item.title}
                                    title={item.title}
                                    name={item.name}
                                    link={item.link}
                                    icon={item.icon}
                                    activeNavName={activeNavName}
                                    setActiveNavName={setActiveNavName}
                                /> : (<NavItemCollapse
                                    key={item.title}
                                    title={item.title}
                                    name={item.name}
                                    content={item.content}
                                    icon={item.icon}
                                    activeNavName={activeNavName}
                                    setActiveNavName={setActiveNavName}
                                />)
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header