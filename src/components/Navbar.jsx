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
import URL from '../api/config'


function Navbar() {
  const { token } = useAuthToken();
  const { deleteToken } = useAuthToken();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [user, setUser] = useState(null);
  const [hasPermission, setHasPermission] = useState(false); // Adicione o estado para indicar se o usuário tem permissão
  const location = useLocation();
  const isUsuariosActive = location.pathname === '/usuarios';
  const isFeriasActive = location.pathname === '/ferias';

  const navigate = useNavigate();
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

  useEffect(() => {
    async function checkPermission() {
      try {
        const response = await axios.get(`${URL}/usuarios/permissao`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
          setHasPermission(true); 
        
      } catch (error) {
        if (error.response && error.response.status === 402) {
          setHasPermission(false);
        }
        if (error.response && error.response.status === 403 || error.response && error.response.status === 440) {
          navigate('/');
          localStorage.removeItem('token');
          window.location.reload();
          setHasPermission(false);
        }
        else{
          console.error('Erro ao verificar permissão:', error);
        
        }
      }
    }
    if (token) {
      checkPermission();
      const intervalId = setInterval(checkPermission, 60000); // Verifica a autenticação a cada minuto

      // Limpar intervalo ao desmontar o componente
      return () => clearInterval(intervalId);
    } 
  }, [token, user, navigate]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

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
                  marginRight: '10px',
                }}
              />
            </Link>
          </Typography>

          <div className='flex items-center justify-between'>
  <div>
    {hasPermission && ( 
      <div className='flex'>// Verifica se o usuário tem permissão
     <NavLink
     to="/usuarios"
     style={{
       textDecoration: 'none',
       marginRight: '10px',
       width: '5rem',
       px: 2,
       textAlign: 'center',
       display: 'flex', // Adiciona display: flex
       alignItems: 'center', // Centraliza verticalmente
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
     <NavLink
     to="/ferias"
     style={{
       textDecoration: 'none',
       marginRight: '10px',
       width: '5rem',
       px: 2,
       textAlign: 'center',
       display: 'flex', // Adiciona display: flex
       alignItems: 'center', // Centraliza verticalmente
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
         ...(isFeriasActive && { borderBottom: '3px solid #1658f2', color: '#1658f2' })
       }}
     >
       Férias
     </Typography>
   </NavLink>
   </div>
    )}
  </div>
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
