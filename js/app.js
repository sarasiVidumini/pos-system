$(document).ready(function () {
    console.log('%c CreativePOS System Loaded ', 'background: #222; color: #bada55; font-size: 16px;');
    initializeApp();
    setupGlobalEvents();
    preventFormResubmission();
    setupDataLossWarning();
    initializeBootstrapComponents();
    // populateSampleData();
});

function initializeApp() {
    if (AuthController.isLoggedIn()) {
        DashboardView.load();
        showNotification("Welcome back! Session restored.", "success");
    } else {
        LoginView.load();
    }
}

function setupGlobalEvents() {
    $(document).on('click', 'a[data-section]', function (e) {
        e.preventDefault();
        const section = $(this).data('section');
        $('.list-group-item').removeClass('active');
        $(this).addClass('active');
        DashboardView.loadSection(section);
    });

    $(document).on('click', '#logoutBtn', function () {
        if (confirm('Are you sure you want to logout?')) {
            AuthController.logout();
        }
    });

    $(document).on('keydown', function (e) {
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            const activeSection = $('.list-group-item.active').data('section');
            if (activeSection === 'customer') $('#custSearch').focus();
            if (activeSection === 'item') $('#itemSearch').focus();
        }
    });

    $(document).on('keydown', function (e) {
        if (e.key === 'Escape') {
            const active = $('.list-group-item.active').data('section');
            if (active === 'customer') CustomerController.clearForm();
            if (active === 'item') ItemController.clearForm();
            if (active === 'order') OrderController.clear();
        }
    });
}

function preventFormResubmission() {
    if (window.history.replaceState) {
        window.history.replaceState(null, null, window.location.href);
    }
}

function setupDataLossWarning() {
    window.addEventListener('beforeunload', function (e) {
        const hasData = CustomerModel.getAll().length > 0 ||
            ItemModel.getAll().length > 0 ||
            OrderModel.getAll().length > 0;
        if (hasData && !AuthController.isLoggedIn()) {
            const confirmationMessage = 'You have unsaved data. Leave anyway?';
            e.returnValue = confirmationMessage;
            return confirmationMessage;
        }
    });
}

function initializeBootstrapComponents() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(el => new bootstrap.Tooltip(el));
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    popoverTriggerList.forEach(el => new bootstrap.Popover(el));
}

function showNotification(message, type = 'info') {
    const toastHTML = `
        <div class="toast align-items-center text-white bg-${type} border-0" role="alert">
            <div class="d-flex">
                <div class="toast-body">
                    <i class="bi ${getIcon(type)}"></i> ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>`;
    const container = $('#toastContainer');
    if (container.length === 0) {
        $('body').append('<div id="toastContainer" class="toast-container position-fixed bottom-0 end-0 p-3"></div>');
    }
    $('#toastContainer').append(toastHTML);
    const toastEl = $('#toastContainer .toast').last()[0];
    const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
    toast.show();
    toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
}

function getIcon(type) {
    switch (type) {
        case 'success': return 'bi-check-circle-fill';
        case 'danger': return 'bi-exclamation-triangle-fill';
        case 'warning': return 'bi-exclamation-circle-fill';
        case 'info': return 'bi-info-circle-fill';
        default: return 'bi-bell-fill';
    }
}

function populateSampleData() {
    CustomerModel.add(new CustomerDTO('C-001', 'Kasun Perera', '0771234567', 'Colombo'));
    CustomerModel.add(new CustomerDTO('C-002', 'Nimali Silva', '0719876543', 'Kandy'));
    ItemModel.add(new ItemDTO('I-001', 'Apple iPhone 15', 1299.99, 10));
    ItemModel.add(new ItemDTO('I-002', 'Samsung Galaxy S24', 1099.99, 8));
    ItemModel.add(new ItemDTO('I-003', 'MacBook Pro 14"', 2499.99, 5));
    console.log('%c Sample data loaded! ', 'background: #4CAF50; color: white;');
}