/* eslint-disable react-hooks/exhaustive-deps */
import { cn } from "@/lib/utils";
import { CheckIcon, SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Popover } from "react-tiny-popover";
import { Input } from "../../input";
import { useEntityList } from "@/hooks";
import { Button } from "../../button";

export const SearchBar = ({
  isOpen,
  setIsOpen,
  disabled,
  entity,
  placeholder,
  onChange,
}: any) => {
  const ctl = useEntityList(entity);

  const [qLocal, setQLocal] = useState(ctl.qInput);
  useEffect(() => {
    const id = setTimeout(() => {
      if (ctl.qInput !== qLocal) ctl.setQInput(qLocal);
    }, 100);
    return () => clearTimeout(id);
  }, [qLocal]);

  const [list, setList] = useState<any[]>([]);

  const addItem = (item: any) => {
    if (list.find((i) => i.id === item.id)) {
      setList((prev) => prev.filter((i) => i.id !== item.id));
    } else {
      setList((prev) => [...prev, item]);
    }
  };

  useEffect(() => {
    setList([]);
  }, [ctl.items]);

  return (
    <div className="w-auto float-right">
      <Popover
        isOpen={isOpen}
        positions={["bottom", "top", "right", "left"]}
        padding={8}
        onClickOutside={() => setIsOpen(false)}
        content={
          <div className="bg-white border rounded shadow-md w-100">
            <div className="max-h-[300px] overflow-y-auto">
              <div className="p-1">
                {ctl.items.length === 0 ? (
                  <div className="text-sm text-muted-foreground px-3 py-2">
                    No results.
                  </div>
                ) : (
                  <div className="flex flex-col">
                    {ctl.items.map((o: any, index: number) => {
                      const checked = list.find((i) => i.id === o.id);
                      return (
                        <button
                          key={index}
                          type="button"
                          className={cn(
                            "flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-accent rounded",
                            "border-b last:border-b-0 min-h-[42px]"
                          )}
                          onClick={() => addItem(o)}
                        >
                          <div className="w-[20px] pointer-events-none">
                            {checked ? (
                              <span className="inline-flex items-center justify-center w-5 h-auto border aspect-square translate-y-0 rounded-[3px]">
                                <CheckIcon size={14} />
                              </span>
                            ) : (
                              <span className="inline-block w-5 h-auto border aspect-square translate-y-1 rounded-[3px]"></span>
                            )}
                          </div>

                          <span className="text-sm">
                            <span className="font-medium">{o.name}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end space-x-2 p-2 border-t">
              <Button
                disabled={!list.length}
                onClick={() => {
                  onChange(list);
                  setIsOpen(false);
                }}
              >
                Add
              </Button>
              <Button
                onClick={() => {
                  setIsOpen(false);
                  setList([]);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        }
      >
        {/* Anchor: the input itself */}
        <div className="relative">
          <SearchIcon className="absolute left-3 top-0 bottom-0 w-4 h-4 my-auto text-muted-foreground" />
          <Input
            placeholder={placeholder || "Search…"}
            value={qLocal}
            onChange={(e) => setQLocal(e.target.value)}
            className="w-56 md:w-100 !pl-9"
            onFocus={() => !disabled && setIsOpen(true)}
          />
        </div>
      </Popover>
    </div>
  );
};
