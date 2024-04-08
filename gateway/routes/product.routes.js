const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    const params = req.query;
    let apiUrl = "http://localhost:8004/product";

    let headers = {};
    if (req.headers.authorization) {
      headers = {
        Authorization: req.headers.authorization.replace("Bearer ", ""),
      };
    }

    if (params.name) {
      apiUrl += `?name=${params.name}`;
    }

    const productsRes = await axios.get(apiUrl, {
      headers,
    });

    res.json(productsRes.data);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    let headers = {};

    if (req.headers.authorization) {
      headers = {
        Authorization: req.headers.authorization.replace("Bearer ", ""),
      };
    }

    const productRes = await axios.get(
      `http://localhost:8004/product/${productId}`,
      {
        headers,
      }
    );

    res.json(productRes.data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const productData = req.body;
    let headers = {};

    if (req.headers.authorization) {
      headers = {
        Authorization: req.headers.authorization.replace("Bearer ", ""),
      };
    }

    const newProductRes = await axios.post(
      "http://localhost:8004/product",
      productData,
      { headers }
    );

    res.json(newProductRes.data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const productData = req.body;
    let headers = {};

    if (req.headers.authorization) {
      headers = {
        Authorization: req.headers.authorization.replace("Bearer ", ""),
      };
    }

    const updatedProductRes = await axios.put(
      `http://localhost:8004/product/${productId}`,
      productData,
      { headers }
    );

    res.json(updatedProductRes.data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    let headers = {};

    if (req.headers.authorization) {
      headers = {
        Authorization: req.headers.authorization.replace("Bearer ", ""),
      };
    }

    const deleteProductRes = await axios.delete(
      `http://localhost:8004/product/${productId}`,
      { headers }
    );

    res.json(deleteProductRes.data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/remaining-quantity/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    let headers = {};

    if (req.headers.authorization) {
      headers = {
        Authorization: req.headers.authorization.replace("Bearer ", ""),
      };
    }

    const remainingQuantityRes = await axios.get(
      `http://localhost:8004/product/remaining-quantity/${productId}`,
      { headers }
    );

    res.json(remainingQuantityRes.data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/inventory/all", async (req, res) => {
  try {
    let headers = {};

    if (req.headers.authorization) {
      headers = {
        Authorization: req.headers.authorization.replace("Bearer ", ""),
      };
    }

    const productRes = await axios.get(
      "http://localhost:8004/product/inventory/all",
      {
        headers,
      }
    );

    res.json(productRes.data);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
