import prettier from 'prettier';

export function formatCode(code: string): string {
  try {
    return prettier.format(code, {
      parser: 'babel',
      semi: true,
      singleQuote: true,
      trailingComma: 'es5',
    });
  } catch (error) {
    console.error('Failed to format code:', error);
    return code;
  }
}