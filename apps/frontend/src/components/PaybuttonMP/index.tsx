import { getPreferenceId } from "../../apis/mercadopago";
import { config } from "../../config";
declare global {
  interface Window {
    MercadoPago: any;
  }
}

export const PaybuttonMP = ({ preference, shipment }: any) => {
  
  const handleClick = async () => {
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
  };
  return <button className="btn--primary" onClick={handleClick}>PaybuttonMP</button>;
};
