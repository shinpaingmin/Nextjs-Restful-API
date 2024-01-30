import { NextResponse } from 'next/server';

const DATA_RESOURCE_URL = "https://jsonplaceholder.typicode.com/todos";
const API_KEY: string = process.env.DATA_API_KEY as string

export async function GET() {
    const res = await fetch(DATA_RESOURCE_URL); // fetch data

    const todos: Todo[] = await res.json(); // turn promise object into json object

    return NextResponse.json(todos);    // response data in json format including headers, and others
}

export async function POST(request: Request) {
    const { userId, title } = await request.json();

    if(!userId || !title) return NextResponse.json({ "message": "something went wrong!" });

    const res = await fetch(DATA_RESOURCE_URL, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
            "API-Key": API_KEY
        },
        body: JSON.stringify({
            userId, title, completed: false
        })
    });

    const newTodo: Todo = await res.json();

    return NextResponse.json(newTodo);
}

export async function PUT(request: Request) {
    const { userId, id, title, completed } = await request.json();

    if(!userId || !id || !title || typeof(completed) !== 'boolean') return NextResponse.json({ "message": "Missing required data" });

    const res = await fetch(`${DATA_RESOURCE_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "API-Key": API_KEY
        },
        body: JSON.stringify({
            userId, title, completed
        })
    });

    const updatedTodo: Todo = await res.json();

    return NextResponse.json(updatedTodo);
}

export async function DELETE(request: Request) {
    const { id }: Partial<Todo> = await request.json();

    if(!id) return NextResponse.json({ "message": "Todo ID is required!" });

    // demo 
    await fetch(`${DATA_RESOURCE_URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "API-Key": API_KEY
        }
    })

    return NextResponse.json({ "message": `Todo ${id} is successfully deleted!` });
}