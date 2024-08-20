import IconPlacer from "../common/IconPlacer"
import MobileLink from "./MobileLink"

const mobileLinks = [
    {
        title: "About Based Agent",
        childLinks: [
            {
                title: "About",
                path: "/about",
            },
            {
                title: "BAAG Token",
                path: "/baag-token",
            },
            {
                title: "Protection Fund",
                isExternal: true,
                path: "https://github.com/Morlabs/BasedAgent1/blob/main/README.md#based-agent-protection-fund",
            },
            {
                title: "MOR20 Platform!!",
                isExternal: true,
                path: "https://mor.org/MOR20",
            },
        ]
    },
    {
        title: "Contribute",
        path: "https://github.com/Morlabs/BasedAgent/blob/main/Contribute/contribution_guidelines.md"
    },
    {
        title: "Resources",
        childLinks: [
            {
                title: "Docs",
                isExternal: true,
                path: "https://github.com/Morlabs/BasedAgent1/blob/main/README.md",
            },
            {
                title: "FAQs",
                path: "/faqs",
            },
        ]
    }
]

function ResponsiveDrawer({ handleToggle }) {


    return (
        <div className="responsive-drawer">
            <IconPlacer onClick={handleToggle} iconName="close-circle-outline" />

            <div className="mobile-navlinks">
                {mobileLinks.map((mobileLink, idx) => (
                    <MobileLink
                        handleToggle={handleToggle}
                        link={mobileLink}
                        key={idx}
                    />
                )
                )}
            </div>
        </div>
    )
}

export default ResponsiveDrawer
