// import React, { useState } from 'react'
// import { NavLink } from 'react-router-dom'
// const Header = () => {
//     const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

//     const toggleMobileMenu = () => {
//         setMobileMenuOpen(!isMobileMenuOpen);
//     };

//     const linkItems = [
//         {
//             name: "Home",
//             link: "/"
//         },
//         {
//             name: "About",
//             link: "/about"
//         },
//         {
//             name: "Skills",
//             link: "/skills"
//         },
//         {
//             name: "Projects",
//             link: "/projects"
//         },
//         {
//             name: "Resume",
//             link: "/resume"
//         },
//         {
//             name: "Contact",
//             link: "/contact"
//         }
//     ]
//     return (
//         <div className=''>
//             <div className=' fixed ml-[-128px] flex w-full h-16 rounded-full p-10 items-center justify-center backdrop-blur-xl'>
//                 <div className='relative right-80'>
//                     <h1 className=' text-4xl font-bold font-mono'>R</h1>
//                 </div>
//                 <ul className={`hidden lg:flex space-x-10 ${isMobileMenuOpen ? 'hidden' : ''}`}>
//                     {linkItems.map(item => (
//                         <NavLink key={item.name} to={item.link} className={({ isActive }) => `${isActive ? ' text-emerald-600 opacity-95' : ' text-black'} opacity-50`}>
//                             {item.name}
//                         </NavLink>
//                     ))}
//                 </ul>
//             </div>
//             <div className='lg:hidden'>
//                     <button className='text-2xl' onClick={toggleMobileMenu}>
//                         &#9776;
//                     </button>
//                 </div>
//                 {/* Display the mobile menu items vertically when the mobile menu is open */}
//                 {isMobileMenuOpen && (
//                     <div className='lg:hidden absolute top-full left-0 w-full bg-white'>
//                         <ul className='flex flex-col p-4'>
//                             {linkItems.map((item) => (
//                                 <li key={item.name}>
//                                     <NavLink
//                                         to={item.link}
//                                         className='text-black opacity-50 hover:text-emerald-600 transition duration-300'
//                                         activeClassName='text-emerald-600 opacity-95'
//                                         onClick={toggleMobileMenu}
//                                     >
//                                         {item.name}
//                                     </NavLink>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
                    
//                     )}
//         </div>
//     )
// }

// export default Header
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
    const linkItems = [
        { name: 'Home', link: '/' },
        { name: 'About', link: '/about' },
        { name: 'Skills', link: '/skills' },
        { name: 'Projects', link: '/projects' },
        { name: 'Resume', link: '/resume' },
        { name: 'Contact', link: '/contact' }
    ];

    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className='fixed w-full bg-white shadow-md z-10'>
            <div className='container mx-auto flex justify-between items-center p-4'>
                <div className='flex items-center'>
                    <div className=' mr-80'>
                        <h1 className='text-4xl font-bold font-mono text-black '>R</h1>
                    </div>
                    {/* Hide the navigation menu on larger screens */}
                    <ul className={`hidden lg:flex space-x-6 ${isMobileMenuOpen ? 'hidden' : ''}`}>
                        {linkItems.map((item) => (
                            <li key={item.name}>
                                <NavLink
                                    to={item.link}
                                    className={({isActive})=>`text-black opacity-50 hover:text-emerald-600 transition duration-300 ${isActive? 'text-emerald-600':''}`}
                                    activeClassName='text-emerald-600 opacity-95'
                                >
                                    {item.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Display the mobile menu button on smaller screens */}
                <div className='lg:hidden'>
                    <button className='text-2xl' onClick={toggleMobileMenu}>
                        &#9776;
                    </button>
                </div>
                {/* Display the mobile menu items vertically when the mobile menu is open */}
                {isMobileMenuOpen && (
                    <div className='lg:hidden absolute top-full left-0 w-full bg-white'>
                        <ul className='flex flex-col p-4 gap-1'>
                            {linkItems.map((item) => (
                                <li key={item.name}>
                                    <NavLink
                                        to={item.link}
                                        className='text-black opacity-50 hover:text-emerald-600 transition duration-300'
                                        activeClassName='text-emerald-600 opacity-95'
                                        onClick={toggleMobileMenu}
                                    >
                                        {item.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
