const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// Must change original function to an async function, this applies to all functions using await
router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    
    const getTag = await Tag.findAll({ include: [{ model: Product}]});
    return res.status(200).json(getTag);

  } catch (err){

    return res.status(500).json(err);

  }

});

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{

    const getTagID = await Tag.findByPk(req.params.id, { include: [{model: Product}] });

    if (!getTagID) {
      res.status(404).json({ message: "Tag not found."});
      return;
    }

    return res.status(200).json(getTagID);

  } catch (err) {

    return res.status(500).json(err);

  }
});

router.post('/', async(req, res) => {
  // create a new tag
  try {

    const newTag = await Tag.create(req.body);
    return res.status(200).json(newTag);

  } catch (err){

    return res.status(400).json(err);

  }
});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try {

    const updateTag = await Category.update(req.body, { where: {id: req.params.id} });

    if (!updateTag[0]) {
      res.status(404).json({ message: "Tag not found."});
      return;
    }

    return res.status(200).json(updateTag);

  } catch (err){

    return res.status(500).json(err);

  }
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try {

    const delTag = await Category.update(req.body, { where: {id: req.params.id} });

    if (!delTag) {
      res.status(404).json({ message: "Tag not found."});
      return;
    }

    return res.status(200).json(delTag);

  } catch (err){

    return res.status(500).json(err);

  }
});

module.exports = router;
