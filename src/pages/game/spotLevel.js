import React from "react";
import { Link } from "react-router-dom";
import './spotLevel.css';
function SpotLevel(){
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
            <p className="game_profile">遊戲中你將要找出<span>5</span>個不同之處，利用滑鼠點擊圖片若正確會看到綠色圈圈。<br/>記住.....你只有<span>3</span>次錯誤的機會。<br/>抓緊時間吧，完成考驗將可以得到<span>紅利點數500 !!!</span></p>
            <div className="container_level">
                <div className="choose_levelTitle">選擇關卡</div>
                <div className="wrap_level">
                    <Link to= '/game/spot-diff'>
                        <div className="level_hexagon">
                            <div className="level_circle">1</div>
                        </div>            
                    </Link>
                    {/* 除了第一題，其他都是破完上一題才能完下一題 */}
                    <Link to= '/game/spot-diff2' onClick={(e)=>{
                        if(localStorage.getItem('level')<1){
                            e.preventDefault();
                        }
                    }}>
                        <div className="level_hexagon">
                            <div className="level_circle" style={{background:localStorage.getItem('level')>=1?"rgb(233, 226, 131)":"gray",cursor:localStorage.getItem('level')>=1?"pointer":"not-allowed"}}>2</div>
                        </div>            
                    </Link>
                    <div className="level_hexagon">
                        <div className="level_circle" style={{background:localStorage.getItem('level')>=2?"rgb(233, 226, 131)":"gray",cursor:localStorage.getItem('level')>=2?"pointer":"not-allowed"}}>3</div>
                    </div>
                    <div className="level_hexagon">
                        <div className="level_circle" style={{background:localStorage.getItem('level')>=3?"rgb(233, 226, 131)":"gray",cursor:localStorage.getItem('level')>=3?"pointer":"not-allowed"}}>4</div>
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
export default SpotLevel;