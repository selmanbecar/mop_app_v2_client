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
            }).catch((err) => console.error(err));
    }


    static async editUser(id, data) {
        const res = await fetch(`${this.BACKEND_URL}/api/users/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "x-auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify(data),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error("Error editing user!");
        })
            .then((res) => {
                return res
            }).catch((err) => console.error(err));
    }
}

export default UserService;