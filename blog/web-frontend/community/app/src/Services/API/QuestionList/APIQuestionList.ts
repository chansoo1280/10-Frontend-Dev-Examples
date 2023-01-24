import { ReqType } from "@Server/request"
import { Question } from "@Services/Question"
import { QuestionWithAuthor } from "@Services/Question/Question.entity"
import { ApiController } from "../ApiController"

export type APIQuestionListGET = {
    PathName: ["/api/questionList"]
    ReqType: ReqType.GET
    ReqPayload: {
        query: { cnt: number; cntPerPage: string }
    }
    ResPayload: {
        questionList: QuestionWithAuthor[]
        totalCnt: number
        totalPageCnt: number
    }
}
export type APIQuestionListPOST = {
    PathName: ["/api/questionList"]
    ReqType: ReqType.POST
    ReqPayload: {
        body: Pick<Question, "title" | "contents" | "authorId">
    }
    ResPayload: Question["id"]
}
export type APIQuestionListDELETE = {
    PathName: ["/api/questionList"]
    ReqType: ReqType.DELETE
    ReqPayload: never
    ResPayload: Question[]
}

export type APIQuestionListPagingGET = {
    PathName: ["/api/questionList/paging"]
    ReqType: ReqType.GET
    ReqPayload: {
        query: { pageNo: string; cntPerPage: string }
    }
    ResPayload: {
        questionList: QuestionWithAuthor[]
        totalCnt: number
        totalPageCnt: number
    }
}

export type APIQuestionGET = {
    PathName: [
        "/api/questionList/[id]",
        {
            id: number
        },
    ]
    ReqType: ReqType.GET
    ReqPayload: {
        query: { id: string }
    }
    ResPayload: Pick<Question, "id" | "title" | "contents" | "authorId">
}
export type APIQuestionDELETE = {
    PathName: [
        "/api/questionList/[id]",
        {
            id: number
        },
    ]
    ReqType: ReqType.DELETE
    ReqPayload: {
        query: { id: string }
    }
    ResPayload: string
}

export type APIQuestionList = {
    [ReqType.GET]: ApiController<ReqType.GET, APIQuestionListGET>
    [ReqType.POST]: ApiController<ReqType.POST, APIQuestionListPOST>
    [ReqType.DELETE]: ApiController<ReqType.DELETE, APIQuestionListDELETE>
}
export type APIQuestionListPaging = {
    [ReqType.GET]: ApiController<ReqType.GET, APIQuestionListPagingGET>
}

export type APIQuestion = {
    [ReqType.GET]: ApiController<ReqType.GET, APIQuestionGET>
    [ReqType.DELETE]: ApiController<ReqType.DELETE, APIQuestionDELETE>
}
