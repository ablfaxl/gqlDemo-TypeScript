import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import {Typography, Divider} from '@mui/material'
import {Link,Outlet} from 'react-router-dom'
import '../App.css'
import MenuIcon from '@mui/icons-material/Menu';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function Sidebar() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List sx={{p:2, paddingTop:4}}>
        <Link to='/add-writer' style={{textDecoration:"none",color:"black"}}>
      <Typography>
        Add Writer
      </Typography>
        </Link>
        {/* "" */}
      <Divider sx={{paddingBottom:4}} />
        <Link to='/add-book' style={{textDecoration:"none",color:"black"}}>
      <Typography sx={{marginTop:4}}>
        Add Book
      </Typography>
        </Link>
      </List>
    </Box>
  );

  return (
    <div className='background' style={{height:"100vh"}}>
      {(['left'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
          sx={{":hover":{bgcolor:"transparent", color:"transparent"}}}
          onClick={toggleDrawer(anchor, true)}
          >
          <MenuIcon 
          sx={{color:"white",padding:1,marginLeft:2,marginTop:2,fontSize:50,"hover":{color:"black"}}}  />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
      <Outlet />
    </div>
  );
}