import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

type Anchor = 'top' | 'left' | 'bottom' | 'right';


export default function MenuDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
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
      <div className='' style={{color:"lightblue",fontSize:"20px",padding:"0 0 0 15px",margin:"75px 0 20px 0"}}>Time-Series Analysis</div>
      <Divider />
      <br />
      <List>
            {[
              { text: 'Totals and Averages', link: '/time-series/totals-averages' },
              { text: 'Risk and Probabilities', link: '/time-series/risk-probabilities' },
              { text: 'Over/Under', link: '/time-series/over-under' },
              { text: 'Yes/No', link: '/time-series/yes-no' },
            ].map((item, index) => (
              <a key={item.text} href={item.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              </a>
            ))}
      </List>



      <div className='' style={{color:"cadetblue",fontSize:"20px",padding:"0 0 0 15px",margin:"70px 0 20px 0"}}>Dimensional Analysis</div>
      <Divider />
       <List>
       {[
         { text: 'Hour of Day', link: '/dimensional/hour-of-day' },
         { text: 'Bet Selection', link: '/dimensional/bet-selection' },
        //  { text: 'Countries', link: '/dimensional/countries' },
         { text: 'Single vs Multi', link: '/dimensional/single-vs-multi' },
         { text: 'Line Components', link: '/dimensional/line-components' }, // Add the new item here
       ].map((item, index) => (
         <a key={item.text} href={item.link} style={{ textDecoration: 'none', color: 'inherit' }}>
           <ListItem disablePadding>
             <ListItemButton>
               <ListItemText primary={item.text} />
             </ListItemButton>
           </ListItem>
         </a>
       ))}
     </List>

    </Box>
  );

  return (
    <>
      {(['left'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}> A N A L Y T I C S &nbsp; M E N U</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </>
  );
}