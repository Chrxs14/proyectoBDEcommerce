const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');

exports.createOrder = async (req, res) => {
    const { user_id, total_amount, items } = req.body; // items contendrá un array de productos

    try {
        // Crear la orden
        const order = await Order.create(user_id, total_amount);

        // Crear los elementos de la orden
        for (const item of items) {
            await OrderItem.create(order.order_id, item.product_id, item.quantity, item.price);
        }

        res.status(201).json(order);
    } catch (error) {
        console.error('Error al crear la orden:', error);
        res.status(500).json({ error: 'Error al crear la orden' });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error al obtener las órdenes:', error);
        res.status(500).json({ error: 'Error al obtener las órdenes' });
    }
};

exports.getOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findById(id); // Asegúrate de implementar este método en el modelo Order
        if (!order) {
            return res.status(404).json({ error: 'Orden no encontrada' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error('Error al obtener la orden:', error);
        res.status(500).json({ error: 'Error al obtener la orden' });
    }
};