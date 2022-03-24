class LikeService {
    static BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    static async getTopQuestions() {
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

    static async getNumberOfLikesForQuestion(id) {
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

    static async getNumberOfDislikesForQuestion(id) {
        return fetch(`${this.BACKEND_URL}/api/likes/question/dislike/${id}`, {
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


    static async getNumberOfLikesForComment(id) {
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

    static async getNumberOfDislikesForComment(id) {
        return fetch(`${this.BACKEND_URL}/api/likes/comment/dislike/${id}`, {
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
                "x-auth-token": localStorage.getItem("token")

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


}

export default LikeService;