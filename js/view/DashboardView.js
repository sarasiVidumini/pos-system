/**
 * DashboardView.js
 * Handles main layout, SPA navigation, Home page with stats & order history
 * MVC Pattern | Bootstrap 5 | jQuery | In-Memory
 */

const DashboardView = {
    load() {
        if (!AuthController.isLoggedIn()) {
            LoginView.load();
            return;
        }

        $('main').html(this.getDashboardHTML());
        this.setupNavbarEvents();
        this.loadSection('home'); // Default to Home
    },

    getDashboardHTML() {
        return `
            <!-- Beautiful Gradient Navbar -->
            <nav class="navbar navbar-expand-lg navbar-main shadow-lg sticky-top">
                <div class="container-fluid px-4">
                    <a class="navbar-brand d-flex align-items-center" href="#">
                        <div class="logo-circle me-2">
                            <i class="bi bi-shop-window"></i>
                        </div>
                        <span class="brand-text">Creative<span class="text-warning">POS</span></span>
                    </a>

                    <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span class="toggler-icon"><i class="bi bi-list"></i></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto gap-2">
                            <li class="nav-item">
                                <a class="nav-link menu-item active" href="#" data-section="home">
                                    <i class="bi bi-house-door-fill"></i> Home
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link menu-item" href="#" data-section="customer">
                                    <i class="bi bi-people-fill"></i> Customers
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link menu-item" href="#" data-section="item">
                                    <i class="bi bi-box-seam-fill"></i> Items
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link menu-item" href="#" data-section="order">
                                    <i class="bi bi-cart-check-fill"></i> Place Order
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link menu-item" href="#" data-section="history">
                                    <i class="bi bi-clock-history"></i> History
                                </a>
                            </li>
                        </ul>

                        <div class="dropdown ms-3">
                            <button class="btn btn-outline-light dropdown-toggle user-btn" type="button" data-bs-toggle="dropdown">
                                <i class="bi bi-person-circle"></i>
                                <span class="d-none d-md-inline">Admin</span>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end shadow-sm">
                                <li><a class="dropdown-item" href="#"><i class="bi bi-person"></i> Profile</a></li>
                                <li><a class="dropdown-item" href="#"><i class="bi bi-gear"></i> Settings</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item text-danger" href="#" id="logoutBtn"><i class="bi bi-box-arrow-right"></i> Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            <!-- Main Content -->
            <div class="container-fluid mt-4" id="mainContent">
                <div id="contentArea"></div>
            </div>

            <!-- Toast Container -->
            <div id="toastContainer" class="toast-container position-fixed bottom-0 end-0 p-3"></div>
        `;
    },

    setupNavbarEvents() {
        // Menu Navigation
        $(document).off('click', '.menu-item').on('click', '.menu-item', (e) => {
            e.preventDefault();
            $('.menu-item').removeClass('active');
            $(e.currentTarget).addClass('active');
            const section = $(e.currentTarget).data('section');
            this.loadSection(section);
        });

        // Logout
        $(document).off('click', '#logoutBtn').on('click', '#logoutBtn', (e) => {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                AuthController.logout();
            }
        });

        // Toggler Animation
        $('.navbar-toggler').off('click').on('click', function () {
            $(this).find('.toggler-icon i').toggleClass('bi-list bi-x');
        });
    },

    loadSection(section) {
        switch (section) {
            case 'home':
                this.loadHomePage();
                break;
            case 'customer':
                CustomerView.load();
                break;
            case 'item':
                ItemView.load();
                break;
            case 'order':
                OrderView.load();
                break;
            case 'history':
                OrderHistoryView.load();
                break;
            default:
                $('#contentArea').html('<div class="p-5 text-center"><h3>404 - Page Not Found</h3></div>');
        }
    },

    loadHomePage() {
        const customers = CustomerModel.getAll();
        const items = ItemModel.getAll();
        const orders = OrderModel.getAll();

        const totalCustomers = customers.length;
        const totalItems = items.length;
        const totalOrders = orders.length;
        const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0).toFixed(2);

        const formatDate = (dateStr) => {
            const d = new Date(dateStr);
            return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        };

        let orderRows = '';
        if (totalOrders === 0) {
            orderRows = `<tr><td colspan="5" class="text-center text-muted py-4">No orders placed yet</td></tr>`;
        } else {
            orders.slice(-5).reverse().forEach(order => {
                const cust = CustomerModel.findById(order.customerId);
                orderRows += `
                    <tr>
                        <td>${order.orderId}</td>
                        <td>${formatDate(order.date)}</td>
                        <td>${cust ? cust.name : 'N/A'}</td>
                        <td>$${order.total.toFixed(2)}</td>
                        <td>
                            <button class="btn btn-sm btn-outline-info view-mini-order" data-id="${order.orderId}">
                                <i class="bi bi-eye"></i>
                            </button>
                        </td>
                    </tr>`;
            });
        }

        $('#contentArea').html(`
            <!-- IJSE Assignment Cover (Exact Match) -->
            <div class="assignment-cover text-center p-5 mb-5 border rounded shadow-lg bg-white animate__animated animate__fadeIn">
                <h1 class="text-danger fw-bold mb-4">IJSE<sup>®</sup></h1>
                <h3 class="text-dark mb-4">Higher Diploma in Software Engineering</h3>
                <h4 class="mt-4 text-dark">
                  POS-SYSTEM
                </h4>
                <h5 class="mt-4 text-primary">ITS 1119 - Web Technologies</h5>
                <p class="text-muted mt-3">
                    GDSE 73
                </p>
            </div>

            <!-- Live Stats Cards -->
            <div class="row g-4 mb-5">
                <div class="col-md-3 col-6">
                    <div class="card stat-card bg-primary text-white shadow animate__animated animate__flipInY">
                        <div class="card-body text-center">
                            <i class="bi bi-people-fill fs-1"></i>
                            <h2 class="mt-2 mb-0">${totalCustomers}</h2>
                            <small>Total Customers</small>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-6">
                    <div class="card stat-card bg-success text-white shadow animate__animated animate__flipInY" style="animation-delay: 0.1s">
                        <div class="card-body text-center">
                            <i class="bi bi-box-seam-fill fs-1"></i>
                            <h2 class="mt-2 mb-0">${totalItems}</h2>
                            <small>Total Items</small>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-6">
                    <div class="card stat-card bg-warning text-dark shadow animate__animated animate__flipInY" style="animation-delay: 0.2s">
                        <div class="card-body text-center">
                            <i class="bi bi-cart-check-fill fs-1"></i>
                            <h2 class="mt-2 mb-0">${totalOrders}</h2>
                            <small>Total Orders</small>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-6">
                    <div class="card stat-card bg-danger text-white shadow animate__animated animate__flipInY" style="animation-delay: 0.3s">
                        <div class="card-body text-center">
                            <i class="bi bi-currency-dollar fs-1"></i>
                            <h2 class="mt-2 mb-0">$${totalRevenue}</h2>
                            <small>Total Revenue</small>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recent Orders Table -->
            <div class="card shadow border-0 animate__animated animate__fadeInUp">
                <div class="card-header bg-info text-white d-flex justify-content-between align-items-center">
                    <h5 class="mb-0"><i class="bi bi-clock-history"></i> Recent Orders (Last 5)</h5>
                    <a href="#" class="text-white text-decoration-underline small" data-section="history">
                        View All <i class="bi bi-arrow-right"></i>
                    </a>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-hover mb-0">
                            <thead class="table-light">
                                <tr>
                                    <th>Order ID</th>
                                    <th>Date & Time</th>
                                    <th>Customer</th>
                                    <th>Total</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>${orderRows}</tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="text-center mt-5 text-muted small">
                <hr>
                <p>Developed by <strong>SARASI VIDUMINI</strong> | GDSE73 | ITS 1119</p>
            </div>

            <!-- Mini Order Modal -->
            <div class="modal fade" id="miniOrderModal" tabindex="-1">
                <div class="modal-dialog modal-sm">
                    <div class="modal-content">
                        <div class="modal-header bg-success text-white">
                            <h6 class="modal-title">Order Details</h6>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body" id="miniOrderBody"></div>
                    </div>
                </div>
            </div>
        `);

        // View Order Details
        $(document).off('click', '.view-mini-order').on('click', '.view-mini-order', function () {
            const orderId = $(this).data('id');
            const order = orders.find(o => o.orderId === orderId);
            const cust = CustomerModel.findById(order.customerId);

            let itemsHtml = '<ul class="list-group list-group-flush">';
            order.items.forEach(item => {
                itemsHtml += `<li class="list-group-item d-flex justify-content-between">
                    <span>${item.name} × ${item.qty}</span>
                    <span>$${(item.price * item.qty).toFixed(2)}</span>
                </li>`;
            });
            itemsHtml += '</ul>';

            $('#miniOrderBody').html(`
                <p><strong>Order:</strong> ${order.orderId}</p>
                <p><strong>Date:</strong> ${formatDate(order.date)}</p>
                <p><strong>Customer:</strong> ${cust ? cust.name : 'N/A'}</p>
                ${itemsHtml}
                <div class="text-end mt-3"><strong>Total: $${order.total.toFixed(2)}</strong></div>
            `);

            new bootstrap.Modal(document.getElementById('miniOrderModal')).show();
        });
    }
};