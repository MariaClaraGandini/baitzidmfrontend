import  { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, MenuItem, Tooltip } from '@mui/material';
import Container from '@mui/material/Container';
import Logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { useAuthToken } from '../api/AuthToken'; // Importe o hook useAuthToken
import { Logout } from '../api/login.js';
import axios from 'axios'; // Importe o axios
import { Avatar } from 'flowbite-react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate para Vite

function Navbar() {
  const { token, setToken, deleteToken } = useAuthToken(); // Adicione setToken para atualizar o token
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [user, setUser] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);
  const navigate = useNavigate();
  const isUsuariosActive = location.pathname === '/usuarios';

  const decodeToken = (token) => {
    if (token) {
      const tokenParts = token.split('.');
      const payload = JSON.parse(atob(tokenParts[1]));
      return payload; // Retornar o payload completo para obter todos os dados
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (token) {
      const decodedToken = decodeToken(token); // Decodificar o token JWT manualmente
      setUser(decodedToken);
    }
  }, [token]);

  useEffect(() => {
    async function checkPermission() {
      try {
        const response = await axios.get('http://localhost:3000/usuarios/permissao', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          setHasPermission(true);
        }
      } catch (error) {
        console.error('Erro ao verificar permissão:', error);

        setHasPermission(false);
      }
    }

    if (user) {
      checkPermission();
    }
  }, [token, user]);

  useEffect(() => {
    async function checkAndRenewToken() {
      try {
        const response = await axios.get('http://localhost:3000/usuarios/token', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const newToken = response.headers['x-access-token'];
        if (newToken) {
          setToken(newToken); // Update the token in frontend state
          const decodedToken = decodeToken(newToken);
          setUser(decodedToken);
          console.log(newToken)
        }
  
      } catch (error) {
        navigate('/');
        deleteToken();
        window.location.reload();
        setHasPermission(false);
      }
    }

    if (user) {
      checkAndRenewToken();
      const intervalId = setInterval(checkAndRenewToken, 1200000); // Verifica a autenticação a cada minuto

      // Limpar intervalo ao desmontar o componente
      return () => clearInterval(intervalId);
    }
  }, [token, user, navigate, setToken, deleteToken]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    await deleteToken();
    setUser(null);
    navigate('/');
  };

  return (
    <AppBar
      sx={{
        backgroundColor: 'white',
        boxShadow: 'rgba(0.2, 0.2, 0.2, 0.1) 2px 1px 6px',
      }}
    >
      <Container maxWidth="xl2">
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

          <div className='flex items-center justify-between'>
            {(hasPermission && user) && (
              <NavLink
                to="/usuarios"
                style={{
                  textDecoration: 'none',
                  marginRight: '10px',
                  width: '5rem',
                  px: 2,
                  textAlign: 'center',
                }}
              >
                <Typography
                  sx={{
                    mt: 0.5,
                    py: 0.5,
                    textAlign: 'center',
                    color: 'gray',
                    textTransform: 'none',
                    display: 'block',
                    '&:hover': {
                      borderBottom: '3px solid #1658f2',
                      color: '#1658f2'
                    },
                    ...(isUsuariosActive && { borderBottom: '3px solid #1658f2', color: '#1658f2' })
                  }}
                >
                  Usuários
                </Typography>
              </NavLink>
            )}

            {user && (
              <Box sx={{ flexGrow: 0, px: 2 }}>
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0, display: 'flex', alignItems: 'center', borderRadius: '0px' }}
                  >
                    <Avatar alt="Avatar" rounded />
                    <Typography variant="subtitle1" sx={{ marginLeft: 1, color: 'gray' }}>
                      {user.username} {/* Exibindo o nome de usuário */}
                    </Typography>
                  </IconButton>
                </Tooltip>

                <Menu
                  sx={{ mt: '30px', p: 2, width: '100%' }}
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
                    <Link to="/alterarsenha" style={{ textDecoration: 'none' }}>
                      <Typography textAlign="center" sx={{ color: 'gray' }}>
                        Redifinir Senha
                      </Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem sx={{ width: '100%' }} onClick={handleCloseUserMenu}>
                    <Typography
                      onClick={handleLogout}
                      textAlign="center"
                      sx={{ color: 'gray' }} // Alterando o cursor para parecer um botão clicável
                    >
                      Sair
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
