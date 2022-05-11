import React, { useEffect } from "react";
import './gameStart.css';
import { Link } from "react-router-dom";
function GameStart(props){
    // console.log(props.location.state);
    const [title,text,url] = props.location.state;
    useEffect(()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        document.querySelector('.game_profile').innerHTML = text
    },[])
    return(
    <>
        <div className="game_container">
        <div className="leaf_left">
                <img src="/img/game/leaf-left.png" alt=""/>
            </div>
            <div className="leaf_right">
                <img src="/img/game/leaf-right.png" alt=""/>   
            </div>
            <div className="cloud_left">
                <img src="/img/game/cloud-left.png" alt=""/> 
            </div>
            <div className="cloud_left1">
                <img src="/img/game/cloud-left1.png" alt=""/> 
            </div>
            <div className="cloud_right">
                <img src="/img/game/cloud-right.png" alt=""/> 
            </div>
            <div className="cloud_right1">
                <img src="/img/game/cloud-right1.png" alt=""/> 
            </div>
            <div className="game_title">{title}</div>
            <p className="game_profile">遊戲中你將要找出<span>5</span>個不同之處，利用滑鼠點擊圖片若正確會看到綠色圈圈。<br/>記住.....你只有<span>3</span>次錯誤的機會。<br/>抓緊時間吧，完成考驗將可以得到<span>紅利點數500 !!!</span></p>
            <Link
                className="start_btn" 
                to= {url}
            >
                <p>遊戲開始</p>
                <img src="/img/game/game_button.png" alt="" />
            </Link>
            <div className="animals-footer"> 
                <img src="/animals-footer.png" alt="" />
            </div>         
        </div>

    </>
    )
}
export default GameStart