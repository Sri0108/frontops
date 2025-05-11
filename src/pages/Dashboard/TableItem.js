import React, { forwardRef } from "react";

const TableItem = forwardRef(
  ({ data, className, style, dispatch, root, children, percentChange, cardHeight, ...rest }, ref) => {
    const width = parseInt(style?.width, 10);
    const height = parseInt(style?.height, 10);
    let button_color = '';
    const leftBorderStyle = percentChange < 0 
      ? '7px solid red' 
      : percentChange > 0 
      ? '7px solid green' 
      : 'none';

    if (className === 'react-grid-item trending-grid-item react-draggable cssTransforms react-resizable'){
      button_color = 'white';
    }
    else{
      button_color = 'black';
    }
    return (
      <div ref={ref} className={`grid-item ${className}`} style={{ ...style, borderLeft: leftBorderStyle }} {...rest}>
       <i className='bx bx-dots-horizontal mx-auto' style={{color:button_color}}></i>
        <div className="grid-item__graph">
          {data}
        </div>
        {/* {children} */}
      </div>
    );
  }
);

TableItem.displayName = "TableItem";

export default TableItem;
