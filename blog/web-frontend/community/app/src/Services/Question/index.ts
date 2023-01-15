import excuteQuery, { QueryResult } from "@Server/db"
import { Question } from "./Question.entity"
export type { Question }

export async function findAllQuestion(): Promise<Question[] | null> {
    try {
        const result = await excuteQuery<Question[]>({
            query: "SELECT * FROM question",
            values: [],
        })
        return result || null
    } catch (error) {
        return null
    }
}
export async function findQuestionById(id: Question["id"]): Promise<Question | null> {
    try {
        const result = await excuteQuery<Question[]>({
            query: "SELECT * FROM question WHERE id = ?",
            values: [id],
        })
        const question = result[0]
        return (
            {
                id: question.id,
                title: question.title,
                contents: question.contents,
                authorId: 12,
            } || null
        )
    } catch (error) {
        return null
    }
}
export async function deleteAllQuestion(): Promise<Question[] | null> {
    const queryString = `DELETE FROM question`
    const queryValues: never[] = []
    try {
        const result = await excuteQuery<QueryResult>({
            query: queryString,
            values: queryValues,
        })
        return result.fieldCount === 0 ? [] : null
    } catch (error) {
        return null
    }
}
export async function deleteQuestionById(id: Question["id"]): Promise<true | null> {
    const queryString = `DELETE FROM question WHERE id = ?`
    const queryValues = [id]
    try {
        const result = await excuteQuery<QueryResult>({
            query: queryString,
            values: queryValues,
        })
        return true
    } catch (error) {
        return null
    }
}

export async function createQuestion(question: Question): Promise<Question["id"] | null> {
    const queryString = `INSERT INTO question (title, contents, authorId) 
    VALUES (?, ?, ?, ?);`
    const queryValues = [question.title, question.contents, question.authorId]
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
