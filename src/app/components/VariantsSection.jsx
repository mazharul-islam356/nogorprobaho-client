import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

export const VariantsSection = ({ variants, setVariants }) => {
  const handleAddVariant = () => {
    setVariants((prev) => [...prev, { name: "", color: "", price: "" }]);
  };

  const handleRemoveVariant = (index) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const updateVariant = (index, field, value) => {
    setVariants((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  return (
    <div className="space-y-4 p-6 bg-white rounded-lg border shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Product Variants</h2>
        <Button type="button" onClick={handleAddVariant} size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Variant
        </Button>
      </div>

      <div className="space-y-3">
        {variants.map((variant, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 bg-gray-50 rounded-lg"
          >
            <div className="space-y-1">
              <Label htmlFor={`size-${index}`} className="text-sm">
                Size
              </Label>
              <Input
                id={`size-${index}`}
                placeholder="e.g., Medium"
                value={variant.name}
                onChange={(e) => updateVariant(index, "name", e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor={`color-${index}`} className="text-sm">
                Color
              </Label>
              <Input
                id={`color-${index}`}
                placeholder="e.g., Red"
                value={variant.color}
                onChange={(e) => updateVariant(index, "color", e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor={`price-${index}`} className="text-sm">
                Price
              </Label>
              <Input
                id={`price-${index}`}
                type="number"
                placeholder="0.00"
                value={variant.price}
                onChange={(e) => updateVariant(index, "price", e.target.value)}
              />
            </div>

            <div className="flex items-end">
              {variants.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveVariant(index)}
                  className="w-full"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
