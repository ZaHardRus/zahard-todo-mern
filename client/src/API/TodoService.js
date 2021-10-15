import axios from 'axios'

export class TodoService {
    static async getAllTodos(userId) {
        try {
            return axios.get('/api/todo', {
                headers: {
                    "Content-Type": "application/json"
                },
                params: {userId}
            })
        } catch (e) {
            alert(`Произошла ошибка при получении постов`)
            console.log(e)
        }
    }

    static async createTodo(text, userId) {
        if (!text) return
        try {
            return await axios.post('/api/todo/add', {text, userId}, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
        } catch (e) {
            alert(`Произошла ошибка при добавлении поста`)
            console.log(e)
        }
    }

    static async removeTodo(id) {
        try {
            await axios.delete(`/api/todo/delete/${id}`, {id}, {
                headers:
                    {
                        "Content-Type": "application/json"
                    }
            })

        } catch (e) {
            alert(`Произошла ошибка при удалении поста`)
            console.log(e)
        }
    }

    static async toggleCompleted(id) {
        try {
            return await axios.put(`/api/todo/completed/${id}`,
                {id}, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

        } catch (e) {
            alert(`Произошла ошибка при изменении поста`)
            console.log(e)
        }
    }

    static async toggleImportant (id) {
        try {
            return await axios.put(`/api/todo/important/${id}`, {id}, {headers: {"Content-Type": "application/json"}})

        } catch (e) {
            alert(`Произошла ошибка при изменении поста`)
            console.log(e)
        }
    }
}