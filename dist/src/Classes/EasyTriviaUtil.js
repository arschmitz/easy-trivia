import { EasyTriviaError } from "./CustomErrors";
import Validator from "./Validator";
export default class EasyTriviaUtil {
    static async openTDBRequest(url) {
        if (url === undefined)
            throw new EasyTriviaError("'url' argument is required, received undefined", "missing_argument");
        if (typeof url != "string")
            throw new EasyTriviaError(`'url' argument must be of type string, received ${typeof url}`, "invalid_argument");
        let response;
        try {
            response = await fetch(url);
        }
        catch {
            throw new EasyTriviaError("API responded with no data", EasyTriviaError.errors.headers.EMPTY_RESPONSE);
        }
        const data = await response.json();
        return data;
    }
    static shuffleArray(arg) {
        if (!Array.isArray(arg))
            throw new TypeError("Argument must be an array");
        // Fisher–Yates shuffle: https://bost.ocks.org/mike/shuffle/
        // TypeScript Adjusted
        let m = arg.length, t, i;
        // While there remain elements to shuffle…
        while (m) {
            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);
            // And swap it with the current element.
            t = arg[m];
            arg[m] = arg[i];
            arg[i] = t;
        }
        return arg;
    }
    static finalizeOptions(options) {
        const validator = new Validator(options);
        const { encode: targetEncode } = options;
        const verifiedOptions = {
            amount: validator.checkAmount(),
            difficulty: validator.checkDifficulty(),
            type: validator.checkType(),
            category: validator.checkCategory(),
            session: validator.checkToken(),
            encode: targetEncode == "none" ? "base64" : validator.checkEncode(),
        };
        return verifiedOptions;
    }
    static generateQueryString(baseLink, obj) {
        let queryArgs = [];
        for (const [key, value] of Object.entries(obj)) {
            if (value !== null && value !== undefined)
                queryArgs.push(`${key}=${value}`);
        }
        return baseLink + queryArgs.join("&");
    }
    static parseRawQuestions(questions) {
        const result = questions.map((q) => {
            const parsedQuestion = {
                value: q.question,
                category: q.category,
                type: q.type,
                difficulty: q.difficulty,
                correctAnswer: q.correct_answer,
                incorrectAnswers: q.incorrect_answers,
                allAnswers: EasyTriviaUtil.shuffleArray([
                    q.correct_answer,
                    ...q.incorrect_answers,
                ]),
                checkAnswer: (arg) => {
                    var _a, _b;
                    return (((_a = arg === null || arg === void 0 ? void 0 : arg.toLowerCase) === null || _a === void 0 ? void 0 : _a.call(arg)) ==
                        this.base64Decoder.atob(q.correct_answer).toLowerCase() ||
                        ((_b = arg === null || arg === void 0 ? void 0 : arg.toLowerCase) === null || _b === void 0 ? void 0 : _b.call(arg)) == q.correct_answer);
                },
            };
            return parsedQuestion;
        });
        return result;
    }
}
EasyTriviaUtil.apiResponses = [
    { name: "SUCCESS", message: "Successful response" },
    {
        name: "NO_RESULTS",
        message: "Could not return results. The API does not have enough questions for your query",
    },
    { name: "INVALID_PARAMETER", message: "An invalid parameter was received" },
    {
        name: "TOKEN_NOT_FOUND",
        message: "The given API token is invalid or does not exist",
    },
    {
        name: "TOKEN_EMPTY",
        message: "This trivia session has returned all possible questions for the specified query",
    },
];
EasyTriviaUtil.links = {
    base: {
        CATEGORY_DATA: "https://opentdb.com/api_count.php?category=",
        GET_QUESTIONS: "https://opentdb.com/api.php?",
        RESET_SESSION: "https://opentdb.com/api_token.php?command=reset&token=",
    },
    full: {
        START_SESSION: "https://opentdb.com/api_token.php?command=request",
        OVR_QUESTION_CNT: "https://opentdb.com/api_count_global.php",
    },
};
EasyTriviaUtil.questionDifficulties = [
    "easy",
    "medium",
    "hard",
];
EasyTriviaUtil.questionEncodings = [
    "urlLegacy",
    "url3986",
    "base64",
    "none",
];
EasyTriviaUtil.questionTypes = ["multiple", "boolean"];
EasyTriviaUtil.base64Decoder = {
    atob(str) {
        return atob(str);
    },
    decode(value) {
        return value == null ||
            value == undefined ||
            typeof value == "boolean" ||
            typeof value == "number"
            ? value
            : typeof value == "string"
                ? this.decodeString(value)
                : typeof value == "object" && !Array.isArray(value)
                    ? this.decodeObjectValues(value)
                    : Array.isArray(value)
                        ? this.decodeStringArray(value)
                        : value;
    },
    decodeString(str) {
        return this.atob(str);
    },
    decodeStringArray(arr) {
        return arr.map((v) => this.decode(v));
    },
    decodeObjectValues(obj) {
        const o = new Object().constructor();
        Object.entries(obj).forEach(([key, value]) => (o[key] = this.decode(value)));
        return o;
    },
};
