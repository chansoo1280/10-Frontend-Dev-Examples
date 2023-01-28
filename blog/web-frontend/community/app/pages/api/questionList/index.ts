import { ReqType } from "@Server/request"
import { ResStatus, resMessage, resMessageWithDesc } from "@Server/response"
import { APIQuestionList, makeRouter } from "@Services"
import { verifyAccessToken } from "@Services/Account"
import { findAllQuestion, getQuestionCnt, createQuestion, deleteAllQuestion } from "@Services/Question"
import { verifyQuestion } from "@Services/Question/Question.entity"

const apiQuestionList: APIQuestionList = {
    [ReqType.GET]: async (req, res) => {
        const query = req.query
        const cntPerPage = Number(query.cntPerPage || "1")
        const tagList = query.tags !== undefined && query.tags !== "" ? query.tags?.split(", ") : null
        const cnt = Number(query.cnt) || null
        const searchStr = query?.searchStr || ""
        const result = await findAllQuestion({
            cnt,
            likeTagList: tagList,
            searchStr: query?.searchStr || "",
        })
        const questionCnt = await getQuestionCnt({
            likeTagList: tagList,
            searchStr: searchStr,
        })
        if (result !== null) {
            res.status(ResStatus.Success).json({
                questionList: result,
                totalCnt: questionCnt || 0,
                totalPageCnt: Math.ceil((questionCnt || 0) / cntPerPage),
                tagList,
                searchStr,
            })
            return
        }
        resMessage(res, ResStatus.Forbidden)
    },
    [ReqType.POST]: async (req, res) => {
        const body = req.body
        const user = verifyAccessToken(req.headers.authorization)
        if (user === undefined) {
            resMessage(res, ResStatus.Forbidden)
            return
        }
        if (user === null) {
            resMessageWithDesc(res, ResStatus.BadRequest, "작성자를 찾을 수 없습니다.")
            return
        }

        const questionInfo = { title: body.title || "", contents: body.contents || "", authorId: user.id, tags: body.tags || [] }

        const verifyResult = verifyQuestion(
            {
                ...questionInfo,
            },
            ["authorId", "title", "contents", "tags"],
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
