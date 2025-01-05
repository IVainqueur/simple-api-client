import * as prettier from "prettier/standalone";
import babelPlugin from "prettier/plugins/babel";
import estreePlugin from "prettier/plugins/estree";
import htmlPlugin from "prettier/plugins/html";
import typescriptPlugin from "prettier/plugins/typescript";

export async function formatCode(code: string): Promise<string> {
  try {
    return await prettier.format(code, {
      parser: "babel",
      plugins: [babelPlugin, estreePlugin, htmlPlugin, typescriptPlugin],
      semi: true,
      singleQuote: true,
      trailingComma: 'es5',
    });
  } catch (error) {
    console.error("Failed to format code:", error);
    return code;
  }
}
