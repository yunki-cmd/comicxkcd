const fs = require('fs/promises');
const https = require('https');
const http = require('http');
const urlParser = require('url')
const sizeOf = require('image-size')


const idInicial = 1
const IdFinal = 2664
const pathroot = process.cwd()

const scrapearComics = async () => {
  for (let index = idInicial; index <= IdFinal; index++) {
    const url = `https://xkcd.com/${index}/info.0.json`
     https.get(url, (res) => {
       let body = ""
       res.on("data", (chunk) => {
         body += chunk
       });
       res.on("end", async () => {
         try {
           let json = await JSON.parse(body)
           const s = await getImgSize(json.img)
             .then(resp => {
               let size = {}
               const buffer = Buffer.concat(resp)
               size = sizeOf(buffer)
               return size
             })
           const {
             month,
             num,
             link,
             year,
             safe_title,
             alt,
             img,
             title,
             day
           } = json

           const content = {
             month,
             id: num,
             link,
             year,
             safe_title,
             alt,
             img,
             title,
             day,
             height: s.height,
             width: s.width
           }
           fs.writeFile(`${pathroot}/comicsJson/${index}.json`, JSON.stringify(content), (err) => {
             if (err)
               console.log(err.message);
             console.log('archivo escrito');
           })
         } catch (error) {
           console.error(error)
         }
       })

     }).on("error", (error) => {
       console.error(error)
     })
  }
}

function getImgSize(url) {
  const options = urlParser.parse(url) 
  return new Promise((resolve, reject) => {
    https.get(options, function (response) {
      const chunks = []
      response.on('data', function (chunk) {
        chunks.push(chunk)
      }).on('end', function () {
        resolve(chunks)
      })
    })
  })
}

async function countJson() {
  const alljsons = await (await fs.readdir(`${pathroot}/comicsJson/`))
  const idsfailures = []
  const allids = []
  alljsons.forEach(element => {
    const id = element.split(".")[0]
    allids.push(parseInt(id))
  });
  for (let index = 1; index < IdFinal; index++) {
      if (!allids.includes(index)) {
        idsfailures.push(index)
      }
  }
  return idsfailures
}



async function downloadFails() {
  const idfail = await countJson()
  idfail.forEach(element => {
    const url = `https://xkcd.com/${element}/info.0.json`
    if (element !== 404) {
      https.get(url, (res) => {
        let body = ""
        res.on("data", (chunk) => {
          body += chunk
        });
        res.on("end", async () => {
          try {
            let json = await JSON.parse(body)
            const s = await getImgSize(json.img)
              .then(resp => {
                let size = {}
                const buffer = Buffer.concat(resp)
                size = sizeOf(buffer)
                return size
              })
            const {
              month,
              num,
              link,
              year,
              safe_title,
              alt,
              img,
              title,
              day
            } = json
    
            const content = {
              month,
              id: num,
              link,
              year,
              safe_title,
              alt,
              img,
              title,
              day,
              height: s.height,
              width: s.width
            }
            fs.writeFile(`${pathroot}/comicsJson/${element}.json`, JSON.stringify(content), (err) => {
              if (err)console.log(err.message);
              console.log('archivo escrito');
            })
          } catch (error) {
            console.error(error)
          }
        })
    
      }).on("error", (error) => {
        console.error(error)
      })
    }
  })
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {
  NextApiRequest,
  NextApiResponse
} from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse < Data >
) {
  res.status(200).json({
    name: 'John Doe'
  })
}
