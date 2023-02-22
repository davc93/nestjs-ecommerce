import { createApp } from './app'
import { config } from './config'

async function main () {
  const app = await createApp()
  app.listen(config.port, () => {
    console.log(`Servidor escuchando en ${config.port}`)
  })
}
main()
