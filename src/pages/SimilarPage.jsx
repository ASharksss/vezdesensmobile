import React from 'react';
import BoardComponent from "../components/Board/BoardComponent";
import Long from "../components/Card/Long";

const SimilarPage = () => {
  return (
    <div>
      <Long/>
      <h1>Похожие объявления</h1>
      <BoardComponent/>

    </div>
  );
};

export default SimilarPage;