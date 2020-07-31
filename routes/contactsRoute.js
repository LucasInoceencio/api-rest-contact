let express = require('express');
let router = express.Router();
let controller = require('../controllers/contactController');
const auth = require('../lib/auth');

router.get('/', auth.verifyLoggedUser, auth.verifyGroupUser(['user', 'admin']), controller.getAllContacts);
router.get('/:id', auth.verifyLoggedUser, controller.getContactById);
router.post('/', auth.verifyLoggedUser, auth.verifyGroupUser(['admin']),controller.addContact);
router.put('/:id', controller.updateContact);
router.delete('/:id', controller.deleteContact);

module.exports = router;