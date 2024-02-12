import React, {useEffect, useMemo, useState} from 'react';
import Card from "../Card/Card";
import {STATIC_HOST} from "../../utils";
import SmallBlocksComponent from "./SmallBlocksComponent";
import CommercialBlocksComponents from "./CommercialBlocksComponents";

const BorderComponent = ({allData, lastElementRef}) => {
  const [data, setData] = useState([])
  const [lastDataLength, setLastDataLength] = useState(0)

  useEffect(() => {
    if (allData.length > 0) {
      setData(prevState => [...prevState, allData.slice(lastDataLength, allData.length + 1)])
      setLastDataLength(allData.length)
    }
  }, [allData])

  return (
    <div className='board_page'>
      {data.map((datas, indexDatas) => (
        <div ref={indexDatas === data.length - 1 ? lastElementRef : null} key={`grid-${indexDatas}`}>
          <SmallBlocksComponent items={datas} />
          <CommercialBlocksComponents items={datas}/>
          <div className='grid' style={{gridTemplateColumns: 'repeat(1, 1fr)'}}>
            {datas !== undefined && datas.map((item, index) => (item.typeAdId === 3 &&
              <Card key={`card-${index}`}
                    classname={'l'}
                    data={item}/>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BorderComponent;
