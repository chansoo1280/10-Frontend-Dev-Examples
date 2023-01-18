import { errorRes, successRes } from "@Server/response"
import { APIQuestionList, makeRouter, ReqType } from "@Services"
import { createQuestion, deleteAllQuestion, findAllQuestion } from "@Services/Question"
import { findUserById } from "@Services/User"

const apiQuestionList: APIQuestionList = {
    [ReqType.GET]: async (req, res) => {
        const result = await findAllQuestion()
        if (result !== null) {
            res.status(200).json(successRes(result))
            return
        }
        res.status(403).json(errorRes[403])
    },
    [ReqType.POST]: async (req, res) => {
        const user = await findUserById(req.body.authorId)
        console.log(user)
        if (user === null) {
            res.status(400).json({
                state: 400,
                message: "작성자를 찾을 수 없습니다.",
            })
            return
        }
        const result = await createQuestion(req.body)
        if (result !== null) {
            res.status(200).json(successRes(result))
            return
        }
        res.status(400).json(errorRes[400])
    },
    [ReqType.DELETE]: async (req, res) => {
        const result = await deleteAllQuestion()
        if (result !== null) {
            res.status(200).json(successRes(result))
            return
        }
        res.status(400).json(errorRes[400])
    },
}

export default makeRouter<APIQuestionList>(apiQuestionList)
