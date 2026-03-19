import GenericTable from "@/components/admin/GenericTable";
import React from "react";

export const MultiSelectTable = ({ entity, hard_code_filter }: any) => {
  return (
    <div>
      <GenericTable
        entity={entity}
        hard_code_filter={hard_code_filter} //nishant@work
      />
    </div>
  );
};
