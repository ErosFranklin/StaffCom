const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authenticateJWT = require("../middlewares/authenticateJWT");

// order routes involving logged users
router.post("/create/:chefId", authenticateJWT, orderController.createOrder); // waiter's token
router.get("/waiter/my-orders", authenticateJWT, orderController.getMyOrdersAsWaiter); // waiter's token
router.get("/chef/my-orders", authenticateJWT, orderController.getMyOrdersAsChef); // chef's token
router.put("/update/:orderId", authenticateJWT, orderController.updateOrder); // update only table number
router.delete("/deactivate/:orderId", authenticateJWT, orderController.deactivateOrder);
router.patch("/activate/:orderId", authenticateJWT, orderController.activateOrder);

// order items routes involving logged users
router.post("/:orderId/addItem", authenticateJWT, orderController.addItemToOrder);
router.get("/:orderId/items", authenticateJWT, orderController.getItemsByOrder);
router.put("/items/:id", authenticateJWT, orderController.updateOrderItem); // update only quantity
router.delete("/items/:id", authenticateJWT, orderController.deleteOrderItem); // hard delete of item

// general order routes
router.get("/:orderId", orderController.getOrderById);
router.get("/", orderController.getAllOrders);
router.get("/waiter/:waiterId", orderController.getOrdersByWaiter);
router.get("/chef/:chefId", orderController.getOrdersByChef);

module.exports = router;
