import React, {useEffect,useState} from "react";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import './lottery.css';
function Lottery(props){
    const {pointData,setPointData}=props;
    const history = useHistory();
    const [bonus,setBonus] = useState(0);
    const myCanvas = useRef(null);
    const myCanvas_bottom = useRef(null);
    // 利用useRef 抓到render出來的真實canvas
    // const [count,setCount] = useState(0);
    function toggle(toggleLottery){
        const lottery_show = {
                                display:'block'
                            }
        const lottery_close = {
                                display:'none'
                            }
        let result  = toggleLottery ? lottery_show : lottery_close;
        return result;
    }
    let painting = false;
    function startPosition(e){        
        painting = true;
        draw(e);
    }
    function finishPosition(){
        painting = false;
    }
    function draw(e){   
        const ctx = myCanvas.current.getContext("2d");  
        ctx.globalCompositeOperation = 'destination-out';   
        if(!painting) return;
        ctx.lineWidth = 60;
        ctx.lineCap = "round"; 
        ctx.lineTo(e.offsetX,e.offsetY);
        ctx.stroke();
        ctx.beginPath();
        show_result();
    }
    function show_result(){
        const ctx = myCanvas.current.getContext("2d");  
        const data = ctx.getImageData(70,60,250,150).data;
        let transparent_number = 0;
        for (let i = 0; i < data.length; i++) {
            if (data[i] === 0) {
                transparent_number++;
            }
        };
        if (transparent_number >= data.length * 0.79) {            
            ctx.canvas.style.opacity = 0;
            document.querySelector('.lottery_bonusBtn').style.display = 'block';          
            myCanvas.current.removeEventListener("mousedown",startPosition);
            myCanvas.current.removeEventListener("mousemove",draw);
        }        
    }
    function first_render (ctx, ctx_bottom,randomNum){
        let bonusText = '';
        setBonus(randomNum);
        switch (randomNum){
            case 0:
                bonusText = '銘謝惠顧';
            break;
            case 1:
                bonusText = '紅利5點';
            break;
            case 2:
                bonusText = '紅利15點';
            break;
            case 3:
                bonusText = '紅利25點';
            break;
            case 4:
                bonusText = '紅利35點';
            break;
            case 5:
                bonusText = '紅利45點';
            break;
            case 6:
                bonusText = '紅利50點';
            break;
            default:
                bonusText = '銘謝惠顧';
        }
        const canvas = ctx.canvas;
        const canvas_bottom = ctx_bottom.canvas;
        const image = new Image();
        const image_bottom = new Image();
        const random_image = Math.floor(Math.random()*3+1)
        image.src = `http://localhost:3000/img/game/lottery${random_image}.png`;
        image_bottom.src = `http://localhost:3000/img/game/lottery${random_image}-back.png`
        image.onload = () => {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        };
        image_bottom.onload = () => {
            // 隨機產出
            ctx_bottom.drawImage(image_bottom,0,0,canvas_bottom.width,canvas_bottom.height);
            // ctx_bottom.fillStyle = 'red';
            // ctx_bottom.fillRect(70,60,250,150);
            ctx_bottom.font = "40px Arial";
            ctx_bottom.fillStyle = 'white';
            ctx_bottom.textAlign = 'center';
            ctx_bottom.fillText(bonusText,canvas_bottom.width/2,150);
        }
    }
    useEffect(()=>{
        // 第一次render就先設定好獎項 0~7
        const randomNum = Math.floor(Math.random()*7);
        // 刮刮樂表面的CSS
        myCanvas.current.style.marginLeft = '-401px';
        // 刮刮樂刮完後那面的CSS
        // myCanvas_bottom.current.style.position = 'absolute';
        // myCanvas_bottom.current.style.left = '65%';
        // myCanvas_bottom.current.style.zIndex = '999';
        const ctx = myCanvas.current.getContext("2d");
        const ctx_bottom = myCanvas_bottom.current.getContext("2d");
        myCanvas.current.addEventListener("mousedown",startPosition);
        window.addEventListener("mouseup",finishPosition);
        myCanvas.current.addEventListener("mousemove",draw);
        first_render(ctx, ctx_bottom,randomNum);
    },[])
    return (
        <>  
        <div className="lottery_container" style={toggle(props.toggleLottery)}>
            <div className="lottery_closeBtn" 
            onClick={()=>{props.setToggleLottery(false)}}
            >
                <i className="fas fa-times"></i>
            </div>
            <div className="lottery_title">Scratch to reveal</div>
            <div className="lottery_text">用滑鼠按住拖曳下圖即可刮出獎勵</div>
            <div className="scratch_area">
                <canvas ref={myCanvas_bottom} width="401" height='556'></canvas>
                <canvas ref={myCanvas} width="401" height='556'></canvas>
            </div>
            <button className="lottery_bonusBtn" onClick={async ()=>{
                // 先判斷如果是銘謝惠顧，按鈕只會做關閉視窗的動作
            if(bonus===0){
                props.setToggleLottery(false);
                localStorage.setItem('received',JSON.stringify( {expire:new Date().getTime() + 5184000} ));
            }else{   
                await fetch('http://localhost:4000/game-points', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    // We convert the React state to JSON and send it as the POST body
                    body: JSON.stringify({point_id:bonus,
                            getTime_start:new Date().toISOString().slice(0, 10),
                            getTime_end:new Date(Date.now()+2592000000).toISOString().slice(0, 10),
                            bonus_status:'未使用',
                            m_id:JSON.parse(localStorage.admin_account).m_sid})
                    })
                    .then(r=>r.json())
                    .then(obj=>{
                        // console.log(obj)
                        let newAr=pointData.unshift({
                            bonusList_sid:obj.id,
                            bonus_status: obj.info.bonus_status,
                            getTime_end: obj.info.getTime_end,
                            getTime_start: obj.info.getTime_start,
                            name: "遊戲闖關",
                            number: obj.info.number
                        })
                        setPointData(pointData);
                        localStorage.setItem('received',JSON.stringify( {expire:new Date().getTime() + 5184000} ));
                        props.setToggleLottery(false);
                        // 在前往會員頁面時,直接導至優惠的部分,所以從這設定會員頁的狀態
                        props.setActived('折價優惠');
                        history.push('/members/modify-member-info');
                    })
                
            }
            }}>查看獎勵</button>
        </div>
        </>
    )
}
export default Lottery