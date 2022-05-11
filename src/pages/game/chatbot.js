import React from "react";
import { useRef } from "react";
import { useState,useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import  webSocket  from "socket.io-client";
import './chatbot.css';
import {useCart} from "../carts/utils/useCart"
function Chatbot(props){
    let chat_id = 1;
    let agentChat_id = 1;
    const history = useHistory();
    const [toggleReply,setToggleReply] = useState(false);
    const [toggleChatbot,setToggleChatbot] = useState(false);
    const [toggleMenu,setToggleMenu] = useState(false); 
    const [toggleSticker,setToggleSticker] = useState(false);
    const [message,setMessage] = useState([{id:chat_id,text:'yo~ 我是熊貓有任何基礎問題都可以問我',type:'chatbot_reply'}]);
    const [privateMessage,setPrivateMessage] = useState([]);
    const [weatherData,setWeatherData] = useState({});
    const [adultTicket,setAdultTicket] = useState(0);
    const [studentTicket,setStudentTicket] = useState(0);
    const [loveTicket,setLoveTicket] = useState(0);
    const [move,setMove] = useState(0);
    const [io,setIo] = useState(null);
    const [pandaLimit,setPandaLimit] = useState(false);
    const [bearLimit,setBearLimit] = useState(false);
    const [nowRoom,setNowRoom] = useState('');
    const myChatbotInput = useRef(null);
    const {addItem}=useCart();
    const connectWebSocket = ()=>{
        setIo( webSocket('http://localhost:3001') );
    }
    useEffect(()=>{
        let isMounted = true;
        if(io){
            io.on('connection',(panda_total,bear_total)=>{
                if(panda_total<2){
                    setPandaLimit(false);
                }else{
                    setPandaLimit(true);
                }
                if(bear_total<2){
                    setBearLimit(false);
                }else{
                    setBearLimit(true);
                }
            })
            io.on('room message', function(msg) {
                let replyMessage = '';
                // 因為別台使用者傳過來的是一個打包好的物件，像是以下的模組，我再去做轉換type
                // { id:agentChat_id+1,
                //     text:myChatbotInput.current.value,
                //     type:'user_reply',
                //     time:timeNow,
                // } ;
                if(msg.type==='stickers'){
                    replyMessage = [...privateMessage];
                    const uploadTmp1 = { id:msg.id,
                                    text: msg.text,
                                    type:'stickers_agent',
                                    time:msg.time,
                                } ;
                    replyMessage.push(uploadTmp1);
                    if(isMounted){
                        setPrivateMessage(replyMessage);
                    }
                }else{
                    replyMessage = [...privateMessage];
                    const uploadTmp1 = { id:msg.id,
                                        text: msg.text,
                                        type:'agent_reply',
                                        time:msg.time,
                                    } ;
                    replyMessage.push(uploadTmp1);
                    if(isMounted){
                        setPrivateMessage(replyMessage);
                    }
                }
                
            });
        }
        return () => {
            isMounted = false;
        };
        
    },[io,privateMessage])
    useEffect(()=>{
        const chat_area = document.querySelector('.chat_area');
        chat_area.scrollTo({top:chat_area.scrollHeight})
    },[message,privateMessage])
    // 每一次開啟機器人的第一句預設問好
    useEffect(()=>{
        const sendTime = new Date();
        const hour = sendTime.getHours();
        const minute = sendTime.getMinutes()<10?'0'+sendTime.getMinutes():sendTime.getMinutes();
        const description = hour >= 12 ? '下午':'上午';
        const timeNow =  hour === 0 ? `${description}0${hour}:${minute}`:`${description}${hour}:${minute}`;
        document.querySelector('.chatbot_time').innerHTML = `${timeNow}`;
    },[toggleChatbot]);
    // 機器人的開關
    function chatbotToggle (toggleChatbot) {
        const chatot_open = {  
            display:'block',
        }
        const chatot_close = {
            display:'none',
        }
        let result = toggleChatbot ? chatot_open : chatot_close;
        return result;
    }    
    // 機器人回話提示的開關
    function replyToggle (toggleReply) {
        const reply_open = {  
            display:'block',
        }
        const reply_close = {
            display:'none',
        }
        let result = toggleReply ? reply_open : reply_close;
        return result;
    }  
    // 機器人天氣輪播牆控制
    function moveCarousel(move){
        switch (move){
            case 1:
                const obj1 = {transform:'translateX(-210px)'};
                return obj1;
            case 2:
                const obj2 = {transform:'translateX(-420px)'};
                return obj2;
            case 3:
                const obj3 = {transform:'translateX(-630px)'};
                return obj3;
            case 4:
                const obj4 = {transform:'translateX(-840px)'};
                return obj4;
            case 5:
                const obj5 = {transform:'translateX(-1050px)'};
                return obj5;
            default:
            const obj0 = {transform:'translateX(0px)'};
            return obj0;    
        }
    }
    // 機器人貼圖模組
    function makeStickers(src){
        setToggleSticker(!toggleSticker);
        const getTime = new Date();
        let hour = getTime.getHours();
        let minute = getTime.getMinutes()<10?'0'+getTime.getMinutes():getTime.getMinutes();
        let description = hour >= 12 ? '下午':'上午';
        let timeNow =  hour === 0 ? `${description}0${hour}:${minute}`:`${description}${hour}:${minute}`;
        if(io){
            let replyMessage = [...privateMessage];
            const uploadTmp1 = { id:999,
                        text: src,
                        type:'stickers',
                        time:timeNow,
                    } ;
            replyMessage.push(uploadTmp1);
            io.emit('room message', uploadTmp1);
            setPrivateMessage(replyMessage);
        }else{
            let replyMessage = [...message];
            const uploadTmp1 = { id:999,
                        text: src,
                        type:'stickers',
                        time:timeNow,
                    } ;
            replyMessage.push(uploadTmp1);
            setMessage(replyMessage);
        }
    }
    // 一對一客服換頭像
    function changeAvatar(){
        let src = '';
        switch (nowRoom){
            case '北極熊的告解室':
                src = '/img/game/agent_avatar.png';
                return src;
            case '大熊的告解室':
                src = '/img/game/agent_avatar2.png';
                return src;
            default:
                console.log('wrong');
        }
    }
    return(
    <>
        <div className="chatbot_logo" 
            onClick={()=>{
                setToggleChatbot(true)
            }}
            style={chatbotToggle(!toggleChatbot)}
            >
            <img src="/img/game/chatbot_logo.png" alt="" />
            </div>
        <div className="chatbot_wrap" style={chatbotToggle(toggleChatbot)}>
        <div className="chatbot_nav">
            <div className="name">WILDJUNGLE</div>
            <div className="chatbot_close" onClick={()=>{
                // document.querySelector('.chatbot_wrap').style.display = 'none';
                setToggleChatbot(false);
                setPrivateMessage([]);
                if(io){
                    io.disconnect();
                    setIo(null);
                }
            }}><i className="fas fa-times"></i></div>
            
        </div>
        <div className="chat_area">
            {/*--------------------------------------------------------------------------*/} 
            {/* 如果從專人客服跳回來時，這句話也會出現 */}
            <div className="chatbot_reply" style={{display:io?'none':'flex'}}>
                <div className="chatbot_avatar">
                    <img src="/img/game/chatbot_avatar.png" alt="" />
                </div>
                <div className="chatbot_message">
                    yo~ 我是熊貓<br/>有任何基礎問題可以問我
                </div>
                <div className="chatbot_time"></div>
            </div>
            {/* 以下給之後跟專人客服對話的內容map出來 */}
            {privateMessage.map((v,i)=>{
                if(v.type === 'stickers'){
                        return(
                            <div className="user_reply" key={i}>
                                <div className="sticker_message">
                                    <img src={v.text} alt=""/>
                                </div>
                                <div className="user_avatar">
                                    <i className="fas fa-user"></i>
                                </div>
                                <div className="user_time">{v.time}</div>
                            </div>
                        )
                    }
                if(v.type === 'stickers_agent'){
                        return(
                            <div className="chatbot_reply" key={i}>
                                <div className="agentAvatar_wrap">
                                    <img src={changeAvatar()} alt="" className="agentChat_avatar" />
                                </div>
                                <div className="sticker_message">
                                    <img src={v.text} alt=""/>
                                </div>
                                <div className="chatbot_time">{v.time}</div>
                            </div>
                        )
                    }
                if(v.id===0){
                    return(
                        <div className="chatbot_reply" key={i}>
                            <div className="agentAvatar_wrap">
                                <img src={changeAvatar()} alt="" className="agentChat_avatar" />
                            </div>
                            <div className="chatbot_message">
                                {v.text}
                            </div>
                            <div className="chatbot_time">{v.time}</div>
                        </div>
                    )
                }else if(v.type==='agent_reply'){
                    return(
                        <div className="chatbot_reply" key={i}>
                            <div className="agentAvatar_wrap">
                                <img src={changeAvatar()} alt="" className="agentChat_avatar" />
                            </div>
                            <div className="chatbot_message">
                                {v.text}
                            </div>
                            <div className="chatbot_time">{v.time}</div>
                        </div>
                    )
                }else if(v.type==='user_reply'){
                    return(
                        <div className="user_reply" key={i}>
                            <div className="user_message">
                                {v.text}
                            </div>
                            <div className="user_avatar">
                                <i className="fas fa-user"></i>
                            </div>
                            <div className="user_time">{v.time}</div>
                        </div>
                    )
                }
            })}
            {message.map((v,i)=>{
                if(v.id>1){
                    if(v.type === 'buyTicket'){
                    return(
                        <div className="chatbot_reply" key={i}>
                            <div className="chatbot_avatar">
                                <img src="/img/game/chatbot_avatar.png" alt="" />
                            </div>
                            <div className="chatbot_ticketsCard">
                                <div className="chatbot_tCardTitle">門票購買</div>
                                <div className="chatbot_ticketAdult">
                                    <div className="chatbot_ticketFor">全票:</div>
                                    <div className="chatbot_ticketCountArea">
                                        <div className="chatbot_ticketMinus" onClick={()=>{
                                            if(adultTicket>=1)setAdultTicket(adultTicket-1)
                                        }}><i className="fas fa-minus"></i></div>
                                        <div className="chatbot_ticketNum">{adultTicket}</div>
                                        <div className="chatbot_ticketAdd" onClick={()=>{
                                            setAdultTicket(adultTicket+1);
                                        }}><i className="fas fa-plus"></i></div>
                                    </div>
                                </div>
                                <div className="chatbot_ticketStudent">
                                    <div className="chatbot_ticketFor">學生票:</div>
                                    <div className="chatbot_ticketCountArea">
                                        <div className="chatbot_ticketMinus" onClick={()=>{
                                            if(studentTicket>=1)setStudentTicket(studentTicket-1)
                                        }}><i className="fas fa-minus"></i></div>
                                        <div className="chatbot_ticketNum">{studentTicket}</div>
                                        <div className="chatbot_ticketAdd" onClick={()=>{
                                            setStudentTicket(studentTicket+1);
                                        }}><i className="fas fa-plus"></i></div>
                                    </div>
                                </div>
                                <div className="chatbot_ticketOld">
                                    <div className="chatbot_ticketFor">愛心票:</div>
                                    <div className="chatbot_ticketCountArea">
                                        <div className="chatbot_ticketMinus" onClick={()=>{
                                            if(loveTicket>=1)setLoveTicket(loveTicket-1)
                                        }}><i className="fas fa-minus"></i></div>
                                        <div className="chatbot_ticketNum">{loveTicket}</div>
                                        <div className="chatbot_ticketAdd" onClick={()=>{
                                            setLoveTicket(loveTicket+1);
                                        }}><i className="fas fa-plus"></i></div>
                                    </div>
                                </div>
                                <div className="chatbot_ticketSend" style={{pointerEvents:loveTicket+studentTicket+adultTicket!==0?"all":"none",background:loveTicket+studentTicket+adultTicket!==0?"rgb(19, 87, 126)":"gray"}}  onClick={()=>{
                                    const temp_arr = [{sid: 998, image: "/zooTicket.jpg", name: "動物園門票:成人", price: 50, quantity:adultTicket },
                                    {sid: 999, image: "/zooTicket.jpg", name: "動物園門票:學生", price: 30, quantity:studentTicket},
                                    {sid: 1000, image: "/zooTicket.jpg", name: "動物園門票:愛心", price: 20, quantity:loveTicket }];
                                    let template = temp_arr.filter(v=>v.quantity!==0) 
                                    template.forEach(v=>{addItem(v)})
                                    if(localStorage.admin_account!==undefined){
                                        props.setModalTitle("商品已加入購物車");
                                        props.setModalText("商品已加入購物車<span>!!</span><br/>請問您是否要直接至結帳頁面?");
                                        props.setModalBtn('前往結帳');
                                        props.setShow(true);
                                    }else{
                                        props.setModalTitle("尚未登入通知");
                                        props.setModalText("親愛的顧客<br/>請您先登入才可至購物車頁面?");
                                        props.setModalBtn('前往登入');
                                        props.setShow(true);
                                    }
                                }}>確認送出</div>
                            </div>
                            <div className="chatbot_time">{v.time}</div>
                        </div>
                        )
                    }
                    if(v.type === 'stickers'){
                        return(
                            <div className="user_reply" key={i}>
                                <div className="sticker_message">
                                    <img src={v.text} alt=""/>
                                </div>
                                <div className="user_avatar">
                                    <i className="fas fa-user"></i>
                                </div>
                                <div className="user_time">{v.time}</div>
                            </div>
                        )
                    }
                    if(v.type==='getWeather'){
                        return (
                            <React.Fragment key={i}>
                            <div className="chatbot_reply">
                            <div className="chatbot_avatar">
                                <img src="/img/game/chatbot_avatar.png" alt="" />
                            </div>
                            <ul className="weather_carousel" style={moveCarousel(move)} >
                                {weatherData.map((v,i)=>{
                                    if(v.wx===1){  
                                    return(
                                    <li className="weather_card" key={i}>
                                        <div className="weather_date">{new Date(v.date).getMonth()+1}/{new Date(v.date).getDate()}</div>
                                        <div className="weather_icon"><img src='/img/game/sunny.svg' alt="" width="100" height="100" /></div>
                                        <div className="weather_row">
                                            <div className="weather_rain">降雨機率<br/>{v.rain}%</div>
                                            <div className="weather_temp">平均氣溫<br/>{v.temp}&#176;C</div>
                                        </div>
                                    </li>
                                )}else if(v.wx>=2 && v.wx<=6){
                                    return(
                                    <li className="weather_card" key={i}>
                                        <div className="weather_date">{new Date(v.date).getMonth()+1}/{new Date(v.date).getDate()}</div>
                                        <div className="weather_icon"><img src='/img/game/sunwithcloud.svg' alt="" width="100" height="100" /></div>
                                        <div className="weather_row">
                                            <div className="weather_rain">降雨機率<br/>{v.rain}%</div>
                                            <div className="weather_temp">平均氣溫<br/>{v.temp}&#176;C</div>
                                        </div>
                                    </li>
                                )}else if(v.wx===7){
                                    return(
                                    <li className="weather_card" key={i}>
                                        <div className="weather_date">{new Date(v.date).getMonth()+1}/{new Date(v.date).getDate()}</div>
                                        <div className="weather_icon"><img src='/img/game/cloudy.svg' alt="" width="100" height="100" /></div>
                                        <div className="weather_row">
                                            <div className="weather_rain">降雨機率<br/>{v.rain}%</div>
                                            <div className="weather_temp">平均氣溫<br/>{v.temp}&#176;C</div>
                                        </div>
                                    </li>
                                )}else{
                                    return(
                                    <li className="weather_card" key={i}>
                                        <div className="weather_date">{new Date(v.date).getMonth()+1}/{new Date(v.date).getDate()}</div>
                                        <div className="weather_icon"><img src='/img/game/rainy.svg' alt="" width="100" height="100" /></div>
                                        <div className="weather_row">
                                            <div className="weather_rain">降雨機率<br/>{v.rain}%</div>
                                            <div className="weather_temp">平均氣溫<br/>{v.temp}&#176;C</div>
                                        </div>
                                    </li>
                                )}
                            })}
                            </ul>
                            <div className="chatbot_time">{v.time}</div>
                            <div className="chatbot_toLeft" onClick={()=>{if(move>0)setMove(move-1)}} style={{opacity:move===0?0:1}}><i className="fas fa-chevron-left"></i></div>
                            <div className="chatbot_toRight" onClick={()=>{if(move<5)setMove(move+1)}} style={{opacity:move===5?0:1}}><i className="fas fa-chevron-right"></i></div>
                        </div> 
                    </React.Fragment>    
                        )
                    }
                    if(v.id % 2===1){
                        {/* console.log('我是機器人的代表') */}
                        return(
                        
                        <div className="chatbot_reply" key={i}>
                            <div className="chatbot_avatar">
                                <img src="/img/game/chatbot_avatar.png" alt="" />
                            </div>
                            <div className="chatbot_message">
                                {v.text}
                            </div>
                            <div className="chatbot_time">{v.time}</div>
                        </div> 
                        )
                    }else{
                        {/* console.log('我是使用者的代表') */}
                        return ( 
                            <div className="user_reply" key={i}>
                                            <div className="user_message">
                                                {v.text}
                                            </div>
                                            <div className="user_avatar">
                                                <i className="fas fa-user"></i>
                                            </div>
                                            <div className="user_time">{v.time}</div>
                            </div>
                        
                        )
                    }
                } 
            })}
        {/* <div className="chatbot_reply">
            <div className="chatbot_avatar">
                <img src="/img/game/chatbot_avatar.png" alt="" />
            </div>
            <div className="chatbot_message">
                yo~ 我是熊貓<br/>有任何基礎問題可以問我
            </div>
            <div className="chatbot_time"></div>
        </div>

        <div className="user_reply">
            <div className="user_message">
                請問我打這麼多自他會怎麼做換行阿，從input那得到的文字是部會換行的哦?
            </div>
            <div className="user_avatar">
                <img src="/img/game/chatbot_avatar.png" alt="" />
            </div>
            <div className="user_time">00:23</div>
        </div>
    {/*------------------------------------------------------------------------------*/}
        </div>
    {/* -------- 提示回復訊息的div也是浮起來的 -------- */}
        <div className="reply_hint" style={replyToggle(toggleReply)}>...</div>
    {/*------------- menu是浮起來的 -----------------*/}
        <div className="menu">
            <div className="book" onClick={()=>{
                document.querySelector('.menu').style.bottom = '-200px';
                setToggleMenu(false);
                const getTime = new Date();
                let hour = getTime.getHours();
                let minute = getTime.getMinutes()<10?'0'+getTime.getMinutes():getTime.getMinutes();
                let description = hour >= 12 ? '下午':'上午';
                let timeNow =  hour === 0 ? `${description}0${hour}:${minute}`:`${description}${hour}:${minute}`;
                let replyMessage = [...message];
                const uploadTmp1 = { id:888,
                                text: 'do something',
                                type:'buyTicket',
                                time:timeNow,
                            } ;
                replyMessage.push(uploadTmp1);
                setMessage(replyMessage);
            }}>
                <div className="icon">
                    <i className="fas fa-ticket-alt"></i>
                </div>    
                <div className="text">立即訂票</div>
            </div>
            {/* ------------ 我的優惠(分有無加入會員會有不同效果) ------------ */}
            {localStorage.admin_account===undefined &&
                <div className="coupon" onClick={()=>{
                    props.setModalTitle("尚未登入通知");
                    props.setModalText("親愛的顧客<br/>請您先登入才可至會員頁面?");
                    props.setModalBtn('前往登入');
                    props.setShow(true);
                }}
                >
                    <div className="icon">
                        <i className="fas fa-coins"></i>
                    </div>
                    <div className="text">我的優惠</div>
                </div>
            }
            {localStorage.admin_account!==undefined &&
                <div className="coupon" onClick={()=>{
                    props.setActived('折價優惠');
                    history.push('/members/modify-member-info');
                }}>
                    <div className="icon">
                        <i className="fas fa-coins"></i>
                    </div>
                    <div className="text">我的優惠</div>
                </div>
            }
            <div className="adopt">
            <Link to="/activity" className="adopt_link">
                <div className="icon">
                    <i className="fas fa-paw"></i>
                </div>
                <div className="text">明星動物</div> 
            </Link>
            </div>
            
            <div className="profile">
            <Link to="/tour" className="profile_link">
                <div className="icon">
                    <i className="fas fa-search"></i>
                </div>
                <div className="text">導覽簡介</div>
            </Link>
            </div>
            {/* -------------- 查看天氣 -------------- */}
            <div className="weather" onClick={
                ()=>{
                    document.querySelector('.menu').style.bottom = '-200px';
                    setToggleMenu(false);
                    fetch('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-063?Authorization=CWB-E5452D5B-0C6B-437B-A34A-8EEC59F154DB&locationName=%E5%A4%A7%E5%AE%89%E5%8D%80&elementName=PoP12h,T,Wx')
                    .then(r=>r.json())
                    .then(obj=>{
                        let Data = [];
                        for(let i=0;i<=12;i=i+2){
                            if(i>4){
                                Data.push({
                                    date:obj.records.locations[0].location[0].weatherElement[0].time[i].startTime,
                                    rain:'-',
                                    temp:obj.records.locations[0].location[0].weatherElement[1].time[i].elementValue[0].value,
                                    wx:obj.records.locations[0].location[0].weatherElement[2].time[i].elementValue[1].value,
                            });
                            }else{
                                Data.push({
                                        date:obj.records.locations[0].location[0].weatherElement[0].time[i].startTime,
                                        rain:obj.records.locations[0].location[0].weatherElement[0].time[i].elementValue[0].value,
                                        temp:obj.records.locations[0].location[0].weatherElement[1].time[i].elementValue[0].value,
                                        wx:obj.records.locations[0].location[0].weatherElement[2].time[i].elementValue[1].value,
                                });
                            }
                        }
                        const getTime = new Date();
                        let hour = getTime.getHours();
                        let minute = getTime.getMinutes()<10?'0'+getTime.getMinutes():getTime.getMinutes();
                        let description = hour >= 12 ? '下午':'上午';
                        let timeNow =  hour === 0 ? `${description}0${hour}:${minute}`:`${description}${hour}:${minute}`;
                        let replyMessage = [...message];
                        const uploadTmp1 = { id:888,
                                        text: 'do something',
                                        type:'getWeather',
                                        time:timeNow,
                                    } ;
                        replyMessage.push(uploadTmp1);
                        setWeatherData(Data);
                        setMessage(replyMessage);
                    })
            }}>  
                <div className="icon">
                    <i className="fas fa-cloud"></i>
                </div>
                <div className="text">查看天氣</div>
            </div>
            <div className="phone" onClick={()=>{
                // 當使用專人客服的功能時，會有自己的畫面，所以會先將與機器人的對話刪除
                setMessage([])
                connectWebSocket()
                myChatbotInput.current.readOnly = true;
            }}>
                <div className="icon">
                    <i className="fas fa-headphones-alt"></i>
                </div>
                <div className="text">專人客服</div>
            </div>
        </div> 
        {/* 貼圖的也是浮起來的 */}
        <div className="stickers_menu" style={{bottom:toggleSticker?"50px":"-200px"}}>
            <div onClick={(e)=>{
                makeStickers(e.currentTarget.children[0].src);
            }}><img src="/img/game/brownBear.png" alt=""/></div>
            <div onClick={(e)=>{
                makeStickers(e.currentTarget.children[0].src);
            }}><img src="/img/game/brownBear2.png" alt=""/></div>
            <div onClick={(e)=>{
                makeStickers(e.currentTarget.children[0].src);
            }}><img src="/img/game/koala.png" alt=""/></div>
            <div onClick={(e)=>{
                makeStickers(e.currentTarget.children[0].src);
            }}><img src="/img/game/polarBear.png" alt="" style={{transform:'translateY(20px)'}}/></div>
            <div onClick={(e)=>{
                makeStickers(e.currentTarget.children[0].src);
            }}><img src="/img/game/panda.png" alt=""/></div>
            <div onClick={(e)=>{
                makeStickers(e.currentTarget.children[0].src);
            }}><img src="/img/game/panda2.png" alt=""/></div>
            <div onClick={(e)=>{
                makeStickers(e.currentTarget.children[0].src);
            }}><img src="/img/game/panda3.png" alt=""/></div>
            <div onClick={(e)=>{
                makeStickers(e.currentTarget.children[0].src);
            }}><img src="/img/game/panda4.png" alt=""/></div>
            <div onClick={(e)=>{
                makeStickers(e.currentTarget.children[0].src);
            }}><img src="/img/game/bp_bear.png" alt=""/></div>
            <div onClick={(e)=>{
                makeStickers(e.currentTarget.children[0].src);
            }}><img src="/img/game/brownBear3.png" alt=""/></div>
            <div onClick={(e)=>{
                makeStickers(e.currentTarget.children[0].src);
            }}><img src="/img/game/brownBear4.png" alt=""/></div>
        </div>
        {/* 以下是專人客服的頭像(唯有socket.io連線時才會出現) */}
        <div className="agent_chooseArea" style={{display:io?"flex":"none"}}>
            <div className="agent_introduce">
                <div className="agent_profile">請選擇以下客服人員:</div>
                <div className="exit_agent" onClick={()=>{
                    myChatbotInput.current.readOnly = false;
                    setPrivateMessage([]);
                    if(io){
                        io.disconnect();
                        setIo(null);
                    }
                }}><i className="fas fa-undo"></i></div>
            </div>
            <div className="service_agent">
                <div className="agent_avatar" onClick={()=>{
                    document.querySelector('.menu').style.bottom = '-200px';
                    setToggleMenu(false);
                    myChatbotInput.current.focus();
                    // 前兩句讓richMenu自動關起來
                    if(pandaLimit){
                        props.setModalTitle("專人客服通知");
                        props.setModalText("由於我們是1對1服務,請您選取亮綠燈的同仁<br/>若目前皆為紅燈請見諒。");
                        props.setModalBtn('');
                        props.setShow(true);
                    }else{
                        myChatbotInput.current.readOnly = false;
                        document.querySelector('.agent_chooseArea').style.display = 'none';
                        let room = '北極熊的告解室';
                        setNowRoom(room);
                        // 這邊的room是將前端設定的房間名稱(純文字)，傳入後端做socket.join()
                        // 而message會由後端整理好文字再傳回前端，丟入狀態渲染對話
                        io.emit('join',room,message=>{
                            const getTime = new Date();
                            let hour = getTime.getHours();
                            let minute = getTime.getMinutes()<10?'0'+getTime.getMinutes():getTime.getMinutes();
                            let description = hour >= 12 ? '下午':'上午';
                            let timeNow =  hour === 0 ? `${description}0${hour}:${minute}`:`${description}${hour}:${minute}`; 
                            let newPrivate = [...privateMessage];
                            const uploadTmp = { id:0,
                                                text: message,
                                                type:'default_reply',
                                                time:timeNow,
                                            } ;
                            newPrivate.push(uploadTmp);
                            setPrivateMessage(newPrivate);
                        });
                    }
                }}><img src="/img/game/agent_avatar.png" alt=""/></div>
                <div className="agent_connected" style={{background:pandaLimit?"red":"rgb(70, 224, 50)"}}></div>
            </div>
            <div className="service_agent">
                <div className="agent_avatar"  onClick={()=>{
                    document.querySelector('.menu').style.bottom = '-200px';
                    setToggleMenu(false);
                    myChatbotInput.current.focus();
                    // 前兩句讓richMenu自動關起來
                    if(bearLimit){
                        props.setModalTitle("專人客服通知");
                        props.setModalText("由於我們是1對1服務,請您選取亮綠燈的同仁<br/>若目前皆為紅燈請見諒。");
                        props.setModalBtn('');
                        props.setShow(true);
                    }else{
                        myChatbotInput.current.readOnly = false;
                        document.querySelector('.agent_chooseArea').style.display = 'none';
                        let room = '大熊的告解室';
                        setNowRoom(room);
                        io.emit('join',room,message=>{
                            const getTime = new Date();
                            let hour = getTime.getHours();
                            let minute = getTime.getMinutes()<10?'0'+getTime.getMinutes():getTime.getMinutes();
                            let description = hour >= 12 ? '下午':'上午';
                            let timeNow =  hour === 0 ? `${description}0${hour}:${minute}`:`${description}${hour}:${minute}`; 
                            let newPrivate = [...privateMessage];
                            const uploadTmp = { id:0,
                                                text: message,
                                                type:'default_reply',
                                                time:timeNow,
                                            } ;
                            newPrivate.push(uploadTmp);
                            setPrivateMessage(newPrivate);
                        });
                    }
                }}><img src="/img/game/agent_avatar2.png" alt=""/></div>
                <div className="agent_connected" style={{background:bearLimit?"red":"rgb(70, 224, 50)"}}></div>
            </div>
            <div className="service_agent">
                <div className="agent_avatar"><img src="/img/game/agent_avatar3.png" alt=""/></div>
                <div className="agent_connected"></div>
            </div>
        </div>
        <div className="tool_bar">
            <div className="rich_menu" onClick={()=>{
                if(!toggleMenu){
                    if(toggleSticker){
                        setToggleSticker(false);
                        document.querySelector('.menu').style.bottom = '50px'
                        setToggleMenu(true)
                    }else{
                        document.querySelector('.menu').style.bottom = '50px'
                        setToggleMenu(true)
                    }
                }else{
                    document.querySelector('.menu').style.bottom = '-200px'
                    setToggleMenu(false)
                }
            }}>
                <i className="fas fa-bars"></i>
            </div>
            <form onSubmit={async (e)=>{
                // 一樣持有按button與按鍵盤Enter就submit的功能，只是我阻止預設送出刷新頁面
                e.preventDefault();
                const getTime = new Date();
                let hour = getTime.getHours();
                let minute = getTime.getMinutes()<10?'0'+getTime.getMinutes():getTime.getMinutes();
                let description = hour >= 12 ? '下午':'上午';
                let timeNow =  hour === 0 ? `${description}0${hour}:${minute}`:`${description}${hour}:${minute}`; 
                if(io){
                    if(myChatbotInput.current.value){
                        let newMessage = [...privateMessage];
                        const uploadTmp = { id:agentChat_id+1,
                                            text:myChatbotInput.current.value,
                                            type:'user_reply',
                                            time:timeNow,
                                        } ;
                        newMessage.push(uploadTmp);
                        setPrivateMessage(newMessage);
                        io.emit('room message', uploadTmp);
                        myChatbotInput.current.value = '';
                    }
                }else{
                    setToggleReply(true);
                    if(myChatbotInput.current.value){
                        // message = {
                        //                 id:1,
                        //                 text:'',
                        //                 type:'chatbot_reply',
                        //             };
                        // 下方是使用者的提問
                        let newMessage = [...message];
                        const uploadTmp = { id:chat_id+1,
                                            text:myChatbotInput.current.value,
                                            type:'user_reply',
                                            time:timeNow,
                                        } ;
                        newMessage.push(uploadTmp);
                        setMessage(newMessage);
                        // 下方是機器人回覆的部分
                        await fetch('http://localhost:4000/chatbot',{
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({request:myChatbotInput.current.value})
                        })
                        .then(r=>r.json())
                        .then(obj=>{
                            // console.log(obj.results.respond)
                            setTimeout(()=>{
                                setToggleReply(false);
                                let replyMessage = [...newMessage];
                                const uploadTmp1 = { id:chat_id+2,
                                                text:obj.results.respond,
                                                type:'chatbot_reply',
                                                time:timeNow,
                                            } ;
                                replyMessage.push(uploadTmp1);
                                setMessage(replyMessage);
                            },1000)
                            })
                        myChatbotInput.current.value = '';
                    }
                }
            }}>
                <input name="request" id="request" className="robot_input" type="text" placeholder="想問我什麼就寫在這吧..." ref={myChatbotInput} />
                <button className="send" onClick={(e)=>{
                    if(myChatbotInput.current.value===""){
                        e.preventDefault()
                    }
                }}><i className="fas fa-paper-plane"></i></button>
            </form>
            <div className="sticker" onClick={()=>{
                setToggleSticker(!toggleSticker);
                document.querySelector('.menu').style.bottom = '-200px';
                setToggleMenu(false);
            }}>
                <img src="/img/game/sticker.png" alt=""/>
            </div>
        </div> 
    </div>
    </>
    )
}
export default Chatbot
// --------------- 最初寫死的方法 --------------
// if((myChatbotInput.current.value).indexOf('你好')!==-1){
//     setTimeout(()=>{
//         setToggleReply(false);
//         let replyMessage = [...newMessage];
//         const uploadTmp1 = { id:chat_id+2,
//                         text:'你好啊，笨蛋(我可以跳著說嗎)',
//                         type:'chatbot_reply',
//                         time:timeNow,
//                     } ;
//         replyMessage.push(uploadTmp1);
//         setMessage(replyMessage);
//     },1000)
// }else{
//     setTimeout(()=>{
//         setToggleReply(false);
//         let replyMessage = [...newMessage];
//         const uploadTmp1 = { id:chat_id+2,
//                         text:'我無法理解啊，笨蛋',
//                         type:'chatbot_reply',
//                         time:timeNow,
//                     } ;
//         replyMessage.push(uploadTmp1);
//         setMessage(replyMessage);
//     },1000)
// }