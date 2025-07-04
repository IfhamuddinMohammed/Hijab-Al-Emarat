
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Ruler } from "lucide-react";

export const SizeChartModal = () => {
  const sizeData = [
    { size: 'XS', bust: '32-34', waist: '24-26', hips: '34-36', length: '54' },
    { size: 'S', bust: '34-36', waist: '26-28', hips: '36-38', length: '55' },
    { size: 'M', bust: '36-38', waist: '28-30', hips: '38-40', length: '56' },
    { size: 'L', bust: '38-40', waist: '30-32', hips: '40-42', length: '57' },
    { size: 'XL', bust: '40-42', waist: '32-34', hips: '42-44', length: '58' },
    { size: 'XXL', bust: '42-44', waist: '34-36', hips: '44-46', length: '59' },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 border-gold text-desert hover:bg-gold hover:text-cream"
        >
          <Ruler className="w-4 h-4" />
          Size Chart
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-cream border-gold">
        <DialogHeader>
          <DialogTitle className="text-desert font-serif text-2xl">Size Chart</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="bg-sand p-4 rounded-lg">
            <h3 className="font-semibold text-desert mb-2">How to Measure</h3>
            <ul className="text-sm text-desert-700 space-y-1">
              <li>• <strong>Bust:</strong> Measure around the fullest part of your bust</li>
              <li>• <strong>Waist:</strong> Measure around your natural waistline</li>
              <li>• <strong>Hips:</strong> Measure around the fullest part of your hips</li>
              <li>• <strong>Length:</strong> From shoulder to desired hemline</li>
            </ul>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gold">
                  <th className="text-left py-2 px-3 font-semibold text-desert">Size</th>
                  <th className="text-left py-2 px-3 font-semibold text-desert">Bust (inches)</th>
                  <th className="text-left py-2 px-3 font-semibold text-desert">Waist (inches)</th>
                  <th className="text-left py-2 px-3 font-semibold text-desert">Hips (inches)</th>
                  <th className="text-left py-2 px-3 font-semibold text-desert">Length (inches)</th>
                </tr>
              </thead>
              <tbody>
                {sizeData.map((row, index) => (
                  <tr key={row.size} className={`${index % 2 === 0 ? 'bg-cream-50' : 'bg-white'} hover:bg-gold-50 transition-colors`}>
                    <td className="py-2 px-3 font-medium text-desert">{row.size}</td>
                    <td className="py-2 px-3 text-desert-700">{row.bust}</td>
                    <td className="py-2 px-3 text-desert-700">{row.waist}</td>
                    <td className="py-2 px-3 text-desert-700">{row.hips}</td>
                    <td className="py-2 px-3 text-desert-700">{row.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="bg-gold-50 p-4 rounded-lg border border-gold">
            <p className="text-sm text-desert">
              <strong>Note:</strong> All measurements are in inches. For custom sizing or if you're between sizes, 
              please contact us via WhatsApp for personalized recommendations.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
