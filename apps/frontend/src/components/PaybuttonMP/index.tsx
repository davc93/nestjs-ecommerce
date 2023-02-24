import { getPreferenceId } from "../../apis/mercadopago";
import { config } from "../../config";
import { Order } from "../../models/mercadopago/order.model";
declare global {
  interface Window {
    MercadoPago: any;
  }
}

export const PaybuttonMP:React.FC<{order:Order}> = ({order}) => {
  console.log(order)
  const handleClick = async () => {
    const preferenceId = await getPreferenceId(order);

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
