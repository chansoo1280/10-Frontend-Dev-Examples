import { ReqType } from "@Server/request"
import { resMessage, resMessageWithDesc, ResStatus } from "@Server/response"
import { APIQuestion, makeRouter } from "@Services"
import { verifyAccessToken } from "@Services/Account"
import { findQuestionById, deleteQuestionById, modifyQuestion } from "@Services/Question"

const apiQuestion: APIQuestion = {
    [ReqType.GET]: async (req, res) => {
        const id = Number(req.query.id)
        if (id === undefined) {
            resMessage(res, ResStatus.BadRequest)
            return
        }
        const result = await findQuestionById(id)
        if (result !== null) {
            res.status(ResStatus.Success).json(result)
            return
        }
        resMessage(res, ResStatus.NoContent)
    },
    [ReqType.DELETE]: async (req, res) => {
        const id = Number(req.query.id)
        if (id === undefined) {
            resMessage(res, ResStatus.BadRequest)
            return
        }

        const user = verifyAccessToken(req.headers.authorization)
        if (user === undefined) {
            resMessage(res, ResStatus.Forbidden)
            return
        }

        const question = await findQuestionById(id)
        if (question === null) {
            resMessage(res, ResStatus.BadRequest)
            return
        }
        if (user === null || user.id !== question.authorId) {
            resMessage(res, ResStatus.Forbidden)
            return
        }

        const result = await deleteQuestionById(id)
        if (result !== null) {
            resMessageWithDesc(res, ResStatus.Success, "삭제 성공")
            return
        }
        resMessage(res, ResStatus.BadRequest)
    },
    [ReqType.PATCH]: async (req, res) => {
        const body = req.body
        const id = Number(req.query.id)
        if (id === undefined) {
            resMessage(res, ResStatus.BadRequest)
            return
        }

        const user = verifyAccessToken(req.headers.authorization)
        if (user === undefined) {
            resMessage(res, ResStatus.Forbidden)
            return
        }
        const question = await findQuestionById(id)
        if (question === null) {
            resMessage(res, ResStatus.BadRequest)
            return
        }
        if (user === null || user.id !== question.authorId) {
            resMessage(res, ResStatus.Forbidden)
            return
        }

        const result = await modifyQuestion({
            id,
            title: body?.title || "",
            contents: body?.contents || "",
            tags: body?.tags || null,
        })
        if (result !== null) {
            resMessageWithDesc(res, ResStatus.Success, "수정 성공")
            return
        }
        resMessage(res, ResStatus.BadRequest)
    },
}

export default makeRouter(apiQuestion)
