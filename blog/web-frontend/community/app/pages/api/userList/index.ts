import { errorRes } from "@Server/response"
import { APIGETUserList, APIPOSTUserList, Router } from "@Services"
import { createUser, findAllUser, findUserByEmail } from "@Services/User"
const getUserList: APIGETUserList = async (req, res) => {
    const result = await findAllUser()
    if (result === null) {
        res.status(403).json(errorRes[403])
    } else {
        res.status(200).json(result)
    }
    res.status(403).json(errorRes[403])
}

const postUserList: APIPOSTUserList = async (req, res) => {
    const user = await findUserByEmail(req.body.email)
    if (user !== null) {
        res.status(400).json({
            state: 400,
            message: "중복된 이메일",
        })
        return
    }
    const result = await createUser(req.body)
    if (result === null) {
        res.status(400).json(errorRes[400])
    } else {
        res.status(200).json(result)
    }
}

const router: Router = async (req, res) => {
    switch (req.method) {
        case "GET": {
            await getUserList(req, res)
            break
        }
        case "POST": {
            await postUserList(req, res)
            break
        }
        default: {
            res.status(405).json({ message: "Allowed Method: GET" })
        }
    }
}
export default router
