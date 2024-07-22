import React, { useState } from 'react';
import DesktopNavbar from './DesktopNavbar';
import ResponsiveNavbar from './ResponsiveNavbar';

function Navbar() {
    const [menuActive, setMenuActive] = useState(false);

    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    return (
        <>
            <DesktopNavbar
                toggleMenu={toggleMenu}
                menuActive={menuActive}
            />
            <ResponsiveNavbar />
        </>
    )
}

export default Navbar
