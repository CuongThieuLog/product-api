const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/register", async (req, res) => {
  try {
    const registerData = req.body;
    const registerRes = await axios.post(
      "http://localhost:8002/register",
      registerData
    );
    res.json(registerRes.data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/user-me", async (req, res) => {
  try {
    const meRes = await axios.get("http://localhost:8002/user-me", {
      headers: { Authorization: req.headers.authorization },
    });
    res.json(meRes.data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/user-all", async (req, res) => {
  try {
    const params = req.query;
    let apiUrl = "http://localhost:8002/user";
    if (params.name) {
      apiUrl += `?name=${params.name}`;
    }
    const userAllRes = await axios.get(apiUrl, {
      headers: { Authorization: req.headers.authorization },
    });
    res.json(userAllRes.data);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
