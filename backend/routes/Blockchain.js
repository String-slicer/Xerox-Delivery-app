const express = require("express");
const router = express.Router();

const { uploadFile, getFile, addStore } = require("../controllers/BlockChain");

router.post("/uploadFile", uploadFile);
router.post("/getFile", getFile);
router.post("/addStore", addStore);

module.exports = router;