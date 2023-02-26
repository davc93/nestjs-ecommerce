import mercadopago from 'mercadopago'
import { config } from '../config'
import { type Preference } from '../models/preference.model'

const configure = () => {
  mercadopago.configurations.setAccessToken(config.accessToken as string)
  mercadopago.configure({
    access_token: config.accessToken as string,
    integrator_id: config.integratorId
  })
  console.log('[mercado-pago]: Configuracion exitosa')
}

const createPreference = async (clientPreference: Preference) => {
  const preference: Preference = {
    ...clientPreference,
    back_urls: {
      success: `${config.frontendUrl}/payments/success`,
      failure: `${config.frontendUrl}/payments/failure`,
      pending: `${config.frontendUrl}/payments/pending`
    },
    auto_return: 'approved',
    notification_url: `${config.apiUrl}/api/notification_url`,
    external_reference: ''
  }

  const response = await mercadopago.preferences.create(preference)
  const data = {
    id: response.body.id
  }
  return data
}

configure()
export {
  createPreference
}
