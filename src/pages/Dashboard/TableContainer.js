import React, { forwardRef } from "react";
import TableItem from "./TableItem";

const TableContainer = forwardRef(({ children, item, percentChange, ...props }, ref) => {
  return (
    <TableItem data={item} root={item} ref={ref} percentChange={percentChange} {...props}>
      {children}
    </TableItem>
  );
});

TableContainer.displayName = "TableContainer";

export default TableContainer;
