import mercadopago from 'mercadopago'
import { config } from '../config'
import { type Preference } from '../models/preference.model'

const configure = () => {
  mercadopago.configurations.setAccessToken(config.accessToken)
  mercadopago.configure({
    access_token: config.accessToken,
    integrator_id: config.integratorId
  })
  console.log('[mercado-pago]: Configuracion exitosa')
}

const createPreference = async (clientPreference: Preference) => {
  const preference: Preference = {
    ...clientPreference,
    back_urls: {
      success: `${config.siteDomain}/payments/success`,
      failure: `${config.siteDomain}/payments/failure`,
      pending: `${config.siteDomain}/payments/pending`
    },
    auto_return: 'approved',
    notification_url: `${config.serverDomain}/api/notification_url`,
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
