// #region Global Imports
// #endregion Global Imports

// #region Local Imports
import { ReqType } from "@Server/request"
import { ResMessageWithDesc, ResStatus } from "@Server/response"
import { APIFindPwGET, APILoginPOST, APIResetPwPATCH, Http } from "@Services"
import { User } from "@Services/User/User.entity"
// #endregion Local Imports

const login = async ({ email, password, keepLogin }: Pick<User, "email" | "password"> & { keepLogin: boolean }) =>
    await Http<APILoginPOST>(ReqType.POST, ["/api/account/login"], {
        body: {
            email,
            password,
            keepLogin,
        },
    })

const sendEmailResetPwPath = async ({ email }: Pick<User, "email">) =>
    await Http<APIFindPwGET>(ReqType.GET, ["/api/account/find-pw"], {
        query: {
            email: email,
        },
    })

const resetPw = async ({ email, password, token }: { token: string } & Pick<User, "email" | "password">) =>
    await Http<APIResetPwPATCH>(ReqType.PATCH, ["/api/account/reset-pw"], {
        body: {
            email,
            password,
            token,
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

export const HttpAccount = {
    login,
    sendEmailResetPwPath,
    resetPw,
}
