import { buildExe } from "."

if (process.argv.includes(`-h`)) {
  console.log(`bun build compile util (tool):
    built <filePath> <outPath> <target?> <target n?>   # can take many targets
targets:
    linux-x64
    linux-arm64
    windows-x64
    darwin-x64
    darwin-arm64
    linux-x64-musl
    linux-arm64-musl
        + -baseline     # eg. linux-x64-baseline
        + -modern       # eg. linux-x64-modern
    basic               # all basic
    baseline            # all baseline
    modern              # all modern
    all                 # basic + baseline + modern
`)
  process.exit()
}

// file outfile target
const [file, outfile, ...currentTargets] = process.argv.slice(2)

const basicTargets = [
  `linux-x64`,
  `linux-arm64`,
  `windows-x64`,
  `darwin-x64`,
  `darwin-arm64`,
  `linux-x64-musl`,
  `linux-arm64-musl`,
]

const baselineTargets = basicTargets.map((t) => `${t}-baseline`)
const modernTargets = basicTargets.map((t) => `${t}-modern`)
const multiTargets = [`basic`, `baseline`, `modern`, `all`]
const allTargets = [...basicTargets, ...baselineTargets, ...modernTargets]
const targets = [...allTargets, ...multiTargets]

if (!file) {
  console.error(`No file path specified! -h for help`)
  process.exit()
}
if (!outfile) {
  console.error(`No file outpath specified! -h for help`)
  process.exit()
}

for (const t of currentTargets) {
  if (!targets.includes(t)) {
    console.error(`No valid target "${t}"! -h for help. Supported targets: ${targets}`)
    process.exit()
  }
}

console.log(`Building... file: ${file}, out: ${outfile}, target: ${currentTargets[0] || `default`}`)

if (currentTargets.length >= 2 || multiTargets.includes(currentTargets[0]!)) {
  const newTargets =
    currentTargets[0] === `all`
      ? allTargets
      : currentTargets[0] === `basic`
      ? basicTargets
      : currentTargets[0] === `baseline`
      ? baselineTargets
      : currentTargets[0] === `modern`
      ? modernTargets
      : currentTargets
  for (const target of newTargets) {
    buildExe(file, `${outfile}-${target}`, target)
  }
} else {
  buildExe(file, outfile, currentTargets[0])
}
