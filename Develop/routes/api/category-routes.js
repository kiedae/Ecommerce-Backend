const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categories = await Category.findall( {
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
  const category = await Category.findByPk(req.params.id, { include: [{model: Product}]} )

  res.status(200).json(category);
 } catch (err) {
  res.status(500).json({ message: 'Category not Found'});
 }
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req, body)
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, 
  {
    where: {
    category_name: req.params.id,
    },
  }).then(categoryData => {
    res.json(categoryData);
  }).catch((err) => res.json(err));

});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      category_id: req.params.id,
    },
  }).then((deletedCategory) => {
    res.json(deletedCategory);
  }).catch((err) => res.json(err));
});

module.exports = router;
