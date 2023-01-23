import { resMessage, ResStatus } from "@Server/response"
import { APIQuestionListPaging, makeRouter, ReqType } from "@Services"
import { findQuestionByPageNo, getQuestionCnt } from "@Services/Question"

const apiQuestionList: APIQuestionListPaging = {
    [ReqType.GET]: async (req, res) => {
        const query = req.query
        const pageNo = Number(query.pageNo || "1")
        const cntPerPage = Number(query.cntPerPage || "1")

        const result = await findQuestionByPageNo(pageNo, cntPerPage)
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
}

export default makeRouter(apiQuestionList)
