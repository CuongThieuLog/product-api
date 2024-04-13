const Order = require("../models/order.model");
const Product = require("../../product-service/models/product.model");

function OrderController() {
  this.getAll = async (req, res) => {
    try {
      const orders = await Order.find().populate("products.product");
      res.status(200).json({ data: orders });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  this.getById = async (req, res) => {
    try {
      const orderId = req.params.id;
      const order = await Order.findById(orderId).populate("products.product");

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.status(200).json({ order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error" });
    }
  };

  this.create = async (req, res) => {
    try {
      const { products, shippingAddress } = req.body;
      const userId = req.user._id;

      let total = 0;
      const orderProducts = [];

      for (const item of products) {
        const product = await Product.findById(item.productId);
        if (!product) {
          return res.status(404).json({ message: "Not Found!" });
        }
        total += product.price * item.quantity;
        orderProducts.push({
          product: item.productId,
          quantity: item.quantity,
          price: product.price,
        });
      }

      const order = new Order({
        user: userId,
        products: orderProducts,
        total,
        shippingAddress,
        status: "PENDING",
      });

      await order.save();

      for (const item of products) {
        const product = await Product.findById(item.productId);
        if (product) {
          product.quantity -= item.quantity;
          await product.save();
        }
      }

      res.status(201).json({ message: "Order created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error" });
    }
  };

  this.getAllOrderMySelf = async (req, res) => {
    try {
      const userId = req.user._id;
      let query = { user: userId };
      const status = req.query.status;
      if (
        status &&
        ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELED"].includes(
          status
        )
      ) {
        query.status = status;
      }
      const orders = await Order.find(query).populate("products.product");
      res.status(200).json({ orders });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error" });
    }
  };

  this.updateOrderStatus = async (req, res) => {
    try {
      const { status } = req.body;

      if (
        !["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELED"].includes(
          status
        )
      ) {
        return res.status(404).json({ message: "Status Not Found!" });
      }
      const updatedStatus = await Order.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );
      if (!updatedStatus) {
        return res.status(404).json({ message: "Not Found!" });
      }
      res
        .status(200)
        .json({ message: "Updated successfully", data: updatedStatus });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  this.calculateTotalProfit = async (req, res) => {
    try {
      const status = req.params.status;
      const orders = await Order.find({ status }).exec();
      let totalProfit = 0;

      for (const order of orders) {
        for (const item of order.products) {
          const product = await Product.findById(item.product);
          totalProfit += item.quantity * product.price;
        }
      }

      res.status(200).json({ totalProfit });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  this.calculateTotalIncome = async (req, res) => {
    try {
      const status = req.params.status;
      const orders = await Order.find({ status }).exec();
      let totalIncome = 0;

      for (const order of orders) {
        for (const item of order.products) {
          const product = await Product.findById(item.product);
          totalIncome +=
            item.quantity * product.price - item.quantity * product.cost;
        }
      }

      res.status(200).json({ totalIncome });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  this.deleteOrder = async (req, res) => {
    try {
      const orderId = req.params.id;
      const userId = req.user._id;
      const isAdmin = req.user.isAdmin;
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      if (order.user.toString() !== userId.toString() && !isAdmin) {
        return res
          .status(403)
          .json({ message: "Unauthorized to delete this order" });
      }
      await order.remove();
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error" });
    }
  };

  return this;
}

module.exports = new OrderController();
