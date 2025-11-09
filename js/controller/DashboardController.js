class DashboardController {
    constructor(customerModel, itemModel, orderModel, view) {
        this.customerModel = customerModel;
        this.itemModel = itemModel;
        this.orderModel = orderModel;
        this.view = view;
    }

    loadDashboard() {
        const custCount = this.customerModel.getAll().length;
        const itemCount = this.itemModel.getAll().length;
        const todayOrders = this.orderModel.getTodayCount();
        const revenue = this.orderModel.getTotalRevenue();

        this.view.updateStats(custCount, itemCount, todayOrders, revenue);
    }
}