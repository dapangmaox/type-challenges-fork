const fs = require('node:fs')
const path = require('node:path')

// 递归删除目录及其内容
function deleteDirectory(directory) {
  if (fs.existsSync(directory)) {
    fs.readdirSync(directory).forEach((file) => {
      const curPath = path.join(directory, file)
      if (fs.lstatSync(curPath).isDirectory())
        deleteDirectory(curPath)
      else
        fs.unlinkSync(curPath)
    })
    fs.rmdirSync(directory)
  }
}

// 处理单个目录
function processDirectory(directory) {
  const templateFile = path.join(directory, 'template.ts')
  const testCasesFile = path.join(directory, 'test-cases.ts')
  const readmeFile = path.join(directory, 'README.md')
  const readmeZhCnFile = path.join(directory, 'README.zh-CN.md')

  // 保留文件列表
  const filesToKeep = new Set([templateFile, testCasesFile, readmeFile, readmeZhCnFile])

  // 遍历目录中的所有文件
  fs.readdirSync(directory).forEach((file) => {
    const curPath = path.join(directory, file)
    if (fs.lstatSync(curPath).isFile()) {
      if (!filesToKeep.has(curPath))
        fs.unlinkSync(curPath) // 删除不需要的文件
    }
  })

  // 处理 README 文件
  if (fs.existsSync(readmeZhCnFile)) {
    if (fs.existsSync(readmeFile))
      fs.unlinkSync(readmeFile) // 删除现有的 README.md

    fs.renameSync(readmeZhCnFile, readmeFile) // 重命名 README.zh-CN.md 为 README.md
  }
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
  fs.readdirSync(questionsDir).forEach((dir) => {
    const questionDir = path.join(questionsDir, dir)
    if (fs.lstatSync(questionDir).isDirectory())
      processDirectory(questionDir)
  })

  console.log('处理完成')
}

// 运行脚本
main()
