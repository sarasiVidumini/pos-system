const OrderView = {
    load() {
        $('#contentArea').html(`
            <div class="card shadow">
                <div class="card-header bg-success text-white">
                    <h5><i class="bi bi-cart-plus"></i> Place New Order</h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-5">
                            <h6>Select Customer</h6>
                            <select class="form-select mb-3" id="customerSelect"></select>

                            <h6>Select Item</h6>
                            <div class="input-group mb-3">
                                <select class="form-select" id="itemSelect"></select>
                                <input type="number" class="form-control" placeholder="Qty" id="orderQty" min="1">
                                <button class="btn btn-outline-primary" id="addToCartBtn">
                                    <i class="bi bi-plus-circle"></i>
                                </button>
                            </div>

                            <div id="cartTableContainer">
                                <table class="table table-sm table-hover" id="cartTable">
                                    <thead><tr><th>Code</th><th>Name</th><th>Qty</th><th>Price</th><th></th></tr></thead>
                                    <tbody></tbody>
                                </table>
                            </div>

                            <div class="text-end mt-3">
                                <h4>Grand Total: <span id="grandTotal" class="text-danger">$0.00</span></h4>
                                <button class="btn btn-lg btn-success" id="placeOrderBtn">
                                    <i class="bi bi-check-circle"></i> Place Order
                                </button>
                            </div>
                        </div>
                        <div class="col-md-7">
                            <div class="text-center">
                                <i class="bi bi-basket3-fill display-1 text-muted opacity-25"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);

        OrderController.loadCustomersToSelect();
        ItemController.loadItemsToSelect();

        $('#addToCartBtn').on('click', () => OrderController.addToCart());
        $(document).on('click', '.remove-cart', function() {
            const code = $(this).data('code');
            OrderController.removeFromCart(code);
        });
        $('#placeOrderBtn').on('click', () => OrderController.placeOrder());
    }
};