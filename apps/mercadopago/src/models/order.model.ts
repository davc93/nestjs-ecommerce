import { type Shipment } from './shipment.model'
import { type Preference } from './preference.model'
export interface Order {
  preference: Preference
  shipment: Shipment
}
