import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CategorySection } from "./CategorySection";
import { DiscountSection } from "./DiscountSection";

export const BasicInfoSection = ({
  name,
  setName,
  price,
  setPrice,
  description,
  setDescription,
  categories,
  categoryId,
  setCategoryId,
  subCategoryId,
  setSubCategoryId,
  selectedCategory,
  discountType,
  setDiscountType,
  discountValue,
  setDiscountValue,
}) => {
  return (
    <div className="space-y-4 p-6 bg-white rounded-lg border">
      <h2 className="text-xl font-semibold">Basic Information</h2>

      <div className="space-y-2">
        <Label htmlFor="name">Product Name</Label>
        <Input
          id="name"
          placeholder="Enter product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter product description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
      </div>

      <div className="flex space-y-2 justify-between w-full gap-3">
        <div className="w-1/2">
          <CategorySection
            categories={categories}
            categoryId={categoryId}
            setCategoryId={setCategoryId}
            subCategoryId={subCategoryId}
            setSubCategoryId={setSubCategoryId}
            selectedCategory={selectedCategory}
          />
        </div>
        <div className="space-y-2 w-1/2">
          <Label htmlFor="price">Retails Price</Label>
          <Input
            className="w-full"
            id="price"
            placeholder="Enter Retails Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>

      <div>
        <DiscountSection
          discountType={discountType}
          setDiscountType={setDiscountType}
          discountValue={discountValue}
          setDiscountValue={setDiscountValue}
        />
      </div>
    </div>
  );
};
