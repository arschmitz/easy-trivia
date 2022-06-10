import Category from "../Classes/Category";
import { EasyTriviaError } from "../Classes/CustomErrors";
import EasyTriviaUtil from "../Classes/EasyTriviaUtil";
/**
 * Fetches a trivia category's data.
 * @param {CategoryResolvable} arg An argument resolving to a trivia category.
 * @returns {Promise<CategoryData>} The data of the category.
 */
export default async function getCategoryData(arg) {
    var _a;
    const categoryId = (_a = Category.resolve(arg)) === null || _a === void 0 ? void 0 : _a.id;
    if (!categoryId) {
        throw new EasyTriviaError(`Given argument does not resolve into a trivia category`, EasyTriviaError.errors.headers.INVALID_ARG);
    }
    const baseLink = EasyTriviaUtil.links.base.CATEGORY_DATA;
    const data = (await EasyTriviaUtil.openTDBRequest(baseLink + categoryId));
    const { category_id: id, category_question_count: { total_question_count: total, total_easy_question_count: forEasy, total_medium_question_count: forMedium, total_hard_question_count: forHard, }, } = data;
    const result = {
        id,
        name: Category.idToPrettyName(id),
        questionCounts: {
            total,
            forEasy,
            forMedium,
            forHard,
        },
    };
    return result;
}
