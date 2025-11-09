const ItemController = {
    loadAll() {
        const items = ItemModel.getAll();
        $('#itemTable tbody').empty();
        items.forEach(i => {
            $('#itemTable tbody').append(
                `<tr>
                    <td>${i.code}</td>
                    <td>${i.name}</td>
                    <td>$${i.unitPrice.toFixed(2)}</td>
                    <td>${i.qtyOnHand}</td>
                    <td>
                        <button class="btn btn-sm btn-warning edit-item" data-code="${i.code}">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-danger delete-item" data-code="${i.code}">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>`
            );
        });
    },

    save() {
        const code = $('#itemCode').val().trim();
        const name = $('#itemName').val().trim();
        const price = parseFloat($('#itemPrice').val());
        const qty = parseInt($('#itemQty').val());

        if (!name || isNaN(price) || isNaN(qty)) return alert("Invalid input!");

        const item = new ItemDTO(code || this.generateCode(), name, price, qty);
        if (code) {
            ItemModel.update(code, item);
        } else {
            ItemModel.add(item);
        }
        this.clearForm();
        this.loadAll();
        this.loadItemsToSelect();
    },

    delete(code) {
        if (confirm("Delete item?")) {
            ItemModel.delete(code);
            this.loadAll();
            this.loadItemsToSelect();
        }
    },

    edit(code) {
        const item = ItemModel.findByCode(code);
        $('#itemCode').val(item.code);
        $('#itemName').val(item.name);
        $('#itemPrice').val(item.unitPrice);
        $('#itemQty').val(item.qtyOnHand);
        $('#saveItemBtn').text('Update Item');
    },

    clearForm() {
        $('#itemForm')[0].reset();
        $('#itemCode').val('');
        $('#saveItemBtn').text('Save Item');
    },

    generateCode() {
        const all = ItemModel.getAll();
        if (all.length === 0) return 'I-001';
        const last = all[all.length - 1].code;
        const num = parseInt(last.split('-')[1]) + 1;
        return `I-${num.toString().padStart(3, '0')}`;
    },

    loadItemsToSelect() {
        $('#itemSelect').empty().append('<option value="">Select Item</option>');
        ItemModel.getAll().forEach(i => {
            $('#itemSelect').append(`<option value="${i.code}">${i.name} ($${i.unitPrice}) - ${i.qtyOnHand} left</option>`);
        });
    },

    search(term) {
        const results = ItemModel.search(term);
        $('#itemTable tbody').empty();
        results.forEach(i => {
            $('#itemTable tbody').append(
                `<tr>
                    <td>${i.code}</td>
                    <td>${i.name}</td>
                    <td>$${i.unitPrice.toFixed(2)}</td>
                    <td>${i.qtyOnHand}</td>
                    <td>
                        <button class="btn btn-sm btn-warning edit-item" data-code="${i.code}">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-danger delete-item" data-code="${i.code}">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>`
            );
        });
    }
};