export function buildExe(file: string, outfile: string, target?: string) {
  const cmd = [`bun`, `build`, `--compile`, `--minify`, file, `--outfile=${outfile}`]
  if (target) cmd.push(`--target=bun-${target}`)
  Bun.spawnSync({
    cmd,
    stdout: `inherit`,
  })
}

export function scanSync(pattern: string, optionsOrCwd?: string | Bun.GlobScanOptions) {
  return new Bun.Glob(pattern).scanSync(optionsOrCwd)
}
