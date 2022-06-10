import EasyTriviaUtil from "./EasyTriviaUtil";
/**
 * @class Class for starting OpenTDB API sessions
 * */
class Session {
    constructor() {
        /**
         * The current session token
         */
        this.token = null;
    }
    /**
     * Starts a new trivia session and assigns the new token to `Session#token`.
     * @async
     * @returns {Promise<string>} The session token.
     */
    async start() {
        const url = EasyTriviaUtil.links.full.START_SESSION;
        const oldToken = this.token;
        try {
            const data = (await EasyTriviaUtil.openTDBRequest(url));
            const { token: newToken } = data;
            if (newToken === null || oldToken == newToken) {
                const { EasyTriviaError } = require("../classes/Errors");
                throw new EasyTriviaError("This trivia's session token unexpectedly failed to update", EasyTriviaError.errors.headers.FAILED_REQUEST);
            }
            else {
                this.token = newToken;
                return this.token;
            }
        }
        catch (err) {
            throw err;
        }
    }
    /**
     * Resets the current trivia session.
     * @async
     * @returns {Promise<string>} The current session token.
     */
    async reset() {
        const url = EasyTriviaUtil.links.base.RESET_SESSION + this.token;
        try {
            const data = (await EasyTriviaUtil.openTDBRequest(url));
            return data.token;
        }
        catch (err) {
            throw err;
        }
    }
    /** Sets `Session#token` to null */
    end() {
        this.token = null;
    }
}
export default Session;
