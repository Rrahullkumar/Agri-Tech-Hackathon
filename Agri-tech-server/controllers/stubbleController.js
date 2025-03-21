import StubbleListing from '../models/StubbleListing.js';
import { upload } from '../middleware/upload.js';

export const createListing = async (req, res) => {
  try {
    const { cropType, price, quantity, description, sellerName, location } = req.body;
    const images = req.files.map(file => file.path);

    const newListing = new StubbleListing({
      cropType,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      description,
      images,
      sellerName,
      location
    });

    await newListing.save();
    res.status(201).json(newListing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllListings = async (req, res) => {
  try {
    const listings = await StubbleListing.find().sort({ date: -1 });
    res.json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteListing = async (req, res) => {
  try {
      const listing = await StubbleListing.findByIdAndDelete(req.params.id);
      if (!listing) return res.status(404).json({ error: 'Listing not found' });
      res.status(200).json({ message: 'Listing deleted' });
  } catch (err) {
      res.status(500).json({ error: 'Server error', message: err.message });
  }
};


export const getListingById = async (req, res) => {
  try {
      console.log('Fetching listing with ID:', req.params.id); // Log the ID
      const listing = await StubbleListing.findById(req.params.id);
      if (!listing) {
          return res.status(404).json({ error: 'Listing not found' });
      }
      res.status(200).json(listing);
  } catch (err) {
      res.status(500).json({ error: 'Server error', message: err.message });
  }
};
