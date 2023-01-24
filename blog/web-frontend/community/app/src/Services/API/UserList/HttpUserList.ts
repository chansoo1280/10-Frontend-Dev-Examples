// #region Global Imports
// #endregion Global Imports

// #region Local Imports
import { ReqType } from "@Server/request"
import { ResMessageWithDesc, ResStatus } from "@Server/response"
import { User } from "@Services/User"
import { Http } from "../Http"
import { APIUserListPOST } from "./APIUserList"
// #endregion Local Imports

const register = async ({ name, email, password }: Pick<User, "name" | "email" | "password">) =>
    await Http<APIUserListPOST>(ReqType.POST, ["/api/userList"], {
        body: {
            name: name,
            email: email,
            password: password,
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
export const HttpUserList = {
    register,
}
