const MenuItem = require("../model/menuItems");
const getMenuItems = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      sortBy = "created_at",
      order = "desc",
    } = req.query;

    const query = {};
    if (category) {
      query.category = category;
    }

    const sortOptions = {};
    sortOptions[sortBy] = order === "asc" ? 1 : -1;

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
        totalItems,
      },
    });
  } catch (error) {
    console.error("Error fetching menu items:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const addMenuItem = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      imageUrl,
      isAvailable,
      rating,
    } = req.body;
    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: name, price, and category are mandatory.",
      });
    }
    const newMenuItem = new MenuItem({
      name,
      description,
      price,
      category,
      imageUrl,
      isAvailable,
      rating,
    });

    const savedItem = await newMenuItem.save();

    res.status(201).json({
      success: true,
      data: savedItem,
      message: "Menu item added successfully",
    });
  } catch (error) {
    console.error("Error adding menu item:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const updateMenuItem = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, imageUrl, isAvailable, rating } =
    req.body;
  try {
    const updateItem = await MenuItem.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        category,
        imageUrl,
        isAvailable,
        rating,
      },
      { new: true }
    );
    if (!updateItem) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }
    res.json({ success: true, data: updateItem });
  } catch (error) {
    console.error("Error updating menu item:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const deleteMenuItem = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await MenuItem.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.json({ message: "Menu item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getMenuItemById = async (req, res) => {
  const { id } = req.params;

  try {
    const menuItem = await MenuItem.findById(id);

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.json(menuItem);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  getMenuItemById,
};
