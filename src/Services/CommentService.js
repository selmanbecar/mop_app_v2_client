class CommentService {
    static BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    static async getTopUser() {
        return fetch(`${this.BACKEND_URL}/api/comments/users`, {
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
                throw new Error("Error fetching users data!");
            })
            .then((res) => {
                return res
            });
    }

    static async getComments(id) {
        return fetch(`${this.BACKEND_URL}/api/comments/question/${id}`, {
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
                throw new Error("Error fetching comment data!");
            })
            .then((res) => {
                return res
            });
    }

    static async deleteHealth(id) {
        return fetch(`${this.BACKEND_URL}/api/health/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }

                throw new Error("Error deleting health data!");
            })
            .then((res) => {
                return res
            });
    }

    static async addComment(data) {
        return fetch(`${this.BACKEND_URL}/api/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "x-auth-token":localStorage.getItem("token")
            },
            body: JSON.stringify(data),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }

                throw new Error("Error adding comments record in!");
            })
            .then((res) => {
                return res;
            });
    }

    static async editHealth(id, data) {
        const res = await fetch(`${this.BACKEND_URL}/api/health/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        });
        return res.ok;
    }
}

export default CommentService;