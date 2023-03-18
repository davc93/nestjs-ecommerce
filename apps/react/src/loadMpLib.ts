import { config } from './config'

export const loadMpLib = () => {
  const mp_script = document.createElement('script')
  mp_script.src = config.mpLibrary
  document.head.append(mp_script)
}
