const express = require("express");
const router = express.Router();

const { uploadFile, getFile, addStore,assignStore } = require("../controllers/BlockChain");

router.post("/uploadFile", uploadFile);
router.post("/getFile", getFile);
router.post("/addStore", addStore);
router.post("/assignStore", assignStore);

module.exports = router;