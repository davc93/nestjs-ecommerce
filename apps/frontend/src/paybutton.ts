import { getPreferenceId } from "./api";
import { config } from "./config";
import { insertLoader } from "./loader";

export const createButton = async (element, order) => {
  const { preference, shipment } = order;
  const payButton = document.querySelector(element);
  payButton.addEventListener("click", async () => {
    const loader = insertLoader();
    payButton.append(loader);
    const preferenceId = await getPreferenceId({ preference, shipment });

    const mp = new window.MercadoPago(config.mpPublicKey, {
      locale: "es-CL",
    });

    mp.checkout({
      preference: {
        id: preferenceId,
      },
      autoOpen: true,
    });
    loader.remove();
  });
};
