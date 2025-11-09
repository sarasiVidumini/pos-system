const AuthController = {
    login(username, password) {
        if (username === "admin" && password === "1234") {
            sessionStorage.setItem("loggedIn", "true");
            DashboardView.load();
            return true;
        }
        alert("Invalid credentials! Try admin / 1234");
        return false;
    },
    logout() {
        sessionStorage.removeItem("loggedIn");
        LoginView.load();
    },
    isLoggedIn() {
        return sessionStorage.getItem("loggedIn") === "true";
    }
};