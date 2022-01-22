import type { Request } from "@sveltejs/kit"

// TODO: Persist in database
let todos: Todo[] = [];

export const api = (request: Request, todo?: Todo) => {
    let body = {};
    let status = 500;

    switch (request.method.toUpperCase()) {
        case "GET":
            body = todos;
            status = 200;
            break;
        case "POST":
            todos.push(todo);
            return {
                status: 303,
                headers: {
                    location: "/"
                }
            };
        case "DELETE":
            todos = todos.filter(todo => todo.uid !== request.params.uid)
            status = 200;
            break;

        default:
            break;
    }

    if (request.method.toUpperCase() !== "GET") {
        return {
            status: 303,
            headers: {
                location: "/"
            }
        };

    }

    return {
        status,
        body
    }
}