class OrderDTO {
    constructor(id, date, customerId, items = [], total = 0) {
        this.id = id;
        this.date = date;
        this.customerId = customerId;
        this.items = items;      // array of {itemId, qty, price}
        this.total = total;
    }
}