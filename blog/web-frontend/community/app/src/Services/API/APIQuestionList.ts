import { Question } from "@Services/Question"
import { ApiFunction, ReqType } from "./Http"

export type APIQuestionListGET = {
    ReqType: ReqType.GET
    ReqQueryPayload: never
    ReqBodyPayload: never
    ResPayload: Question[]
}
export type APIQuestionListPOST = {
    ReqType: ReqType.POST
    ReqQueryPayload: never
    ReqBodyPayload: Pick<Question, "title" | "contents" | "authorId">
    ResPayload: Question["id"]
}
export type APIQuestionListDELETE = {
    ReqType: ReqType.DELETE
    ReqQueryPayload: never
    ReqBodyPayload: never
    ResPayload: Question[]
}
export type APIQuestionGET = {
    ReqType: ReqType.GET
    ReqQueryPayload: { id: string }
    ReqBodyPayload: never
    ResPayload: Pick<Question, "id" | "title" | "contents" | "authorId">
}
export type APIQuestionDELETE = {
    ReqType: ReqType.DELETE
    ReqQueryPayload: { id: string }
    ReqBodyPayload: never
    ResPayload: string
}

export type APIQuestionList = {
    [ReqType.GET]: ApiFunction<ReqType.GET, APIQuestionListGET>
    [ReqType.POST]: ApiFunction<ReqType.POST, APIQuestionListPOST>
    [ReqType.DELETE]: ApiFunction<ReqType.DELETE, APIQuestionListDELETE>
}

export type APIQuestion = {
    [ReqType.GET]: ApiFunction<ReqType.GET, APIQuestionGET>
    [ReqType.DELETE]: ApiFunction<ReqType.DELETE, APIQuestionDELETE>
}
