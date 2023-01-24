// #region Global Imports
// #endregion Global Imports

// #region Local Imports
import { ReqType } from "@Server/request"
import { ResMessageWithDesc, ResStatus } from "@Server/response"
import { Http } from "@Services"
import { User } from "@Services/User"
import { APIQuestionListGET, APIQuestionListPagingGET, APIQuestionListPOST } from "./APIQuestionList"
// #endregion Local Imports

const getQuestionList = async (pageNo: string) => {
    console.log(pageNo)
    const cntPerPage = "2"
    return await Http<APIQuestionListGET>(ReqType.GET, ["/api/questionList"], {
        query: {
            cnt: Number(pageNo) * Number(cntPerPage),
            cntPerPage,
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
const getQuestionListPaging = async (pageNo: string) => {
    const cntPerPage = "2"
    return await Http<APIQuestionListPagingGET>(ReqType.GET, ["/api/questionList/paging"], {
        query: {
            pageNo,
            cntPerPage,
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
const createQuestion = async (user: User) => {
    if (!user) {
        return null
    }
    await Http<APIQuestionListPOST>(ReqType.POST, ["/api/questionList"], {
        body: {
            title: "test1",
            contents: "asdf",
            authorId: user.id,
        },
    }).catch((e: ResMessageWithDesc) => {
        console.log(e)
        switch (e.status) {
            case ResStatus.NoContent:
                console.log(e.description)
                return null

            default:
                break
        }
        return null
    })
}
export const HttpQuestionList = {
    getQuestionList,
    getQuestionListPaging,
    createQuestion,
}
