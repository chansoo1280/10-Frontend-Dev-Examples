declare namespace HttpModel {
    export interface IRequestPayload {
        [key: string]: {};
    }

    export interface IRequestQueryPayload {
        [key: string]: {};
    }

    export type IRequestMethodType = "GET" | 'POST' | 'PUT' | 'DELETE'

}

export { HttpModel };