const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    let headers = {};

    if (req.headers.authorization) {
      headers = {
        Authorization: req.headers.authorization.replace("Bearer ", ""),
      };
    }

    const ordersRes = await axios.get("http://localhost:8005/order", {
      headers,
    });

    res.json(ordersRes.data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    let headers = {};

    if (req.headers.authorization) {
      headers = {
        Authorization: req.headers.authorization.replace("Bearer ", ""),
      };
    }

    const orderRes = await axios.get(`http://localhost:8005/order/${orderId}`, {
      headers,
    });

    res.json(orderRes.data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    let headers = {};
    const orderData = req.body;

    if (req.headers.authorization) {
      headers = {
        Authorization: req.headers.authorization.replace("Bearer ", ""),
      };
    }

    const newOrderRes = await axios.post(
      `http://localhost:8005/order`,
      orderData,
      {
        headers,
      }
    );

    res.json(newOrderRes.data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/my-self", async (req, res) => {
  try {
    let headers = {};

    if (req.headers.authorization) {
      headers = {
        Authorization: req.headers.authorization.replace("Bearer ", ""),
      };
    }

    const orderByUserRes = await axios.get(
      `http://localhost:8005/order/my-self`,
      {
        headers,
      }
    );

    res.json(orderByUserRes.data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/update-status/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const status = req.body;
    let headers = {};

    if (req.headers.authorization) {
      headers = {
        Authorization: req.headers.authorization.replace("Bearer ", ""),
      };
    }

    const updateStatusRes = await axios.put(
      `http://localhost:8005/order/update-status/${orderId}`,
      status,
      { headers }
    );

    res.json(updateStatusRes.data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/profit", async (req, res) => {
  try {
    let headers = {};

    if (req.headers.authorization) {
      headers = {
        Authorization: req.headers.authorization.replace("Bearer ", ""),
      };
    }

    const profitRes = await axios.get(`http://localhost:8005/order/profit`, {
      headers,
    });

    res.json(profitRes.data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/income", async (req, res) => {
  try {
    let headers = {};

    if (req.headers.authorization) {
      headers = {
        Authorization: req.headers.authorization.replace("Bearer ", ""),
      };
    }

    const incomeRes = await axios.get(`http://localhost:8005/order/income`, {
      headers,
    });

    res.json(incomeRes.data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    let headers = {};

    if (req.headers.authorization) {
      headers = {
        Authorization: req.headers.authorization.replace("Bearer ", ""),
      };
    }

    const deleteOrderRes = await axios.delete(
      `http://localhost:8005/order/${orderId}`,
      { headers }
    );

    res.json(deleteOrderRes.data);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
