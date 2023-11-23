import React from 'react';
import { Container, Typography, TextField, List, ListItem, ListItemText, IconButton, Menu, MenuItem } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import '../index.css';

const UsersList = () => {
  // Mock data for users
  const users = [
    { id: 1, name: 'User 1', isAdmin: false },
    { id: 2, name: 'User 2', isAdmin: true },
    // Add more users as needed
  ];

  // State for menu anchor
  const [anchorEl, setAnchorEl] = React.useState(null);

  // Function to handle menu click
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Function to handle menu close
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Menu options
  const menuOptions = [
    { label: 'Editar', action: () => handleClose() }, // Add edit functionality
    { label: 'Excluir', action: () => handleClose() }, // Add delete functionality
    { label: 'Tornar Admin', action: () => handleClose() }, // Add make admin functionality
  ];

  return (
    <Container className="users-list">
      <Typography variant="h4" gutterBottom>
        Lista de Usuários
      </Typography>

      <TextField label="Pesquisar" variant="outlined" fullWidth margin="normal" />

      <List>
        {users.map((user) => (
          <ListItem key={user.id}>
            <ListItemText primary={user.name} />
            <IconButton onClick={handleClick}>
              <MoreVert />
            </IconButton>

            {/* User options menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {menuOptions.map((option, index) => (
                <MenuItem key={index} onClick={option.action}>
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
