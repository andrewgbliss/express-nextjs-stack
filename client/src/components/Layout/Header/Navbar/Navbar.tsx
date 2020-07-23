import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import Logo from 'components/Logo/Logo';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import { useTheme, Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import lightBlue from '@material-ui/core/colors/lightBlue';
import AuthLink, { MenuAuthLink } from 'components/AuthLink/AuthLink';

interface ScrollProps {
  children: React.ReactElement;
  showLogin?: boolean;
}

const HideOnScroll: React.FC<ScrollProps> = (props) => {
  const { children } = props;
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(lightBlue[500]),
    backgroundColor: lightBlue[100],
    '&:hover': {
      backgroundColor: lightBlue[700],
    },
  },
}))(IconButton);

interface NavLinkProps {
  href: string;
  children: string;
}

const NavLink: React.FC<NavLinkProps> = (props) => {
  const { href, children } = props;
  return (
    <Box pl={1}>
      <Button href={href} style={{ color: '#fff' }} component="a">
        {children}
      </Button>
    </Box>
  );
};

interface MenuLinkProps {
  href: string;
  children: string;
}

const MenuLink: React.FC<MenuLinkProps> = (props) => {
  const { href, children, ...rest } = props;
  return (
    <MenuItem component="a" href={href} {...rest}>
      {children}
    </MenuItem>
  );
};

interface Props {
  showLogin?: boolean;
}

const Navbar: React.FC<Props> = (props) => {
  const [menu, setMenu] = useState<null | HTMLElement>(null);
  const open: boolean = Boolean(menu);
  const handleOpen = (e: React.MouseEvent<HTMLElement>) =>
    setMenu(e.currentTarget);
  const handleClose = () => setMenu(null);
  const theme: Theme = useTheme();
  const mobile: boolean = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <HideOnScroll>
        <AppBar
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <Toolbar>
            <Grid container justify="space-between">
              {mobile && (
                <Grid item>
                  <Box p={1}>
                    <ColorButton onClick={handleOpen}>
                      <MenuIcon />
                    </ColorButton>
                  </Box>
                  <Menu
                    anchorEl={menu}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuLink href="#home">Home</MenuLink>
                    <MenuLink href="#about">About</MenuLink>
                    <MenuLink href="#features">Features</MenuLink>
                    <MenuLink href="#pricing">Pricing</MenuLink>
                    <MenuAuthLink showLogin={props.showLogin} />
                  </Menu>
                </Grid>
              )}
              <Grid item>
                <Box p={2}>
                  <Grid container>
                    <Logo size={24} />
                  </Grid>
                </Box>
              </Grid>
              {!mobile && (
                <Grid item>
                  <Box p={2}>
                    <Grid container>
                      <NavLink href="#home">Home</NavLink>
                      <NavLink href="#about">About</NavLink>
                      <NavLink href="#features">Features</NavLink>
                      <NavLink href="#pricing">Pricing</NavLink>
                      <Box pl={1}>
                        <AuthLink showLogin={props.showLogin} />
                      </Box>
                    </Grid>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </>
  );
};

export default Navbar;
