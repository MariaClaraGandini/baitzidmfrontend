import  { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import Container from '@mui/material/Container';
import Logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { useAuthToken } from '../api/AuthToken'; // Importe o hook useAuthToken
import { Logout } from '../api/login.js';

import { Avatar } from 'flowbite-react';



function Navbar() {
  const { token } = useAuthToken(); 
  const { deleteToken } = useAuthToken(); 
  // const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [user, setUser] = useState(null); // Adicione o estado para armazenar as informações do usuário
  useEffect(() => {
    if (token) {
      const decodedToken = decodeToken(token); // Decodificar o token JWT manualmente
      setUser(decodedToken);
    }
  }, [token]);

  const decodeToken = (token) => {
    if (token) {
      const tokenParts = token.split('.');
      const payload = JSON.parse(atob(tokenParts[1]));
      const username = payload.username;
      // Retorne os dados decodificados
      return { username };
    } else {
      return null;
    }
  };

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    await Logout(deleteToken);
    setUser(null);
  };

  return (
    <AppBar
      sx={{
        backgroundColor: 'white',
        position: 'fixed',
        boxShadow: 'rgba(0.2, 0.2, 0.2, 0.1) 2px 1px 6px',
        marginBottom: '5rem',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <img
                src={Logo}
                alt="Logo Baitz"
                style={{
                  width: '9rem',
                  height: '3rem',
                  marginRight: '10px',
                }}
              />
            </Link>
          </Typography>

          <div>
            {user ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    
                    sx={{ p: 0, display: 'flex', alignItems: 'center', borderRadius:'0px' }}
                  >
                    <Avatar alt="Avatar" rounded  />
                    <Typography variant="subtitle1" sx={{ marginLeft: 1, color: 'gray' }}>
                      {user.username} {/* Exibindo o nome de usuário */}
                    </Typography>
                  </IconButton>
                </Tooltip>

                <Menu
                  sx={{ mt: '45px', width:'100%' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                      <Typography textAlign="center" sx={{ color: 'gray' }}>
                      {user.username}
                      </Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem sx={{width:'100%'}} onClick={handleCloseUserMenu}>
                    <Typography
                      onClick={handleLogout}
                      textAlign="center"
                      sx={{ color: 'gray'  }} // Alterando o cursor para parecer um botão clicável
                    >
                      Sair
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <div />
            )}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
