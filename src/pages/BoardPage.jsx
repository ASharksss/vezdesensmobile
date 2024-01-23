import React from 'react';
import './pages.css'
import Card from "../components/Card/Card";
import Long from "../components/Card/Long";
import Premium from "../components/Card/Premium";

const BoardPage = () => {
  return (
    <div className='board_page'>
      <Premium/>
      <div className="grid">
        <Card classname={'xs'}/>
        <Card classname={'xs'}/>
        <Card classname={'xs'}/>
        <Card classname={'xs'}/>
        <Card classname={'xs'}/>
        <Card classname={'xs'}/>
        <Card classname={'xs'}/>
      </div>
      <Long/>
      <div className="grid">
        <Card/>
        <Card/>
        <Card/>
        <Card/>
      </div>
      <div className='grid plus_card_block'>
        <Card classname={'s'}/>
        <Card classname={'s'}/>
      </div>
      <Card classname={'l'}/>
    </div>
  );
};

export default BoardPage;