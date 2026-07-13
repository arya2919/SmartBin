const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/chatbot', (req, res) => {
    res.render('chatbot', { chatbotUrl: 'http://localhost:8000/chatbot' });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});