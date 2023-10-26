const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  try {
    const tags = await Tag.findAll({ include: [{model: Product}]});
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json({message: 'couldnt find any tags'});
  }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
 try {
  const tag = await Tag.findByPk(req.params.id, {include: [{model: Product}]});

  if (!tag) {
    res.status(404).json({ message: 'Tag not found' });
  } else {
    res.status(200).json(tag);
  }

 } catch (err) {
  res.status(500).json({message: 'couldnt find tags id'});
 }
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
  .then(res.status(200).json({message: 'Tag Created'}))
  .catch((err) => {
    res.status(500).json(err)
  });
});

router.put('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (tag) {
      await tag.update({ tag_name: req.body.tag_name });
      res.status(200).json({ message: 'Tag updated', tag });
    } else {
      res.status(404).json({ message: 'Tag not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Couldnt update the tag' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (tag) {
      await tag.destroy();
      res.status(200).json({ message: 'Tag deleted' });
    } else {
      res.status(404).json({ message: 'Tag not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Couldnt delete the tag' });
  }
});

module.exports = router;
