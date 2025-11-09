const OrderHistoryView = {
    load() {
        $('#contentArea').html(`
            <div class="card shadow">
                <div class="card-header bg-info text-white">
                    <h5><i class="bi bi-clock-history"></i> Order History</h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-striped" id="orderHistoryTable">
                            <thead class="table-info">
                                <tr>
                                    <th>Order ID</th>
                                    <th>Date</th>
                                    <th>Customer</th>
                                    <th>Total</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Order Detail Modal -->
            <div class="modal fade" id="orderDetailModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header bg-success text-white">
                            <h5 class="modal-title">Order Details</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body" id="orderDetailBody">
                            <!-- Filled dynamically -->
                        </div>
                    </div>
                </div>
            </div>
        `);

        OrderController.loadOrderHistory();

        $(document).on('click', '.view-order', function() {
            const orderId = $(this).data('id');
            const order = OrderModel.getAll().find(o => o.orderId === orderId);
            const cust = CustomerModel.findById(order.customerId);

            let itemsHtml = '';
            order.items.forEach(item => {
                itemsHtml += `
                    <tr>
                        <td>${item.code}</td>
                        <td>${item.name}</td>
                        <td>${item.qty}</td>
                        <td>$${(item.price * item.qty).toFixed(2)}</td>
                    </tr>`;
            });

            $('#orderDetailBody').html(`
                <p><strong>Order ID:</strong> ${order.orderId}</p>
                <p><strong>Date:</strong> ${order.date}</p>
                <p><strong>Customer:</strong> ${cust ? cust.name + ' (' + cust.contact + ')' : 'N/A'}</p>
                <table class="table table-sm mt-3">
                    <thead><tr><th>Code</th><th>Name</th><th>Qty</th><th>Price</th></tr></thead>
                    <tbody>${itemsHtml}</tbody>
                </table>
                <h5 class="text-end text-success">Total: $${order.total.toFixed(2)}</h5>
            `);

            new bootstrap.Modal(document.getElementById('orderDetailModal')).show();
        });
    }
};