
import { useNavigate } from "react-router-dom";

export const Categories = () => {
  const navigate = useNavigate();

  const categories = [
    {
      name: "ABAYAS",
      description: "Elegant traditional abayas",
      image: "https://res.cloudinary.com/df4autxjg/image/upload/v1751638467/Abayas_wpbner.png",
      path: "/products?category=abayas"
    },
    {
      name: "HIJABS",
      description: "Premium quality hijabs",
      image: "https://res.cloudinary.com/df4autxjg/image/upload/v1751638474/Hijabs_zoej9q.png",
      path: "/products?category=hijabs"
    },
    {
      name: "NIQABS",
      description: "Luxurious silk scarves",
      image: "https://res.cloudinary.com/df4autxjg/image/upload/v1751638483/Niqabs_xwxnxb.png",
      path: "/products?category=scarves"
    },
    {
      name: "ACCESSORIES",
      description: "Beautiful accessories",
      image: "https://res.cloudinary.com/df4autxjg/image/upload/v1751638633/accessories_ikyfjt.png",
      path: "/products?category=accessories"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-purple-800 mb-4">
            Our Collections
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our carefully curated selection of modest fashion from Dubai
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div
              key={category.name}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => navigate(category.path)}
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-purple-800 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
