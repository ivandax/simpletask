import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from "@material-ui/core";
import { Menu as MenuIcon, Settings as SettingsIcon } from "@material-ui/icons";

import { useHeaderStyles } from "./styles";

interface HeaderProps {
    session: string;
}

const Header = ({ session }: HeaderProps): JSX.Element => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleOpenSettingsMenu = (event: React.MouseEvent<HTMLButtonElement>): void => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseSettingsMenu = (): void => {
        setAnchorEl(null);
    };
    const classes = useHeaderStyles();
    return (
        <AppBar position="sticky">
            <Toolbar variant="dense">
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" className={classes.title}>
                    SimpleTask
                </Typography>
                <IconButton
                    color="inherit"
                    aria-label="settings"
                    aria-controls="settings-menu"
                    aria-haspopup="true"
                    onClick={handleOpenSettingsMenu}
                >
                    <SettingsIcon />
                </IconButton>
                <Menu
                    id="settings-menu"
                    open={anchorEl !== null}
                    keepMounted
                    anchorEl={anchorEl}
                    onClose={handleCloseSettingsMenu}
                >
                    <MenuItem>My Profile</MenuItem>
                    <MenuItem onClick={(): void => console.log(session)}>Logout</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
