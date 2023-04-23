import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

let mountains = [
  { id: 1, name: 'Mount Everest', height: 8848, country: 'Nepal' },
  { id: 2, name: 'K2', height: 8611, country: 'Pakistan' },
  { id: 3, name: 'Kangchenjunga', height: 8586, country: 'Nepal' },
  { id: 4, name: 'Lhotse', height: 8516, country: 'Nepal' }
];

// Get all mountains
app.get('/', (req, res) => {
  res.send('Welcome to the Mountains API!');
});

app.get('/api/mountains', (req, res) => {
  res.status(200).json(mountains);
});

// Get a mountain by id
app.get('/api/mountains/:id', (req, res) => {
  const mountain = mountains.find(m => m.id === parseInt(req.params.id));
  if (!mountain) {
    return res.status(404).json({ error: 'Mountain not found' });
  }
  res.status(200).json(mountain);
});

// Create a new mountain
app.post('/api/mountains', (req, res) => {
  const mountain = {
    id: mountains.length + 1,
    name: req.body.name,
    height: req.body.height,
    country: req.body.country
  };
  mountains.push(mountain);
  console.log('New mountain created:', mountain);
  res.status(201).json(mountain);
});

// Update a mountain by id
app.put('/api/mountains/:id', (req, res) => {
  const mountain = mountains.find(m => m.id === parseInt(req.params.id));
  if (!mountain) {
    return res.status(404).json({ error: 'Mountain not found' });
  }
  mountain.name = req.body.name;
  mountain.height = req.body.height;
  mountain.country = req.body.country;
  console.log('Mountain updated:', mountain);
  res.status(200).json(mountain);
});

// Delete a mountain by id
app.delete('/api/mountains/:id', (req, res) => {
  const mountainIndex = mountains.findIndex(m => m.id === parseInt(req.params.id));
  if (mountainIndex === -1) {
    return res.status(404).json({ error: 'Mountain not found' });
  }
  mountains.splice(mountainIndex, 1);
  console.log('Mountain deleted:', req.params.id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
