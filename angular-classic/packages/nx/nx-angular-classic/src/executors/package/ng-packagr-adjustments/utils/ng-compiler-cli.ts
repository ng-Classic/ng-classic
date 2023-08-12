export async function ngccCompilerCli(): Promise<any> {
  const compilerCliModule = await new Function(
    `return import('@angular-classic/compiler-cli/ngcc');`
  )();

  return compilerCliModule.process
    ? compilerCliModule
    : compilerCliModule.default;
}
