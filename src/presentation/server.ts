import express, { Router } from 'express'
import path from 'path'

interface Options {
  port: number,
  public_path: string
  routes: Router
}

export class Server {

  private app = express()
  private readonly port: number
  private readonly publicPath: string
  private readonly routes: Router

  constructor( options: Options ) {
    const { port, public_path, routes } = options

    this.port = port
    this.publicPath = public_path
    this.routes = routes

  }

  async start() {

    this.app.listen( this.port, () => {

      //* Middlewares

      //* Public folder
      this.app.use( express.static( this.publicPath ) )

      //* Routes
      this.app.use( this.routes )

      this.app.get('*', (req, res) => {
        
        const indexPath = path.join(__dirname + `../../../${ this.publicPath }/index.html`)
        return res.sendFile( indexPath )

      })

      console.log(`Server running on port ${ this.port }`)

    })

  }

}