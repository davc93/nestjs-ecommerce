import React, { ChangeEvent, FocusEventHandler, FormEvent, useContext, useReducer, useRef } from "react";
import "./style.css";
import { config } from "../../config";
import { appContext} from "../../contexts/AppContext";
import {useNavigate} from'react-router-dom'
import { auth } from "../../apis/api/auth";
import { User } from "../../models/api/user.model";

export const SignUpForm = () => {
  const [data, setData] = React.useState<Partial<User>>({});
  const [loading, setLoading] = React.useState(false);
  const [submitMessage, setSubmitMessage] = React.useState<string | null>(null);
  // const [validationErrors, setValidationErrors]: any = React.useState({});

  const navigate = useNavigate()

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [event.target?.name]: event.target?.value,
    });
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    
      // const iterableData = Object.entries(data);
      // iterableData.forEach((item) => {
      //   const [key, value] = item;
      //   validate(key, value);
      // });
      
      const response = await auth.signUp({
        email:data.email,
        password:data.password
      })
      if(response.error){
        const {error,message} = response
        console.error("Error en submit", error);
        setLoading(false);
        setSubmitMessage(`${message}`);
      } else {
        setSubmitMessage("Usuario creado")
        navigate('/login')
        setLoading(false);
      }

    
  }

    

    // console.log(data)
  

  const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    // validate(event.target.name, event.target.value);
  };

  // const validate = (field: string, value: any) => {
  //   switch (field) {
  //     case "email":
  //       if (false) {
  //         setValidationErrors({
  //           ...validationErrors,
  //           [field]: "No es el email correcto",
  //         });
  //         throw new Error("Email invalido");
  //       } else {
  //         setValidationErrors({
  //           ...validationErrors,
  //           [field]: null,
  //         });
  //       }
  //       break;

  //     default:
  //       break;
  //   }
  // };
  return (
    <form onSubmit={handleSubmit}>
      <div className="input-groups">
        <label htmlFor="email">Email</label>
        <input
          onBlur={handleBlur}
          required
          onChange={handleInputChange}
          id="email"
          type="email"
          name="email"
        />
        {/* {validationErrors.email && <p>{validationErrors.email}</p>} */}
      </div>
      <div className="input-groups">
        <label htmlFor="password">Password</label>
        <input
          minLength={8}
          onBlur={handleBlur}
          required
          onChange={handleInputChange}
          type="password"
          name="password"
          id="password"
        />
      </div>
      <button type="submit">Login</button>
      {submitMessage && <p>{submitMessage}</p>}
      {loading && <p>Loading...</p>}
    </form>
  );
};