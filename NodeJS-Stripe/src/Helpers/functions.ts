import { Request, Response, NextFunction } from "express"
import { auth } from "./firebase"

// Catch async errors when awaiting promises
export const runAsync = (callback: Function) => {
  return (req: Request, res: Response, next: NextFunction) =>
    callback(req, res, next).catch(next)
}

// Throws an error if the currentUser does not exist on the request
export const validateUser = (req: Request) => {
  const user = req["currentUser"]

  if (!user) {
    throw new Error(
      "You must be logged in to make this request. (Authorization: Bearer <token>)"
    )
  }

  return user
}

// Decodes the JSON Web Token sent via the frontend app
// Makes the currentUser (firebase) data available on the body.
export const decodeJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.authorization.startsWith("Bearer ")) {
    const idToken = req.headers.authorization.split("Bearer ")[1]

    try {
      const decodedToken = await auth.verifyIdToken(idToken)
      req["currentUser"] = decodedToken
    } catch (error) {
      console.log(error)
    }
  }

  next()
}
