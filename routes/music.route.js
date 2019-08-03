const router = require('express').Router();
const musicController = require('../controller/music.controller');
const guard = require('../middlewares/guard');

router.get('/', musicController.list);
router.get('/:id', musicController.item);
router.post('/', guard, musicController.new);
router.delete('/:id', guard, musicController.delete);
router.patch('/:id', guard, musicController.edit);
router.post('/:musicId/favorite', guard, musicController.favorite);

module.exports = router;
