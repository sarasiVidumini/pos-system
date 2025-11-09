const CustomerController = {
    loadAll() {
        const custs = CustomerModel.getAll();
        $('#customerTable tbody').empty();
        custs.forEach(c => {
            $('#customerTable tbody').append(
                `<tr>
                    <td>${c.id}</td>
                    <td>${c.name}</td>
                    <td>${c.contact}</td>
                    <td>${c.address}</td>
                    <td>
                        <button class="btn btn-sm btn-warning edit-cust" data-id="${c.id}">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-danger delete-cust" data-id="${c.id}">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>`
            );
        });
    },

    save() {
        const id = $('#custId').val().trim();
        const name = $('#custName').val().trim();
        const contact = $('#custContact').val().trim();
        const address = $('#custAddress').val().trim();

        if (!name || !contact) return alert("Name & Contact required!");

        const cust = new CustomerDTO(id || this.generateId(), name, contact, address);
        if (id) {
            CustomerModel.update(id, cust);
        } else {
            CustomerModel.add(cust);
        }
        this.clearForm();
        this.loadAll();
    },

    delete(id) {
        if (confirm("Delete customer?")) {
            CustomerModel.delete(id);
            this.loadAll();
        }
    },

    edit(id) {
        const cust = CustomerModel.findById(id);
        $('#custId').val(cust.id);
        $('#custName').val(cust.name);
        $('#custContact').val(cust.contact);
        $('#custAddress').val(cust.address);
        $('#saveCustomerBtn').text('Update Customer');
    },

    clearForm() {
        $('#customerForm')[0].reset();
        $('#custId').val('');
        $('#saveCustomerBtn').text('Save Customer');
    },

    generateId() {
        const all = CustomerModel.getAll();
        if (all.length === 0) return 'C-001';
        const last = all[all.length - 1].id;
        const num = parseInt(last.split('-')[1]) + 1;
        return `C-${num.toString().padStart(3, '0')}`;
    },

    search(term) {
        const results = CustomerModel.search(term);
        $('#customerTable tbody').empty();
        results.forEach(c => {
            $('#customerTable tbody').append(
                `<tr>
                    <td>${c.id}</td>
                    <td>${c.name}</td>
                    <td>${c.contact}</td>
                    <td>${c.address}</td>
                    <td>
                        <button class="btn btn-sm btn-warning edit-cust" data-id="${c.id}">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-danger delete-cust" data-id="${c.id}">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>`
            );
        });
    }
};