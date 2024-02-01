import React from 'react';
import Card from "../Card/Card";

const SmallBlocksComponent = ({items}) => {
  return (
    <div className='board_page'>
      <div className='grid' style={{gridTemplateColumns: 'repeat(2, 1fr)'}}>
        {items !== undefined && items.map((item, index) => ( item.typeAdId === 1 &&
          <Card key={`card-${index}`} classname={'xs'} data={item}/>
        ))}
      </div>
    </div>

  );
};

export default SmallBlocksComponent;