import { Question } from "@Services/Question"

export type APIQuestionListGET = {
    ReqQueryPayload: never
    ReqBodyPayload: never
    ResPayload: Question[]
}
export type APIQuestionListPOST = {
    ReqQueryPayload: never
    ReqBodyPayload: Pick<Question, "title" | "contents" | "authorId">
    ResPayload: Question["id"]
}
export type APIQuestionListDELETE = {
    ReqQueryPayload: never
    ReqBodyPayload: never
    ResPayload: Question[]
}
export type APIQuestionGET = {
    ReqQueryPayload: { id: string }
    ReqBodyPayload: never
    ResPayload: Pick<Question, "id" | "title" | "contents" | "authorId">
}
export type APIQuestionDELETE = {
    ReqQueryPayload: { id: string }
    ReqBodyPayload: never
    ResPayload: string
}
