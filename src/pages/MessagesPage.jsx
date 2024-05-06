import React, {useEffect} from 'react';
import './pages.css'
import filter from '../asserts/messages/filter.svg'
import settings from '../asserts/messages/setting.svg'
import Dialog from "../components/Dialog/Dialog";
import useGetMessages from '../redux/hooks/useGetMessages';
import {NavLink, Navigate} from "react-router-dom";
import {v4 as uuidV4} from 'uuid';
import {useSelector} from "react-redux";


const MessagesPage = () => {
    const {items} = useSelector(state => state.user.user)
    const {data, setData, loading} = useGetMessages()
    useEffect(() => {
        document.title = 'Сообщения'
    }, [])

    // console.log(items)
    return (
        <div className='messagePage'>
            <div className="messages_header flex items-center space-between">
                <div className='flex items-center'>
                    <h1 className='messages_header-title'>Сообщения</h1>
                    <span className='messages_header-count'> {data.length}</span>
                </div>
                <div className='flex items-center'>
                    <img src={filter} alt="" className='messages_header-icon'/>
                    <img src={settings} alt="" className='messages_header-icon'/>
                </div>
            </div>
            <div className="messages_list ">

                {data.length > 0 ? data.map((item, index) => (
                    <NavLink state={{from: item[0].receiver, tovar: data[0]}}
                             to={`/dialog/?adId=${item[0].id}&senderId=${items.id}&receiverId=${item[1].id}#chat-${uuidV4()}`}>
                        <Dialog data={item[0]} seller={item[0].user}
                                status={item[0].statusAd.name} image={item[0].previewImageAds[0]?.name}/>
                        {/* image={item[0].previewImageAds[0]?.name} */}
                    </NavLink>
                )) : null}
            </div>
        </div>
    );
};

export default MessagesPage;