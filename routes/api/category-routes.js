const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// Must change original function to an async function, this applies to all functions using await
router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    
    const getData = await Category.findAll({ include: [{ model: Product}]});
    return res.status(200).json(getData);

  } catch (err){

    return res.status(500).json(err);

  }

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{

    const getCatID = await Category.findByPk(req.params.id, { include: [{model: Product}] });

    if (!getCatID) {
      res.status(404).json({ message: "Category not found."});
      return;
    }

    return res.status(200).json(getCatID);

  } catch (err) {

    return res.status(500).json(err);

  }

});

router.post('/', async (req, res) => {
  // create a new category
  try {

    const newCat = await Category.create(req.body);
    return res.status(200).json(newCat);

  } catch (err){

    return res.status(400).json(err);

  }

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {

    const updateCat = await Category.update(req.body, { where: {id: req.params.id} });

    if (!updateCat[0]) {
      res.status(404).json({ message: "Category not found."});
      return;
    }

    return res.status(200).json(updateCat);

  } catch (err){

    return res.status(500).json(err);

  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {

    const delCat = await Category.update(req.body, { where: {id: req.params.id} });

    if (!delCat) {
      res.status(404).json({ message: "Category not found."});
      return;
    }

    return res.status(200).json(delCat);

  } catch (err){

    return res.status(500).json(err);

  }
});

module.exports = router;
