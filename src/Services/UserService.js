import {NotificationManager} from "react-notifications";

class UserService {
    static BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    static async getSingleUser(user_id) {
        return fetch(`${this.BACKEND_URL}/api/users/${user_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("Error fetching user data!");
            })
            .then((res) => {
                return res
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


}

export default UserService;