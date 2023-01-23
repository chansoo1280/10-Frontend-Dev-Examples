import { resMessage, resMessageWithDesc, ResStatus } from "@Server/response"
import { APIQuestionList, makeRouter, ReqType } from "@Services"
import { verifyAccessToken } from "@Services/Account"
import { createQuestion, deleteAllQuestion, findAllQuestion, getQuestionCnt } from "@Services/Question"
import { verifyQuestion } from "@Services/Question/Question.entity"

const apiQuestionList: APIQuestionList = {
    [ReqType.GET]: async (req, res) => {
        const query = req.query
        const cntPerPage = Number(query.cntPerPage || "1")
        const cnt = Number(query.cnt) || null
        const result = await findAllQuestion({
            cnt,
        })
        const questionCnt = await getQuestionCnt()
        if (result !== null) {
            res.status(ResStatus.Success).json({
                questionList: result,
                totalCnt: questionCnt || 0,
                totalPageCnt: Math.ceil((questionCnt || 0) / cntPerPage),
            })
            return
        }
        resMessage(res, ResStatus.Forbidden)
    },
    [ReqType.POST]: async (req, res) => {
        const user = verifyAccessToken(req.headers.authorization)
        if (user === undefined) {
            resMessage(res, ResStatus.Forbidden)
            return
        }
        if (user === null) {
            resMessageWithDesc(res, ResStatus.BadRequest, "작성자를 찾을 수 없습니다.")
            return
        }

        const questionInfo = { title: req.body.title || "", contents: req.body.contents || "", authorId: user.id }

        const verifyResult = verifyQuestion(
            {
                ...questionInfo,
            },
            ["authorId", "title", "contents"],
        )
        if (verifyResult !== true) {
            resMessageWithDesc(res, ResStatus.BadRequest, verifyResult)
            return
        }

        const result = await createQuestion(questionInfo)
        if (result !== null) {
            res.status(ResStatus.Success).json(result)
            return
        }
        resMessage(res, ResStatus.BadRequest)
    },
    [ReqType.DELETE]: async (req, res) => {
        const result = await deleteAllQuestion()
        if (result !== null) {
            res.status(ResStatus.Success).json(result)
            return
        }
        resMessage(res, ResStatus.BadRequest)
    },
}

export default makeRouter(apiQuestionList)
