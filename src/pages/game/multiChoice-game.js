import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import './multiChoice-game.css';
function MultiChoice(){
    const [allQuestion,setAllQuestion] = useState([]);
    const [finish,setFinish] = useState(false);
    const [answer,setAnswer] = useState([]);
    const [userAns,setUserAns] = useState([]);
    const [toLeft,setToLeft] = useState(0);
    const [correctNum,setCorrectNum] = useState(0);
    const [point,setPoint] = useState(0);
    const [bonusSid,setBonusSid] = useState(0);
    const [review,setReview] = useState([]);
    const [help,setHelp] = useState(false);
    useEffect(()=>{
        setTimeout(() => {
            window.scrollTo({
                top: 280,
                behavior: 'smooth'
            });
        }, 0);   
        fetch('http://localhost:4000/game')
        .then(r=>r.json())
        .then(obj=>{
            let newAnswer = [];
            obj.map((v,i)=>{
                newAnswer.push(v.yes)
                // console.log(newAnswer)
                setAnswer(newAnswer)
                // setAnswer(answer.push(v.yes));
            })
            setAllQuestion(obj);
        })       
    },[])
    // 這是給按鈕的狀態，按了就會換下一題
    function move(toLeft){
        switch (toLeft){
            case 1:
                const obj = {transform:'translateX(-10%)'}
                return obj;
            case 2:
                const obj2 = {transform:'translateX(-20%)'}
                return obj2;
            case 3:
                const obj3 = {transform:'translateX(-30%)'}
                return obj3;
            case 4:
                const obj4 = {transform:'translateX(-40%)'}
                return obj4;
            case 5:
                const obj5 = {transform:'translateX(-50%)'}
                return obj5;
            case 6:
                const obj6 = {transform:'translateX(-60%)'}
                return obj6;
            case 7:
                const obj7 = {transform:'translateX(-70%)'}
                return obj7;
            case 8:
                const obj8 = {transform:'translateX(-80%)'}
                return obj8;
            case 9:
                const obj9 = {transform:'translateX(-90%)'}
                return obj9;
            case 10:
                const obj10 = {transform:'translateX(-100%)'}
                return obj10;
            default:
                const obj0 = {transform:'translateX(0)'}
                return obj0;
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
            <div className="game_title">冷知識大挑戰</div>
            <p className="game_profile">在這<span>10</span>題中努力回答吧，可能有些答案會超出你的想像<br /><span>答對5</span>題以上會得到紅利點數<span>35</span><br /><span>全部答對能拿到50點紅利哦</span></p>
            <div className="mc_container_game">
            {/* 這是教學影片，點擊小幫手才會出現 */}
                <div className="mc_video" style={{display:help?"flex":'none'}}>
                    <div className="mcVideo_closeBtn" 
                        onClick={()=>{setHelp(false)}}
                    >
                        <i className="fas fa-times"></i>
                    </div>
                    <video width="1500" height="700" controls>
                        <source src="/img/game/wildJungle_qa.mp4" type="video/mp4" />
                    </video>
                </div>
                <div className="mc_game_border">
                    <ul className="mc_game_zone" style={move(toLeft)}>
                        {allQuestion.map((v,i)=>{ 
                            if(i<9){
                            return(
                            <li className="choose_question" key={i}>
                                <h2>{i+1}.{v.qcontent}</h2>
                                <div className="mc_btnGroup">
                                    <button onClick={(e)=>{
                                        setToLeft(i+1);
                                        let current = [...userAns];
                                        current.push(v.answers[0]);
                                        setUserAns(current);
                                        if(answer[i]===v.answers[0]){
                                            e.target.style.background = 'rgb(27,200,5)';
                                        }else{
                                            e.target.style.background = 'red';
                                        }
                                    }}>{v.answers[0]}
                                    </button>
                                    <button onClick={(e)=>{
                                        setToLeft(i+1);
                                        let current = [...userAns];
                                        current.push(v.answers[1]);
                                        setUserAns(current);
                                        if(answer[i]===v.answers[1]){
                                            e.target.style.background = 'rgb(27,200,5)';
                                        }else{
                                            e.target.style.background = 'red';
                                        }
                                    }}>{v.answers[1]}
                                    </button>
                                    <button onClick={(e)=>{
                                        setToLeft(i+1);
                                        let current = [...userAns];
                                        current.push(v.answers[2]);
                                        setUserAns(current);
                                        if(answer[i]===v.answers[2]){
                                            e.target.style.background = 'rgb(27,200,5)';
                                        }else{
                                            e.target.style.background = 'red';
                                        }
                                    }}>{v.answers[2]}
                                    </button>
                                    <button onClick={(e)=>{
                                        setToLeft(i+1);
                                        let current = [...userAns];
                                        current.push(v.answers[3]);
                                        setUserAns(current);
                                        if(answer[i]===v.answers[3]){
                                            e.target.style.background = 'rgb(27,200,5)';
                                        }else{
                                            e.target.style.background = 'red';
                                        }
                                    }}>{v.answers[3]}
                                    </button>
                                </div>
                            </li>)
                            }else{
                                return(
                            <li className="choose_question" key={i}>
                                <h2>{i+1}.{v.qcontent}</h2>
                                <div className="mc_btnGroup">
                                    <button onClick={(e)=>{
                                        setToLeft(9)
                                        setFinish(true)
                                        let current = [...userAns]
                                        current.push(v.answers[0])
                                        setUserAns(current);
                                        if(answer[i]===v.answers[0]){
                                            e.target.style.background = 'rgb(27,200,5)';
                                        }else{
                                            e.target.style.background = 'red';
                                        }
                                    }}>{v.answers[0]}
                                    </button>
                                    <button onClick={(e)=>{
                                        setToLeft(9)
                                        setFinish(true)
                                        let current = [...userAns]
                                        current.push(v.answers[1])
                                        setUserAns(current);
                                        if(answer[i]===v.answers[1]){
                                            e.target.style.background = 'rgb(27,200,5)';
                                        }else{
                                            e.target.style.background = 'red';
                                        }
                                    }}>{v.answers[1]}
                                    </button>
                                    <button onClick={(e)=>{
                                        setToLeft(9)
                                        setFinish(true)
                                        let current = [...userAns]
                                        current.push(v.answers[2])
                                        setUserAns(current)
                                        if(answer[i]===v.answers[2]){
                                            e.target.style.background = 'rgb(27,200,5)';
                                        }else{
                                            e.target.style.background = 'red';
                                        }
                                    }}>{v.answers[2]}
                                    </button>
                                    <button onClick={(e)=>{
                                        setToLeft(9)
                                        setFinish(true)
                                        let current = [...userAns]
                                        current.push(v.answers[3])
                                        setUserAns(current);
                                        if(answer[i]===v.answers[3]){
                                            e.target.style.background = 'rgb(27,200,5)';
                                        }else{
                                            e.target.style.background = 'red';
                                        }
                                    }}>{v.answers[3]}
                                    </button>
                                </div>
                            </li>)
                            }
                        })}
                        {/* <li className="choose_question">
                            <h2>1.請問斑馬的皮膚是什麼顏色?</h2>
                            <div className="mc_btnGroup">
                                <button onClick={()=>{
                                    setToLeft(true)
                                }}>黑白相間</button>
                                <button>白色</button>
                                <button>黑色</button>
                                <button>灰色</button>
                            </div>
                        </li>*/}
                    </ul>
                    {/* 這裡沒有只用透明度的原因是一樣會按到 */}
                        <div className="mc_board" style={{opacity:toLeft===10?'1':'0',pointerEvents:toLeft===10?'all':'none'}}>
                            <div className="boardLeft">
                                {review.map((v,i)=>{
                                    return(
                                    <div className="board_qaGroup" key={i}>
                                    <div className="board_question">{v.number}.{v.question}</div>
                                    <div className="userAns">你的答案:{v.userAns}</div>
                                    <div className="rightAns">正確答案:<span>{v.rightAns}</span></div>
                                    <Link to="/tour">
                                        <div className="goTour_btn">查看小知識</div>
                                    </Link>
                                </div>
                                )})}
                                {/* <div className="board_qaGroup">
                                    <div className="board_question">1.你的答案全錯你這個王八蛋</div>
                                    <div className="userAns">你的答案:</div>
                                    <div className="rightAns">正確答案:</div>
                                    <Link to="/tour">
                                        <div className="goTour_btn">查看小知識</div>
                                    </Link>
                                </div> */}
                            </div>
                            <div className="boardRight">
                                <div className="board_point">{point}</div>
                                <div className="board_pointText">WILDJUNGLE</div>
                                <img src="/img/game/game-points.png" alt="" />
                                <div className="correctNum">答對題數:<span>{correctNum}</span></div>
                                <div className="incorrectNum">答錯題數:<span>{10-correctNum}</span></div>
                                <div className="board_btnGroup">
                                    <Link
                                        className="board_winBtn" 
                                        to= '/game'
                                        onClick={(e)=>{
                                            if(localStorage.admin_account!==undefined&& point!==0){
                                                fetch('http://localhost:4000/game-points', {
                                                    method: 'POST',
                                                    headers: {
                                                        "Content-Type": "application/json"
                                                    },
                                                    body: JSON.stringify({point_id:bonusSid,
                                                            getTime_start:new Date().toISOString().slice(0, 10),
                                                            getTime_end:new Date(Date.now()+2592000000).toISOString().slice(0, 10),
                                                            bonus_status:'未使用',
                                                            m_id:JSON.parse(localStorage.admin_account).m_sid})
                                                })
                                                .then(r=>r.json())
                                                .then(obj=>{
                                                    console.log(obj)
                                                })
                                            }else{
                                                e.preventDefault();
                                                let goRigister = window.confirm("您尚未加入會員，請至註冊頁面成為會員才可使用紅利");
                                                if(goRigister){
                                                    window.location.href = 'http://localhost:3000/members';
                                                }else{
                                                    window.location.href = 'http://localhost:3000/game';
                                                }
                                            }
                                        }}
                                    >
                                        <p>回遊戲主頁</p>
                                        <img src="/img/game/game_button.png" alt="" />
                                    </Link>
                                    <Link
                                        className="board_winBtn"
                                        to= '/products'
                                        onClick={(e)=>{
                                            if(localStorage.admin_account!==undefined&& point!==0){
                                                fetch('http://localhost:4000/game-points', {
                                                    method: 'POST',
                                                    headers: {
                                                        "Content-Type": "application/json"
                                                    },
                                                    body: JSON.stringify({point_id:bonusSid,
                                                            getTime_start:new Date().toISOString().slice(0, 10),
                                                            getTime_end:new Date(Date.now()+2592000000).toISOString().slice(0, 10),
                                                            bonus_status:'未使用',
                                                            m_id:JSON.parse(localStorage.admin_account).m_sid})
                                                })
                                                .then(r=>r.json())
                                                .then(obj=>{
                                                    console.log(obj)
                                                })
                                            }else{
                                                e.preventDefault();
                                                let goRigister = window.confirm("您尚未加入會員，請至註冊頁面成為會員才可使用紅利");
                                                if(goRigister){
                                                    window.location.href = 'http://localhost:3000/members';
                                                }else{
                                                    window.location.href = 'http://localhost:3000/products';
                                                }
                                            }
                                        }}
                                    >
                                        <p>點數馬上用</p>
                                        <img src="/img/game/game_button.png" alt="" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    <div className="send_fianlAnswer" style={{display:finish?'block':'none'}} onClick={()=>{
                                        let counter = 0;
                                        let current =[];
                                        answer.map((v,i)=>{
                                            if(v===userAns[i]){
                                                counter++;
                                            }else{
                                                let template = {
                                                                number:i+1,
                                                                question:allQuestion[i].qcontent,
                                                                userAns:userAns[i],
                                                                rightAns:v,
                                                            };
                                                current.push(template);
                                                setReview(current);
                                            }
                                        })
                                        if(counter===10){
                                            setPoint(50)
                                            setBonusSid(6)
                                        }else if(counter<10&&counter>5){
                                            setPoint(35)
                                            setBonusSid(4)
                                        }else if(counter<=5){
                                            setPoint(5)
                                            setBonusSid(1)
                                        }else if(counter===0){
                                            setPoint(0)
                                        }
                                        setCorrectNum(counter);
                                        setToLeft(10)
                                        setFinish(false)
                                    }}>確認送出<i className="fas fa-arrow-right"></i></div>
                    <div className="mc_help" onClick={()=>{setHelp(true)}}>
                        <i className="fas fa-question"></i>
                    </div>
                </div>
            </div>
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
export default MultiChoice;