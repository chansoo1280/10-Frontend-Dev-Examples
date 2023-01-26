// #region Global Imports
import React from "react"
// #endregion Global Imports

// #region Local Imports
import { Card, defaultProps } from "@Components"
// #endregion Local Imports

const LinedCard = ({ children, ...rest }: defaultProps): JSX.Element => {
    return (
        <Card gap={"0"} padding={"0"} direction={"vertical"} bgType={"white"} separator={<div style={{ width: "100%", height: "1px", background: "#0000000F" }}></div>} {...rest}>
            {children}
        </Card>
    )
}
export default LinedCard
