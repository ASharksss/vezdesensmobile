import React from 'react';
import Card from "../Card/Card";
import {useTabletDetection} from "../../utils.js"


const CommercialBlocksComponents = ({items}) => {
  const isTablet = useTabletDetection(); //првоерка размера
  let changeRepeat = 2;
  if (isTablet){
  changeRepeat = 4;
  }
  return (
    <div className={`grid${items.some(item => item.typeAdId === 2) ? ' plus_card_block' : ''}`} style={{gridTemplateColumns: `repeat(${changeRepeat}, 1fr)`}}>
      {items !== undefined && items.map((item, index) => (item.typeAdId === 2 &&
        <Card key={`card-${index}`}
              classname={'s'}
              data={item}/>
      ))}
    </div>
  );
};

export default CommercialBlocksComponents;