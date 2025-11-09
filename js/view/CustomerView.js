const CustomerView = {
    load() {
        $('#contentArea').html(`
            <div class="card shadow">
                <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                    <h5><i class="bi bi-people-fill"></i> Customer Management</h5>
                    <button class="btn btn-light btn-sm" id="newCustomerBtn">
                        <i class="bi bi-person-plus"></i> New Customer
                    </button>
                </div>
                <div class="card-body">
                    <div class="row mb-3">
                        <div class="col-md-4">
                            <div class="input-group">
                                <span class="input-group-text"><i class="bi bi-search"></i></span>
                                <input type="text" class="form-control" placeholder="Search customers..." id="custSearch">
                            </div>
                        </div>
                    </div>

                    <form id="customerForm" class="row g-3 mb-4 p-3 border rounded bg-light">
                        <div class="col-md-2">
                            <label class="form-label">ID</label>
                            <input type="text" class="form-control" id="custId" readonly>
                        </div>
                        <div class="col-md-3">
                            <label class="form-label">Name</label>
                            <input type="text" class="form-control" id="custName" required>
                        </div>
                        <div class="col-md-3">
                            <label class="form-label">Contact</label>
                            <input type="text" class="form-control" id="custContact" required>
                        </div>
                        <div class="col-md-3">
                            <label class="form-label">Address</label>
                            <input type="text" class="form-control" id="custAddress">
                        </div>
                        <div class="col-md-1 d-flex align-items-end">
                            <button type="submit" class="btn btn-success w-100" id="saveCustomerBtn">
                                <i class="bi bi-check-circle"></i> Save
                            </button>
                        </div>
                    </form>

                    <div class="table-responsive">
                        <table class="table table-hover align-middle" id="customerTable">
                            <thead class="table-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Contact</th>
                                    <th>Address</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>
        `);

        // Load data
        CustomerController.loadAll();

        // Event Listeners
        $('#saveCustomerBtn').on('click', () => CustomerController.save());
        $('#newCustomerBtn').on('click', () => CustomerController.clearForm());

        $(document).on('click', '.edit-cust', function() {
            const id = $(this).data('id');
            CustomerController.edit(id);
        });

        $(document).on('click', '.delete-cust', function() {
            const id = $(this).data('id');
            CustomerController.delete(id);
        });

        $('#custSearch').on('input', function() {
            const term = $(this).val().trim();
            if (term) {
                CustomerController.search(term);
            } else {
                CustomerController.loadAll();
            }
        });
    }
};