// #region Global Imports
import React from "react"
// #endregion Global Imports

// #region Local Imports
import { Space } from "@Components"
import { SpaceProps } from "@Components/Atoms/Space"
// #endregion Local Imports

export const Rows = (props: SpaceProps): JSX.Element => {
    return <Space widthType="wide" direction="vertical" align="flex-start" padding="16px 24px" gap="16px" {...props} />
}
export const Row = (props: SpaceProps): JSX.Element => {
    return <Space widthType="wide" padding="0" {...props} />
}
