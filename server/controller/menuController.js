const MenuItem = require('../model/menuItems');
const getMenuItems = async (req, res) => {
    try {
        const { page = 1, limit = 10, category, sortBy = 'created_at', order = 'desc' } = req.query;

        const query = {};
        if (category) {
            query.category = category;
        }

        const sortOptions = {};
        sortOptions[sortBy] = order === 'asc' ? 1 : -1;

        const menuItems = await MenuItem.find(query)
            .sort(sortOptions)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalItems = await MenuItem.countDocuments(query);

        res.status(200).json({
            success: true,
            data: menuItems,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalItems / limit),
                totalItems
            }
        });
    } catch (error) {
        console.error('Error fetching menu items:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

const addMenuItem = async (req, res) => {
    try {
        const { name, description, price, category, imageUrl, isAvailable, rating } = req.body;

        const newMenuItem = new MenuItem({
            name,
            description,
            price,
            category,
            imageUrl,
            isAvailable,
            rating
        });

        const savedItem = await newMenuItem.save();

        res.status(201).json({
            success: true,
            data: savedItem,
            message: 'Menu item added successfully'
        });
    } catch (error) {
        console.error('Error adding menu item:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = {
    getMenuItems,
    addMenuItem
};
