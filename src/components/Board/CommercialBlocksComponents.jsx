import React from 'react';
import Card from "../Card/Card";

const CommercialBlocksComponents = ({items}) => {
  return (
    <div className={`grid${items.some(item => item.typeAdId === 2) ? ' plus_card_block' : ''}`} style={{gridTemplateColumns: 'repeat(2, 1fr)'}}>
      {items !== undefined && items.map((item, index) => (item.typeAdId === 2 &&
        <Card key={`card-${index}`}
              classname={'s'}
              data={item}/>
      ))}
    </div>
  );
};

export default CommercialBlocksComponents;