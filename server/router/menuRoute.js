const express = require('express');
const { getMenuItems, addMenuItem, updateMenuItem, deleteMenuItem, getMenuItemById} = require('../controller/menuController');

const router = express.Router();

router.get('/', getMenuItems);
router.post('/add', addMenuItem); 
router.put('/update/:id', updateMenuItem);
router.delete('/delete/:id', deleteMenuItem);
router.get('/:id', getMenuItemById);

module.exports = router;
