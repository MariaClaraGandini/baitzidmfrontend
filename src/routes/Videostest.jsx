import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent } from '@mui/material';

export default function VideoGallery() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null); // Estado para o vídeo selecionado
  const [defaultVideo, setDefaultVideo] = useState('NZH8qzoLE-c'); // Vídeo padrão


  useEffect(() => {
    // Substitua 'SUA_CHAVE_DE_API' e 'ID_DO_CANAL' pelos valores apropriados
    const apiKey = 'AIzaSyCUmBvqlf5bKu0z7nj4KVWXnX13acw7t-8';
    const channelId = 'UCVYOB7PBYqjytJS2_PL6jxw';

    // Faça a solicitação à API do YouTube para obter a lista de vídeos do canal
    axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        key: apiKey,
        channelId: channelId,
        type: 'video',
        part: 'snippet',
        maxResults: 20,
      }
    })
    .then(response => {
      const videoList = response.data.items.map(item => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.default.url, // URL da imagem da capa

      }));
      setVideos(videoList);
    })
    .catch(error => console.error(error));
  }, []);
  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    console.log(video);
  };
  return (
    <div style={{ marginTop: '6rem', width: '100%'}}>
      <Grid container style={{ width: '100%', padding:'1rem' }} spacing={2}>
        <Grid item xs={12} sm={6}>
        {selectedVideo ? (
  <div className="videocontainer">
    <iframe
      width="100%"
      height="100%"
      style={{ borderRadius: "0.5rem" }}
      src={`https://www.youtube.com/embed/${selectedVideo.videoId}`}
      title={selectedVideo.title} // Título do vídeo selecionado
      frameBorder="0"
      allowFullScreen
    ></iframe>
      <p className="titulovideo">
            {selectedVideo.title}</p>
  </div>
  
) : (
  <div className="videocontainer">
    <iframe
      width="100%"
      height="100%"
      style={{ borderRadius: "0.5rem" }}
      src={`https://www.youtube.com/embed/${defaultVideo}`}
      title="Vídeo Padrão" // Título do vídeo padrão
      frameBorder="0"
      allowFullScreen
    ></iframe>
      <p className="titulovideo">
      Pra Você Guardei o Amor - Nando Reis (BelaMur)</p>
  </div>
)}

        </Grid>
        <Grid item xs={12} sm={6}>
          <Card style={{borderRadius:'0.75rem', paddingBottom:'0.2rem'}}>
          <div>
          <div className="videostitulo">Vídeos</div>

          </div>
          <div className="containervideo" style={{ height: '260px', overflow: 'auto' }}>
            <CardContent>
            {videos.map((video, index) => (

              <div  key={index} className="maisvideoitem">
                <button className="maisvideovideo" onClick={() => handleVideoSelect(video)}>
                <img
            width="100%"
            height="100%"
            style={{borderRadius: "0.5rem"
            }}
            src={video.thumbnail} // Exibe a imagem da capa do vídeo
            title={video.title}
                     />
                </button>
                <div>
                  <p>{video.title}
</p>
                </div>
              </div>
            ))};
            
              {/* Add more video items as needed */}
            </CardContent>
          </div>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
