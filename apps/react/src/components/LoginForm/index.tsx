import React, {
  ChangeEvent,
  type FocusEventHandler,
  FormEvent,
  useContext,
  useReducer,
  useRef,
} from "react";

import { useNavigate } from "react-router-dom";
import { auth } from "../../apis/api/auth";
import { type User } from "../../models/api/user.model";
import { emailSchema, passwordSchema } from "../../dtos/user";
import { userContext } from "../../contexts/UserContext";
import { Auth } from "../../models/api/auth.model";

export const LoginForm = () => {
  const [userState, userDispatch] = useContext(userContext);
  const [data, setData] = React.useState<Partial<User>>({});
  const [loading, setLoading] = React.useState(false);
  const [submitMessage, setSubmitMessage] = React.useState<string | null>(null);
  const [validationErrors, setValidationErrors] = React.useState<Partial<User>>(
    {}
  );

  const navigate = useNavigate();
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [event.target?.name]: event.target?.value,
    });
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    // Frontend Validation
    // Object.entries(data).forEach((data) => {
    //   console.log(data);
    //   validate(data[0], data[1]);
    // });
    // if (Object.values(validationErrors).some((error) => error)) {
    //   return
    // }
    console.log(data)
    setLoading(true);
    try {
      const user = await auth.login({
        email: data.email,
        password: data.password,
      }) as Auth
      userDispatch({type:"SET_USER",payload:{user:{email:user.user.email}}})
      navigate("/profile");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setSubmitMessage(`${error}`);
    }
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    validate(event.target.name, event.target.value);
  };

  const validate = (field: string, value: any) => {
    switch (field) {
      case "email":
        const emailResult = emailSchema.validate({ [field]: value });
        if (emailResult.error != null) {
          setValidationErrors({
            ...validationErrors,
            email: emailResult.error.message,
          });
        } else {
          setValidationErrors({
            ...validationErrors,
            email: undefined,
          });
        }
        break;

      case "password":
        const passwordResult = passwordSchema.validate({ [field]: value });
        console.log(passwordResult);
        if (passwordResult.error != null) {
          setValidationErrors({
            ...validationErrors,
            password:
              "password have to consist in characters between 8 and 30 from the set of uppercase and lowercase letters (a-z, A-Z) and digits (0-9).",
          });
        } else {
          setValidationErrors({
            ...validationErrors,
            password: undefined,
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
          onInput={handleInputChange}
          onBlur={handleBlur}
          required
          id="email"
          type="email"
          name="email"
        />
        {validationErrors.email && <p>{validationErrors.email}</p>}
      </div>
      <div className="input-groups">
        <label htmlFor="password">Password</label>
        <input
          onInput={handleInputChange}
          onBlur={handleBlur}
          required
          type="password"
          name="password"
          id="password"
        />
        {validationErrors.password && <p>{validationErrors.password}</p>}
      </div>
      <button className="btn--secondary" type="submit">
        Login
      </button>
      {submitMessage && <p>{submitMessage}</p>}
      {loading && <p>Loading...</p>}
    </form>
  );
};
