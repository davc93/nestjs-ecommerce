import { type Request, type Response } from 'express'

function success (req: Request, res: Response, message: string, status: number) {
  const statusCode = status || 200
  const statusMessage = message || ''

  res.status(status).send({
    error: false,
    status,
    body: message
  })
}

function error (req: Request, res: Response, message: string, status: number) {
  const statusCode = status || 500
  const statusMessage = message || 'Internal server error'

  res.status(statusCode).send({
    error: true,
    status,
    body: message
  })
}

export {
  success,
  error
}
