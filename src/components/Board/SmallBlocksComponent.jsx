import React from 'react';
import Card from "../Card/Card";
import {useTabletDetection} from "../../utils.js"

const SmallBlocksComponent = ({items}) => {

  const isTablet = useTabletDetection(); //првоерка размера
  let changeRepeat = 2;
  if (isTablet){
  changeRepeat = 4;
  }
  
  return (
    <div className='board_page'>
      <div className='grid' style={{gridTemplateColumns: `repeat(${changeRepeat}, 1fr)`}}>
        {items !== undefined && items.map((item, index) => ( item.typeAdId === 1 &&
          <Card key={`card-${index}`} classname={'xs'} data={item}/>
        ))}
      </div>
    </div>

  );
};

export default SmallBlocksComponent;