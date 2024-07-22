function IconPlacer({ iconName = "menu-outline", size = 'large', onClick }) {
    return (
        <span className="icon-placer" onClick={onClick}>
            <ion-icon size={size} name={iconName}></ion-icon>
        </span>
    )
}

export default IconPlacer
