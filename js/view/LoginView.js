const LoginView = {
    load() {
        $('main').html(`
            <div class="container mt-5">
                <div class="row justify-content-center">
                    <div class="col-md-4">
                        <div class="card shadow-lg border-0">
                            <div class="card-body text-center">
                                <i class="bi bi-shop-window display-1 text-primary"></i>
                                <h3 class="mt-3">POS Login</h3>
                                <form id="loginForm">
                                    <div class="mb-3">
                                        <input type="text" class="form-control" placeholder="Username" id="username" required>
                                    </div>
                                    <div class="mb-3">
                                        <input type="password" class="form-control" placeholder="Password" id="password" required>
                                    </div>
                                    <button type="submit" class="btn btn-primary w-100">
                                        <i class="bi bi-box-arrow-in-right"></i> Login
                                    </button>
                                </form>
                                <small class="text-muted">Hint: admin / 1234</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `);

        $('#loginForm').on('submit', e => {
            e.preventDefault();
            const user = $('#username').val();
            const pass = $('#password').val();
            AuthController.login(user, pass);
        });
    }
};