import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb+srv://shettyharshitha666:P7bVvpBnYfgzfKit@news.qanmyqi.mongodb.net/test?retryWrites=true&w=majority&appName=news");

// Define NewsFeed schema and model
const newsFeedSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const NewsFeed = mongoose.model('NewsFeed', newsFeedSchema);

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the news feed API');
});

app.get('/news', async (req, res) => {
  try {
    const news = await NewsFeed.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/news', async (req, res) => {
  const { title, content } = req.body;
  try {
    const newsItem = new NewsFeed({ title, content });
    const savedNewsItem = await newsItem.save();
    res.status(201).json(savedNewsItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/news/:id', async(req,res)=>{
  const id =req.params.id;
  try{
    const deleteNewsItem = await NewsFeed.findByIdAndDelete(id);
    if(!deleteNewsItem){
      return res.status(404).json({message: 'News item not found'});
    }
    res.json({message: 'News Item delted successfully'});
  }
  catch(error){
    res.status(500).json({ message: error.message });
  }
}); 

const refreshInterval =60000;
setInterval(async()=>{
  try{
    const news = await NewsFeed.find().sort({createdAt: -1});
    console.log('News data refreshed');
  }
  catch(error){
    console.error('Error refreshing news data:',error);
  }
},refreshInterval);



// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
