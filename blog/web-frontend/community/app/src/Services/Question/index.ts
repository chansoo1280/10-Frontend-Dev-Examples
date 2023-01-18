import excuteQuery, { QueryResult } from "@Server/db"
import { Question } from "./Question.entity"
export type { Question }

export const findAllQuestion = async (): Promise<Question[] | null> => {
    try {
        const result = await excuteQuery<Question[]>({
            query: "SELECT * FROM question WHERE deleted IS NULL",
            values: [],
        })
        return result || null
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
