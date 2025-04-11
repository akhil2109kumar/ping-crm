// // src/layouts/MinimalLayout.tsx
// import { ReactNode, useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// import {
//   AppBar,
//   Toolbar,
//   Box,
//   Typography,
//   IconButton,
//   Menu,
//   MenuItem,
//   Container,
//   Divider,
//   Drawer,
//   useMediaQuery,
//   Theme,
//   Button,
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';

// import Logo from "../../public/images/logo.png"
// import MainMenu from '../components/MainMenu';


// type MinimalLayoutProps = {
//   children: ReactNode;
//   user: {
//     id: string;
//     first_name: string;
//     last_name: string;
//     account: {
//       name: string;
//     };
//   };
// };

// const MinimalLayout = ({ children, user }: MinimalLayoutProps) => {
//     const isMobile = useMediaQuery('(max-width:960px)'); // MUI 'md' breakpoint is 960px

//   const [mainMenuAnchorEl, setMainMenuAnchorEl] = useState<null | HTMLElement>(null);
//   const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(null);

//   const handleMainMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
//     setMainMenuAnchorEl(event.currentTarget);
//   };

//   const handleMainMenuClose = () => {
//     setMainMenuAnchorEl(null);
//   };

//   const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
//     setUserMenuAnchorEl(event.currentTarget);
//   };

//   const handleUserMenuClose = () => {
//     setUserMenuAnchorEl(null);
//   };

//   return (
//     <Box display="flex" flexDirection="column" minHeight="100vh">
//       <AppBar position="static" sx={{ bgcolor: 'indigo.900' }}>
//         <Toolbar sx={{ justifyContent: 'space-between' }}>
//           <Box display="flex" alignItems="center">
//             <RouterLink to="/" aria-label="Home">
//             <img src={Logo} alt="Logo" width={120} height={28} />
//             </RouterLink>
//           </Box>

//           {isMobile ? (
//             <IconButton
//               color="inherit"
//               onClick={handleMainMenuOpen}
//               aria-label="Open main menu"
//               size="large"
//             >
//               <MenuIcon />
//             </IconButton>
//           ) : (
//             <Box />
//           )}
//         </Toolbar>
//       </AppBar>

//       <Drawer anchor="right" open={Boolean(mainMenuAnchorEl)} onClose={handleMainMenuClose}>
//         <Box width={240} p={2}>
//           <MainMenu />
//         </Box>
//       </Drawer>

//       <Box display="flex" justifyContent="space-between" alignItems="center" px={3} py={2} borderBottom={1} borderColor="divider">
//         <Typography variant="body1">{user.account.name}</Typography>
//         <Box>
//           <Menu
//             anchorEl={userMenuAnchorEl}
//             open={Boolean(userMenuAnchorEl)}
//             onClose={handleUserMenuClose}
//             transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//             anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//           >
//             <MenuItem component={RouterLink} to={`/users/${user.id}/edit`}>
//               My Profile
//             </MenuItem>
//             <MenuItem component={RouterLink} to="/users">
//               Manage Users
//             </MenuItem>
//             <Divider />
//             <form action="/logout" method="POST">
//               <MenuItem type="submit" component="button">
//                 Logout
//               </MenuItem>
//             </form>
//           </Menu>
//         </Box>
//       </Box>

//       <Box display="flex" flexGrow={1} overflow="hidden">
//         {!isMobile && (
//           <Box width={240} bgcolor="indigo.800" color="white" p={3} sx={{ overflowY: 'auto' }}>
//             <MainMenu />
//           </Box>
//         )}
        
//       </Box>
//     </Box>
//   );
// };

// export default MinimalLayout;








// src/layouts/MinimalLayout.tsx
import { useState } from 'react';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Drawer,
  useMediaQuery,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import Logo from '../../public/images/logo.png';
import MainMenu from '../components/MainMenu';

type MinimalLayoutProps = {
  user: {
    id: string;
    first_name: string;
    last_name: string;
    account: {
      name: string;
    };
  };
};

