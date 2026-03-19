/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Palette } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

/* ---------------- Options ---------------- */
const BRAND_OPTIONS = [
  { label: "Amberland", value: "amberland" },
  { label: "Emeraldline", value: "emeraldline" },
  { label: "Default", value: "default" },
] as const;

const MODE_OPTIONS = ["light", "dark"] as const;
const SIZE_OPTIONS = ["default", "sm", "lg"] as const;
const RADIUS_OPTIONS = [
  "none",
  "default",
  "sm",
  "lg",
  "xl",
  "2xl",
  "3xl",
] as const;

/* ---------------- Utils ---------------- */
const genOptions = (min: number, max: number) =>
  Array.from({ length: max - min + 1 }, (_, i) => (i + min).toString());

const FONT_OPTIONS = genOptions(7, 30);
const PADDING_OPTIONS = genOptions(0, 70);
const LINE_HEIGHT_OPTIONS = genOptions(0, 30);
const TABLE_OPTIONS = genOptions(0, 30);
const INPUT_HEIGHT_OPTIONS = genOptions(0, 70);
const BUTTON_HEIGHT_OPTIONS = genOptions(0, 70);

function readUnion<T extends readonly string[]>(
  key: string,
  options: T,
  fallback: T[number]
): T[number] {
  const raw = localStorage.getItem(key);
  if (raw && (options as readonly string[]).includes(raw)) {
    return raw as T[number];
  }
  return fallback;
}

function readNumber(key: string, fallback: number): number {
  const raw = localStorage.getItem(key);
  if (raw == null) return fallback;
  const n = Number(raw);
  return Number.isFinite(n) ? n : fallback;
}

