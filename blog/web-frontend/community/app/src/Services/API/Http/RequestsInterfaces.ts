import { ErrorRes } from "@Server/response"
import { User } from "@Services/User"
import { NextApiRequest, NextApiResponse } from "next"

interface ExtendedNextApiRequestGET<T> extends NextApiRequest {
    query: Partial<{ [key: string]: string | string[] }> & T
}
interface ExtendedNextApiRequestPOST<T> extends NextApiRequest {
    body: T
}
type ApiGETFunction<T, U> = (req: ExtendedNextApiRequestGET<T>, res: NextApiResponse<U>) => Promise<void>
type ApiPOSTFunction<T, U> = (req: ExtendedNextApiRequestPOST<T>, res: NextApiResponse<U>) => Promise<void>

export type APIGETUserList = ApiGETFunction<unknown, User[] | ErrorRes>
export type APIPOSTUserList = ApiPOSTFunction<Pick<User, "name" | "email" | "password">, User["id"] | ErrorRes>

export type Router = (req: ExtendedNextApiRequestGET<any> & ExtendedNextApiRequestPOST<any>, res: NextApiResponse) => Promise<void>
