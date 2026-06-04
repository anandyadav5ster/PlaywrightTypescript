import { test } from "@playwright/test";
import { parse } from "csv-parse";
import fs from "fs";
import * as path from "path";

const projectRootPath = process.cwd();
const dataPath = path.join(projectRootPath, "data", "data.csv");
const testData = fs.readFileSync(dataPath, "utf8");


const records = parse(testData, {
  columns: true,
  skip_empty_lines: true,
  trim: true,
});

test("Read csv file", async () => {
  for await (const record of records) {
    console.log(`${record.username} and ${record.password}`);
  }
});
