import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import './psycho-game.css';

function PsychoGame(){
    useEffect(()=>{
        setTimeout(() => {
            window.scrollTo({
                top: 280,
                behavior: 'smooth'
            });
        }, 0);
    },[])
    return(
    <>
        <div className="psycho_container">
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
            <div className="game_title">神準動物心理測驗</div>
            <p className="game_profile">遊戲中你將要找出<span>5</span>個不同之處，利用滑鼠點擊圖片若正確會看到綠色圈圈。<br/>記住.....你只有<span>3</span>次錯誤的機會。<br/>抓緊時間吧，完成考驗將可以得到<span>紅利點數1000 !!!</span></p>
            <div className="container_psycho_game">               
                <div className="psycho_bg">
                {/* 以下是全域做移動的圖檔(魚群) */}
                <img src="/img/game/psycho_material10.png" alt="" className="psycho_clownFish" />
                <img src="/img/game/psycho_material11.png" alt="" className="psycho_atalanFish" />
                    {/* -------第一題從這開始------- */}
                    <div className="psycho_q1">
                        <h2>第一次認識的人，你會...?</h2>
                        <div className="psycho_btnGroup">
                            <button className="psycho_row1_right" onClick={()=>{
                                document.querySelector('.psycho_bg').style.animation = `psycho_row1_right 1.5s linear 1s forwards`;
                            }}>
                                <img className="psycho_leftBtn_cloud" src="/img/game/psycho_leftBtn.png" alt=""/>
                                <p>你先開話題</p>
                            </button>
                            <button className="psycho_row1_left" onClick={()=>{
                                document.querySelector('.psycho_bg').style.animation = `psycho_row1_left 1.5s linear 1s forwards`;
                            }}>
                                <img className="psycho_rightBtn_cloud" src="/img/game/psycho_rightBtn.png" alt=""/>
                                <p>對方先說話</p>
                            </button>
                        </div>
                        <img className="q1_img" src="/img/game/psycho_material.png" alt="" />
                        <img className="q1_img2" src="/img/game/psycho_material2.png" alt="" />
                    </div>
                    {/* 第二題的開始 左邊*/}
                    <div className="psycho_q2">
                        <h2>約好早上10點見面，你會幾點到?</h2>
                        <div className="psycho_btnGroup">
                            <button className="psycho_row21_right" onClick={()=>{
                                document.querySelector('.psycho_bg').style.transform = `translateX(-20.001%) translateY(-800px)`;
                                document.querySelector('.psycho_bg').style.animation = `psycho_row21_right 1s linear 1s forwards`;
                            }}>
                                <img className="psycho_leftBtn_cloud" src="/img/game/psycho_leftBtn.png" alt=""/>
                                <p>10點前就會到</p>
                            </button>
                            <button className="psycho_row21_left" onClick={()=>{
                                document.querySelector('.psycho_bg').style.transform = `translateX(-20.001%) translateY(-800px)`;
                                document.querySelector('.psycho_bg').style.animation = `psycho_row21_left 1s linear 1s forwards`;
                            }}>
                                <img className="psycho_rightBtn_cloud" src="/img/game/psycho_rightBtn.png" alt=""/>
                                <p>總會遲到個20<br />分鐘左右</p>
                            </button>
                        </div>
                        <img className="q2_img" src="/img/game/psycho_material3.png" alt="" />
                        <img className="q2_img2" src="/img/game/psycho_material4.png" alt="" />
                    </div>
                    {/* 第二題的開始 右邊*/}
                    <div className="psycho_q3">
                        <h2>離好友婚禮剩兩個禮拜，你會怎麼準備?</h2>
                        <div className="psycho_btnGroup">
                            <button className="psycho_row22_right" onClick={()=>{
                                document.querySelector('.psycho_bg').style.transform = `translateX(-73.337%) translateY(-800px)`;
                                document.querySelector('.psycho_bg').style.animation = `psycho_row22_right 1s linear 1s forwards`;
                            }}>
                                <img className="psycho_leftBtn_cloud" src="/img/game/psycho_leftBtn.png" alt=""/>
                                <p>當天要盛裝出席</p>
                            </button>
                            <button className="psycho_row22_left" onClick={()=>{
                                document.querySelector('.psycho_bg').style.transform = `translateX(-73.337%) translateY(-800px)`;
                                document.querySelector('.psycho_bg').style.animation = `psycho_row22_left 1s linear 1s forwards`;
                            }}>
                                <img className="psycho_rightBtn_cloud" src="/img/game/psycho_rightBtn.png" alt=""/>
                                <p>幹麻想那麼多</p>
                            </button>
                        </div>
                        <img className="q2_img" src="/img/game/psycho_material3.png" alt="" />
                        <img className="q2_img2" src="/img/game/psycho_material4.png" alt="" />
                    </div>
                    {/* 第三題的開始 左左邊*/}
                    <div className="psycho_q4">
                        <h2>無止盡的愛和多到數不清的錢，你選擇?</h2>
                        <div className="psycho_btnGroup">
                            <button className="psycho_row31_right" onClick={()=>{
                                document.querySelector('.psycho_bg').style.transform = `translateX(-6.667%) translateY(-1600px)`;
                                document.querySelector('.psycho_bg').style.animation = `psycho_row31_right 1s linear 1s forwards`;
                            }}>
                                <img className="psycho_leftBtn_cloud" src="/img/game/psycho_leftBtn.png" alt=""/>
                                <p>無止盡的愛</p>
                            </button>
                            <button className="psycho_row31_left" onClick={()=>{
                                document.querySelector('.psycho_bg').style.transform = `translateX(-6.667%) translateY(-1600px)`;
                                document.querySelector('.psycho_bg').style.animation = `psycho_row31_left 1s linear 1s forwards`;
                            }}>
                                <img className="psycho_rightBtn_cloud" src="/img/game/psycho_rightBtn.png" alt=""/>
                                <p>數不清的錢</p>
                            </button>
                        </div>
                        <img className="q3_img" src="/img/game/psycho_material6.png" alt="" />
                        <img className="q3_img2" src="/img/game/psycho_material5.png" alt="" />
                        <img className="q3_img3" src="/img/game/psycho_material7.png" alt="" />
                    </div>
                    {/* 第三題的開始 左邊*/}
                    <div className="psycho_q5">
                        <h2>結婚後的你...?</h2>
                        <div className="psycho_btnGroup">
                            <button className="psycho_row32_right" onClick={()=>{
                                document.querySelector('.psycho_bg').style.transform = `translateX(-33.335%) translateY(-1600px)`;
                                document.querySelector('.psycho_bg').style.animation = `psycho_row32_right 1s linear 1s forwards`;
                            }}>
                                <img className="psycho_leftBtn_cloud" src="/img/game/psycho_leftBtn.png" alt=""/>
                                <p>很願意付出</p>
                            </button>
                            <button className="psycho_row32_left" onClick={()=>{
                                document.querySelector('.psycho_bg').style.transform = `translateX(-33.335%) translateY(-1600px)`;
                                document.querySelector('.psycho_bg').style.animation = `psycho_row32_left 1s linear 1s forwards`;
                            }}>
                                <img className="psycho_rightBtn_cloud" src="/img/game/psycho_rightBtn.png" alt=""/>
                                <p>時常起爭執</p>
                            </button>
                        </div>
                    </div>
                    {/* 第三題的開始 右邊*/}
                    <div className="psycho_q6">
                        <h2>發現平台上有新歌，你會怎麼聽?</h2>
                        <div className="psycho_btnGroup">
                            <button className="psycho_row33_right" onClick={()=>{
                                document.querySelector('.psycho_bg').style.transform = `translateX(-60.003%) translateY(-1600px)`;
                                document.querySelector('.psycho_bg').style.animation = `psycho_row33_right 1s linear 1s forwards`;
                            }}>
                                <img className="psycho_leftBtn_cloud" src="/img/game/psycho_leftBtn.png" alt=""/>
                                <p>從副歌或中間</p>
                            </button>
                            <button className="psycho_row33_left" onClick={()=>{
                                document.querySelector('.psycho_bg').style.transform = `translateX(-60.003%) translateY(-1600px)`;
                                document.querySelector('.psycho_bg').style.animation = `psycho_row33_left 1s linear 1s forwards`;
                            }}>
                                <img className="psycho_rightBtn_cloud" src="/img/game/psycho_rightBtn.png" alt=""/>
                                <p>從頭聽到尾</p>
                            </button>
                        </div>
                    </div>
                    {/* 第三題的開始 右右邊*/}
                    <div className="psycho_q7">
                        <h2>團隊中，你屬於強勢還是隨和的人?</h2>
                        <div className="psycho_btnGroup">
                            <button className="psycho_row34_right" onClick={()=>{
                                document.querySelector('.psycho_bg').style.transform = `translateX(-86.674%) translateY(-1600px)`;
                                document.querySelector('.psycho_bg').style.animation = `psycho_row34_right 1s linear 1s forwards`;
                            }}>
                                <img className="psycho_leftBtn_cloud" src="/img/game/psycho_leftBtn.png" alt=""/>
                                <p>隨和的人</p>
                            </button>
                            <button className="psycho_row34_left" onClick={()=>{
                                document.querySelector('.psycho_bg').style.transform = `translateX(-86.674%) translateY(-1600px)`;
                                document.querySelector('.psycho_bg').style.animation = `psycho_row34_left 1s linear 1s forwards`;
                            }}>
                                <img className="psycho_rightBtn_cloud" src="/img/game/psycho_rightBtn.png" alt=""/>
                                <p>強勢的人</p>
                            </button>
                        </div>
                    </div>
                    {/* 第四層結果 第1個 */}
                    <div className="psycho_result1">
                        <div className="psycho_result_left">
                            <p>懶散成性的</p>
                            <h3>熊貓</h3>
                            <img src="/img/game/psycho_material8.png" alt="" />
                            <p>你遇到事情通常會先選擇逃避，不願意挑戰新事物</p>
                            <p><span>65%</span>的人得到這個結果</p>
                            <p>你未來一個月的幸運物是:</p>
                            <h3>枕頭</h3>
                            <Link
                                    className="psycho_shopBtn" 
                                    to= '/products'
                                >
                                    <p>前往購買</p>
                                    <img src="/img/game/game_button.png" alt="" />
                            </Link>
                        </div>
                        <div className="psycho_result_right">
                            <p>神秘個性的</p>
                            <h3>北極熊</h3>
                            <img src="/img/game/psycho_material9.png" alt="" />
                            <p>你與選到北極熊的人默契極佳哦!</p>
                            <p>選到北極熊的人遇到事情通常十分冷靜，能有條理的找出關鍵點，並做出改善，只是平時非常高冷。</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="psycho_help">
                            <i className="fas fa-question"></i>
                        </div> */}
            <div className="animals-footer"> 
                <img src="/animals-footer.png" alt="" />
            </div> 
        </div>       
        {/* <style jsx>
        {`
        img{
            width: 100%;
            height: auto;
            background-size: cover;
            border:3px solid wheat;
        }`}
        </style> */}
     </>
     )
 };
export default PsychoGame;