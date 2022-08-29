const path = require('path');
const fs = require('fs/promises');

const rootPath = process.cwd();

async function upalgoliaJson() {
  
  console.log(rootPath);
  const dir  = path.join(rootPath, '../../comicsJson')
  const Json = await fs.readdir(dir)
  const arrayResult = Json.map(async (element) => {
    const content = await fs.readFile(`${dir}/${element}`, "utf-8")
    const r = await JSON.parse(content.toString())
    return r
  })
  const resultados = await Promise.all(arrayResult)
  const writeJson = path.join(rootPath, '../../comicsAlgolia/allComis.json')
  console.log(writeJson)
  await fs.writeFile(writeJson,JSON.stringify(resultados))
}

upalgoliaJson()