import { useEffect } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/paypal-js';
import { paymentApi } from '../lib/api';

interface PayPalButtonProps {
  amount: number;
  onSuccess: (details: any) => void;
  onError: (error: any) => void;
}

export default function PayPalButton({ amount, onSuccess, onError }: PayPalButtonProps) {
  const [{ isPending }] = usePayPalScriptReducer();

  const createOrder = async () => {
    try {
      const order = await paymentApi.createOrder(amount);
      return order.id;
    } catch (error) {
      onError(error);
      throw error;
    }
  };

  const onApprove = async (data: any, actions: any) => {
    try {
      const details = await paymentApi.capturePayment(data.orderID);
      onSuccess(details);
    } catch (error) {
      onError(error);
    }
  };

  if (isPending) return <div>Loading PayPal...</div>;

  return (
    <PayPalButtons
      createOrder={createOrder}
      onApprove={onApprove}
      onError={onError}
      style={{ layout: 'horizontal' }}
    />
  );
}