import { Maps } from "./maps";
import { Button } from "./ui/button";
import { useMapStore } from "./store";
import { ChevronRight } from "lucide-react";

export const App = () => {
  const source = useMapStore((state) => state.source);

  return (
    <div className="relative h-svh max-h-svh flex flex-col">
      <header className="h-12 border-b border-border shadow-lg flex items-center p-2">
        <div className="flex items-center gap-2 uppercase text-sm font-mono">
          <Button
            size="sm"
            variant="ghost"
            onClick={() =>
              useMapStore.setState({ source: { source: "34-bps" } })
            }
          >
            {source.source}
          </Button>
          <ChevronRight className="size-4" />
          {source.province && (
            <Button variant="ghost" size="sm">
              {source.province}
            </Button>
          )}
        </div>
      </header>
      <div className="flex-1 relative w-full">
        <Maps />
      </div>
    </div>
  );
};
