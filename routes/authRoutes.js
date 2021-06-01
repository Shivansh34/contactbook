const express = require('express');
const router = express.Router();
const {addtoContacts,updateContact,deleteContact,searchContact,searchContactbyemail,allContacts} = require('../controller/contact');
const {auth} =require('../middleware/auth');

router.post('/contacts/',auth,allContacts)
router.post('/contacts/create',auth,addtoContacts);
router.post('/contacts/update',auth,updateContact);
router.post('/contacts/delete',auth,deleteContact);
router.post('/contacts/search/name',auth,searchContact);
router.post('/contacts/search/email',auth,searchContactbyemail);

module.exports = router;