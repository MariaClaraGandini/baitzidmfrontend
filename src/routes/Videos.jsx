import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function VideoGallery() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Substitua 'SUA_CHAVE_DE_API' e 'ID_DO_CANAL' pelos valores apropriados
    const apiKey = 'AIzaSyCUmBvqlf5bKu0z7nj4KVWXnX13acw7t-8';
    const channelId = 'UCzoXgHhMklCzGk7Sj_u3fxw';

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
      }));
      setVideos(videoList);
    })
    .catch(error => console.error(error));
  }, []);

  return (
    <div style={{ marginTop: '2rem', display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {videos.map((video, index) => (
        <Card key={index} sx={{ maxWidth: 345 }}>
          <iframe
            width="100%"
            height="150"
            src={`https://www.youtube.com/embed/${video.videoId}`}
            title={video.title}
            frameBorder="0"
            allowFullScreen
          ></iframe>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {video.title}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
