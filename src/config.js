import path from 'path'
import dotEnv from 'dotenv'

const dotEnvAbsolutePath = path.resolve(process.cwd(), process.argv[2])

dotEnv.config({ path: dotEnvAbsolutePath })

const config = {
  packageVersion: process.env.npm_package_version, 
  staticRootPath: path.resolve(process.cwd(), process.env.PATH_STATIC_ROOT),
  httpPort: process.env.HTTP_PORT,
  logger: true
}

export default config