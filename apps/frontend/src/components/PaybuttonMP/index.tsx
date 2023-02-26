import React from "react";
import { getPreferenceId } from "../../apis/mercadopago";
import { config } from "../../config";
import { Order } from "../../models/mercadopago/order.model";
import { BubbleLoader } from "../Loader";
declare global {
  interface Window {
    MercadoPago: any;
  }
}


export const PaybuttonMP:React.FC<{order:Order}> = ({order}) => {
  const [loading, setLoading] = React.useState(false)
  console.log(order)
  const handleClick = async () => {
    setLoading(true)
    try {
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
      setLoading(false)
      
    } catch (error) {
      console.error(error)
      setLoading(false)
    }

  };
  return <button className="btn--primary" onClick={handleClick}>{loading ? <BubbleLoader /> : "Continuar"}</button>;
};
