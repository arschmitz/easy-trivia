import { QuestionAmountRange } from "../Typings/enums";
import Category from "./Category";
import { EasyTriviaError } from "./CustomErrors";
export default class Validator {
    constructor(options) {
        this.options = options;
    }
    // checkOptions() {
    //   try {
    //     this.checkAmount();
    //     this.checkCategory();
    //     this.checkDifficulty();
    //     this.checkEncode();
    //     this.checkOptions();
    //     this.checkToken();
    //     this.checkType();
    //     return this.options;
    //   } catch (err) {
    //     throw err;
    //   }
    // }
    checkAmount() {
        const { amount } = this.options;
        if (amount === undefined || amount === null)
            return null;
        if (typeof amount == "number") {
            if (amount % 1 !== 0)
                throw new EasyTriviaError("'amount' option for QuestionOptions must be a whole integer", EasyTriviaError.errors.headers.INVALID_OPT);
            else if (amount < QuestionAmountRange.Min ||
                amount > QuestionAmountRange.Max)
                throw new EasyTriviaError(`'amount' option for QuestionOptions must be from ${QuestionAmountRange.Min} to ${QuestionAmountRange.Max}`, EasyTriviaError.errors.headers.INVALID_OPT);
            else
                return amount;
        }
        else if (typeof amount == "string") {
            if (isNaN(+amount))
                throw new EasyTriviaError("'amount' option for QuestionOptions must be of type number or string number", EasyTriviaError.errors.headers.INVALID_OPT);
            else if (+amount < QuestionAmountRange.Min ||
                +amount > QuestionAmountRange.Max)
                throw new EasyTriviaError(`'amount' option for QuestionOptions must from ${QuestionAmountRange.Min} to ${QuestionAmountRange.Max}`, EasyTriviaError.errors.headers.INVALID_OPT);
            else
                return parseInt(amount);
        }
        else {
            throw new EasyTriviaError(`'amount' option for QuestionOptions must be of type number or string number, received ${typeof amount}`, EasyTriviaError.errors.headers.INVALID_OPT);
        }
    }
    checkCategory() {
        const { category } = this.options;
        if (category === undefined || category === null)
            return null;
        if (typeof category == "string") {
            if (isNaN(+category)) {
                const id = Category.nameToId(category);
                if (id === null) {
                    throw new EasyTriviaError(`'category' option (${category}) for QuestionOptions does not resolve into a trivia category name`, EasyTriviaError.errors.headers.INVALID_OPT);
                }
                return id;
            }
            else {
                if (!Category.isIdResolvable(+category)) {
                    throw new EasyTriviaError(`'category' option (${category}) for QuestionOptions does not resolve into a trivia category id`, EasyTriviaError.errors.headers.INVALID_OPT);
                }
                return parseInt(category);
            }
        }
        else if (typeof category == "number") {
            if (!Category.isIdResolvable(+category)) {
                throw new EasyTriviaError(`'category' option (${category}) for QuestionOptions does not resolve into a trivia category id`, EasyTriviaError.errors.headers.INVALID_OPT);
            }
            return category;
        }
        else {
            throw new EasyTriviaError(`'category' option ("${category}") for QuestionOptions does not resolve into a trivia category name`, EasyTriviaError.errors.headers.INVALID_OPT);
        }
    }
    checkDifficulty() {
        const { difficulty } = this.options;
        if (difficulty === undefined || difficulty === null)
            return null;
        if (typeof difficulty != "string") {
            throw new EasyTriviaError(`'difficulty' option for QuestionOptions must be of type string, received ${typeof difficulty}`, EasyTriviaError.errors.headers.INVALID_OPT);
        }
        const values = ["easy", "medium", "hard"];
        if (!values.includes(difficulty)) {
            throw new EasyTriviaError(`'difficulty' option ("${difficulty}") for QuestionOptions does not resolve into a question difficulty`, EasyTriviaError.errors.headers.INVALID_OPT);
        }
        return difficulty;
    }
    checkEncode() {
        const { encode } = this.options;
        if (encode === undefined || encode === null)
            return null;
        if (typeof encode != "string") {
            throw new EasyTriviaError(`'encode' option for QuestionOptions must be of type string, received ${typeof encode}`, EasyTriviaError.errors.headers.INVALID_OPT);
        }
        const values = [
            "base64",
            "none",
            "url3986",
            "urlLegacy",
        ];
        if (!values.includes(encode)) {
            throw new EasyTriviaError(`'encode' option ("${encode}") for QuestionOptions does not resolve into a question encode`, EasyTriviaError.errors.headers.INVALID_OPT);
        }
        return encode;
    }
    checkToken() {
        const { session: token } = this.options;
        if (token === undefined || token === null)
            return null;
        if (typeof token != "string") {
            throw new EasyTriviaError(`'session' option for QuestionOptions must be of type string or session`, EasyTriviaError.errors.headers.INVALID_OPT);
        }
        else if (!token.length) {
            throw new EasyTriviaError(`'session' option for QuestionOptions must not be an empty string`, EasyTriviaError.errors.headers.INVALID_OPT);
        }
        return token;
    }
    checkType() {
        const { type } = this.options;
        if (type === undefined || type === null)
            return null;
        if (typeof type != "string") {
            throw new EasyTriviaError(`'type' option for QuestionOptions must be of type string, received ${typeof type}`, EasyTriviaError.errors.headers.INVALID_OPT);
        }
        const values = ["boolean", "multiple"];
        if (!values.includes(type)) {
            throw new EasyTriviaError(`'type' option ("${type}") for QuestionOptions does not resolve into a question type`, EasyTriviaError.errors.headers.INVALID_OPT);
        }
        return type;
    }
    static _checkCategory(category) {
        if (category === undefined || category === null)
            return null;
        if (typeof category == "string") {
            if (isNaN(+category)) {
                const id = Category.nameToId(category);
                if (id === null) {
                    throw new EasyTriviaError(`'category' option (${category}) for QuestionOptions does not resolve into a trivia category name`, EasyTriviaError.errors.headers.INVALID_OPT);
                }
                return id;
            }
            else {
                if (!Category.isIdResolvable(+category)) {
                    throw new EasyTriviaError(`'category' option (${category}) for QuestionOptions does not resolve into a trivia category id`, EasyTriviaError.errors.headers.INVALID_OPT);
                }
                return parseInt(category);
            }
        }
        else if (typeof category == "number") {
            if (!Category.isIdResolvable(+category)) {
                throw new EasyTriviaError(`'category' option (${category}) for QuestionOptions does not resolve into a trivia category id`, EasyTriviaError.errors.headers.INVALID_OPT);
            }
            return category;
        }
        else {
            throw new EasyTriviaError(`'category' option ("${category}") for QuestionOptions does not resolve into a trivia category name`, EasyTriviaError.errors.headers.INVALID_OPT);
        }
    }
}
