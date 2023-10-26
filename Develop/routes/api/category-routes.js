const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categories = await Category.findAll( {
      include: [{ model: Product}]
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: 'No Categories could be found'});
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
 try {
  const category = await Category.findByPk(req.params.id, { include: [{model: Product}]});

  res.status(200).json(category);
 } catch (err) {
  res.status(500).json({ message: 'Category not Found'});
  res.status(404).json({message: 'Product Not Found'});
 }
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body).then(res.status(200).json({message: 'Category Created'}));
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, 
  {
    where: {
    id: req.params.id,
    },
  }).then(categoryData => {
    res.json(categoryData);
  }).catch((err) => res.json(err));

});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value

  try {
    const deletedCategory = await Category.destroy(req.body, { where: { id: req.params.id}});
    res.status(200).json(deletedCategory);
  } catch (err) {
    res.status(500).json({message: 'category not found'});
  }
});

module.exports = router;
