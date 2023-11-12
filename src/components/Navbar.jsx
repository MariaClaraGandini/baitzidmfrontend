import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Logo from   '../assets/logo.svg'
import { Link } from 'react-router-dom';



function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="" />
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
                <Link to="/" >
                  <Typography textAlign="center" sx={{color:'gray'}}>Sair</Typography>
                  </Link>
                </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;

