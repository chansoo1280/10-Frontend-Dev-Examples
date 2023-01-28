import excuteQuery, { QueryResult } from "@Server/db"
import { Question, QuestionInfoWithAuthor, QuestionWithAuthor, QuestionWithAuthorRow } from "./Question.entity"
export type { Question }

export const findAllQuestion = async ({ cnt, likeTagList, searchStr }: { cnt: number | null; likeTagList: Question["tags"]; searchStr: string }): Promise<QuestionWithAuthor[] | null> => {
    const queryString = `
        SELECT question.id, question.title, question.authorId, question.tags, question.created, 
            user.id as author_id, user.name as author_name, user.email as author_email 
            FROM question LEFT JOIN user ON question.authorId = user.id
        WHERE question.deleted IS NULL
        ${
            likeTagList !== null
                ? `
                    AND (
                    ${likeTagList
                        .map(
                            () => `
                                question.tags LIKE ?
                            `,
                        )
                        .join(" OR ")}
                    )
                `
                : ""
        }
        AND question.title LIKE ?
        ORDER BY question.id DESC
        ${cnt !== null ? `LIMIT ?` : ``}
    `
    const queryValues = (() => {
        const values: (number | string)[] = [...(likeTagList?.map((str) => `%${str}%`) || [])]
        values.push(`%${searchStr}%`)
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
            result.map((row) => ({
                id: row.id,
                title: row.title,
                authorId: row.authorId,
                tags: row.tags === null ? null : row.tags.split(", "),
                created: row.created,
                author: {
                    id: row.author_id,
                    name: row.author_name,
                    email: row.author_email,
                },
            })) || null
        )
    } catch (error) {
        console.log(error)
        return null
    }
}
export const findQuestionById = async (id: Question["id"]): Promise<QuestionInfoWithAuthor | null> => {
    const queryString = `
        SELECT question.id, question.title, question.authorId, question.tags, question.created, question.contents, 
            user.id as author_id, user.name as author_name, user.email as author_email 
            FROM question LEFT JOIN user ON question.authorId = user.id
        WHERE question.id = ?
            AND question.deleted IS NULL
    `
    const queryValues = [id]
    try {
        const result = await excuteQuery<QuestionWithAuthorRow[]>({
            query: queryString,
            values: queryValues,
        })
        if (result.length === 0) {
            return null
        }
        const row = result[0]
        return (
            {
                id: row.id,
                title: row.title,
                authorId: row.authorId,
                tags: row.tags === null ? null : row.tags.split(", "),
                created: row.created,
                contents: row.contents,
                author: {
                    id: row.author_id,
                    name: row.author_name,
                    email: row.author_email,
                },
            } || null
        )
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

export const createQuestion = async (question: Pick<Question, "title" | "contents" | "authorId" | "tags">): Promise<Question["id"] | null> => {
    const queryString = `INSERT INTO question (title, contents, authorId, tags, created) 
    VALUES (?, ?, ?, ?, ?);`
    const queryValues = [question.title, question.contents, question.authorId, question.tags && question.tags.join(", "), new Date()]
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

export const modifyQuestion = async (question: Pick<Question, "id" | "title" | "contents" | "tags">): Promise<boolean | null> => {
    const queryString = `
        UPDATE question SET title = ?, contents = ?, tags = ?
        WHERE id = ?
            AND deleted IS NULL
        `
    const queryValues = [question.title, question.contents, question.tags && question.tags.join(", "), question.id]
    try {
        const result = await excuteQuery<QueryResult>({
            query: queryString,
            values: queryValues,
        })
        return result.changedRows === 1
    } catch (error) {
        console.log(error)
        return null
    }
}

export const findQuestionByPageNo = async (pageNo: number, cntPerPage: number, likeTagList: Question["tags"], searchStr: string): Promise<QuestionInfoWithAuthor[] | null> => {
    const startIdxOfPage = (pageNo - 1) * cntPerPage
    const queryString = `
        SELECT question.id, question.title, question.authorId, question.tags, question.created, 
            user.id as author_id, user.name as author_name, user.email as author_email 
            FROM question LEFT JOIN user ON question.authorId = user.id
        WHERE question.deleted IS NULL
        AND question.title LIKE ?
        ${
            likeTagList !== null
                ? `
                    AND (
                    ${likeTagList
                        .map(
                            () => `
                                question.tags LIKE ?
                            `,
                        )
                        .join(" OR ")}
                    )
                `
                : ""
        }
        ORDER BY question.id DESC
        LIMIT ?, ?;`
    const queryValues = [`%${searchStr}%`, ...(likeTagList?.map((str) => `%${str}%`) || []), startIdxOfPage, cntPerPage]
    console.log(queryString, queryValues)
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
                    tags: row.tags === null ? null : row.tags.split(", "),
                    created: row.created,
                    contents: row.contents,
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
export const getQuestionCnt = async ({ likeTagList, searchStr }: { likeTagList: Question["tags"]; searchStr: string }): Promise<number | null> => {
    const queryString = `
    SELECT COUNT(*) AS total 
    FROM app.question 
    WHERE question.deleted IS NULL
        AND question.title LIKE ?
        ${
            likeTagList !== null
                ? `
                    AND (
                    ${likeTagList
                        .map(
                            () => `
                                question.tags LIKE ?
                            `,
                        )
                        .join(" OR ")}
                    )
                `
                : ""
        }
    ;
    `
    const queryValues = [`%${searchStr}%`, ...(likeTagList?.map((str) => `%${str}%`) || [])]
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
