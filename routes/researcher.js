var express = require('express');
var request = require("request");

var Researcher = require("../models/researcher")

var router = express.Router();

router.get('/', async (req, res, next) => {
    const researchers = await Researcher.find().limit(10)
    res.send(researchers)
});

router.get('/orcid_id/:orcid_id', async (req, res, next) => {
    try {
        const researcher = await Researcher.findOne({ orcid_id: req.params.orcid_id }).orFail();
        res.send(researcher)
    } catch {
        res.status(404)
        res.send({ error: "Researcher no existe." })
    }
});

router.post('/', async (req, res) => {
  const researcher = new Researcher(req.body);
    try{
      await researcher.save();
      res.send(researcher);
    } catch(err){
      res.status(500).send(err);
    }
});

router.put('/:orcid_id', async (req, res) => {
  try {
    const researcher = await Researcher.findOneAndUpdate(req.params.orcid_id, req.body)

    if (!researcher) res.status(404).send("No item found")
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err)
  }
})

router.delete('/orcid_id/:orcid_id', async (req, res) => {
  try {
    const researcher = await Researcher.findOneAndDelete(req.params.orcid_id)

    if (!researcher) res.status(404).send("No item found")
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err)
  }
})




module.exports = router;
