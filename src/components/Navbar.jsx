import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
  Avatar,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import { useAuth } from '../api/authContext.jsx';
import { Logout } from '../api/login.js';

function Navbar() {
  const { user, setUser } = useAuth();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    await Logout();
    setUser(null);
  };

  // Adicionando um useEffect para limpar os estados ao desmontar o componente


  return (
  
    <AppBar  sx={{
     backgroundColor:'white',
     position: 'fixed',
     boxShadow: 'rgba(0.4, 0.4, 0.4, 0.2) 3px 2px 8px',
     marginBottom:'5rem'
    }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
  
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
          
            }}
          >
        <Link to="/" >
             <img
    src={Logo}
    alt="Logo da sua empresa"
    style={{
    width: '9rem',
    height:'4rem',
     // Defina a largura máxima da imagem conforme necessário
    marginRight: '10px', // Adicione margem direita para espaço entre a imagem e o texto
  }}
/>
</Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              style={{ color: 'gray' }} // Defina a cor personalizada aqui

            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Vídeos</Typography>
                </MenuItem>

            </Menu>
            
          </Box>
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
            }}
          >
        <Link to="/">

            <img
    src={Logo}
    alt="Logo da sua empresa"
    style={{
      width: '9rem',
      height:'4rem', 
    marginRight: '10px', // Adicione margem direita para espaço entre a imagem e o texto
  }}
/>
</Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Link to="/videos">

              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'gray', display: 'block' , '&:hover': {
                  color: '#d7683a', backgroundColor:'#fcf5ea'
                },}}
              >
           Videos
              </Button>
    
              </Link>

              <Link to="/agenda">

<Button
  onClick={handleCloseNavMenu}
  sx={{ my: 2, color: 'gray', display: 'block' , '&:hover': {
    color: '#d7683a', backgroundColor:'#fcf5ea'
  },}}
>
Agenda
</Button>

</Link>



              <Link to="/orcamento">

<Button
  onClick={handleCloseNavMenu}
  sx={{ my: 2, color: 'gray', display: 'block' , '&:hover': {
    color: '#d7683a', backgroundColor:'#fcf5ea'
  },}}
>
Orçamento
</Button>
</Link>
        
          </Box>
          <div>

{user ? (
  <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, display: "flex", alignItems: "center" }}>
          <Avatar alt="Remy Sharp" src="">
          </Avatar>
          <Typography variant="subtitle1" sx={{ marginLeft: 1, color: "gray" }}>
            {user.user.name}
          </Typography>
        </IconButton>
      </Tooltip>

  <Menu
    sx={{ mt: '45px' }}
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
      <Link to="/" >
        <Typography textAlign="center" sx={{color:'gray'}}>Perfil</Typography>
        </Link>
      </MenuItem>
      <MenuItem onClick={handleCloseUserMenu}>
      <Button onClick={handleLogout}>        
      <Typography textAlign="center" sx={{color:'gray'}}>Sair</Typography>
        </Button>
      </MenuItem>
  </Menu>
</Box>
) : (
  <Link to="/entrar">

  <Button
    sx={{ my: 2, color: '#d7683a', backgroundColor:'#fcf5ea', display: 'block' , '&:hover': {
      color: '#ba5a32', backgroundColor:'#f2e4ce'
    },}}
  >
Entrar
  </Button>

  </Link>
)}
</div>
          
        </Toolbar>
      </Container>
    </AppBar>
  );
  }

export default Navbar;

