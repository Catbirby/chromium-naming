import {
    Column,
    stringify,
  } from "https://deno.land/std@0.208.0/csv/stringify.ts";

// just for finding compiling time
console.time("Time to compile");

//get json file from web and assign it to "inputJson" variable?
import inputJson from "https://dl.google.com/dl/edgedl/chromeos/recovery/recovery.json" with { type: "json" };

const start = /^\^|^\(/g
const end = /-.{0,2}.$|\..*|\\.*$| \(.*$|\s$/g
const end2 = /\?$|\[.*$/g
const remParentheses = /^\(/g

function cleanFile () {
      for (let i = 0; i<inputJson.length; i++) {
        inputJson[i].hwidmatch = inputJson[i].hwidmatch.replaceAll(start, "");
        inputJson[i].hwidmatch = inputJson[i].hwidmatch.replaceAll(end, "");
        inputJson[i].hwidmatch = inputJson[i].hwidmatch.replaceAll(end2, "");
        inputJson[i].hwidmatch = inputJson[i].hwidmatch.replaceAll(remParentheses, "");
      };
};

function convertToCsv() {
    // Desired values: hwidmatch manufacturer md5 model url chrome_version
    // maps json values to csv for stringify
    const columns: Column[] = [
        "hwidmatch",
        "manufacturer",
        "md5",
        "model",
        "url",
        "chrome_version"
      ];


    return stringify(inputJson, { columns });
};




cleanFile();
const result = convertToCsv();

//console.log(result);

const outputCsv = new TextEncoder().encode(result);
Deno.writeFileSync("output.csv", outputCsv);

console.timeEnd("Time to compile");