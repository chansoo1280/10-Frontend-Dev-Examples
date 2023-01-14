import { errorRes, successRes } from "@Server/response"
import { APIUser, ReqType, Router } from "@Services"
import { findUserById, deleteUserById } from "@Services/User"
const apiUser: APIUser = {
    [ReqType.GET]: async (req, res) => {
        const id = Number(req.query.id)
        if (id === undefined) {
            res.status(400).json(errorRes[400])
            return
        }
        const result = await findUserById(id)
        if (result !== null) {
            res.status(200).json(successRes(result))
            return
        }
        res.status(200).json(errorRes[204])
    },
    [ReqType.DELETE]: async (req, res) => {
        const id = Number(req.query.id)
        if (id === undefined) {
            res.status(400).json(errorRes[400])
            return
        }
        const result = await deleteUserById(id)
        if (result !== null) {
            res.status(200).json({
                state: 200,
                message: "삭제 성공",
            })
            return
        }
        res.status(400).json(errorRes[400])
    },
}

const router: Router = async (req, res) => {
    const allowedMethodList = Object.keys(apiUser)
    if (allowedMethodList.includes(req.method)) {
        await apiUser[req.method as keyof APIUser](req, res)
        return
    }
    res.status(405).json({ message: `Allowed Method: ${allowedMethodList.join(", ")}` })
}
export default router
