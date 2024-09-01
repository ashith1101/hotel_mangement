const express = require('express');
const { getMenuItems, addMenuItem } = require('../controller/menuController');

const router = express.Router();

router.get('/', getMenuItems);
router.post('/add', addMenuItem); 

module.exports = router;
