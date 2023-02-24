import { config } from "../../config";
import { Auth } from "../../models/api/auth.model";
import { User } from "../../models/api/user.model";

export const getProfile = async (auth: Auth) => {
  const response = await fetch(`${config.apiUrl}/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${auth.access_token}`,
    },
  });
  const profile = await response.json();
  return profile
};

export const updateProfile = async (auth: Auth, changes: Partial<User>) => {
  const response = await fetch(`${config.apiUrl}/profile`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${auth.access_token}`,
    },
    body: JSON.stringify({
      ...changes,
    }),
  });
  const profile = await response.json();
  return profile;
};


export const deleteProfile =async (auth:Auth) => {
    const rta = await fetch(`${config.apiUrl}/profile`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth.access_token}`,
        }
      });
      const response = await rta.json();
      return response;
}