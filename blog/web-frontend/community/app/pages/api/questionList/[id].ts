import { errorRes, successRes } from "@Server/response"
import { APIQuestion, makeRouter, ReqType } from "@Services"
import { verifyAccessToken } from "@Services/Account"
import { findQuestionById, deleteQuestionById } from "@Services/Question"
const apiQuestion: APIQuestion = {
    [ReqType.GET]: async (req, res) => {
        const id = Number(req.query.id)
        if (id === undefined) {
            res.status(400).json(errorRes[400])
            return
        }

        const result = await findQuestionById(id)
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

        const question = await findQuestionById(id)
        if (question === null) {
            res.status(400).json(errorRes[400])
            return
        }

        if (req.headers.authorization === undefined) {
            res.status(403).json(errorRes[403])
            return
        }
        // Authorization: `Bearer ${user.token}`
        const user = verifyAccessToken(req.headers.authorization)
        if (user === null || user.id !== question.authorId) {
            res.status(403).json(errorRes[403])
            return
        }

        const result = await deleteQuestionById(id)
        if (result !== null) {
            res.status(200).json(
                successRes({
                    state: 200,
                    message: "삭제 성공",
                }),
            )
            return
        }
        res.status(400).json(errorRes[400])
    },
}

export default makeRouter<APIQuestion>(apiQuestion)
