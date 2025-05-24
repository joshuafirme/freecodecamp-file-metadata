const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({
  dest: 'uploads/'
}); // file will be saved here temporarily

app.use(cors());
app.use(express.static('public')); // serve the HTML form

// Serve the form at /
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'));
});

// ✅ API endpoint required by freeCodeCamp
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      error: 'No file uploaded'
    });
  }

const metadata = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  };

  fs.writeFile(
    path.join(__dirname, 'metadata.json'),
    JSON.stringify(metadata, null, 2),
    (err) => {
      if (err) return
      res.json(metadata);
    }
  );

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));