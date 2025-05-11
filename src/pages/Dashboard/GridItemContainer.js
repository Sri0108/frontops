import React, { forwardRef } from "react";
import GridItem from "./GridItem";

const GridItemContainer = forwardRef(({ children, item, percentChange, ...props }, ref) => {
  return (
    <GridItem data={item} root={item} ref={ref} percentChange={percentChange} {...props}>
      {children}
    </GridItem>
  );
});

GridItemContainer.displayName = "GridItemContainer";

export default GridItemContainer;
