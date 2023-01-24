// #region Global Imports
// #endregion Global Imports

// #region Local Imports
import { ReqType } from "@Server/request"
import { ResMessageWithDesc, ResStatus } from "@Server/response"
import { APILoginPOST, Http } from "@Services"
import { User } from "@Services/User/User.entity"
// #endregion Local Imports

const login = async ({ email, password }: Pick<User, "email" | "password">) =>
    await Http<APILoginPOST>(ReqType.POST, ["/api/account/login"], {
        body: {
            email: email,
            password: password,
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

export const HttpAccount = {
    login,
}
