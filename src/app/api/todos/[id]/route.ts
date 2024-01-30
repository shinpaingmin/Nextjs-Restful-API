import { NextResponse } from 'next/server';

const DATA_RESOURCE_URL = "https://jsonplaceholder.typicode.com/todos";

export async function GET(request: Request) {
    const id = request.url.slice(request.url.lastIndexOf('/') + 1);

    const res = await fetch(`${DATA_RESOURCE_URL}/${id}`); // fetch data

    const todo: Todo = await res.json(); // turn promise object into json object

    if(!todo) return NextResponse.json({ "message": "data not found" })

    return NextResponse.json(todo);    // response data in json format including headers, and others
}