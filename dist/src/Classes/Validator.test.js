import Validator from "./Validator";
function createInstance(options) {
    return new Validator(options);
}
test("tests output of Validator.checkAmount()", () => {
    let validator = createInstance({ amount: {} });
    expect(() => {
        validator.checkAmount();
    }).toThrow(TypeError);
    validator = createInstance({ amount: true });
    expect(() => {
        validator.checkAmount();
    }).toThrow(TypeError);
    validator = createInstance({ amount: "" });
    expect(() => {
        validator.checkAmount();
    }).toThrow(TypeError);
    validator = createInstance({ amount: 0 });
    expect(() => {
        validator.checkAmount();
    }).toThrow(TypeError);
    validator = createInstance({ amount: 51 });
    expect(() => {
        validator.checkAmount();
    }).toThrow(TypeError);
    validator = createInstance({ amount: 25 });
    expect(validator.checkAmount()).toEqual(25);
    validator = createInstance({ amount: "25" });
    expect(validator.checkAmount()).toEqual(25);
    validator = createInstance({ amount: undefined });
    expect(validator.checkAmount()).toEqual(null);
    validator = createInstance({ amount: null });
    expect(validator.checkAmount()).toEqual(null);
});
test("tests output of Validator.checkCategory()", () => {
    let validator = createInstance({ category: {} });
    expect(() => {
        validator.checkCategory();
    }).toThrow(TypeError);
    validator = createInstance({ category: true });
    expect(() => {
        validator.checkCategory();
    }).toThrow(TypeError);
    validator = createInstance({ category: "..." });
    expect(() => {
        validator.checkCategory();
    }).toThrow(TypeError);
    validator = createInstance({ category: 8 });
    expect(() => {
        validator.checkCategory();
    }).toThrow(TypeError);
    validator = createInstance({ category: 33 });
    expect(() => {
        validator.checkCategory();
    }).toThrow(TypeError);
    validator = createInstance({ category: 25 });
    expect(validator.checkCategory()).toEqual(25);
    validator = createInstance({ category: "25" });
    expect(validator.checkCategory()).toEqual(25);
    validator = createInstance({ category: "GENERAL_KNOWLEDGE" });
    expect(validator.checkCategory()).toEqual(9);
    validator = createInstance({
        category: "ENTERTAINMENT_CARTOON_AND_ANIMATIONS",
    });
    expect(validator.checkCategory()).toEqual(32);
    validator = createInstance({ category: "General Knowledge" });
    expect(validator.checkCategory()).toEqual(9);
    validator = createInstance({
        category: "Entertainment: Cartoon and Animations",
    });
    expect(validator.checkCategory()).toEqual(32);
    validator = createInstance({ category: undefined });
    expect(validator.checkCategory()).toEqual(null);
    validator = createInstance({ category: null });
    expect(validator.checkCategory()).toEqual(null);
});
test("tests output of Validator.checkDifficulty()", () => {
    let validator = createInstance({
        difficulty: {},
    });
    expect(() => {
        validator.checkDifficulty();
    }).toThrow(TypeError);
    validator = createInstance({
        difficulty: true,
    });
    expect(() => {
        validator.checkDifficulty();
    }).toThrow(TypeError);
    validator = createInstance({ difficulty: "..." });
    expect(() => {
        validator.checkDifficulty();
    }).toThrow(TypeError);
    validator = createInstance({
        difficulty: 1,
    });
    expect(() => {
        validator.checkDifficulty();
    }).toThrow(TypeError);
    validator = createInstance({
        difficulty: "1",
    });
    expect(() => {
        validator.checkDifficulty();
    }).toThrow(TypeError);
    validator = createInstance({ difficulty: "easy" });
    expect(validator.checkDifficulty()).toEqual("easy");
    validator = createInstance({ difficulty: undefined });
    expect(validator.checkDifficulty()).toEqual(null);
    validator = createInstance({ difficulty: null });
    expect(validator.checkDifficulty()).toEqual(null);
});
test("tests output of Validator.checkEncoding()", () => {
    let validator = createInstance({
        encode: {},
    });
    expect(() => {
        validator.checkEncode();
    }).toThrow(TypeError);
    validator = createInstance({
        encode: true,
    });
    expect(() => {
        validator.checkEncode();
    }).toThrow(TypeError);
    validator = createInstance({ encode: "..." });
    expect(() => {
        validator.checkEncode();
    }).toThrow(TypeError);
    validator = createInstance({
        encode: 1,
    });
    expect(() => {
        validator.checkEncode();
    }).toThrow(TypeError);
    validator = createInstance({
        encode: "1",
    });
    expect(() => {
        validator.checkEncode();
    }).toThrow(TypeError);
    validator = createInstance({ encode: "base64" });
    expect(validator.checkEncode()).toEqual("base64");
    validator = createInstance({ encode: undefined });
    expect(validator.checkEncode()).toEqual(null);
    validator = createInstance({ encode: null });
    expect(validator.checkEncode()).toEqual(null);
});
test("tests output of Validator.checkToken()", () => {
    let validator = createInstance({
        session: {},
    });
    expect(() => {
        validator.checkToken();
    }).toThrow(TypeError);
    validator = createInstance({
        session: true,
    });
    expect(() => {
        validator.checkToken();
    }).toThrow(TypeError);
    validator = createInstance({ session: "" });
    expect(() => {
        validator.checkToken();
    }).toThrow(TypeError);
    validator = createInstance({
        session: 1,
    });
    expect(() => {
        validator.checkToken();
    }).toThrow(TypeError);
    validator = createInstance({ session: "..." });
    expect(validator.checkToken()).toEqual("...");
    validator = createInstance({ session: undefined });
    expect(validator.checkToken()).toEqual(null);
    validator = createInstance({ session: null });
    expect(validator.checkToken()).toEqual(null);
});
test("tests output of Validator.checkType()", () => {
    let validator = createInstance({
        type: {},
    });
    expect(() => {
        validator.checkType();
    }).toThrow(TypeError);
    validator = createInstance({
        type: true,
    });
    expect(() => {
        validator.checkType();
    }).toThrow(TypeError);
    validator = createInstance({ type: "..." });
    expect(() => {
        validator.checkType();
    }).toThrow(TypeError);
    validator = createInstance({
        type: 1,
    });
    expect(() => {
        validator.checkType();
    }).toThrow(TypeError);
    validator = createInstance({ type: "boolean" });
    expect(validator.checkType()).toEqual("boolean");
    validator = createInstance({ type: undefined });
    expect(validator.checkType()).toEqual(null);
    validator = createInstance({ type: null });
    expect(validator.checkType()).toEqual(null);
});
