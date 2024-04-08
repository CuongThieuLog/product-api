const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    const params = req.query;
    let headers = {};
    let apiUrl = "http://localhost:8003/category";

    if (req.headers.authorization) {
      headers = {
        Authorization: req.headers.authorization.replace("Bearer ", ""),
      };
    }

    if (params.name) {
      apiUrl += `?name=${params.name}`;
    }

    const categoryRes = await axios.get(apiUrl, {
      headers,
    });

    res.json(categoryRes.data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    let headers = {};

    if (req.headers.authorization) {
      headers = {
        Authorization: req.headers.authorization.replace("Bearer ", ""),
      };
    }

    const categoryRes = await axios.get(
      `http://localhost:8003/category/${categoryId}`,
      {
        headers,
      }
    );

    res.json(categoryRes.data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const categoryData = req.body;
    let headers = {};

    if (req.headers.authorization) {
      headers = {
        Authorization: req.headers.authorization.replace("Bearer ", ""),
      };
    }

    const newCategoryRes = await axios.post(
      "http://localhost:8003/category",
      categoryData,
      { headers }
    );

    res.json(newCategoryRes.data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    const categoryData = req.body;
    let headers = {};

    if (req.headers.authorization) {
      headers = {
        Authorization: req.headers.authorization.replace("Bearer ", ""),
      };
    }

    const updateCategoryRes = await axios.put(
      `http://localhost:8003/category/${categoryId}`,
      categoryData,
      { headers }
    );

    res.json(updateCategoryRes.data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const categoryId = req.params.id;
    let headers = {};

    if (req.headers.authorization) {
      headers = {
        Authorization: req.headers.authorization.replace("Bearer ", ""),
      };
    }

    const deleteCategoryRes = await axios.delete(
      `http://localhost:8003/category/${categoryId}`,
      { headers }
    );

    res.json(deleteCategoryRes.data);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
