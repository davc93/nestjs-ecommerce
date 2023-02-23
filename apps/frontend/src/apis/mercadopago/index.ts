import { config } from "../../config";


export const getPreferenceId = async (order:any) => {
  const response = await fetch(`${config.mercadopagoUrl}/api/create_preference`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  const data = await response.json();

  return data.id;
};
