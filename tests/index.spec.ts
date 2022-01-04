const path = require("path");
const fs = require("fs/promises");
const { Modifier } = require("../dist");
const { Message } = require("../dist/errors");

describe("Module", () => {
  const filename = "jsonFile.json";
  const filepath = path.join(__dirname, filename);
  const modifier = new Modifier(filepath);

  describe("Error Handler", () => {
    it("Values not Effected", async () => {
      expect(modifier.jsonFile.argv1).toBe("argv");
      expect(modifier.jsonFile.argv2).toBe("argv");
      expect(modifier.jsonFile.orgVal).toBe("originalValue");
    });

    it("Undefined Param", async () => {
      try {
        await modifier.modify(() => ({
          argv1: undefined,
          argv2: undefined,
        }));
      } catch (err) {
        expect(err.message).toBe(Message.emptyParam);
      }
    });
  });

  describe("Modified key/values", () => {
    it("Modified Values", async () => {
      await modifier.modify((argv) => {
        return {
          argv1: argv[0],
          argv2: argv[1],
        };
      });

      expect(modifier.jsonFile.argv1).toEqual("--config");
      expect(modifier.jsonFile.argv2).toEqual("./jest.config.json");
    });

    it("Unmodified Values", () => {
      expect(modifier.jsonFile.orgVal).toEqual("originalValue");
    });
  });
});
