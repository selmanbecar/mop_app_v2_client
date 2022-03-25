class CommentService {
    static BACKEND_URL = process.env.REACT_APP_BACKEND_URL;


    static async getNotification(id) {
        return fetch(`${this.BACKEND_URL}/api/notifications/${id}`, {
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
                throw new Error("Error fetching notification data!");
            })
            .then((res) => {
                return res
            });
    }

    static async deleteNotifications(id) {
        return fetch(`${this.BACKEND_URL}/api/notifications/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "x-auth-token": localStorage.getItem("token")
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }

                throw new Error("Error deleting notification data!");
            })
            .then((res) => {
                return res
            });
    }


}

export default CommentService;