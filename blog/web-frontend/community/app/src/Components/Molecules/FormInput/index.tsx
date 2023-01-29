// #region Global Imports
import React from "react"
// #endregion Global Imports

// #region Local Imports
import { Input } from "@Components"
import { InputProps } from "@Components/Atoms/Input"
// #endregion Local Imports

const FormInput = ({ ...rest }: InputProps): JSX.Element => {
    return <Input widthType="wide" size="large" {...rest} />
}
export default FormInput
