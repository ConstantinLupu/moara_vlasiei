const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Creăm folderul de poze dacă nu există
if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

const DB_PATH = 'database.json';

app.post('/upload', upload.single('photo'), (req, res) => {
    const memories = fs.existsSync(DB_PATH) ? JSON.parse(fs.readFileSync(DB_PATH)) : [];
    const newMemory = {
        author: req.body.author,
        text: req.body.text,
        imageUrl: `http://localhost:3000/uploads/${req.file.filename}`
    };
    memories.unshift(newMemory);
    fs.writeFileSync(DB_PATH, JSON.stringify(memories, null, 2));
    res.json({ success: true });
});

app.get('/memories', (req, res) => {
    const memories = fs.existsSync(DB_PATH) ? JSON.parse(fs.readFileSync(DB_PATH)) : [];
    res.json(memories);
});

app.listen(3000, () => console.log('🚀 Server pornit pe http://localhost:3000'));