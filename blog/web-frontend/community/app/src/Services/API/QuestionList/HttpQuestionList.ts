// #region Global Imports
// #endregion Global Imports

// #region Local Imports
import { ReqType } from "@Server/request"
import { ResMessageWithDesc, ResStatus } from "@Server/response"
import { Http } from "@Services"
import { Question } from "@Services/Question"
import { User } from "@Services/User"
import { APIQuestionDELETE, APIQuestionGET, APIQuestionListGET, APIQuestionListPagingGET, APIQuestionListPOST, APIQuestionPATCH } from "./APIQuestionList"
// #endregion Local Imports

const getQuestion = async ({ id }: Pick<Question, "id">) => {
    return await Http<APIQuestionGET>(ReqType.GET, ["/api/questionList/[id]", { id }], {}).catch((e: ResMessageWithDesc) => {
        console.log(e)
        switch (e.status) {
            case ResStatus.NoContent:
                console.log(e.description)
                return null
            case ResStatus.BadRequest:
                console.log(e.description)
                return null

            default:
                break
        }
        return null
    })
}
const getQuestionList = async (pageNo: number, tags: string, searchStr: string) => {
    const cntPerPage = 2
    return await Http<APIQuestionListGET>(ReqType.GET, ["/api/questionList"], {
        query: {
            cnt: pageNo * cntPerPage,
            cntPerPage: String(cntPerPage),
            tags,
            searchStr,
        },
    }).catch((e: ResMessageWithDesc) => {
        console.log(e)
        switch (e.status) {
            case ResStatus.NoContent:
                console.log(e.description)
                return null
            case ResStatus.BadRequest:
                console.log(e.description)
                return null

            default:
                break
        }
        return null
    })
}
const getQuestionListPaging = async (pageNo: number, tags: string, searchStr: string) => {
    const cntPerPage = 2
    return await Http<APIQuestionListPagingGET>(ReqType.GET, ["/api/questionList/paging"], {
        query: {
            pageNo: String(pageNo),
            cntPerPage: String(cntPerPage),
            tags,
            searchStr,
        },
    }).catch((e: ResMessageWithDesc) => {
        console.log(e)
        switch (e.status) {
            case ResStatus.NoContent:
                console.log(e.description)
                return null
            case ResStatus.BadRequest:
                console.log(e.description)
                return null

            default:
                break
        }
        return null
    })
}
const createQuestion = async (question: Pick<Question, "title" | "contents" | "tags">, user: Pick<User, "id">) => {
    if (!user) {
        return null
    }
    return await Http<APIQuestionListPOST>(ReqType.POST, ["/api/questionList"], {
        body: {
            title: question.title,
            contents: question.contents,
            authorId: user.id,
            tags: question.tags,
        },
    }).catch((e: ResMessageWithDesc) => {
        console.log(e)
        switch (e.status) {
            case ResStatus.BadRequest:
                console.log(e.description)
                return null

            default:
                break
        }
        return null
    })
}
const moodifyQuestion = async (question: Pick<Question, "id" | "title" | "contents" | "tags">) => {
    return await Http<APIQuestionPATCH>(
        ReqType.PATCH,
        [
            "/api/questionList/[id]",
            {
                id: question.id,
            },
        ],
        {
            body: {
                title: question.title,
                contents: question.contents,
                tags: question.tags,
            },
        },
    ).catch((e: ResMessageWithDesc) => {
        console.log(e)
        switch (e.status) {
            case ResStatus.BadRequest:
                console.log(e.description)
                return null

            default:
                break
        }
        return null
    })
}
const deleteQuestion = async (question: Pick<Question, "id">) => {
    return await Http<APIQuestionDELETE>(
        ReqType.DELETE,
        [
            "/api/questionList/[id]",
            {
                id: question.id,
            },
        ],
        {},
    ).catch((e: ResMessageWithDesc) => {
        console.log(e)
        switch (e.status) {
            case ResStatus.BadRequest:
                console.log(e.description)
                return null

            default:
                break
        }
        return null
    })
}
export const HttpQuestionList = {
    getQuestion,
    getQuestionList,
    getQuestionListPaging,
    createQuestion,
    moodifyQuestion,
    deleteQuestion,
}
