const { Count } = require('../models');

const createCount = async(req, res) => {
    try {
       console.log('req.body', req.body);

       const { countDate, serviceType, vehicleType, location, countValue, notes } = req.body;

    //  1. Validate all fields
       if(!countDate || !serviceType || !vehicleType || !location || !countValue) {
        return res.status(400).json({ message: 'All fields are required' });
       }

       const count = await Count.create({ countDate, serviceType, vehicleType, location, countValue, notes });


        res.status(201).json({ message: 'Count created successfully', count });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const getAllCount = async(req, res) => {
    try {
        const totalCount = await Count.findAll();
        res.status(200).json({ message: 'Total counts found', totalCount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getCountById = async(req, res) => {
    try {
        const { id } = req.params;

        // Validate countId
        if (!id) {
            return res.status(400).json({ message: 'Count ID is required' });
        }

        // Find the count record
        const count = await Count.findByPk(id);

        if (!count) {
            return res.status(404).json({ message: 'Count not found' });
        }

        res.status(200).json({
            message: 'Count retrieved successfully',
            count
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const updateCount = async(req, res) => {
    try {
        const { id } = req.params;
        const { countDate, serviceType, vehicleType, location, countValue, notes } = req.body;

        // Validate countId
        if (!id) {
            return res.status(400).json({ message: 'Count ID is required' });
        }

        // Find the count record
        const count = await Count.findByPk(id);
        console.log('count' ,   count);

        if (!count) {
            return res.status(404).json({ message: 'Count not found' });
        }

        // Update only provided fields
        const updateData = Object.fromEntries(
            Object.entries({
                countDate,
                serviceType,
                vehicleType,
                location,
                countValue,
                notes
            }).filter(([_, value]) => value !== undefined)
        );

        console.log('updateData' , updateData);

        // Update the record
        await count.update(updateData);

        // Fetch the updated record
        const updatedCount = await Count.findByPk(id);

        res.status(200).json({
            message: 'Count updated successfully',
            count: updatedCount
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const deleteCount = async(req, res) => {
    try {
        const { id } = req.params;

        // Validate countId
        if (!id) {
            return res.status(400).json({ message: 'Count ID is required' });
        }

        // Find the count record
        const count = await Count.findByPk(id);

        if (!count) {
            return res.status(404).json({ message: 'Count not found' });
        }

        // Delete the record
        await count.destroy();

        res.status(200).json({
            message: 'Count deleted successfully',
            deletedCount: {
                countId: count.countId
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    createCount,
    getAllCount,
    getCountById,
    updateCount,
    deleteCount
}
