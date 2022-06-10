import { EasyTriviaError } from "./CustomErrors";
import { CategoryNamesStrict, CategoryNamesPretty } from "../Typings/enums";
import getCategoryData from "../Functions/getCategoryData";
import getQuestions from "../Functions/getQuestions";
/**
 * @class For trivia category related data retrieving
 */
export default class Category {
    constructor(arg) {
        if (Category.isIdResolvable(arg)) {
            this.id = Number(arg);
        }
        else if (Category.isNameResolvable(arg)) {
            this.id = Category.nameToId(arg);
        }
        else {
            throw new EasyTriviaError("Given argument could not be resolved into a category", EasyTriviaError.errors.headers.INVALID_CONSTRUCTOR_ARG);
        }
        this.strictName = Category.idToStrictName(this.id);
        this.prettyName = Category.idToPrettyName(this.id);
    }
    /**
     * Takes a category's id and returns it's 'strict' (constant) name
     * @param {NumberResolvable} arg
     * @returns {CategoryName<"Strict"> | null} The strict name, null if `arg` is unresolvable
     * @static
     */
    static idToStrictName(arg) {
        if (!this.isIdResolvable(arg))
            return null;
        return this.allNames[+arg];
    }
    /**
     * Takes a category's id and returns it's 'pretty' (display) name
     * @param {NumberResolvable} arg
     * @returns {CategoryName<"Pretty"> | null} The pretty name, null if `arg` is unresolvable
     * @static
     */
    static idToPrettyName(arg) {
        if (!this.isIdResolvable(arg))
            return null;
        return this.allPrettyNames[Number(arg)];
    }
    /**
     * Converts a given category name into the category's id
     * @param {CategoryNameResolvable} arg The category's name
     * @returns {number | null} The category id
     * @static
     */
    static nameToId(arg) {
        if (!isNaN(+arg))
            return null;
        return (CategoryNamesStrict[arg] ||
            CategoryNamesPretty[arg] ||
            null);
    }
    /**
     * Returns whether or not the given number can be resolved into a category id
     * @param {NumberResolvable} arg The number to resolve
     * @returns {boolean} Whether or not the given number resembles a category id
     * @static
     */
    static isIdResolvable(arg) {
        return !isNaN(+arg) && 9 <= arg && arg <= 32;
    }
    /**
     * Returns whether or not the given string can be resolved into a category name
     * @param {NumberResolvable} arg The name to resolve
     * @returns {boolean} Whether or not the given string resembles a category name
     * @static
     */
    static isNameResolvable(arg) {
        var _a;
        const completeNameList = [
            ...Object.keys(this.allPrettyNames),
            ...Object.keys(this.allNames),
        ]
            .filter((str) => isNaN(str))
            .map((str) => str.toLowerCase());
        return completeNameList.includes((_a = arg === null || arg === void 0 ? void 0 : arg.toLowerCase) === null || _a === void 0 ? void 0 : _a.call(arg));
    }
    /**
     * Converts a category's pretty name into it's strict version
     * @param {CategoryName<"Pretty">} arg The category's pretty name
     * @returns {CategoryName<"Strict"> | null} The category's strict name
     * @static
     */
    static prettyToStrictName(arg) {
        return this.idToStrictName(CategoryNamesPretty[arg]);
    }
    /**
     * Converts a category's strict name into it's pretty version
     * @param {CategoryName<"Pretty">} arg The category's strict name
     * @returns {CategoryName<"Strict"> | null} The category's pretty name
     * @static
     */
    static strictToPrettyName(arg) {
        const id = CategoryNamesStrict[arg];
        const entries = Array.from(Object.entries(CategoryNamesPretty));
        const entry = entries.find((e) => e[1] == id);
        return entry ? entry[0] : null;
    }
    /**
     * Chooses a random category and returns it's id.
     * @param {CategoryResolvableType} type? What type of resolvable to return
     * @returns {number | string | null} A random category id or name.
     * @static
     */
    static random(type = "ID") {
        const names = Object.keys(this.allPrettyNames).filter((val) => isNaN(+val));
        const resolvableName = names[(Math.random() * names.length) << 0];
        if (type == "ID" || !["NAME", "ID"].includes(type))
            return this.nameToId(resolvableName);
        return resolvableName;
    }
    /**
     * Resolves a given category resolvable and returns a `Category` class or `null`.
     * @param {CategoryResolvable} arg The argument to resolve.
     * @returns {Category | null} A new instance of `Category` if argument is resolvable.
     * @static
     */
    static resolve(arg) {
        try {
            const resultClass = new Category(arg);
            return resultClass;
        }
        catch (_) {
            return null;
        }
    }
    /**
     * Fetches the data about this category. Wrapper for `getCategoryData`
     * @returns {Promise<CategoryData>} A new promise of the category data
     */
    async getData() {
        return await getCategoryData(this.id);
    }
    /**
     * Fetches questions for this category. Wrapper for `getQuestions`
     * @param {Omit<QuestionOptions, "category">} options `QuestionOptions` with `category` omitted.
     * @returns {Promise<Question[]>} An array of questions
     */
    async fetchQuestions(options) {
        let finalOptions = {};
        if (options)
            finalOptions = options;
        finalOptions.category = this.id;
        return await getQuestions(finalOptions);
    }
}
/**
 * All OpenTDB category names in 'strict' (constant) form
 */
Category.allNames = CategoryNamesStrict;
/**
 * All OpenTDB category names in 'pretty' (display) form
 */
Category.allPrettyNames = CategoryNamesPretty;
