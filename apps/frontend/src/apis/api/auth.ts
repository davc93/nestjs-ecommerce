import { config } from "../../config";
import { Auth } from "../../models/api/auth.model";
import { User } from "../../models/api/user.model";

const login = async (user: Partial<User>): Promise<Auth | {error:string,message:string[]}>  => {
  let data:any;
  const response = await fetch(`${config.apiUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.email,
      password: user.password,
    }),
  });
  data = await response.json();
  if(response.status == 500){
    data.error = "Error Interno"
    data.message = ["Error Interno"]
  }

  return data;
};

const signUp = async (user: Partial<User>) => {
  let data:any
  const response = await fetch(`${config.apiUrl}/users`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.email,
      password: user.password,
      role: "customer",
    }),
  });
  data = await response.json();
  if(response.status == 500){
    data.error = "Error Interno"
    data.message = ["Error Interno"]
  }


  return data;
};

export const auth = {
  login,
  signUp,
};
