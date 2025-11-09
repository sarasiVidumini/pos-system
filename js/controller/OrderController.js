const OrderController = {
    cart: [],

    addToCart() {
        const code = $('#itemSelect').val();
        const qty = parseInt($('#orderQty').val());

        if (!code || isNaN(qty) || qty <= 0) return alert("Select item & valid qty!");

        const item = ItemModel.findByCode(code);
        if (qty > item.qtyOnHand) return alert("Not enough stock!");

        const existing = this.cart.find(c => c.code === code);
        if (existing) {
            existing.qty += qty;
        } else {
            this.cart.push({ ...item, qty });
        }

        $('#orderQty').val('');
        this.updateCartTable();
        this.updateTotals();
    },

    removeFromCart(code) {
        this.cart = this.cart.filter(c => c.code !== code);
        this.updateCartTable();
        this.updateTotals();
    },

    updateCartTable() {
        $('#cartTable tbody').empty();
        this.cart.forEach(c => {
            $('#cartTable tbody').append(
                `<tr>
                    <td>${c.code}</td>
                    <td>${c.name}</td>
                    <td>${c.qty}</td>
                    <td>$${(c.unitPrice * c.qty).toFixed(2)}</td>
                    <td><button class="btn btn-sm btn-danger remove-cart" data-code="${c.code}">
                        <i class="bi bi-x-circle"></i>
                    </button></td>
                </tr>`
            );
        });
    },

    updateTotals() {
        const total = this.cart.reduce((sum, c) => sum + (c.unitPrice * c.qty), 0);
        $('#grandTotal').text(`$${total.toFixed(2)}`);
    },

    placeOrder() {
        const customerId = $('#customerSelect').val();
        if (!customerId || this.cart.length === 0) return alert("Select customer & add items!");

        const orderId = OrderModel.getLastOrderId();
        const order = new OrderDTO(
            orderId,
            new Date().toLocaleString(),
            customerId,
            this.cart.map(c => ({ code: c.code, name: c.name, qty: c.qty, price: c.unitPrice })),
            this.cart.reduce((sum, c) => sum + (c.unitPrice * c.qty), 0)
        );

        // Reduce stock
        this.cart.forEach(c => {
            const item = ItemModel.findByCode(c.code);
            item.qtyOnHand -= c.qty;
            ItemModel.update(c.code, item);
        });

        OrderModel.add(order);
        alert(`Order ${orderId} placed successfully!`);
        this.clear();
        ItemController.loadAll();
        ItemController.loadItemsToSelect();
    },

    clear() {
        this.cart = [];
        $('#customerSelect').val('');
        $('#itemSelect').val('');
        $('#orderQty').val('');
        this.updateCartTable();
        this.updateTotals();
    },

    loadCustomersToSelect() {
        $('#customerSelect').empty().append('<option value="">Select Customer</option>');
        CustomerModel.getAll().forEach(c => {
            $('#customerSelect').append(`<option value="${c.id}">${c.name} (${c.contact})</option>`);
        });
    },

    loadOrderHistory() {
        const orders = OrderModel.getAll();
        $('#orderHistoryTable tbody').empty();
        orders.forEach(o => {
            const cust = CustomerModel.findById(o.customerId);
            $('#orderHistoryTable tbody').append(
                `<tr>
                    <td>${o.orderId}</td>
                    <td>${o.date}</td>
                    <td>${cust ? cust.name : 'Unknown'}</td>
                    <td>$${o.total.toFixed(2)}</td>
                    <td><button class="btn btn-sm btn-info view-order" data-id="${o.orderId}">
                        <i class="bi bi-eye"></i>
                    </button></td>
                </tr>`
            );
        });
    }
};