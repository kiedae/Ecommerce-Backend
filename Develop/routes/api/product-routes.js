const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  try {
    const products = await Product.findAll( {
      include: [{ model: Category}, {model: Tag}],
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Couldnt find any products' });
  }
  // be sure to include its associated Category and Tag data
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  try {
  const product = await Product.findByPk(req.params.id, { include: [{model: Category}, {model: Tag}]});
  if (!product) {
    res.status(404).json({ message: 'Product not found' });
  } else {
    res.status(200).json(product);
  }

  } catch (err) {
    res.status(500).json({message: 'Product not found'});

  }
  // be sure to include its associated Category and Tag data
});

// create new product
router.post('/', (req, res) => {
  Product.create(req.body)
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // Update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        // find existing product tags
        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // create a list of existing tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);

          // create a list of new tag_ids to add
          const newProductTags = req.body.tagIds
            .filter((tag_id) => !productTagIds.includes(tag_id))
            .map((tag_id) => {
              return {
                product_id: req.params.id,
                tag_id,
              };
            });

          // create a list of product tags to remove
          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);

          // run both actions (remove and add tags)
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        }).then(() => {
          // send a response once the tags have been updated
          res.status(200).json({ message: 'Product updated' });
        }).catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
      } else {
        // If no product tags to update, send a response
        res.status(200).json({ message: 'Product updated' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteProduct = await Product.destroy({ where: { id: req.params.id }});
    if (!deleteProduct) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.status(200).json(deleteProduct);
    }
  } catch (err) {
    res.status(500).json({ message: 'couldnt find Product to delete'});

  }
});

module.exports = router;
