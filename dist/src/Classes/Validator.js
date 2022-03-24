"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enums_1 = require("../Typings/enums");
var Category_1 = require("./Category");
var CustomErrors_1 = require("./CustomErrors");
var Validator = /** @class */ (function () {
    function Validator(options) {
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
    Validator.prototype.checkAmount = function () {
        var amount = this.options.amount;
        if (amount === undefined || amount === null)
            return null;
        if (typeof amount == "number") {
            if (amount % 1 !== 0)
                throw new CustomErrors_1.EasyTriviaError("'amount' option for QuestionOptions must be a whole integer", CustomErrors_1.EasyTriviaError.errors.headers.INVALID_OPT);
            else if (amount < enums_1.QuestionAmountRange.Min ||
                amount > enums_1.QuestionAmountRange.Max)
                throw new CustomErrors_1.EasyTriviaError("'amount' option for QuestionOptions must be from " + enums_1.QuestionAmountRange.Min + " to " + enums_1.QuestionAmountRange.Max, CustomErrors_1.EasyTriviaError.errors.headers.INVALID_OPT);
            else
                return amount;
        }
        else if (typeof amount == "string") {
            if (isNaN(+amount))
                throw new CustomErrors_1.EasyTriviaError("'amount' option for QuestionOptions must be of type number or string number", CustomErrors_1.EasyTriviaError.errors.headers.INVALID_OPT);
            else if (+amount < enums_1.QuestionAmountRange.Min ||
                +amount > enums_1.QuestionAmountRange.Max)
                throw new CustomErrors_1.EasyTriviaError("'amount' option for QuestionOptions must from " + enums_1.QuestionAmountRange.Min + " to " + enums_1.QuestionAmountRange.Max, CustomErrors_1.EasyTriviaError.errors.headers.INVALID_OPT);
            else
                return parseInt(amount);
        }
        else {
            throw new CustomErrors_1.EasyTriviaError("'amount' option for QuestionOptions must be of type number or string number, received " + typeof amount, CustomErrors_1.EasyTriviaError.errors.headers.INVALID_OPT);
        }
    };
    Validator.prototype.checkCategory = function () {
        var category = this.options.category;
        if (category === undefined || category === null)
            return null;
        if (typeof category == "string") {
            if (isNaN(+category)) {
                var id = Category_1.default.nameToId(category);
                if (id === null) {
                    throw new CustomErrors_1.EasyTriviaError("'category' option (" + category + ") for QuestionOptions does not resolve into a trivia category name", CustomErrors_1.EasyTriviaError.errors.headers.INVALID_OPT);
                }
                return id;
            }
            else {
                if (!Category_1.default.isIdResolvable(+category)) {
                    throw new CustomErrors_1.EasyTriviaError("'category' option (" + category + ") for QuestionOptions does not resolve into a trivia category id", CustomErrors_1.EasyTriviaError.errors.headers.INVALID_OPT);
                }
                return parseInt(category);
            }
        }
        else if (typeof category == "number") {
            if (!Category_1.default.isIdResolvable(+category)) {
                throw new CustomErrors_1.EasyTriviaError("'category' option (" + category + ") for QuestionOptions does not resolve into a trivia category id", CustomErrors_1.EasyTriviaError.errors.headers.INVALID_OPT);
            }
            return category;
        }
        else {
            throw new CustomErrors_1.EasyTriviaError("'category' option (\"" + category + "\") for QuestionOptions does not resolve into a trivia category name", CustomErrors_1.EasyTriviaError.errors.headers.INVALID_OPT);
        }
    };
    Validator.prototype.checkDifficulty = function () {
        var difficulty = this.options.difficulty;
        if (difficulty === undefined || difficulty === null)
            return null;
        if (typeof difficulty != "string") {
            throw new CustomErrors_1.EasyTriviaError("'difficulty' option for QuestionOptions must be of type string, received " + typeof difficulty, CustomErrors_1.EasyTriviaError.errors.headers.INVALID_OPT);
        }
        var values = ["easy", "medium", "hard"];
        if (!values.includes(difficulty)) {
            throw new CustomErrors_1.EasyTriviaError("'difficulty' option (\"" + difficulty + "\") for QuestionOptions does not resolve into a question difficulty", CustomErrors_1.EasyTriviaError.errors.headers.INVALID_OPT);
        }
        return difficulty;
    };
    Validator.prototype.checkEncode = function () {
        var encode = this.options.encode;
        if (encode === undefined || encode === null)
            return null;
        if (typeof encode != "string") {
            throw new CustomErrors_1.EasyTriviaError("'encode' option for QuestionOptions must be of type string, received " + typeof encode, CustomErrors_1.EasyTriviaError.errors.headers.INVALID_OPT);
        }
        var values = [
            "base64",
            "none",
            "url3986",
            "urlLegacy",
        ];
        if (!values.includes(encode)) {
            throw new CustomErrors_1.EasyTriviaError("'encode' option (\"" + encode + "\") for QuestionOptions does not resolve into a question encode", CustomErrors_1.EasyTriviaError.errors.headers.INVALID_OPT);
        }
        return encode;
    };
    Validator.prototype.checkToken = function () {
        var token = this.options.token;
        if (token === undefined || token === null)
            return null;
        if (typeof token != "string") {
            throw new CustomErrors_1.EasyTriviaError("'token' option for QuestionOptions must be of type string", CustomErrors_1.EasyTriviaError.errors.headers.INVALID_OPT);
        }
        else if (!token.length) {
            throw new CustomErrors_1.EasyTriviaError("'token' option for QuestionOptions must not be empty", CustomErrors_1.EasyTriviaError.errors.headers.INVALID_OPT);
        }
        return token;
    };
    Validator.prototype.checkType = function () {
        var type = this.options.type;
        if (type === undefined || type === null)
            return null;
        if (typeof type != "string") {
            throw new CustomErrors_1.EasyTriviaError("'type' option for QuestionOptions must be of type string, received " + typeof type, CustomErrors_1.EasyTriviaError.errors.headers.INVALID_OPT);
        }
        var values = ["boolean", "multiple"];
        if (!values.includes(type)) {
            throw new CustomErrors_1.EasyTriviaError("'type' option (\"" + type + "\") for QuestionOptions does not resolve into a question type", CustomErrors_1.EasyTriviaError.errors.headers.INVALID_OPT);
        }
        return type;
    };
    Validator._checkCategory = function (category) {
        if (category === undefined || category === null)
            return null;
        if (typeof category == "string") {
            if (isNaN(+category)) {
                var id = Category_1.default.nameToId(category);
                if (id === null) {
                    throw new CustomErrors_1.EasyTriviaError("'category' option (" + category + ") for QuestionOptions does not resolve into a trivia category name", CustomErrors_1.EasyTriviaError.errors.headers.INVALID_OPT);
                }
                return id;
            }
            else {
                if (!Category_1.default.isIdResolvable(+category)) {
                    throw new CustomErrors_1.EasyTriviaError("'category' option (" + category + ") for QuestionOptions does not resolve into a trivia category id", CustomErrors_1.EasyTriviaError.errors.headers.INVALID_OPT);
                }
                return parseInt(category);
            }
        }
        else if (typeof category == "number") {
            if (!Category_1.default.isIdResolvable(+category)) {
                throw new CustomErrors_1.EasyTriviaError("'category' option (" + category + ") for QuestionOptions does not resolve into a trivia category id", CustomErrors_1.EasyTriviaError.errors.headers.INVALID_OPT);
            }
            return category;
        }
        else {
            throw new CustomErrors_1.EasyTriviaError("'category' option (\"" + category + "\") for QuestionOptions does not resolve into a trivia category name", CustomErrors_1.EasyTriviaError.errors.headers.INVALID_OPT);
        }
    };
    return Validator;
}());
exports.default = Validator;
