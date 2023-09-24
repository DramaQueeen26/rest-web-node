import { Request, Response } from "express"

const todos = [
  {id: 1, text: 'buy milk', createdAt: new Date()},
  {id: 2, text: 'buy bread', createdAt: new Date()},
  {id: 3, text: 'buy butter', createdAt: new Date()}
]

export class TodosController {

  constructor() {}

  public getTodos = (req: Request, res: Response) => {

    return res.json(todos)

  }

  public getTodoById = (req: Request, res: Response) => {

    const id = +req.params.id

    if( isNaN(id) ) return res.status(400).json({ error: `ID argument is not a number` })

    const todo = todos.find( todo => todo.id === id);

    (todo)
    ? res.json(todo)
    : res.status(404).json({ error: `Todo with id ${ id } not found` })

  }

  public createTodo = (req: Request, res: Response) => {

    const { text } = req.body

    if( !text ) return res.status(400).json({ error: 'Text property is required' })

    const newTodo = ({
      id: todos.length + 1,
      text: text,
      createdAt: new Date()
    })

    todos.push(newTodo)

    return res.json(newTodo)

  }

}