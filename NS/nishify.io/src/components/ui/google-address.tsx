/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { Input } from "./input";

export const GoogleAddress = ({ value, onChange, ui, updateField }: any) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef?.current) {
      initAutocomplete();
    }
  }, []);

  const initAutocomplete = () => {
    if (!(window as any).google || !(window as any).google.maps) return;

    const autocomplete = new (window as any).google.maps.places.Autocomplete(
      inputRef?.current as HTMLInputElement,
      {
        types: ["geocode"],
      }
    );

    autocomplete.addListener("place_changed", (w: any) => {
      const place = autocomplete.getPlace();

      console.log({ w });
      console.log(place);
      const addressComponents = place.address_components || [];
      console.log({ addressComponents });

      let street = "";
      let city = "";
      let state = "";
      let zip = "";
      let country = "";

      addressComponents.forEach((component: any) => {
        const types = component.types;

        if (types.includes("street_number")) {
          street = component.long_name + " ";
        }
        if (types.includes("route")) {
          street += component.long_name;
        }
        if (types.includes("locality")) {
          city = component.long_name;
        }
        if (types.includes("administrative_area_level_1")) {
          state = component.short_name;
        }
        if (types.includes("postal_code")) {
          zip = component.long_name;
        }
        if (types.includes("country")) {
          country = component.long_name;
        }
      });

      onChange(street);
      console.log({
        street,
        city,
        state,
        zip,
        country,
        autoPopulate: ui?.autoPopulate,
      });
      if (ui?.autoPopulate?.state) {
        updateField(ui.autoPopulate.state, state);
      }
      if (ui?.autoPopulate?.city) {
        updateField(ui.autoPopulate.city, city);
      }
      if (ui?.autoPopulate?.zip_code) {
        updateField(ui.autoPopulate.zip_code, zip);
      }

      if (ui?.autoPopulate?.country) {
        updateField(ui.autoPopulate.country, country);
      }
    });
  };

  return (
    <Input
      ref={inputRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type="text"
      placeholder="Enter an address"
    />
  );
};
