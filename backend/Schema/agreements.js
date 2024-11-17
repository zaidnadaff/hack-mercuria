const mongoose = require('mongoose');

const agreementSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  contractYears: { type: Number, required: true },
  identificationDocumentUrl: { type: String, required: true },
  landDocumentUrl: { type: String, required: true },
});

module.exports = mongoose.model('Agreement', agreementSchema);
