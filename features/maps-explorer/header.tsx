import { DataSource } from "@lib/api";
import { useMapStore } from "./store";
import { ChevronRight } from "lucide-react";
import { Button } from "@components/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/select";

export const Header = () => {
  const source = useMapStore((state) => state.source);

  return (
    <header className="border-b border-border shadow-lg flex items-center p-2 z-50 static">
      <div className="flex items-center gap-1 uppercase text-sm font-mono">
        <Select
          defaultValue="34-bps"
          value={source.source}
          onValueChange={(v: DataSource) =>
            useMapStore.setState({ source: { source: v } })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="34-bps">34 BPS</SelectItem>
            <SelectItem value="34-kemendagri">34 Kemendagri</SelectItem>
          </SelectContent>
        </Select>
        <ChevronRight className="size-4" />
        {source.province && (
          <Button variant="ghost" size="sm">
            {source.province}
          </Button>
        )}
      </div>
    </header>
  );
};
