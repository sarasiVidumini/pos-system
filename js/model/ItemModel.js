let items = [];

const ItemModel = {
    add(item) {
        items.push(item);
    },
    getAll() {
        return items;
    },
    update(code, updatedItem) {
        const index = items.findIndex(i => i.code === code);
        if (index !== -1) items[index] = updatedItem;
    },
    delete(code) {
        items = items.filter(i => i.code !== code);
    },
    findByCode(code) {
        return items.find(i => i.code === code);
    },
    search(term) {
        return items.filter(i =>
            i.name.toLowerCase().includes(term.toLowerCase()) ||
            i.code.includes(term)
        );
    }
};