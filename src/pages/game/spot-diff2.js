import React from "react";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import './spot-diff2.css';

function SpotDiff2(){
    const [countSuccess,setCountSuccess] = useState(0);
    const [countWrong,setCountWrong] = useState(0);
    const [countDown,setCountDown] = useState(30);
    const [hintCountDown,setHintCountDown] = useState(3);
    const [winClean,setWinClean] = useState(0);
    const [spot1,setSpot1] = useState(false);
    const [spot2,setSpot2] = useState(false);
    const [spot3,setSpot3] = useState(false);
    const [spot4,setSpot4] = useState(false);
    const [spot5,setSpot5] = useState(false);
    const [fail,setFail] = useState(false)
    const [win,setWin] = useState(false)
    const [spotWrong,setSpotWrong] = useState([false,'0px','0px']);
    const [spot1Wrong,setSpot1Wrong] = useState([false,'0px','0px']);
    const [spot2Wrong,setSpot2Wrong] = useState([false,'0px','0px']);
    let [clicked , left , top ] = spotWrong;
    let [clicked1 , left1 , top1 ] = spot1Wrong;
    let [clicked2 , left2 , top2 ] = spot2Wrong;
    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({
                top: 280,
                behavior: 'smooth'
            });
        }, 0);
        document.querySelector('.cube').style.transform = `rotateX(-90deg) `; 
        document.querySelector('.up').style.animation = `chopacity .4s linear forwards`;
        let countDownFrom = 30;
        // 產生 Timer
        const countDownTimer = setInterval(() => {            
            // 計算剩餘秒數
            let remain = countDownFrom--;
            setCountDown(remain < 0 ? 0 : remain)
            // 檢查是否結束
            if (remain <= 0) {
                clearInterval(countDownTimer);
                setFail(true);
                return;
            }
        }, 1000);
        setWinClean(countDownTimer);
    }, []) 
    function getHint(){
        let temp_arr = [];
        if(spot1===false){
            temp_arr.push(1);
        }
        if(spot2===false){
            temp_arr.push(2);
        }
        if(spot3===false){
            temp_arr.push(3);
        }
        if(spot4===false){
            temp_arr.push(4);
        }
        if(spot5===false){
            temp_arr.push(5);
        }
        let whichOne = temp_arr[Math.floor((temp_arr.length)*Math.random())]
        switch (whichOne){
            case 1:
                setSpot1(true);
                setCountSuccess(countSuccess+1);
                if(countSuccess+1===5){
                    setTimeout(()=>{
                        clearInterval(winClean);
                        setWin(true);
                        return;
                    },500)
                }
            break;
            case 2:
                setSpot2(true);
                setCountSuccess(countSuccess+1);
                if(countSuccess+1===5){
                    setTimeout(()=>{
                        clearInterval(winClean);
                        setWin(true);
                        return;
                    },500)
                }
            break;
            case 3:
                setSpot3(true);
                setCountSuccess(countSuccess+1);
                if(countSuccess+1===5){
                    setTimeout(()=>{
                        clearInterval(winClean);
                        setWin(true);
                        return;
                    },500)
                }
            break;
            case 4:
                setSpot4(true);
                setCountSuccess(countSuccess+1);
                if(countSuccess+1===5){
                    setTimeout(()=>{
                        clearInterval(winClean);
                        setWin(true);
                        return;
                    },500)
                }
            break;
            case 5:
                setSpot5(true);
                setCountSuccess(countSuccess+1);
                if(countSuccess+1===5){
                    setTimeout(()=>{
                        clearInterval(winClean);
                        setWin(true);
                        return;
                    },500)
                }
            break;
            default:
                console.log('代表沒得提示啦');
        }
    }
    return(
    <>
        <div className="spot_container">
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
            <p className="game_profile">遊戲中你將要找出<span>5</span>個不同之處，利用滑鼠點擊圖片若正確會看到綠色圈圈。<br/>記住.....你只有<span>3</span>次錯誤的機會。<br/>抓緊時間吧，完成考驗將可以得到<span>紅利點數1000 !!!</span></p>
            <div className="container_game">
            <div className="camera">
                <div className="cube">
                    <div className="front">大家來找碴</div>
                    <div className="up">
                        <div className="min">00  :  <span className="sec">{countDown<10 ? '0'+countDown : countDown}</span></div>
                    </div>
                </div>
            </div> 
                <div className="upper">
                    <div className="life">
                        <i className="fas fa-heart" style={{opacity: countWrong>=1? '0':'1'}}></i>
                        <i className="fas fa-heart" style={{opacity: countWrong>=2? '0':'1'}}></i>
                        <i className="fas fa-heart" style={{opacity: countWrong>=3? '0':'1'}}></i>
                    </div>
                </div>
                {/* 下方開始是找碴圖片區域 */}
                <div className="game_zone">
                {/* -------------- 左邊的圖片 -------------- */}
                    <div className="wrap_pic">
                        <div className="diff2_spot1" style={{pointerEvents:spot1?'none':'all'}} onClick={
                            ()=>{  
                                setSpot1(true)
                                setCountSuccess(countSuccess+1);
                                if(countSuccess+1===5){
                                    setTimeout(()=>{
                                        clearInterval(winClean);
                                        setWin(true);
                                        return;
                                    },500)
                                }               
                            }}
                        >
                            <i className="far fa-circle" style={{display:spot1?'block':'none'}}></i>
                        </div>
                        <div className="diff2_spot2" style={{pointerEvents:spot2?'none':'all'}} onClick={
                            ()=>{  
                                setSpot2(true)
                                setCountSuccess(countSuccess+1);
                                if(countSuccess+1===5){
                                    setTimeout(()=>{
                                        clearInterval(winClean);
                                        setWin(true);
                                        return;
                                    },500)
                                }    
                            }}
                        >
                            <i className="far fa-circle" style={{display:spot2?'block':'none'}}></i>
                        </div>
                        <div className="diff2_spot3" style={{pointerEvents:spot3?'none':'all'}} onClick={
                            ()=>{  
                                setSpot3(true)
                                setCountSuccess(countSuccess+1);
                                if(countSuccess+1===5){
                                    setTimeout(()=>{
                                        clearInterval(winClean);
                                        setWin(true);
                                        return;
                                    },500)
                                }    
                            }}
                        >
                            <i className="far fa-circle" style={{display:spot3?'block':'none'}}></i>
                        </div>
                        <div className="diff2_spot4" style={{pointerEvents:spot4?'none':'all'}} onClick={
                            ()=>{  
                                setSpot4(true)
                                setCountSuccess(countSuccess+1);
                                if(countSuccess+1===5){
                                    setTimeout(()=>{
                                        clearInterval(winClean);
                                        setWin(true);
                                        return;
                                    },500)
                                }    
                            }}
                        >
                            <i className="far fa-circle" style={{display:spot4?'block':'none'}}></i>
                        </div>
                        <div className="diff2_spot5" style={{pointerEvents:spot5?'none':'all'}} onClick={
                            ()=>{  
                                setSpot5(true)
                                setCountSuccess(countSuccess+1);
                                if(countSuccess+1===5){
                                    setTimeout(()=>{
                                        clearInterval(winClean);
                                        setWin(true);
                                        return;
                                    },500)
                                }    
                            }}
                        >
                            <i className="far fa-circle" style={{display:spot5?'block':'none'}}></i>
                        </div>
                        <div className="wrong_spot" style={{display:clicked ?'block':'none',left:left,top:top}}><i className="fas fa-times"></i></div>
                        <div className="wrong_spot" style={{display:clicked1 ?'block':'none',left:left1,top:top1}}><i className="fas fa-times"></i></div>
                        <div className="wrong_spot" style={{display:clicked2 ?'block':'none',left:left2,top:top2}}><i className="fas fa-times"></i></div>
                        <img src="/img/game/penguin.jpg" alt=""  onClick={
                        (event)=>{
                            setCountWrong(countWrong+1)
                            switch (countWrong+1){
                                case 1:
                                // 抓到在圖片中的相對pixel，因為event.offset無法使用去抓到游標的相對位置
                                // countWrong預設是0，答錯1次就加 1
                                const left = `${event.clientX  - event.target.getBoundingClientRect().x - 17.5}px`;
                                const top = `${event.clientY  - event.target.getBoundingClientRect().y - 17.5}px`;
                                setSpotWrong([true,left,top]);
                                break;
                                case 2:
                                // 抓到在圖片中的相對pixel，因為event.offset無法使用去抓到游標的相對位置
                                // countWrong預設是0，答錯1次就加 1
                                const left1 = `${event.clientX  - event.target.getBoundingClientRect().x - 17.5}px`;
                                const top1 = `${event.clientY  - event.target.getBoundingClientRect().y - 17.5}px`;
                                setSpot1Wrong([true,left1,top1]);
                                break;
                                case 3:
                                const left2 = `${event.clientX  - event.target.getBoundingClientRect().x - 17.5}px`;
                                const top2 = `${event.clientY  - event.target.getBoundingClientRect().y - 17.5}px`;
                                setSpot2Wrong([true,left2,top2]);
                                setTimeout(()=>{
                                    clearInterval(winClean);
                                    setFail(true)
                                    return;
                                },100)
                                break;
                                default:
                                console.log('沒出錯不應該進到這裡來');
                            }
                            
                            // if(countWrong<3){
                            //     let left = `${event.clientX  - event.target.getBoundingClientRect().x - 17.5}px`;
                            //     let top = `${event.clientY  - event.target.getBoundingClientRect().y - 17.5}px`;
                            //     // 抓到在圖片中的相對pixel，因為event.offset無法使用去抓到游標的相對位置
                            //     // countWrong預設是0，答錯1次就加 1
                            //     setCountWrong(countWrong+1)
                            //     setSpotWrong([true,left,top]);
                            // }
                        }}/>
                    </div>
                {/* -------------- 右邊的圖片 -------------- */}
                    <div className="wrap1_pic">
                        <div className="diff2_spot1" style={{pointerEvents:spot1?'none':'all'}} onClick={
                            ()=>{  
                                setSpot1(true)
                                setCountSuccess(countSuccess+1);
                                if(countSuccess+1===5){
                                    setTimeout(()=>{
                                        clearInterval(winClean);
                                        setWin(true);
                                        return;
                                    },500)
                                }    
                            }}
                        >
                            <i className="far fa-circle" style={{display:spot1?'block':'none'}}></i>
                        </div>

                        <div className="diff2_spot2" style={{pointerEvents:spot2?'none':'all'}} onClick={
                            ()=>{  
                                setSpot2(true)
                                setCountSuccess(countSuccess+1);
                                if(countSuccess+1===5){
                                    setTimeout(()=>{
                                        clearInterval(winClean);
                                        setWin(true);
                                        return;
                                    },500)
                                }    
                            }}
                        >
                            <i className="far fa-circle" style={{display:spot2?'block':'none'}}></i>
                        </div>
                        <div className="diff2_spot3" style={{pointerEvents:spot3?'none':'all'}} onClick={
                            ()=>{  
                                setSpot3(true)
                                setCountSuccess(countSuccess+1);
                                if(countSuccess+1===5){
                                    setTimeout(()=>{
                                        clearInterval(winClean);
                                        setWin(true);
                                        return;
                                    },500)
                                }    
                            }}
                        >
                            <i className="far fa-circle" style={{display:spot3?'block':'none'}}></i>
                        </div>
                        <div className="diff2_spot4" style={{pointerEvents:spot4?'none':'all'}} onClick={
                            ()=>{  
                                setSpot4(true)
                                setCountSuccess(countSuccess+1);
                                if(countSuccess+1===5){
                                    setTimeout(()=>{
                                        clearInterval(winClean);
                                        setWin(true);
                                        return;
                                    },500)
                                }    
                            }}
                        >
                            <i className="far fa-circle" style={{display:spot4?'block':'none'}}></i>
                        </div>
                        <div className="diff2_spot5" style={{pointerEvents:spot5?'none':'all'}} onClick={
                            ()=>{  
                                setSpot5(true)
                                setCountSuccess(countSuccess+1);
                                if(countSuccess+1===5){
                                    setTimeout(()=>{
                                        clearInterval(winClean);
                                        setWin(true);
                                        return;
                                    },500)
                                }    
                            }}
                        >
                            <i className="far fa-circle" style={{display:spot5?'block':'none'}}></i>
                        </div>
                        <div className="wrong_spot" style={{display:clicked ?'block':'none',left:left,top:top}}><i className="fas fa-times"></i></div>
                        <div className="wrong_spot" style={{display:clicked1 ?'block':'none',left:left1,top:top1}}><i className="fas fa-times"></i></div>
                        <div className="wrong_spot" style={{display:clicked2 ?'block':'none',left:left2,top:top2}}><i className="fas fa-times"></i></div>
                        <img src="/img/game/penguin-final.jpg" alt=""  onClick={
                        (event)=>{
                            setCountWrong(countWrong+1)
                            switch (countWrong+1){
                                case 1:
                                // 抓到在圖片中的相對pixel，因為event.offset無法使用去抓到游標的相對位置
                                // countWrong預設是0，答錯1次就加 1
                                const left = `${event.clientX  - event.target.getBoundingClientRect().x - 17.5}px`;
                                const top = `${event.clientY  - event.target.getBoundingClientRect().y - 17.5}px`;
                                setSpotWrong([true,left,top]);
                                break;
                                case 2:
                                // 抓到在圖片中的相對pixel，因為event.offset無法使用去抓到游標的相對位置
                                // countWrong預設是0，答錯1次就加 1
                                const left1 = `${event.clientX  - event.target.getBoundingClientRect().x - 17.5}px`;
                                const top1 = `${event.clientY  - event.target.getBoundingClientRect().y - 17.5}px`;
                                setSpot1Wrong([true,left1,top1]);
                                break;
                                case 3:
                                const left2 = `${event.clientX  - event.target.getBoundingClientRect().x - 17.5}px`;
                                const top2 = `${event.clientY  - event.target.getBoundingClientRect().y - 17.5}px`;
                                setSpot2Wrong([true,left2,top2]);
                                setTimeout(()=>{
                                    clearInterval(winClean);
                                    setFail(true)
                                    return;
                                },100)
                                break;
                                default:
                                console.log('沒出錯不應該進到這裡來');
                            }
                        }}/>
                    </div>
                    {/* ---------------- 以下做遊戲失敗畫面，失敗才會浮出 ---------------- */}
                    <div className="fail_game" style={{display:fail?'flex':'none'}}>
                        <div className="fail_left">
                            <img src="/img/game/lose.png" alt="" />
                        </div>
                        <div className="fail_right">
                            <div className="fail_text">遊戲失敗</div>
                            <div className="fail_btnGroup">
                                <Link
                                    className="fail_btn" 
                                    to= '/game'
                                >
                                    <p>回遊戲主頁</p>
                                    <img src="/img/game/game_button.png" alt="" />
                                </Link>
                                <Link
                                    className="fail_btn" 
                                    onClick={()=>{
                                        window.location.reload()
                                    }}
                                >
                                    <p>再玩一次</p>
                                    <img src="/img/game/game_button.png" alt="" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* ---------------- 以下做遊戲成功畫面，完成後才會浮出 ---------------- */}
                    <div className="win_game" style={{display:win?'flex':'none'}}>
                        <div className="win_left">
                            <div className="thou_point">1000</div>
                            <div className="text_point">WILDJUNGLE</div>
                            <img src="/img/game/game-points.png" alt="" />
                        </div>
                        <div className="win_right">
                            <div className="win_text">恭喜你完成啦!</div>
                            <div className="win_btnGroup">
                                <Link
                                    className="win_btn" 
                                    to= '/game'
                                >
                                    <p>回遊戲主頁</p>
                                    <img src="/img/game/game_button.png" alt="" />
                                </Link>
                                <Link
                                    className="win_btn"
                                    to= '/products' 
                                >
                                    <p>點數馬上用</p>
                                    <img src="/img/game/game_button.png" alt="" />
                                </Link>
                            </div>
                            <div className="win_ps">點數適用於全站...</div>
                        </div>
                    </div>
                    {/* ---------------- 找碴圖片區域到此結束 ---------------- */}
                </div>
                    {/* ----------------- 以下是工具欄的部分 ----------------- */}
                <div className="spot_tool">
                    <div className="left_tool">
                        <div className="help">
                            <i className="fas fa-question"></i>
                        </div>
                        <Link to="/game/spot-level" className="list">
                            <i className="fas fa-list-ul"></i>
                        </Link>
                    </div>
                    <div className="count">{countSuccess}<span>/5</span></div>
                    <div className="right_tool">
                        <div className="hint" onClick={()=>{
                            if(hintCountDown>0){
                                getHint();
                                setHintCountDown(hintCountDown-1)
                            }
                        }}>
                            <i className="fas fa-search"></i>
                        </div>
                        <div className="hint_count">x{hintCountDown}</div>
                    </div>
                </div>
            </div>
            <div className="animals-footer"> 
                <img src="/animals-footer.png" alt="" />
            </div> 
        </div>       
    </>
    )
};
export default SpotDiff2;