import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Grid, Typography } from '@mui/material';
import ClockSideBar from './ClockSideBar';
import changeLanguage from '../../lang/index';
import { useSelector } from 'react-redux';


const drawerWidth = 240;

function SideBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { language } = useSelector((state) => state.settingsReducer);
  const [languageUser, setLanguageUser] = useState(changeLanguage('en'));


  useEffect(() => {
    setLanguageUser(changeLanguage(language))
  }, [language])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Grid padding={2} sx={{ textAlign: "center", height: "64px" }}>
        <Typography sx={{ fontSize: 20, fontWeight: 700 }} >Core-Admin</Typography>
      </Grid>
      <Divider />
      <List >
        <ListItem disablePadding alignItems="center">
          <ListItemButton href='/dashboard'>
            <ListItemText>{languageUser.dashboard}</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding alignItems="center">
          <ListItemButton href={route('user.index')}>
            <ListItemText>{languageUser.users}</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding alignItems="center">
          <ListItemButton href={route('role.index')}>
            <ListItemText>{languageUser.roles}</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding alignItems="center">
          <ListItemButton href={route('setting.index')}>
            <ListItemText>{languageUser.settings}</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding alignItems="center">
          <ListItemButton href={route('deleted.index')}>
            <ListItemText>{languageUser.deleted}</ListItemText>
          </ListItemButton>
        </ListItem>
        <ClockSideBar />
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >

      </Box>
    </Box>
  );
}

SideBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default SideBar;
