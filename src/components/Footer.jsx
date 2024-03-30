import React from 'react';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
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
import Logo from   '../assets/logo.png'
import InstagramIcon from '../assets/icons/instagram.svg';
import FacebookIcon from '../assets/icons/facebook.svg';
import YoutubeIcon from '../assets/icons/youtube.svg';
import SpotifyIcon from '../assets/icons/spotify.svg';
import Email from   '../assets/icons/email.svg';
import Telephone from '../assets/icons/telephone.svg'



import { Link } from 'react-router-dom';



function Navbar() {

  return (
   <div className="footercontainer" >
            <Grid container  className="griditem" style={{padding:"2rem"}}>
                <Grid  item xs={12} sm={3}>
                    <div >
                        <img className="footerlogo" src={Logo}/>
                        <p>Cantamos a trilha sonora de momentos especiais! </p>
                    </div>
                </Grid>
                <Grid item className="gridtem" xs={12} sm={3}>
                <div>
                        <p className="navegue">Navegue</p>
                        <p className="link">Vídeos</p>
                        <p className="link">Orçamento</p>
                        <p className="link">Minha conta</p>


                    </div>
                </Grid>
                <Grid item xs={12} sm={3}>
                <div>
                <p className="navegue">Contato</p>
                <a className="iconcontainerfooter" href="https://www.instagram.com/belamur.duo/">
                        <div>
                            <img src={Email} className="iconfooterimg"/>
                        </div>
                        <div>
                            <p style={{marginBottom:'1.5rem'}}>contato.belamur@gmail.com</p>
                        </div>
                        </a>
                        <a className="iconcontainerfooter" href="https://www.instagram.com/belamur.duo/">
                        <div>
                            <img src={Telephone} className="iconfooterimg"/>
                        </div>
                        <div>
                            <p style={{marginBottom:'1.5rem'}}>(16) 99790-0575</p>
                        </div>
                        </a>

                    </div>
                </Grid>
                <Grid item xs={12} sm={3}>
                <div >
                <p className="navegue">Redes sociais</p>
                <a className="iconcontainerfooter" href="https://www.instagram.com/belamur.duo/">
                        <div>
                            <img src={InstagramIcon} className="iconfooterimg"/>
                        </div>
                        <div>
                            <p style={{marginBottom:'1.5rem'}}>Instagram</p>
                        </div>
                        </a>
                        <a className="iconcontainerfooter" href="https://www.instagram.com/belamur.duo/">
                        <div>
                            <img src={FacebookIcon} className="iconfooterimg"/>
                        </div>
                        <div>
                            <p style={{marginBottom:'1.5rem'}}>Facebook</p>
                        </div>
                        </a>
                        <a className="iconcontainerfooter" href="https://www.instagram.com/belamur.duo/">
                        <div>
                            <img src={YoutubeIcon} className="iconfooterimg"/>
                        </div>
                        <div>
                            <p style={{marginBottom:'1.5rem'}}>Youtube</p>
                        </div>
                        </a>
                        <a className="iconcontainerfooter" href="https://www.instagram.com/belamur.duo/">
                        <div>
                            <img src={SpotifyIcon} className="iconfooterimg"/>
                        </div>
                        <div>
                            <p style={{marginBottom:'1.5rem'}}>Spotify</p>
                        </div>
                        </a>
                    </div>
                </Grid>

                </Grid>

   </div>
  );
}

export default Navbar;

