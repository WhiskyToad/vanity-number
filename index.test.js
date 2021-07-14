const index = require("./index");

test("correct output for 23", () => {
  expect(index.mapDigits("23")).toStrictEqual([
    "ad",
    "ae",
    "af",
    "bd",
    "be",
    "bf",
    "cd",
    "ce",
    "cf",
  ]);
});

test("correct output for no length", () => {
  expect(index.mapDigits("")).toStrictEqual([]);
});

test("correct output for one number", () => {
  expect(index.mapDigits("2")).toStrictEqual(["a", "b", "c"]);
});
