import { Router } from 'express';
import { createListing, getAllListings, getListingById, deleteListing} from '../controllers/stubbleController.js';
import { upload } from '../middleware/upload.js';


const router = Router();

router.post('/listings', upload.array('images', 5), createListing);
router.get('/listings', getAllListings);
router.get('/listings/:id', getListingById);
router.delete('/listings/:id', deleteListing);

router.delete('/listings/:id', async (req, res) => {
    try {
        const listing = await Listing.findByIdAndDelete(req.params.id);
        if (!listing) {
            return res.status(404).json({ error: 'Listing not found' });
        }
        res.status(200).json({ message: 'Listing deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error', message: err.message });
    }
});

export default router;