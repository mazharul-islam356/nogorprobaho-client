import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const DiscountSection = ({
  discountType,
  setDiscountType,
  discountValue,
  setDiscountValue,
}) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="discount-value">Discount Value</Label>
          <Input
            id="discount-value"
            type="number"
            placeholder="Enter discount value"
            value={discountValue}
            onChange={(e) => setDiscountValue(e.target.value)}
          />
        </div>

        <div className="space-y-2 max-w-md">
          <Label>Discount Type</Label>
          <Select value={discountType} onValueChange={setDiscountType}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem value="percentage">Percentage (%)</SelectItem>
              <SelectItem value="flat">Flat Amount</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
