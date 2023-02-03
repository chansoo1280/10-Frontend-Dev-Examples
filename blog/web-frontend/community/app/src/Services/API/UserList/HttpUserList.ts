// #region Global Imports
// #endregion Global Imports

// #region Local Imports
import { ReqType } from "@Server/request"
import { ResMessageWithDesc, ResStatus } from "@Server/response"
import { User } from "@Services/User"
import { Http } from "../Http"
import { APIUserListPOST, APIVerifyCodePOST } from "./APIUserList"
// #endregion Local Imports

const register = async ({
    name,
    email,
    password,
    verifyCode,
    verifyCodeToken,
}: Pick<User, "name" | "email" | "password"> & {
    verifyCode: string
    verifyCodeToken: string
}) =>
    await Http<APIUserListPOST>(ReqType.POST, ["/api/userList"], {
        body: {
            name,
            email,
            password,
            verifyCode,
            verifyCodeToken,
        },
    })

const sendVerifyCodeEmail = async ({ email }: Pick<User, "email">) =>
    await Http<APIVerifyCodePOST>(ReqType.POST, ["/api/userList/verifyCode"], {
        body: {
            email: email,
        },
    })
export const HttpUserList = {
    register,
    sendVerifyCodeEmail,
}
