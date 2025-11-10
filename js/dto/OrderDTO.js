class OrderDTO {
    constructor(orderId, date, customerId, items, total) {
        this.orderId = orderId;
        this.date = date;
        this.customerId = customerId;
        this.items = items; // Array of {code, name, qty, price}
        this.total = total;
    }
}