let express = require('express');
let router = express.Router();
let controller = require('../controllers/contactController');

router.get('/', controller.getAllContacts);
router.get('/:id', controller.getContactById);
router.post('/', controller.addContact);
router.put('/:id', controller.updateContact);
router.delete('/:id', controller.deleteContact);

module.exports = router;