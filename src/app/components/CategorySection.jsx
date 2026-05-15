import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const CategorySection = ({
  categories,
  categoryId,
  setCategoryId,
  subCategoryId,
  setSubCategoryId,
  selectedCategory,
}) => {
  return (
    <div>
      <div className="space-y-2 w-full max-w-md">
        {" "}
        {/* You can adjust max-w-md to your desired width */}
        <Label>Category</Label>
        <Select
          value={categoryId}
          onValueChange={(value) => {
            setCategoryId(value);
            setSubCategoryId("");
          }}
        >
          <SelectTrigger className="w-full">
            {" "}
            {/* Make trigger full width */}
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="w-full">
            {" "}
            {/* Make dropdown content full width */}
            {categories.map((cat) => (
              <SelectItem key={cat._id} value={cat._id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {categoryId && selectedCategory?.subCategories?.length > 0 && (
        <div className="space-y-2">
          <Label>Subcategory</Label>
          <Select value={subCategoryId} onValueChange={setSubCategoryId}>
            <SelectTrigger>
              <SelectValue placeholder="Select subcategory" />
            </SelectTrigger>
            <SelectContent>
              {selectedCategory.subCategories.map((sub) => (
                <SelectItem key={sub._id} value={sub._id}>
                  {sub.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};
