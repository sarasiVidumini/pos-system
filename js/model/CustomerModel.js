let customers = [];

const CustomerModel = {
    add(customer) {
        customers.push(customer);
    },
    getAll() {
        return customers;
    },
    update(id, updatedCustomer) {
        const index = customers.findIndex(c => c.id === id);
        if (index !== -1) customers[index] = updatedCustomer;
    },
    delete(id) {
        customers = customers.filter(c => c.id !== id);
    },
    findById(id) {
        return customers.find(c => c.id === id);
    },
    search(term) {
        return customers.filter(c =>
            c.name.toLowerCase().includes(term.toLowerCase()) ||
            c.contact.includes(term)
        );
    }
};