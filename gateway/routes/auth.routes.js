const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/login", async (req, res) => {
  try {
    const loginData = req.body;
    const loginRes = await axios.post("http://localhost:8001/login", loginData);
    res.json(loginRes.data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/logout", async (req, res) => {
  try {
    const logoutRes = await axios.post("http://localhost:8001/logout", null, {
      headers: { Authorization: req.headers.authorization },
    });
    res.json(logoutRes.data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/logout-all", async (req, res) => {
  try {
    const logoutAllRes = await axios.post(
      "http://localhost:8001/logout-all",
      null,
      {
        headers: { Authorization: req.headers.authorization },
      }
    );
    res.json(logoutAllRes.data);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
