import React, {
  ChangeEvent,
  FocusEventHandler,
  FormEvent,
  useContext,
  useReducer,
  useRef,
} from "react";
import "./style.css";
import { config } from "../../config";
import { useNavigate } from "react-router-dom";
import { auth } from "../../apis/api/auth";
import { User } from "../../models/api/user.model";
import { emailSchema, passwordSchema } from "../../dtos/user";

export const SignUpForm = () => {
  const [data, setData] = React.useState<Partial<User>>({});
  const [loading, setLoading] = React.useState(false);
  const [submitMessage, setSubmitMessage] = React.useState<string | null>(null);
  const [validationErrors, setValidationErrors]: any = React.useState({});
  const [isDisable, setIsDisable] = React.useState(true)
  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [event.target?.name]: event.target?.value,
    });

    if(event.target?.name == "password"){
      const passwordResult = passwordSchema.validate({ password: event.target.value });
      console.log(passwordResult)
      if (passwordResult.error) {
        setValidationErrors({
          ...validationErrors,
          password: "password have to consist in characters between 8 and 30 from the set of uppercase and lowercase letters (a-z, A-Z) and digits (0-9).",
        });
        setIsDisable(true)
      } else {
        setValidationErrors({
          ...validationErrors,
          password: null
        });
      }

      

    }
    if(!(Object.values(validationErrors).some((item)=>item))){
      setIsDisable(false)
    }

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
      email: data.email,
      password: data.password,
    });
    if (response.error) {
      const { error, message } = response;
      console.error("Error en submit", error);
      setLoading(false);
      setSubmitMessage(`${message}`);
    } else {
      setSubmitMessage("Usuario creado");
      navigate("/login");
      setLoading(false);
    }
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    validate(event.target.name, event.target.value);
  };

  const validate = (field: string, value: any) => {
    switch (field) {
      case "email":
        const emailResult = emailSchema.validate({ [field]: value });

        if (emailResult.error) {
          setValidationErrors({
            ...validationErrors,
            email: emailResult.error.message,
          });
          setIsDisable(true)
        } else {
          setValidationErrors({
            ...validationErrors,
            email: null,
          });
        }
        break;


      default:
        break;
    }
  };

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
        {validationErrors.email && <p>{validationErrors.email}</p>}
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
        {validationErrors.password && <p>{validationErrors.password}</p>}
      </div>
      <button className="btn--secondary" type="submit" disabled={isDisable}>Sign up</button>
      {submitMessage && <p>{submitMessage}</p>}
      {loading && <p>Loading...</p>}
    </form>
  );
};
