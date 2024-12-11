const Order = require("../models/Orders");
const pdf = require('pdf-parse');
const fs = require('fs');

// ...existing code...

exports.calculateFare = async (req, res) => {
  const { documents } = req.body;

  if (!documents || !Array.isArray(documents) || documents.length === 0) {
    return res.status(400).json({ error: "No documents provided" });
  }

  let totalFare = 0;

  for (const doc of documents) {
    let docFare = 0;

    // Read the PDF file and count the pages
    const dataBuffer = fs.readFileSync(doc.file);
    const data = await pdf(dataBuffer);
    const pageCount = data.numpages;

    // Base price per page
    const basePrice = 2; // 2 rupees per page
    docFare += basePrice * pageCount * doc.copies;

    // Additional charges based on document properties
    if (doc.color === "Color") {
      docFare += 9 * pageCount * doc.copies; // Additional charge for color printing
    }

    if (doc.binding !== "None") {
      docFare += 10.00; // Example binding charge
    }

    if (doc.lamination !== "None") {
      docFare += 5.00; // Example lamination charge
    }

    if (doc.paperQuality !== "Standard") {
      docFare += 1.00 * pageCount * doc.copies; // Additional charge for premium paper
    }

    totalFare += docFare;
  }
  deliveryCharge = 20;
  totalFare+=deliveryCharge;

  res.json({ totalFare });
};


