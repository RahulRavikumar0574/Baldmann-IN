// backend/server.js

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';


// Initialize Express app
const app = express();

// Middleware
app.use(cors(
  {
    origin: ['https://baldmann-lv4v-shreya-agarwals-projects.vercel.app', 'http://localhost:3000', process.env.FRONTEND_URL],
    credentials: true
  }
));
app.use(bodyParser.json());

app.use("/",(req,res) => {
  res.json("Server Running");
})
// MongoDB connection
mongoose.connect('mongodb+srv://shreyaagarwal2022:shreya2022@cluster0.ntpxd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Contact Schema definition
const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true }
});

const Contact = mongoose.model('Contact', contactSchema);

app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  try {
    const newContact = new Contact({ firstName, lastName, email, phone, message });
    await newContact.save();
    res.status(200).json({ message: 'Contact saved successfully!' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ message: 'Error saving contact' });
  }
});


// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Export for Vercel serverless
export default app;
