import Joi from "joi";

export const passwordSchema = Joi.object({
    password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')),
})
export const emailSchema = Joi.object({
    email:Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'cl'] } })
    
})