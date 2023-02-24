import { config } from "../../config"
import { User } from "../../models/api/user.model"



const login = async (user:Partial<User>) => {

    const response = await fetch(config.apiUrl,{
        method:"POST",
        body:JSON.stringify({
            email:user.email,
            password:user.password
        })
    })
    const data = await response.json()
    return data
}