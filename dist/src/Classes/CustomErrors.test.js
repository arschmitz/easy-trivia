import { EasyTriviaError, OpenTDBResponse } from "./CustomErrors";
test("Ensure instance creations of EasyTriviaError throw errors when either arguments are not strings", () => {
    expect(() => {
        new EasyTriviaError({}, {});
    }).toThrow(Error);
    expect(() => {
        new EasyTriviaError(1, 1);
    }).toThrow(Error);
    expect(() => {
        new EasyTriviaError(true, true);
    }).toThrow(Error);
    expect(() => {
        new EasyTriviaError("", "");
    }).toThrow(Error);
    expect(new EasyTriviaError("...", "...")).toBeInstanceOf(Error);
});
test("Ensure instance creations of OpenTDBResponse throw errors when given argument is not a number between 0-4", () => {
    expect(() => {
        new OpenTDBResponse(-1);
    }).toThrow(Error);
    expect(() => {
        new OpenTDBResponse(5);
    }).toThrow(Error);
    expect(new OpenTDBResponse(1)).toBeInstanceOf(Error);
});
