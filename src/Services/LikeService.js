class LikeService {
    static BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    static async getTopQuestion() {
        return fetch(`${this.BACKEND_URL}/api/likes/question`, {
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
                throw new Error("Error fetching question data!");
            })
            .then((res) => {
                return res
            });
    }

    static async getNumberOfLikeForQuestion(id) {
        return fetch(`${this.BACKEND_URL}/api/likes/question/${id}`, {
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
                throw new Error("Error fetching like data!");
            })
            .then((res) => {
                return res
            });
    }
    static async getNumberOfLikeForComment(id) {
        return fetch(`${this.BACKEND_URL}/api/likes/comment/${id}`, {
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
                throw new Error("Error fetching like data!");
            })
            .then((res) => {
                return res
            });
    }


    static async addLike(data) {
        return fetch(`${this.BACKEND_URL}/api/likes`, {
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

                throw new Error("Error adding likes record in!");
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

export default LikeService;