
import { Sparkles, Shield, Wind, Droplets } from "lucide-react";

interface ProductBadgesProps {
  badges?: string[];
  fabricFeatures?: string[];
}

export const ProductBadges = ({ badges = [], fabricFeatures = [] }: ProductBadgesProps) => {
  const getFabricIcon = (feature: string) => {
    switch (feature.toLowerCase()) {
      case 'lightweight':
        return <Wind className="w-4 h-4" />;
      case 'breathable':
        return <Droplets className="w-4 h-4" />;
      case 'wrinkle-free':
        return <Shield className="w-4 h-4" />;
      case 'premium':
        return <Sparkles className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {/* Product badges */}
      {badges.map((badge, index) => (
        <span
          key={index}
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            badge === 'Bestseller'
              ? 'bg-gold text-desert'
              : badge === 'New Arrival'
              ? 'bg-desert text-cream'
              : badge === 'Limited Edition'
              ? 'bg-gradient-to-r from-gold to-desert text-cream'
              : 'bg-sand text-desert'
          }`}
        >
          {badge}
        </span>
      ))}

      {/* Fabric feature icons */}
      {fabricFeatures.map((feature, index) => (
        <div
          key={index}
          className="flex items-center gap-1 px-2 py-1 bg-cream border border-gold rounded-full text-xs text-desert"
        >
          {getFabricIcon(feature)}
          <span className="font-medium">{feature}</span>
        </div>
      ))}
    </div>
  );
};
