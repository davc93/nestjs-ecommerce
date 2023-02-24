import { Product } from "./api/product.model";
import {User} from "./api/user.model"
export interface AppUser {
    user:Partial<User> | null
    products: Product[]

}