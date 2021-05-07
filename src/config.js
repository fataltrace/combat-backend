import path from 'path'
import fs from 'fs'
import dotEnv from 'dotenv'

const workingDirectoryPath = process.cwd()
const dotEnvAbsolutePath = path.resolve(workingDirectoryPath, process.argv[2])

dotEnv.config({ path: dotEnvAbsolutePath })

const config = {
  packageVersion: process.env.npm_package_version,
  sslKey: fs.readFileSync(path.resolve(workingDirectoryPath, process.env.SSL_KEY)),
  sslCert: fs.readFileSync(path.resolve(workingDirectoryPath, process.env.SSL_CERT)),
  staticRootPath: path.resolve(workingDirectoryPath, process.env.PATH_STATIC_ROOT),
  httpPort: process.env.HTTP_PORT,
  logger: true
}

export default config