/* ---------------- Defaults (literal typed) ---------------- */
const DEFAULTS = {
  theme: "default",
  mode: "light",
  size: "default",
  radius: "sm",

  font: 14,
  paddingLeft: 12,
  paddingTop: 4,
  paddingRight: 12,
  paddingBottom: 4,
  lineHeight: 40,
  tableHeader: 14,
  tableCell: 14,
  inputHeight: 40,

  buttonHeight: 36,

  buttonPaddingLeft: 16,
  buttonPaddingTop: 8,
  buttonPaddingRight: 16,
  buttonPaddingBottom: 8,
  buttonFontSize: 14,
  labelFontSize: 14,
  sidebarMenuSize: 14,
} as const satisfies {
  theme: (typeof BRAND_OPTIONS)[number]["value"];
  mode: (typeof MODE_OPTIONS)[number];
  size: (typeof SIZE_OPTIONS)[number];
  radius: (typeof RADIUS_OPTIONS)[number];
  font: number;
  paddingLeft: number;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  lineHeight: number;
  tableHeader: number;
  tableCell: number;
  inputHeight: number;

  buttonPaddingLeft: number;
  buttonPaddingTop: number;
  buttonPaddingRight: number;
  buttonPaddingBottom: number;
  buttonFontSize: number;
  labelFontSize: number;
  sidebarMenuSize: number;
  buttonHeight: number;
};

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);

  // Unions
  const [theme, setTheme] = useState<(typeof BRAND_OPTIONS)[number]["value"]>(
    DEFAULTS.theme
  );
  const [mode, setMode] = useState<(typeof MODE_OPTIONS)[number]>(
    DEFAULTS.mode
  );
  const { theme: currentTheme, setTheme: setGlobalTheme } = useTheme();

  const [uiSize, setUiSize] = useState<(typeof SIZE_OPTIONS)[number]>(
    DEFAULTS.size
  );
  const [uiRadius, setUiRadius] = useState<(typeof RADIUS_OPTIONS)[number]>(
    DEFAULTS.radius
  );

  // Numbers
  const [uiFont, setUiFont] = useState<number>(DEFAULTS.font);
  const [uiPaddingLeft, setUiPaddingLeft] = useState<number>(
    DEFAULTS.paddingLeft
  );
  const [uiPaddingTop, setUiPaddingTop] = useState<number>(DEFAULTS.paddingTop);
  const [uiPaddingRight, setUiPaddingRight] = useState<number>(
    DEFAULTS.paddingRight
  );
  const [uiPaddingBottom, setUiPaddingBottom] = useState<number>(
    DEFAULTS.paddingBottom
  );
  const [uiLineHeight, setUiLineHeight] = useState<number>(DEFAULTS.lineHeight);
  const [uiTableHeader, setUiTableHeader] = useState<number>(
    DEFAULTS.tableHeader
  );
  const [uiTableCell, setUiTableCell] = useState<number>(DEFAULTS.tableCell);
  const [uiInputHeight, setUiInputHeight] = useState<number>(
    DEFAULTS.inputHeight
  );

  // Button-specific
  const [btnPaddingLeft, setBtnPaddingLeft] = useState<number>(
    DEFAULTS.buttonPaddingLeft
  );
  const [btnPaddingTop, setBtnPaddingTop] = useState<number>(
    DEFAULTS.buttonPaddingTop
  );
  const [btnPaddingRight, setBtnPaddingRight] = useState<number>(
    DEFAULTS.buttonPaddingRight
  );
  const [btnPaddingBottom, setBtnPaddingBottom] = useState<number>(
    DEFAULTS.buttonPaddingBottom
  );
  const [btnFontSize, setBtnFontSize] = useState<number>(
    DEFAULTS.buttonFontSize
  );
  const [btnHeight, setBtnHeight] = useState<number>(DEFAULTS.buttonHeight);

  // Label & sidebar
  const [labelFontSize, setLabelFontSize] = useState<number>(
    DEFAULTS.labelFontSize
  );
  const [sidebarMenuSize, setSidebarMenuSize] = useState<number>(
    DEFAULTS.sidebarMenuSize
  );

  /* ---------------- Initial Load ---------------- */
  useEffect(() => {
    setTheme(
      readUnion(
        "brand-theme",
        BRAND_OPTIONS.map((b) => b.value) as any,
        DEFAULTS.theme
      )
    );
    setMode(readUnion("color-mode", MODE_OPTIONS, DEFAULTS.mode));
    setUiSize(readUnion("ui-size", SIZE_OPTIONS, DEFAULTS.size));
    setUiRadius(readUnion("ui-radius", RADIUS_OPTIONS, DEFAULTS.radius));

    setUiFont(readNumber("ui-font", DEFAULTS.font));
    setUiPaddingLeft(readNumber("ui-padding-left", DEFAULTS.paddingLeft));
    setUiPaddingTop(readNumber("ui-padding-top", DEFAULTS.paddingTop));
    setUiPaddingRight(readNumber("ui-padding-right", DEFAULTS.paddingRight));
    setUiPaddingBottom(readNumber("ui-padding-bottom", DEFAULTS.paddingBottom));
    setUiLineHeight(readNumber("ui-line-height", DEFAULTS.lineHeight));
    setUiTableHeader(readNumber("ui-table-header", DEFAULTS.tableHeader));
    setUiTableCell(readNumber("ui-table-cell", DEFAULTS.tableCell));
    setUiInputHeight(readNumber("ui-input-height", DEFAULTS.inputHeight));

    setBtnPaddingLeft(
      readNumber("ui-button-padding-left", DEFAULTS.buttonPaddingLeft)
    );
    setBtnPaddingTop(
      readNumber("ui-button-padding-top", DEFAULTS.buttonPaddingTop)
    );
    setBtnPaddingRight(
      readNumber("ui-button-padding-right", DEFAULTS.buttonPaddingRight)
    );
    setBtnPaddingBottom(
      readNumber("ui-button-padding-bottom", DEFAULTS.buttonPaddingBottom)
    );
    setBtnFontSize(readNumber("ui-button-font-size", DEFAULTS.buttonFontSize));
    setBtnHeight(readNumber("ui-button-height", DEFAULTS.buttonHeight));

    setLabelFontSize(readNumber("ui-label-font-size", DEFAULTS.labelFontSize));
    setSidebarMenuSize(
      readNumber("ui-sidebar-menu-size", DEFAULTS.sidebarMenuSize)
    );

    setMounted(true);
  }, []);

  /* ---------------- Sync with next-themes ---------------- */
  useEffect(() => {
    if (!currentTheme) return;
    if (currentTheme !== mode) {
      setMode(currentTheme as (typeof MODE_OPTIONS)[number]);
    }
  }, [currentTheme]);

  /* ---------------- Apply Classes & Data-Attrs ---------------- */
  useEffect(() => {
    if (!mounted) return;

    document.body.classList.remove(
      "theme-amberland",
      "theme-emeraldline",
      "theme-default",
      "light",
      "dark"
    );
    document.body.classList.add(`theme-${theme}`, mode);

    const attrs: Record<string, string | number | undefined> = {
      "data-size": uiSize,
      "data-radius": uiRadius,

      // Typography & spacing
      "data-font": uiFont,
      "data-padding-left": uiPaddingLeft,
      "data-padding-top": uiPaddingTop,
      "data-padding-right": uiPaddingRight,
      "data-padding-bottom": uiPaddingBottom,
      "data-line-height": uiLineHeight,

      // Table, Inputs
      "data-table-header": uiTableHeader,
      "data-table-cell": uiTableCell,
      "data-input-height": uiInputHeight,

      // Buttons
      "data-button-padding-left": btnPaddingLeft,
      "data-button-padding-top": btnPaddingTop,
      "data-button-padding-right": btnPaddingRight,
      "data-button-padding-bottom": btnPaddingBottom,
      "data-button-font-size": btnFontSize,
      "data-button-height": btnHeight,

      // Label & sidebar
      "data-label-font-size": labelFontSize,
      "data-sidebar-menu-size": sidebarMenuSize,
    };

    Object.entries(attrs).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== "") {
        document.body.setAttribute(k, String(v));
      } else {
        document.body.removeAttribute(k);
      }
    });

    // persist only our keys
    localStorage.setItem("brand-theme", theme);
    localStorage.setItem("color-mode", mode);
    localStorage.setItem("ui-size", uiSize);
    localStorage.setItem("ui-radius", uiRadius);

    localStorage.setItem("ui-font", String(uiFont));
    localStorage.setItem("ui-padding-left", String(uiPaddingLeft));
    localStorage.setItem("ui-padding-top", String(uiPaddingTop));
    localStorage.setItem("ui-padding-right", String(uiPaddingRight));
    localStorage.setItem("ui-padding-bottom", String(uiPaddingBottom));
    localStorage.setItem("ui-line-height", String(uiLineHeight));
    localStorage.setItem("ui-table-header", String(uiTableHeader));
    localStorage.setItem("ui-table-cell", String(uiTableCell));
    localStorage.setItem("ui-input-height", String(uiInputHeight));

    localStorage.setItem("ui-button-padding-left", String(btnPaddingLeft));
    localStorage.setItem("ui-button-padding-top", String(btnPaddingTop));
    localStorage.setItem("ui-button-padding-right", String(btnPaddingRight));
    localStorage.setItem("ui-button-padding-bottom", String(btnPaddingBottom));
    localStorage.setItem("ui-button-font-size", String(btnFontSize));
    localStorage.setItem("ui-button-height", String(btnHeight));

    localStorage.setItem("ui-label-font-size", String(labelFontSize));
    localStorage.setItem("ui-sidebar-menu-size", String(sidebarMenuSize));
  }, [
    theme,
    mode,
    uiSize,
    uiRadius,

    uiFont,
    uiPaddingLeft,
    uiPaddingTop,
    uiPaddingRight,
    uiPaddingBottom,
    uiLineHeight,

    uiTableHeader,
    uiTableCell,
    uiInputHeight,

    btnPaddingLeft,
    btnPaddingTop,
    btnPaddingRight,
    btnPaddingBottom,
    btnFontSize,
    btnHeight,

    labelFontSize,
    sidebarMenuSize,

    mounted,
  ]);

  /* ---------------- Reset Handler ---------------- */
  const handleReset = () => {
    setTheme(DEFAULTS.theme);
    setMode(DEFAULTS.mode);
    setGlobalTheme(DEFAULTS.mode);
    setUiSize(DEFAULTS.size);
    setUiRadius(DEFAULTS.radius);

    setUiFont(DEFAULTS.font);
    setUiPaddingLeft(DEFAULTS.paddingLeft);
    setUiPaddingTop(DEFAULTS.paddingTop);
    setUiPaddingRight(DEFAULTS.paddingRight);
    setUiPaddingBottom(DEFAULTS.paddingBottom);
    setUiLineHeight(DEFAULTS.lineHeight);
    setUiTableHeader(DEFAULTS.tableHeader);
    setUiTableCell(DEFAULTS.tableCell);
    setUiInputHeight(DEFAULTS.inputHeight);

    setBtnPaddingLeft(DEFAULTS.buttonPaddingLeft);
    setBtnPaddingTop(DEFAULTS.buttonPaddingTop);
    setBtnPaddingRight(DEFAULTS.buttonPaddingRight);
    setBtnPaddingBottom(DEFAULTS.buttonPaddingBottom);
    setBtnFontSize(DEFAULTS.buttonFontSize);
    setBtnHeight(DEFAULTS.buttonHeight);

    setLabelFontSize(DEFAULTS.labelFontSize);
    setSidebarMenuSize(DEFAULTS.sidebarMenuSize);

    // persist defaults to our keys
    localStorage.setItem("brand-theme", DEFAULTS.theme);
    localStorage.setItem("color-mode", DEFAULTS.mode);
    localStorage.setItem("ui-size", DEFAULTS.size);
    localStorage.setItem("ui-radius", DEFAULTS.radius);

    localStorage.setItem("ui-font", String(DEFAULTS.font));
    localStorage.setItem("ui-padding-left", String(DEFAULTS.paddingLeft));
    localStorage.setItem("ui-padding-top", String(DEFAULTS.paddingTop));
    localStorage.setItem("ui-padding-right", String(DEFAULTS.paddingRight));
    localStorage.setItem("ui-padding-bottom", String(DEFAULTS.paddingBottom));
    localStorage.setItem("ui-line-height", String(DEFAULTS.lineHeight));
    localStorage.setItem("ui-table-header", String(DEFAULTS.tableHeader));
    localStorage.setItem("ui-table-cell", String(DEFAULTS.tableCell));
    localStorage.setItem("ui-input-height", String(DEFAULTS.inputHeight));

    localStorage.setItem(
      "ui-button-padding-left",
      String(DEFAULTS.buttonPaddingLeft)
    );
    localStorage.setItem(
      "ui-button-padding-top",
      String(DEFAULTS.buttonPaddingTop)
    );
    localStorage.setItem(
      "ui-button-padding-right",
      String(DEFAULTS.buttonPaddingRight)
    );
    localStorage.setItem(
      "ui-button-padding-bottom",
      String(DEFAULTS.buttonPaddingBottom)
    );
    localStorage.setItem(
      "ui-button-font-size",
      String(DEFAULTS.buttonFontSize)
    );
    localStorage.setItem("ui-button-height", String(DEFAULTS.buttonHeight));

    localStorage.setItem("ui-label-font-size", String(DEFAULTS.labelFontSize));
    localStorage.setItem(
      "ui-sidebar-menu-size",
      String(DEFAULTS.sidebarMenuSize)
    );
  };

  /* ---------------- UI Helpers ---------------- */
  const renderSelect = (
    label: string,
    value: number,
    onChange: (v: string) => void,
    options: string[]
  ) => (
    <div className="space-y-1">
      <h4 className="font-semibold">{label}</h4>
      <Select value={String(value)} onValueChange={onChange}>
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          {options.map((o) => (
            <SelectItem key={o} value={o}>
              {o}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  /* ---------------- UI ---------------- */
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="default"
          className={
            currentTheme === "dark"
              ? "bg-white text-black hover:bg-white hover:opacity-70 hover:text-black"
              : "bg-black text-white hover:bg-black hover:opacity-70 hover:text-white"
          }
          size="icon"
        >
          <Palette />
        </Button>
      </SheetTrigger>

      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center justify-between pr-9">
            <SheetTitle>Appearance</SheetTitle>
            <Button variant="outline" size="sm" onClick={handleReset}>
              Reset to Defaults
            </Button>
          </div>
          <SheetDescription asChild>
            <div className="pb-10">
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="theme">
                  <AccordionTrigger>Theme</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold">Color Theme</h4>
                        <div className="flex flex-wrap gap-2">
                          {BRAND_OPTIONS.map((opt) => (
                            <Button
                              key={opt.value}
                              size="xs"
                              variant={
                                theme === opt.value ? "default" : "ghost"
                              }
                              onClick={() => setTheme(opt.value)}
                              className="justify-start font-normal"
                            >
                              {opt.label}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold">Mode</h4>
                        <div className="flex flex-wrap gap-2">
                          {MODE_OPTIONS.map((m) => (
                            <Button
                              key={m}
                              size="xs"
                              variant={mode === m ? "default" : "ghost"}
                              onClick={() => {
                                setMode(m);
                                setGlobalTheme(m);
                              }}
                              className="justify-start font-normal capitalize"
                            >
                              {m}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="layout">
                  <AccordionTrigger>Border Radius</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      {/* <div className="space-y-2">
                        <h4 className="font-semibold">Size</h4>
                        <div className="flex flex-wrap gap-2">
                          {SIZE_OPTIONS.map((s) => (
                            <Button
                              key={`size-${s}`}
                              size="xs"
                              variant={uiSize === s ? "default" : "ghost"}
                              onClick={() => setUiSize(s)}
                              className="justify-start font-normal capitalize"
                            >
                              {s}
                            </Button>
                          ))}
                        </div>
                      </div> */}

                      <div className="space-y-2">
                        <h4 className="font-semibold">Border Radius</h4>
                        <div className="flex flex-wrap gap-2">
                          {RADIUS_OPTIONS.map((r) => (
                            <Button
                              size="xs"
                              key={`radius-${r}`}
                              variant={uiRadius === r ? "default" : "ghost"}
                              onClick={() => setUiRadius(r)}
                              className="justify-start font-normal uppercase"
                            >
                              {r}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="typography">
                  <AccordionTrigger>Input</AccordionTrigger>
                  <AccordionContent>
                    <div>
                      <h4 className="font-semibold mb-2 text-opacity-50  italic">
                        Typography
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {renderSelect(
                          "Font Size",
                          uiFont,
                          (v) => setUiFont(Number(v)),
                          FONT_OPTIONS
                        )}
                        {renderSelect(
                          "Line Height",
                          uiLineHeight,
                          (v) => setUiLineHeight(Number(v)),
                          LINE_HEIGHT_OPTIONS
                        )}
                        {renderSelect(
                          "Label Font Size",
                          labelFontSize,
                          (v) => setLabelFontSize(Number(v)),
                          FONT_OPTIONS
                        )}
                      </div>
                      <h4 className="font-semibold mb-2 mt-4 text-opacity-50  italic">
                        Padding
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {renderSelect(
                          "Padding Left",
                          uiPaddingLeft,
                          (v) => setUiPaddingLeft(Number(v)),
                          PADDING_OPTIONS
                        )}
                        {renderSelect(
                          "Padding Top",
                          uiPaddingTop,
                          (v) => setUiPaddingTop(Number(v)),
                          PADDING_OPTIONS
                        )}
                        {renderSelect(
                          "Padding Right",
                          uiPaddingRight,
                          (v) => setUiPaddingRight(Number(v)),
                          PADDING_OPTIONS
                        )}
                        {renderSelect(
                          "Padding Bottom",
                          uiPaddingBottom,
                          (v) => setUiPaddingBottom(Number(v)),
                          PADDING_OPTIONS
                        )}
                      </div>
                      <h4 className="font-semibold mb-2 mt-4 text-opacity-50  italic">
                        Height
                      </h4>
                      {renderSelect(
                        "Input Height",
                        uiInputHeight,
                        (v) => setUiInputHeight(Number(v)),
                        INPUT_HEIGHT_OPTIONS
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="table">
                  <AccordionTrigger>Table</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {renderSelect(
                        "Header Size",
                        uiTableHeader,
                        (v) => setUiTableHeader(Number(v)),
                        TABLE_OPTIONS
                      )}
                      {renderSelect(
                        "Cell Size",
                        uiTableCell,
                        (v) => setUiTableCell(Number(v)),
                        TABLE_OPTIONS
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="sidebar">
                  <AccordionTrigger>Sidebar</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {renderSelect(
                        "Sidebar Menu Size",
                        sidebarMenuSize,
                        (v) => setSidebarMenuSize(Number(v)),
                        FONT_OPTIONS
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="buttons">
                  <AccordionTrigger>Buttons</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {renderSelect(
                        "Font Size",
                        btnFontSize,
                        (v) => setBtnFontSize(Number(v)),
                        FONT_OPTIONS
                      )}
                      {renderSelect(
                        "Height",
                        btnHeight,
                        (v) => setBtnHeight(Number(v)),
                        BUTTON_HEIGHT_OPTIONS
                      )}
                      {renderSelect(
                        "Padding Left",
                        btnPaddingLeft,
                        (v) => setBtnPaddingLeft(Number(v)),
                        PADDING_OPTIONS
                      )}
                      {renderSelect(
                        "Padding Top",
                        btnPaddingTop,
                        (v) => setBtnPaddingTop(Number(v)),
                        PADDING_OPTIONS
                      )}
                      {renderSelect(
                        "Padding Right",
                        btnPaddingRight,
                        (v) => setBtnPaddingRight(Number(v)),
                        PADDING_OPTIONS
                      )}
                      {renderSelect(
                        "Padding Bottom",
                        btnPaddingBottom,
                        (v) => setBtnPaddingBottom(Number(v)),
                        PADDING_OPTIONS
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
