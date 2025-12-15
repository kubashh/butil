import { scanSync } from "."

for (const path of scanSync(`**/*`, { cwd: `.` })) {
  console.log(path)
}
