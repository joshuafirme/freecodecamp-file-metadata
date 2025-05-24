const express = require('express');
const multer = require('multer');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// POST /upload handler
app.post('/api/fileanalyse', upload.single('upfile'), async (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');

  const metadata = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  };

  res.json(metadata)
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));