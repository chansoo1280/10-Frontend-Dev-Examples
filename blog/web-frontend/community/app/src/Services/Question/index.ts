import excuteQuery, { QueryResult } from "@Server/db"
import { Question, QuestionWithAuthor, QuestionWithAuthorRow } from "./Question.entity"
export type { Question }

export const findAllQuestion = async ({ cnt }: { cnt: number | null }): Promise<QuestionWithAuthor[] | null> => {
    const queryString = `
        SELECT question.id, question.title, question.authorId, question.created, 
            user.id as author_id, user.name as author_name, user.email as author_email 
            FROM question LEFT JOIN user ON question.authorId = user.id
        WHERE question.deleted IS NULL
        ORDER BY question.id DESC
        ${cnt !== null ? `LIMIT ?` : ``}
    `
    const queryValues = (() => {
        const values = []
        if (cnt !== null) {
            values.push(cnt)
        }
        return values
    })()
    try {
        const result = await excuteQuery<QuestionWithAuthorRow[]>({
            query: queryString,
            values: queryValues,
        })
        return (
            result.map((row) => {
                return {
                    id: row.id,
                    title: row.title,
                    authorId: row.authorId,
                    created: row.created,
                    author: {
                        id: row.author_id,
                        name: row.author_name,
                        email: row.author_email,
                    },
                }
            }) || null
        )
    } catch (error) {
        console.log(error)
        return null
    }
}
export const findQuestionById = async (id: Question["id"]): Promise<Question | null> => {
    try {
        const result = await excuteQuery<Question[]>({
            query: "SELECT * FROM question WHERE id = ? AND deleted IS NULL",
            values: [id],
        })
        const question = result[0]
        return question || null
    } catch (error) {
        console.log(error)
        return null
    }
}
export const deleteAllQuestion = async (): Promise<Question[] | null> => {
    const queryString = `UPDATE question SET deleted=?`
    const queryValues = [new Date()]
    try {
        const result = await excuteQuery<QueryResult>({
            query: queryString,
            values: queryValues,
        })
        return result.fieldCount === 0 ? [] : null
    } catch (error) {
        console.log(error)
        return null
    }
}
export const deleteQuestionById = async (id: Question["id"]): Promise<true | null> => {
    const queryString = `UPDATE question SET deleted=? WHERE id = ?`
    const queryValues = [new Date(), id]
    try {
        const result = await excuteQuery<QueryResult>({
            query: queryString,
            values: queryValues,
        })
        return true
    } catch (error) {
        console.log(error)
        return null
    }
}

export const createQuestion = async (question: Pick<Question, "title" | "contents" | "authorId">): Promise<Question["id"] | null> => {
    const queryString = `INSERT INTO question (title, contents, authorId, created) 
    VALUES (?, ?, ?, ?);`
    const queryValues = [question.title, question.contents, question.authorId, new Date()]
    try {
        const result = await excuteQuery<QueryResult>({
            query: queryString,
            values: queryValues,
        })
        return result.insertId
    } catch (error) {
        console.log(error)
        return null
    }
}

export const findQuestionByPageNo = async (pageNo: number, cntPerPage: number): Promise<QuestionWithAuthor[] | null> => {
    const startIdxOfPage = (pageNo - 1) * cntPerPage
    const queryString = `
        SELECT question.id, question.title, question.authorId, question.created, 
            user.id as author_id, user.name as author_name, user.email as author_email 
            FROM question LEFT JOIN user ON question.authorId = user.id
        WHERE question.deleted IS NULL
        ORDER BY question.id DESC
        LIMIT ?, ?;`
    const queryValues = [startIdxOfPage, cntPerPage]
    try {
        const result = await excuteQuery<QuestionWithAuthorRow[]>({
            query: queryString,
            values: queryValues,
        })
        return (
            result.map((row) => {
                return {
                    id: row.id,
                    title: row.title,
                    authorId: row.authorId,
                    created: row.created,
                    author: {
                        id: row.author_id,
                        name: row.author_name,
                        email: row.author_email,
                    },
                }
            }) || null
        )
    } catch (error) {
        console.log(error)
        return null
    }
}
export const getQuestionCnt = async (): Promise<number | null> => {
    const queryString = `SELECT COUNT(*) AS total FROM app.question;`
    const queryValues: never[] = []
    try {
        const result = await excuteQuery<[{ total: number }]>({
            query: queryString,
            values: queryValues,
        })
        return result[0].total || null
    } catch (error) {
        console.log(error)
        return null
    }
}
