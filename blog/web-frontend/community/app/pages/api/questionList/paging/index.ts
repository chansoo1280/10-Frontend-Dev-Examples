import { ReqType } from "@Server/request"
import { ResStatus, resMessage } from "@Server/response"
import { APIQuestionListPaging, makeRouter } from "@Services"
import { findQuestionByPageNo, getQuestionCnt } from "@Services/Question"

const apiQuestionList: APIQuestionListPaging = {
    [ReqType.GET]: async (req, res) => {
        const query = req.query
        const pageNo = Number(query.pageNo || "1")
        const cntPerPage = Number(query.cntPerPage || "1")
        const tagList = query.tagList !== undefined && query.tagList !== "" ? query.tagList?.split(", ") : null

        const result = await findQuestionByPageNo(pageNo, cntPerPage, tagList)
        const questionCnt = await getQuestionCnt(tagList)
        if (result !== null) {
            res.status(ResStatus.Success).json({
                questionList: result,
                totalCnt: questionCnt || 0,
                totalPageCnt: Math.ceil((questionCnt || 0) / cntPerPage),
                tagList: tagList,
            })
            return
        }
        resMessage(res, ResStatus.Forbidden)
    },
}

export default makeRouter(apiQuestionList)
