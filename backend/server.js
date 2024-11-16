const express = require('express');
const mongoose = require('mongoose');
const { uploadFileToFirebase } = require('./firebase'); // Firebase upload function
const Agreement = require('./Schema/agreements');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

app.post('/api/agreement', async (req, res) => {
  const { name, phoneNumber, address, contractYears, identificationDocument, landDocument } = req.body;

  // if (!identificationDocument || !landDocument) {
  //   return res.status(400).json({ message: 'Both identification and land documents are required.' });
  // }

  try {
    // Upload files to Firebase Storage and get the URLs
    const identificationFileUrl = await uploadFileToFirebase(identificationDocument, `uploads/identification/${identificationDocument}`);
    const landFileUrl = await uploadFileToFirebase(landDocument, `uploads/land/${landDocument}`);

    // Create a new Agreement document in MongoDB
    const agreement = new Agreement({
      name,
      phoneNumber,
      address,
      contractYears,
      identificationDocumentUrl: identificationFileUrl,
      landDocumentUrl: landFileUrl,
    });

    await agreement.save();

    res.status(201).json({ message: 'Agreement submitted successfully', agreement });
  } catch (error) {
    console.error('Error during file upload or database operation:', error);
    res.status(500).json({ message: 'An error occurred during the submission process. Please try again later.' });
  }
});

app.get('/api/agreement/get', async (req, res) => {
  try {
    // Retrieve all agreements from the MongoDB database
    const agreements = await Agreement.find();
    
    // Send the agreements as a JSON response
    res.status(200).json({ agreements });
  } catch (error) {
    console.error('Error fetching agreements:', error);
    res.status(500).json({ message: 'An error occurred while fetching agreements. Please try again later.' });
  }
});


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
