import React, { useState, useEffect } from 'react';
import './App.css'
import axios from 'axios';

function App() {
  const [newsFeed, setNewsFeed] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get('http://localhost:3001/news');
      setNewsFeed(response.data);
    } catch (error) {
      console.error('Error fetching news feed:', error);
    }
  };

  const handleAddNews = async () => {
    try {
      const response = await axios.post('http://localhost:3001/news', {
        title,
        content,
      });
      setNewsFeed([response.data,...newsFeed]);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error adding news:', error);
    }
  };

  const handleDeleteNews= async (id)=>{
    try{
      await axios.delete(`http://localhost:3001/news/${id}`);
      setNewsFeed(newsFeed.filter(news => news.id !== id));
    }
    catch(error){
      console.error('Error deleting news:', error);
    }
  };

  useEffect(()=>{
    fetchNews();
  },[newsFeed]);
  
return (
  <div className="container">
    <h1 className="heading">somaiyaSync News-Feed</h1>
    <div className="input-container">
      <input
        className="input-field"
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        className="input-field"
        type="text"
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button className="add-button" onClick={handleAddNews}>Add News</button>
    </div>
    <div className="news-container">
      {newsFeed.map(news => (
        <div key={news._id} className="news-card">
          <h3>{news.title}</h3>
          <p>{news.content}</p>
          <button className="delete-button" onClick={() => handleDeleteNews(news._id)}>Delete</button>
        </div>
      ))}
    </div>
  </div>
);
}


export default App;



