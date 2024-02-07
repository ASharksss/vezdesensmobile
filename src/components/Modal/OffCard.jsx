import React from 'react';
import WhiteBtn from "../../ui/WhiteBtn";
import BlackBtn from "../../ui/BlackBtn";
import CloseBtn from "../../ui/closeBtn";
import axios from "axios";

const OffCard = ({item}) => {

  const archiveCard = async () => {
    await axios.get(`api/ad/archive/${item.id}`)
      .then(() => window.location.reload())
  }

  return (
    <div className='relative'>
      <div className="off_card-cross">
        <CloseBtn/>

      </div>
      <div className="column">
        <span className='off_card-bold'>Вы уверены,</span>
        <span className='off_card-subtitle'>что хотите снять публикацию?</span>
      </div>

      <div className="flex items-center center">
        <div className="off_card-btn">
          <div onClick={() => archiveCard()}>
            <BlackBtn size={'w-93px'} type={'white_text'} children={'Да'}/>
          </div>
        </div>
        <div className="off_card-btn">
          <WhiteBtn size={'w-93px'} children={'Нет'}/>
        </div>

      </div>
    </div>
  );
};

export default OffCard;