
import { Button } from "./ui/button";
import { CreditCard, Smartphone } from "lucide-react";

interface PaymentOptionsProps {
  onPaymentSelect: (method: string) => void;
  onBack: () => void;
}

export const PaymentOptions = ({ onPaymentSelect, onBack }: PaymentOptionsProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose Payment Method</h2>
      
      <div className="space-y-4">
        {/* Cash on Delivery */}
        <div className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
          <Button
            onClick={() => onPaymentSelect("cod")}
            className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center space-x-3"
            size="lg"
          >
            <CreditCard className="w-5 h-5" />
            <span>Cash on Delivery (COD)</span>
          </Button>
          <p className="text-sm text-gray-600 mt-2 text-center">
            Pay when your order is delivered to your doorstep
          </p>
        </div>

        {/* UPI Options */}
        <div className="border border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button
              onClick={() => onPaymentSelect("phonepe")}
              variant="outline"
              className="flex items-center justify-center space-x-2 border-purple-600 text-purple-600 hover:bg-purple-50"
              size="lg"
            >
              <Smartphone className="w-5 h-5" />
              <span>PhonePe</span>
            </Button>
            
            <Button
              onClick={() => onPaymentSelect("gpay")}
              variant="outline"
              className="flex items-center justify-center space-x-2 border-blue-600 text-blue-600 hover:bg-blue-50"
              size="lg"
            >
              <Smartphone className="w-5 h-5" />
              <span>Google Pay</span>
            </Button>
          </div>
          <p className="text-sm text-gray-600 mt-2 text-center">
            Quick and secure UPI payments
          </p>
        </div>

        {/* WhatsApp Order */}
        <div className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
          <Button
            onClick={() => onPaymentSelect("whatsapp")}
            className="w-full bg-green-500 hover:bg-green-600 text-white"
            size="lg"
          >
            Complete Order via WhatsApp
          </Button>
          <p className="text-sm text-gray-600 mt-2 text-center">
            Get personalized assistance and flexible payment options
          </p>
        </div>
      </div>

      <div className="mt-6">
        <Button
          onClick={onBack}
          variant="outline"
          className="w-full"
        >
          Back to Address
        </Button>
      </div>
    </div>
  );
};
