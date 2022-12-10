type DateFormat = (date: Date, f: string) => string;

export const dateFormat: DateFormat = (date, f) => {
    if (!date.valueOf()) return " ";
    const makeString: (text: string, len: number) => string = (text, len) => {
        let s = "",
            i = 0;
        while (i++ < len) {
            s += text;
        }
        return s;
    };

    const zf: (text: string, len: number) => string = (text, len) => {
        return makeString("0", len - text.length) + text;
    };

    const weekKorName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

    const weekKorShortName = ["일", "월", "화", "수", "목", "금", "토"];

    const weekEngName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const weekEngShortName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const d = date;

    return f.replace(/(yyyy|yy|MM|dd|KS|WN|KL|ES|EL|mh|mhh|hh|mm|m|ss|ENa\/p|a\/p)/gi, ($1) => {
        switch ($1) {
            case "yyyy":
                return String(d.getFullYear()); // 년 (4자리)

            case "yy":
                return zf(String(d.getFullYear() % 1000), 2); // 년 (2자리)

            case "MM":
                return zf(String(d.getMonth() + 1), 2); // 월 (2자리)

            case "dd":
                return zf(String(d.getDate()), 2); // 일 (2자리)

            case "KS":
                return weekKorShortName[d.getDay()]; // 요일 (짧은 한글)

            case "KL":
                return weekKorName[d.getDay()]; // 요일 (긴 한글)

            case "ES":
                return weekEngShortName[d.getDay()]; // 요일 (짧은 영어)

            case "EL":
                return weekEngName[d.getDay()]; // 요일 (긴 영어)

            case "mh":
                return String(d.getHours() % 12 || 12); // 시간 (12시간 기준)

            case "mhh":
                return zf(String(d.getHours() % 12 || 12), 2); // 시간 (12시간 기준, 2자리)

            case "hh":
                return zf(String(d.getHours()), 2); // 시간 (24시간 기준, 2자리)

            case "m":
                return String(d.getMinutes()); // 분

            case "mm":
                return zf(String(d.getMinutes()), 2); // 분 (2자리)

            case "ss":
                return zf(String(d.getSeconds()), 2); // 초 (2자리)

            case "ENa/p":
                return d.getHours() < 12 ? "AM" : "PM"; // AM/PM 구분

            case "a/p":
                return d.getHours() < 12 ? "오전" : "오후"; // 오전/오후 구분

            default:
                return $1;
        }
    });
};
