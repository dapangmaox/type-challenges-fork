const fs = require('node:fs')
const path = require('node:path')

// 读取并处理单个 README.md 文件
function processReadmeFile(dirPath) {
  const readmePath = path.join(dirPath, 'README.md')

  if (!fs.existsSync(readmePath)) {
    console.log(`README.md 不存在于 ${dirPath}`)
    return
  }

  let fileContent = fs.readFileSync(readmePath, 'utf8')

  fileContent = `${fileContent}## 解答\n\n`

  fs.writeFileSync(readmePath, fileContent, 'utf8')
  console.log(`已处理 ${readmePath}`)
}

// 递归遍历目录
function traverseDirectory(dir) {
  fs.readdirSync(dir).forEach((subDir) => {
    const subDirPath = path.join(dir, subDir)
    if (fs.lstatSync(subDirPath).isDirectory()) processReadmeFile(subDirPath)
  })
}

// 主函数
function main() {
  const questionsDir = path.join(__dirname, 'questions')

  // 确保 questions 目录存在
  if (!fs.existsSync(questionsDir)) {
    console.error(`目录 ${questionsDir} 不存在`)
    process.exit(1)
  }

  // 遍历 questions 目录下的所有子目录
  traverseDirectory(questionsDir)
  console.log('所有 README.md 文件已处理')
}

// 运行脚本
main()
