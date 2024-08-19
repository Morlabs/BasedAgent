import { useState } from "react"
import Logo from "../branding/Logo"
import IconPlacer from "../common/IconPlacer"
import ResponsiveDrawer from "./ResponsiveDrawer"

function ResponsiveNavbar() {
    const [drawerOpen, setDrawerOpen] = useState(false)

    function closeDrawer() {
        setDrawerOpen(false)
    }

    function openDrawer() {
        setDrawerOpen(true)
    }

    return (
        <div className="mobile-navbar">
            <Logo />
            <button onClick={openDrawer} className="menu-button">
                <IconPlacer />
            </button>
            {drawerOpen ? <ResponsiveDrawer handleToggle={closeDrawer} /> : null}
        </div>
    )
}

export default ResponsiveNavbar