const MinimalLayout = ({ user }: MinimalLayoutProps) => {
  const isMobile = useMediaQuery('(max-width:960px)');

  const [mainMenuAnchorEl, setMainMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleMainMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMainMenuAnchorEl(event.currentTarget);
  };

  const handleMainMenuClose = () => {
    setMainMenuAnchorEl(null);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {/* Top App Bar */}
      <AppBar position="static" sx={{ bgcolor: '#FFF', boxShadow: 'none', height: 64 }}>
        <Toolbar sx={{ justifyContent: 'space-between', width: 176, bgcolor: '#191e38', paddingInline: 0 }}>
          <Box display="flex" alignItems="center" padding={3}>
            <RouterLink to="/" aria-label="Home">
              <svg viewBox="0 0 1185 266" xmlns="http://www.w3.org/2000/svg" fill="white" width="120" height="28"><path d="M77.463 265c-19.497 0-35.318-15.405-35.318-34.39v-22.054C17.987 202.676 0 181.326 0 155.948V55.206C0 25.291 24.946 1 55.668 1h154.664C241.054 1 266 25.29 266 55.206v100.806c0 29.916-24.946 54.206-55.668 54.206H145.67c-2.823 0-5.383 1.407-6.827 3.58-10.7 17.067-24.158 31.897-39.98 43.915-6.236 4.794-13.654 7.287-21.4 7.287zM55.701 27.336c-15.771 0-28.65 12.465-28.65 27.87v100.806c0 15.342 12.813 27.87 28.65 27.87 7.49 0 13.536 5.881 13.536 13.168v33.624c0 4.922 4.272 7.99 8.214 7.99 1.709 0 3.286-.575 4.732-1.662 13.273-10.1 24.576-22.565 33.578-36.947 6.309-10.036 17.743-16.237 29.965-16.237h64.727c15.77 0 28.65-12.464 28.65-27.87V55.206c0-15.341-12.814-27.87-28.65-27.87H55.7z"></path><path d="M395.752 2.4c37.152 0 65.088 27.936 65.088 64.8 0 36.576-27.936 64.8-65.088 64.8h-46.368v72H322.6V2.4h73.152zm0 104.544c22.176 0 38.592-16.992 38.592-39.744 0-23.04-16.416-39.744-38.592-39.744h-46.368v79.488h46.368zM502.6 33.792c-9.504 0-16.992-7.488-16.992-16.704 0-9.216 7.488-16.992 16.992-16.992 9.216 0 16.704 7.776 16.704 16.992 0 9.216-7.488 16.704-16.704 16.704zM489.928 204V60h25.056v144h-25.056zM625 56.256c33.696 0 55.872 22.464 55.872 59.328V204h-25.056v-86.976c0-23.616-13.536-36.864-35.712-36.864-23.04 0-41.76 13.536-41.76 47.52V204h-25.056V60h25.056v20.736C589 63.744 604.84 56.256 625 56.256zM835.24 60h24.768v137.952c0 44.928-36 67.392-73.44 67.392-32.256 0-56.448-12.384-68.256-35.136l21.888-12.384c6.624 13.536 18.72 24.192 46.944 24.192 29.952 0 48.096-16.992 48.096-44.064v-20.448c-11.52 17.568-29.952 28.8-54.144 28.8-40.896 0-73.44-33.12-73.44-75.168 0-41.76 32.544-74.88 73.44-74.88 24.192 0 42.624 10.944 54.144 28.512V60zm-51.264 122.4c29.088 0 51.264-22.176 51.264-51.264 0-28.8-22.176-50.976-51.264-50.976-29.088 0-51.264 22.176-51.264 50.976 0 29.088 22.176 51.264 51.264 51.264zM946.8 205.08c-28.21 0-45.63-20.8-41.08-48.88 4.42-27.17 26.91-46.28 53.56-46.28 19.37 0 31.59 9.36 38.35 22.36l-23.79 12.61c-3.25-5.85-9.1-9.49-16.9-9.49-12.35 0-23.14 9.23-25.35 22.1-2.08 11.83 4.29 22.1 17.16 22.1 8.06 0 13.91-4.03 18.59-10.14l21.58 13.65c-9.36 13.78-24.44 21.97-42.12 21.97zm126.36-59.93c-1.95 11.18-8.58 19.5-18.2 24.44l11.7 33.28h-26l-9.36-28.6h-8.32l-5.07 28.6h-26l16.12-91h36.4c18.33 0 32.24 13.65 28.73 33.28zm-43.42-9.36l-2.99 16.9h10.66c5.07.13 8.84-2.99 9.75-8.32.91-5.33-1.82-8.58-7.02-8.58h-10.4zM1184.05 112l-15.99 91h-26l7.67-43.81-25.48 33.54h-2.34l-14.82-35.23-7.93 45.5h-26l15.99-91h26l13.65 37.31 27.95-37.31h27.3z"></path></svg>
            </RouterLink>

          </Box>
          {isMobile && (
            <IconButton
              color="inherit"
              onClick={handleMainMenuOpen}
              aria-label="Open main menu"
              size="large"
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer for Sidebar */}
      <Drawer anchor="right" open={Boolean(mainMenuAnchorEl)} onClose={handleMainMenuClose}>
        <Box width={240} p={2}>
          <MainMenu />
        </Box>
      </Drawer>

      {/* Account Info Bar */}
      {/* <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={3}
        py={2}
        borderBottom={1}
        borderColor="divider"
      >
        <Typography variant="body1">{user.account.name}</Typography>
        
      </Box> */}

      {/* Main Content Area */}
      <Box display="flex" flexGrow={1} overflow="hidden">
        {/* Sidebar (only on desktop) */}
        {!isMobile && (
          <Box width={224} bgcolor="#2f365f" color="white" py={3} sx={{ overflowY: 'auto', minWidth: 224 }}>
            <MainMenu />
          </Box>
        )}

        {/* Page Content */}
        <Box flexGrow={1} p={3} sx={{ overflowY: 'auto' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MinimalLayout;

