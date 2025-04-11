// src/components/MainMenu.tsx
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { Box, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Icon from './Icon';

const menuItems = [
    //   { label: 'Dashboard', icon: 'dashboard', to: '/' },
    { label: 'Organizations', icon: 'office', to: '/organizations' },
    { label: 'Contacts', icon: 'users', to: '/contacts', },
    //   { label: 'Reports', icon: 'printer', to: '/reports' },
];

const MainMenu = () => {
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path);

    return (
        <Box component="nav">
            <List disablePadding>
                {menuItems.map(({ label, icon, to }) => {
                    const active = isActive(to);
                    return (
                        <ListItemButton
                            key={to}
                            component={RouterLink}
                            to={to}
                            sx={{
                                py: 1.5,
                                color: active ? 'white' : 'indigo.300',
                                '&:hover': {
                                    color: 'white',
                                    backgroundColor: 'indigo.600',
                                },
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill='#fff' viewBox="0 0 100 100"><path fill-rule="evenodd" d="M7 0h86v100H57.108V88.418H42.892V100H7V0zm9 64h11v15H16V64zm57 0h11v15H73V64zm-19 0h11v15H54V64zm-19 0h11v15H35V64zM16 37h11v15H16V37zm57 0h11v15H73V37zm-19 0h11v15H54V37zm-19 0h11v15H35V37zM16 11h11v15H16V11zm57 0h11v15H73V11zm-19 0h11v15H54V11zm-19 0h11v15H35V11z"></path></svg>
                            </ListItemIcon>
                            <ListItemText
                                primary={label}
                                primaryTypographyProps={{
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                    color: active ? 'white' : '#c7d2fe', // fallback indigo-300
                                }}
                            />
                        </ListItemButton>
                    );
                })}
            </List>
        </Box>
    );
};

export default MainMenu;
