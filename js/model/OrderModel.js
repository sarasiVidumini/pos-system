let orders = [];

const OrderModel = {
    add(order) {
        orders.push(order);
    },
    getAll() {
        return orders;
    },
    getLastOrderId() {
        if (orders.length === 0) return 'ORD-000';
        const last = orders[orders.length - 1].orderId;
        const num = parseInt(last.split('-')[1]) + 1;
        return `ORD-${num.toString().padStart(3, '0')}`;
    }
};