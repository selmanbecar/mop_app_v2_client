import {NotificationManager} from "react-notifications";

class AuthService {
    static BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    static async register(data) {

        return fetch(`${this.BACKEND_URL}/api/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("Error signing up!");
            })
            .then((res) => {
                localStorage.setItem("token", res.token);
            });
    }

    static async login(data) {
        return fetch(`${this.BACKEND_URL}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => {
                if (res.status === 404) {
                    NotificationManager.error(
                        "Email or password is not valid!",
                        "",
                        2000
                    );
                }
                if (res.ok) {
                    return res.json();
                }
                throw new Error("Error signing in!");
            })
            .then((res) => {
                localStorage.setItem("token", res.token);
                return res;
            });
    }

    static async verify(token) {
        const res = await fetch(`${this.BACKEND_URL}/api/validate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({token}),
        });
        return res.ok;
    }
}

export default AuthService;