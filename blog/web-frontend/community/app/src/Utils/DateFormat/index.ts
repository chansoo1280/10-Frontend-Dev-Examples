declare global {
    interface Date {
        format: (arg0: string) => string
    }
    interface String {
        string: (arg0: number) => string
        zf: (arg0: number) => string
    }
    interface Number {
        zf: (arg0: number) => string
    }
}
export default Date.prototype.format = function (f: string) {
    if (!this.valueOf()) return " "

    const weekKorName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]

    const weekKorShortName = ["일", "월", "화", "수", "목", "금", "토"]

    const weekEngName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    const weekEngShortName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    return f.replace(/(yyyy|yy|MM|dd|KS|WN|KL|ES|EL|HH|hh|mm|ss|a\/p)/gi, ($1: string): string => {
        switch ($1) {
            case "yyyy":
                return String(this.getFullYear()) // 년 (4자리)

            case "yy":
                return (this.getFullYear() % 1000).zf(2) // 년 (2자리)

            case "MM":
                return (this.getMonth() + 1).zf(2) // 월 (2자리)

            case "dd":
                return this.getDate().zf(2) // 일 (2자리)

            case "KS":
                return weekKorShortName[this.getDay()] // 요일 (짧은 한글)

            case "KL":
                return weekKorName[this.getDay()] // 요일 (긴 한글)

            case "ES":
                return weekEngShortName[this.getDay()] // 요일 (짧은 영어)

            case "EL":
                return weekEngName[this.getDay()] // 요일 (긴 영어)

            case "HH":
                return this.getHours().zf(2) // 시간 (24시간 기준, 2자리)

            case "mhh":
                return (0 !== this.getHours() % 12 ? this.getHours() : 12).zf(2) // 시간 (12시간 기준, 2자리)

            case "hh":
                return this.getHours().zf(2) // 시간 (24시간 기준, 2자리)

            case "mm":
                return this.getMinutes().zf(2) // 분 (2자리)

            case "ss":
                return this.getSeconds().zf(2) // 초 (2자리)

            case "a/p":
                return this.getHours() < 12 ? "오전" : "오후" // 오전/오후 구분

            default:
                return $1
        }
    })
}

String.prototype.string = function (len: number) {
    return new Array(len).fill(this).join("")
}

String.prototype.zf = function (len: number) {
    return "0".string(len - this.length) + this
}

Number.prototype.zf = function (len: number) {
    return this.toString().zf(len)
}
