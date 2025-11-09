const ItemView = {
    load() {
        $('#contentArea').html(`
            <div class="card shadow">
                <div class="card-header bg-warning text-dark d-flex justify-content-between align-items-center">
                    <h5><i class="bi bi-box-seam-fill"></i> Item Management</h5>
                    <button class="btn btn-dark btn-sm" id="newItemBtn">
                        <i class="bi bi-plus-circle"></i> New Item
                    </button>
                </div>
                <div class="card-body">
                    <div class="row mb-3">
                        <div class="col-md-4">
                            <div class="input-group">
                                <span class="input-group-text"><i class="bi bi-search"></i></span>
                                <input type="text" class="form-control" placeholder="Search items..." id="itemSearch">
                            </div>
                        </div>
                    </div>

                    <form id="itemForm" class="row g-3 mb-4 p-3 border rounded bg-light">
                        <div class="col-md-2">
                            <label class="form-label">Code</label>
                            <input type="text" class="form-control" id="itemCode" readonly>
                        </div>
                        <div class="col-md-4">
                            <label class="form-label">Name</label>
                            <input type="text" class="form-control" id="itemName" required>
                        </div>
                        <div class="col-md-2">
                            <label class="form-label">Price ($)</label>
                            <input type="number" step="0.01" class="form-control" id="itemPrice" required>
                        </div>
                        <div class="col-md-2">
                            <label class="form-label">Qty</label>
                            <input type="number" class="form-control" id="itemQty" min="0" required>
                        </div>
                        <div class="col-md-2 d-flex align-items-end">
                            <button type="submit" class="btn btn-warning w-100 text-dark" id="saveItemBtn">
                                <i class="bi bi-save"></i> Save
                            </button>
                        </div>
                    </form>

                    <div class="table-responsive">
                        <table class="table table-hover align-middle" id="itemTable">
                            <thead class="table-warning">
                                <tr>
                                    <th>Code</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>
        `);

        ItemController.loadAll();

        $('#saveItemBtn').on('click', () => ItemController.save());
        $('#newItemBtn').on('click', () => ItemController.clearForm());

        $(document).on('click', '.edit-item', function() {
            const code = $(this).data('code');
            ItemController.edit(code);
        });

        $(document).on('click', '.delete-item', function() {
            const code = $(this).data('code');
            ItemController.delete(code);
        });

        $('#itemSearch').on('input', function() {
            const term = $(this).val().trim();
            if (term) {
                ItemController.search(term);
            } else {
                ItemController.loadAll();
            }
        });
    }
};