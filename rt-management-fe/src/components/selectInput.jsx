import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const SelectInput = () => {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Pilih Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status Penghuni</SelectLabel>
          <SelectItem value="tetap">Tetap</SelectItem>
          <SelectItem value="kontrak">Kontrak</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectInput;
