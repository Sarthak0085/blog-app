/* eslint-disable react/prop-types */
import { useState } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { Link, NavLink } from 'react-router-dom'

const NavItemCollapse = ({
    content,
    title,
    icon,
    name,
    activeNavName,
    setActiveNavName
}) => {
    const [dropdown, setDropdown] = useState(false);

    const togglerDropdown = () => {
        setDropdown((currState) => {
            return !currState;
        })
    }
    return (
        <div className="flex flex-col">
            <button className={`${name === activeNavName ? "font-bold text-primary" : "text-gray-500 hover:text-primary hover:font-bold"} flex items-center gap-x-7`}
                onClick={togglerDropdown}
            >
                <div className='flex items-center gap-x-2 py-2 text-lg'>
                    {icon}
                    {title}
                </div>

                <MdKeyboardArrowDown />
            </button>
            <div className={`${dropdown ? "block" : "hidden"} text-gray-500 font-base rounded-lg  flex flex-col w-[150px] items-center transition-all duration-500 ml-5 bg-gray-200 `}>
                {content?.map((item) => (
                    <NavLink
                        key={item.title}
                        to={item.link}
                        className=" hover:text-primary hover:font-bold px-4 py-2"
                        onClick={setActiveNavName(name)}
                    >
                        {item.title}
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default NavItemCollapse