import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {useState} from 'react';
import './game.css';
function Game(){
    const [hover,setHover] = useState(-1);
    // const [spotLeft,setSpotLeft] = useState(0);
    useEffect(()=>{
         window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    },[])
   
    useEffect(()=>{
        // const spot = document.querySelector('.choose_spotGame').getBoundingClientRect().left;
        // setSpotLeft(spot);
        if(hover===1){
            document.querySelector('.game_title').innerHTML = '眼力大考驗'; 
            document.querySelector('.game_profile').innerHTML = `遊戲中你將要找出<span>5</span>個不同之處，利用滑鼠點擊圖片若正確會看到綠色圈圈。<br/>記住.....你只有<span>3</span>次錯誤的機會。<br/>抓緊時間吧，完成考驗將可以得到<span>紅利點數500 !!!</span>`;
        }else if(hover===2){
            document.querySelector('.game_title').innerHTML = '神準動物心理測驗'; 
            document.querySelector('.game_profile').innerHTML = `你總共會遇到<span>3</span>個題目，請依照自己心中的第一個想法來選擇<br />點擊你所選的答案後<br />就可以知道自己心靈所對應的動物囉!`;
        }else if(hover===3){
            document.querySelector('.game_title').innerHTML = '動物冷知識';
            document.querySelector('.game_profile').innerHTML = `在這<span>10</span>題中努力回答吧，可能有些答案會超出你的想像<br /><span>答對5</span>題以上會得到紅利點數<span>35</span><br /><span>全部答對能拿到50點紅利哦</span>`;
        }else if (hover===4){
            document.querySelector('.game_title').innerHTML = '填字遊戲（維護中）';
            document.querySelector('.game_profile').innerHTML = `<span>維護中哦!!!!!!!</span><br />維護中 維護中 維護中 維護中<br />維護中啦!!!!!!`
        }
    },[hover])
    // const hoverHandler = id => {
    //     console.log(spotLeft);
    //     let obj = {
    //         opacity:'1',
    //         pointerEvents:'all',
    //         marginRight:'-2rem',
    //         top: '0px',
    //         left: spotLeft+'px',
    //         transform: 'translateX(-25%)',
    //         zIndex:'99',
    //     };
    //     let obj1 = {
    //         opacity:'1',
    //         pointerEvents:'all',
    //         marginRight:'-2rem',
    //         top:'0px',
    //         left:'510px',
    //         zIndex:'99',
    //     };
    //     let origin_obj = {
    //         opacity:'0',
    //         pointerEvents:'none',
    //         marginRight:'2.5rem',
    //         left:'175px'
    //     }
    //     switch (id) {
    //         case 1:
    //             return obj;
    //             break;
    //         case 2:
    //             return obj1;
    //             break;
    //         default:
    //             return origin_obj;
    //     }
    // }
    const hoverHandlerSpot = id => {
        
        let obj = {
            transform:'scale(1.66)',
            marginRight:'6.5rem',
            zIndex:'998',
        };
        let origin_obj = {
            transform:'scale(1)',
            marginRight:'2.5rem',
            zIndex:'0',
        }
        switch (id) {
            case 1:
                return obj;
            default:
                return origin_obj;
        }
    }
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
            <div className="game_title">眼力大考驗</div>
            <p className="game_profile">遊戲中你將要找出<span>5</span>個不同之處，利用滑鼠點擊圖片若正確會看到綠色圈圈。<br/>記住.....你只有<span>3</span>次錯誤的機會。<br/>抓緊時間吧，完成考驗將可以得到<span>紅利點數500 !!!</span></p>


            <div className="gameChoose_zone">
                <div className="choose_spotGame" 
                    onMouseEnter={(e)=>{
                        let offset = 1/1.66;
                        setHover(1)
                        document.querySelectorAll('.mask')[0].style.display = 'flex'
                        document.querySelectorAll('.mask')[0].style.left = '50%'
                        document.querySelectorAll('.mask')[0].style.top = '50%'
                        document.querySelectorAll('.mask')[0].style.transform = `translate(-50%,-50%) scale(${offset})`
                    }}
                    onMouseLeave={(e)=>{ 
                        setHover(-1)
                        document.querySelectorAll('.mask')[0].style.display = 'none'
                    }}
                    style={hoverHandlerSpot(hover)}
                >
                    <img src="/img/game/spot_game.png" alt="" />
                    <div className="mask">
                        <div className="mask_title">眼力大挑戰</div>
                        <div className="mask_text">遊戲中你將要找出<span>5</span>個不同之處<br/>利用滑鼠點擊圖片若正確...</div>
                        <Link
                            className="mask_btn" 
                            to={{
                                pathname:"/game/start",
                                state:["眼力大挑戰",`遊戲中你將要找出<span>5</span>個不同之處，利用滑鼠點擊圖片若正確會看到綠色圈圈。<br/>記住.....你只有<span>3</span>次錯誤的機會。<br/>抓緊時間吧，完成考驗將可以得到<span>紅利點數500 !!!</span>`,"/game/spot-level"],
                            }}
                        >
                            進入遊戲
                        </Link>
                    </div>
                </div>

                <div className="choose_psychoGame"
                    onMouseEnter={()=>{
                        let offset = 1/1.66;
                        setHover(2);
                        document.querySelectorAll('.mask')[1].style.display = 'flex';
                        document.querySelectorAll('.mask')[1].style.left = '50%';
                        document.querySelectorAll('.mask')[1].style.top = '50%';
                        document.querySelectorAll('.mask')[1].style.transform = `translate(-50%,-50%) scale(${offset})`
                    }}
                    onMouseLeave={()=>{ 
                        setHover(-1)
                        document.querySelectorAll('.mask')[1].style.display = 'none'
                    }}
                >
                    <img src="/img/game/psycho_game.png" alt="" />
                    <div className="mask">
                        <div className="mask_title">神準動物心理測驗</div>
                        <div className="mask_text">你總共會遇到<span>3</span>個題目<br/>請依照自己心中的第一...</div>
                        <Link
                            className="mask_btn" 
                            to={{
                                pathname:"/game/start",
                                state:["神準動物心理測驗",`你總共會遇到<span>3</span>個題目，請依照自己心中的第一個想法來選擇<br />點擊你所選的答案後<br />就可以知道自己心靈所對應的動物囉!`,"/game/psycho-game"]
                            }}
                        >
                            進入遊戲
                        </Link>
                    </div>
                </div>
                <div className="choose_crossGame" 
                    onMouseEnter={()=>{
                        setHover(3);
                        let offset = 1/1.66;
                        document.querySelectorAll('.mask')[2].style.display = 'flex';
                        document.querySelectorAll('.mask')[2].style.left = '50%';
                        document.querySelectorAll('.mask')[2].style.top = '50%';
                        document.querySelectorAll('.mask')[2].style.transform = `translate(-50%,-50%) scale(${offset})`;
                    }}
                    onMouseLeave={()=>{ 
                        setHover(-1)
                        document.querySelectorAll('.mask')[2].style.display = 'none'
                    }}>
                    <img src="/img/game/cross_game.png" alt="" />
                    <div className="mask">
                        <div className="mask_title">動物冷知識</div>
                        <div className="mask_text">在這<span>10</span>題中努力回答吧<br/>可能有些答案會超出你的想像...</div>
                        <Link
                            className="mask_btn" 
                            to={{
                                pathname:"/game/start",
                                state:["動物冷知識",`在這<span>10</span>題中努力回答吧，可能有些答案會超出你的想像<br /><span>答對5</span>題以上會得到紅利點數<span>35</span><br /><span>全部答對能拿到50點紅利哦</span>`,"/game/multi-choice"]
                            }}
                        >
                            進入遊戲
                        </Link>
                    </div>
                </div>
                <div className="choose_iceGame" 
                    onMouseEnter={()=>{
                        setHover(4);
                        let offset = 1/1.66;
                        document.querySelectorAll('.mask')[3].style.display = 'flex';
                        document.querySelectorAll('.mask')[3].style.left = '50%';
                        document.querySelectorAll('.mask')[3].style.top = '50%';
                        document.querySelectorAll('.mask')[3].style.transform = `translate(-50%,-50%) scale(${offset})`;
                    }}
                    onMouseLeave={()=>{ 
                        setHover(-1)
                        document.querySelectorAll('.mask')[3].style.display = 'none'
                    }}>
                    <img src="/img/game/ice_game.png" alt="" />
                    <div className="mask">
                        <div className="mask_title">敬請期待......</div>
                        <div className="mask_text">先玩前面<span>3</span>個遊戲<br/>我個人是覺得你可能要等一輩子啊...</div>
                        <Link
                            className="mask_btn" 
                            to={{
                                pathname:"/game/start",
                                state:["動物冷知識",`在這<span>10</span>題中努力回答吧，可能有些答案會超出你的想像<br /><span>答對5</span>題以上會得到紅利點數<span>300</span><br /><span>全部答對能拿到翻倍紅利哦</span>`]
                            }}
                        >
                            進入遊戲
                        </Link>
                    </div>
                </div>
            </div>










            <div className="animals-footer"> 
                <img src="/animals-footer.png" alt="" />
            </div>         
        </div>

    </>
    )
}
export default Game

// style={{width:'100px',transition:'0.5s'}}

// style={{width:'500px',transition:'0.5s'}}