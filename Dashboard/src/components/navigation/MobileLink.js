import { useState } from "react"
import { Link } from "react-router-dom"
import IconPlacer from "../common/IconPlacer"

function MobileLink({ link, handleToggle }) {
    const [showChildren, setShowChildren] = useState(false)

    function toggleShowChildren() {
        setShowChildren(!showChildren)
    }
    return (
        <section className="mobile-link">
            {link.childLinks && link.childLinks ? (
                <span
                    onClick={toggleShowChildren}
                    className="mobile-link-title"
                >
                    <span>
                        {link.title}
                    </span>
                    <IconPlacer
                        iconName={`caret-${showChildren ? 'down' : 'forward'}-outline`}
                        size="small"
                    />
                </span>
            ) : (
                <a target='_blank' onClick={handleToggle} rel='noopener noreferrer' className="hyperlink mobile-link-title" href={link.path || "#"}>{link.title}</a>
            )}
            {showChildren && (
                <section className="child-links">
                    {showChildren ? (
                        link.childLinks && link.childLinks.map((childLink, idx) => (
                            childLink.isExternal ? (
                                <a key={idx} href={childLink.path} onClick={handleToggle} target='_blank' rel='noopener noreferrer' className="hyperlink">{childLink.title}</a>
                            ) : (
                                <Link key={idx} to={childLink.path} onClick={handleToggle} className="hyperlink">{childLink.title}</Link>
                            )
                        ))
                    ) : null}
                </section>
            )}

        </section>
    )
}

export default MobileLink
