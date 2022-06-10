import Category from "./Category";
function createInstance(arg) {
    return new Category(arg);
}
test("Ensure instance creations of Category throw errors when the argument is not a CategoryResolvable", () => {
    expect(() => createInstance(8)).toThrow(Error);
    expect(() => createInstance(33)).toThrow(Error);
    expect(() => createInstance("text")).toThrow(Error);
    expect(() => createInstance(true)).toThrow(Error);
    expect(() => createInstance({})).toThrow(Error);
});
test("Test outputs of Category.idToStrictName()", () => {
    expect(Category.idToStrictName(8)).toBe(null);
    expect(Category.idToStrictName(33)).toBe(null);
    expect(Category.idToStrictName("text")).toBe(null);
    expect(Category.idToStrictName(true)).toBe(null);
    expect(Category.idToStrictName(9)).toBe("GENERAL_KNOWLEDGE");
    expect(Category.idToStrictName(18)).toBe("SCIENCE_COMPUTERS");
    expect(Category.idToStrictName("18")).toBe("SCIENCE_COMPUTERS");
    expect(Category.idToStrictName(32)).toBe("ENTERTAINMENT_CARTOON_AND_ANIMATIONS");
});
test("Test outputs of Category.idToPrettyName()", () => {
    expect(Category.idToPrettyName(8)).toBe(null);
    expect(Category.idToPrettyName(33)).toBe(null);
    expect(Category.idToPrettyName("text")).toBe(null);
    expect(Category.idToPrettyName(true)).toBe(null);
    expect(Category.idToPrettyName(9)).toBe("General Knowledge");
    expect(Category.idToPrettyName(18)).toBe("Science: Computers");
    expect(Category.idToPrettyName("18")).toBe("Science: Computers");
    expect(Category.idToPrettyName(32)).toBe("Entertainment: Cartoon and Animations");
});
test("Test outputs of Category.nameToId()", () => {
    expect(Category.nameToId("8")).toBe(null);
    expect(Category.nameToId("33")).toBe(null);
    expect(Category.nameToId(15)).toBe(null);
    expect(Category.nameToId("text")).toBe(null);
    expect(Category.nameToId(true)).toBe(null);
    expect(Category.nameToId("General Knowledge")).toBe(9);
    expect(Category.nameToId("GENERAL_KNOWLEDGE")).toBe(9);
    expect(Category.nameToId("Science: Computers")).toBe(18);
    expect(Category.nameToId("SCIENCE_COMPUTERS")).toBe(18);
    expect(Category.nameToId("Entertainment: Cartoon and Animations")).toBe(32);
    expect(Category.nameToId("ENTERTAINMENT_CARTOON_AND_ANIMATIONS")).toBe(32);
});
test("Test outputs of Category.isIdResolvable()", () => {
    expect(Category.isIdResolvable("8")).toBe(false);
    expect(Category.isIdResolvable(8)).toBe(false);
    expect(Category.isIdResolvable("33")).toBe(false);
    expect(Category.isIdResolvable(33)).toBe(false);
    expect(Category.isIdResolvable("15")).toBe(true);
    expect(Category.isIdResolvable(15)).toBe(true);
    expect(Category.isIdResolvable("text")).toBe(false);
    expect(Category.isIdResolvable(true)).toBe(false);
    expect(Category.isIdResolvable("General Knowledge")).toBe(false);
    expect(Category.isIdResolvable("GENERAL_KNOWLEDGE")).toBe(false);
});
test("Test outputs of Category.isNameResolvable()", () => {
    expect(Category.isNameResolvable("8")).toBe(false);
    expect(Category.isNameResolvable(8)).toBe(false);
    expect(Category.isNameResolvable("33")).toBe(false);
    expect(Category.isNameResolvable(33)).toBe(false);
    expect(Category.isNameResolvable("15")).toBe(false);
    expect(Category.isNameResolvable(15)).toBe(false);
    expect(Category.isNameResolvable("text")).toBe(false);
    expect(Category.isNameResolvable(true)).toBe(false);
    expect(Category.isNameResolvable("General Knowledge")).toBe(true);
    expect(Category.isNameResolvable("GENERAL_KNOWLEDGE")).toBe(true);
    expect(Category.isNameResolvable("Entertainment: Cartoon and Animations")).toBe(true);
    expect(Category.isNameResolvable("ENTERTAINMENT_CARTOON_AND_ANIMATIONS")).toBe(true);
});
test("Test outputs of Category.prettyToStrictName()", () => {
    expect(Category.prettyToStrictName("8")).toBe(null);
    expect(Category.prettyToStrictName(8)).toBe(null);
    expect(Category.prettyToStrictName("33")).toBe(null);
    expect(Category.prettyToStrictName(33)).toBe(null);
    expect(Category.prettyToStrictName("15")).toBe(null);
    expect(Category.prettyToStrictName(15)).toBe(null);
    expect(Category.prettyToStrictName("text")).toBe(null);
    expect(Category.prettyToStrictName(true)).toBe(null);
    expect(Category.prettyToStrictName("General Knowledge")).toBe("GENERAL_KNOWLEDGE");
    expect(Category.prettyToStrictName("GENERAL_KNOWLEDGE")).toBe(null);
    expect(Category.prettyToStrictName("Entertainment: Cartoon and Animations")).toBe("ENTERTAINMENT_CARTOON_AND_ANIMATIONS");
    expect(Category.prettyToStrictName("ENTERTAINMENT_CARTOON_AND_ANIMATIONS")).toBe(null);
});
test("Test outputs of Category.strictToPrettyName()", () => {
    expect(Category.strictToPrettyName("8")).toBe(null);
    expect(Category.strictToPrettyName(8)).toBe(null);
    expect(Category.strictToPrettyName("33")).toBe(null);
    expect(Category.strictToPrettyName(33)).toBe(null);
    expect(Category.strictToPrettyName("15")).toBe(null);
    expect(Category.strictToPrettyName(15)).toBe(null);
    expect(Category.strictToPrettyName("text")).toBe(null);
    expect(Category.strictToPrettyName(true)).toBe(null);
    expect(Category.strictToPrettyName("General Knowledge")).toBe(null);
    expect(Category.strictToPrettyName("GENERAL_KNOWLEDGE")).toBe("General Knowledge");
    expect(Category.strictToPrettyName("Entertainment: Cartoon and Animations")).toBe(null);
    expect(Category.strictToPrettyName("ENTERTAINMENT_CARTOON_AND_ANIMATIONS")).toBe("Entertainment: Cartoon and Animations");
});
test("Tests outputs for Category.random()", () => {
    expect(Category.random(1)).toBeGreaterThanOrEqual(9);
    expect(Category.random(1)).toBeLessThanOrEqual(32);
    expect(Category.random({})).toBeGreaterThanOrEqual(9);
    expect(Category.random({})).toBeLessThanOrEqual(32);
    expect(Category.random(true)).toBeGreaterThanOrEqual(9);
    expect(Category.random(true)).toBeLessThanOrEqual(32);
    expect(Category.random("ID")).toBeGreaterThanOrEqual(9);
    expect(Category.random("ID")).toBeLessThanOrEqual(32);
    expect(typeof Category.random("NAME")).toBe("string");
});
test("Tests outputs for Category.resolve()", () => {
    expect(Category.resolve(8)).toBe(null);
    expect(Category.resolve(33)).toBe(null);
    expect(Category.resolve(true)).toBe(null);
    expect(Category.resolve({})).toBe(null);
    expect(Category.resolve("")).toBe(null);
    expect(Category.resolve(9)).toBeInstanceOf(Category);
    expect(Category.resolve(32)).toBeInstanceOf(Category);
    expect(Category.resolve("SCIENCE_COMPUTERS")).toBeInstanceOf(Category);
    expect(Category.resolve("Science: Computers")).toBeInstanceOf(Category);
});
test("Tests outputs for Category.getData()", () => {
    const myCategory = createInstance(9);
    expect(myCategory.getData().then((res) => typeof res)).resolves.toBe("object");
});
test("Tests outputs for Category.getQuestions()", () => {
    const myCategory = createInstance(9);
    expect(myCategory.fetchQuestions().then((res) => typeof res)).resolves.toBe("object");
});
