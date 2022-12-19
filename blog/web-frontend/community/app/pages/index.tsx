import { Tags } from "@Components"
import { Tag } from "@Components/Molecules/Tags"
import Head from "next/head"
import { useState } from "react"

export default function Home() {
    const [tagList, setTagList] = useState<Tag[]>([
        { title: "Tag 1", checked: false, type: "checkable" },
        { title: "Tag 2", type: "deletable" },
    ])
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <Tags
                    onAdd={(title) => {
                        if (tagList.find((tag) => tag.title === title)) {
                            return
                        }
                        setTagList([
                            ...tagList,
                            {
                                title,
                                type: "deletable",
                            },
                        ])
                    }}
                    onClick={(tag) => {
                        if (tag.type === "checkable") {
                            setTagList(
                                tagList.map((item) =>
                                    item.title === tag.title
                                        ? {
                                              ...item,
                                              checked: !tag.checked,
                                          }
                                        : item,
                                ),
                            )
                        } else if (tag.type === "deletable") {
                            setTagList(tagList.filter((item) => item.title !== tag.title))
                        }
                    }}
                    tagList={tagList}
                />
            </div>
        </>
    )
}
