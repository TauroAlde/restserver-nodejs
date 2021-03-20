const { Router } = require('express');
const { search } = require('../controllers/searches');

const router = Router();

router.get('/:collection/:term', search )

module.exports = router;