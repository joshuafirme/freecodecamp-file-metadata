const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' }); // save to /uploads

app.use(express.static('public')); // serves your HTML form if in /public

// POST /upload handler
app.post('/api/fileanalyse', upload.single('upFile'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');

  const metadata = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  };

  // Save metadata as metadata.json
  fs.writeFile(
    path.join(__dirname, 'metadata.json'),
    JSON.stringify(metadata, null, 2),
    (err) => {
      if (err) return res.status(500).send('Error saving metadata.');
      res.send('File uploaded and metadata.json generated!');
    }
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
