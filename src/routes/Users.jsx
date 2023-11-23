import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, List, ListItem, ListItemText, IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import '../index.css';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
  
    const handleClick = (event, userId) => {
      setAnchorEl(event.currentTarget);
      setSelectedUserId(userId);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
      setSelectedUserId(null);
    };
  
    const handleMakeAdmin = async () => {
      try {
        if (!selectedUserId) {
          console.error('ID do usuário não definido');
          return;
        }
  
        // Chama o endpoint para tornar o usuário um administrador
        const response = await fetch(`http://localhost:5000/auth/updateRole/${selectedUserId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjQ5YTEyMDkyYWZlMzNlNzU2ZDk4OSIsImlhdCI6MTY5Mzc2NTM1M30.sbJiaY4U67IVXcEUyWTD586lvARn-8VulZ4lCKkrwzI',
          },
        });
  
        const data = await response.json();
  
        if (response.ok) {
          console.log(data.msg);
          fetchUsers();
        } else {
          console.error(data.msg);
        }
      } catch (error) {
        console.error('Erro ao tornar o usuário um administrador:', error);
      }
      
      handleClose();
    };
  
    const menuOptions = [
      { label: 'Editar', action: () => handleClose() },
      { label: 'Excluir', action: () => handleClose() },
      { label: 'Tornar Admin', action: handleMakeAdmin },
    ];
  
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/auth/getAll');
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };
  
    useEffect(() => {
      // Chama a função de busca ao montar o componente
      fetchUsers();
    }, []);
  
  return (
    <Container className="users-list">
    <Typography variant="h4" gutterBottom>
      Lista de Usuários
    </Typography>

    <TextField label="Pesquisar" variant="outlined" fullWidth margin="normal" />

    <List>
      {users.map((user) => (
        <ListItem key={user._id} className="list-item">
          <ListItemText primary={user.name} />
          <IconButton onClick={(event) => handleClick(event, user._id)}>
            <MoreVert />
          </IconButton>

          <Menu style={{ boxShadow: '0' }} anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            {menuOptions.map((option, index) => (
              <MenuItem key={index} className="menu-item" onClick={option.action}>
                {option.label}
              </MenuItem>
            ))}
          </Menu>
        </ListItem>
      ))}
    </List>
  </Container>
  );
};

export default UsersList;
