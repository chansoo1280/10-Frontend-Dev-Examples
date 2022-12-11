import React, { ChangeEventHandler } from "react";
import classnames from "classnames";
import style from "./CheckBox.module.css";

const CheckBox = ({
    id,
    isChecked,
    handleChangeCheckBox,
}: {
    id: number | string;
    isChecked: boolean;
    handleChangeCheckBox?: ChangeEventHandler<HTMLInputElement>;
}) => {
    return (
        <div className={style["check-box"]}>
            <input
                type="checkbox"
                defaultChecked={isChecked}
                id={`todo ${id}`}
                className={classnames(style["check-box__input"], {
                    [style["check-box__input--checked"]]: isChecked,
                })}
                onChange={handleChangeCheckBox}
            />
        </div>
    );
};

export default CheckBox;
