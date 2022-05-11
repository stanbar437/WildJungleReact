import ReactDOM from 'react-dom'
import Carousel from './Carousel'
import './CarouselShow.scss'
import React, { useRef } from "react";





let hot = ["亞洲象","鯨頭鸛","水豚","馬來貘","大猩猩","彩虹巨嘴鳥","樹懶","穿山甲"];
let hotEN = ["Elephas maximus","Shoebill","Capybara","Malayan Tapir","Gorilla","Ramphastos sulfuratus","Folivora","Manidae"];
let HotDescriptions = [
"(學名:Elephas maximus),是象的一種, 錫蘭象是亞洲象的指名亞種。亞洲象為IUCN紅色名錄中的瀕 危物種之一,也是中國國家一級保護動物 亞洲象主要棲息地,為東南亞和南亞這些熱帶地區的印度、 尼泊爾、斯里蘭卡、緬甸、泰國、越南、印尼和馬來西亞等 十三個國家,大約四十四萬平方公里的土地上。古代從西亞 的兩河流域,往東延伸到中國的黃河流域,都曾經有牠們活 躍的蹤影。現今中國境內其自然棲息地自清朝以後就被壓縮 到雲南無量山、哀牢山以南的西雙版納、普洱和臨滄一帶。不過近年來其活動北界可達玉溪、昆明之間。",
"(學名:Balaeniceps rex) 是一種大型鳥類,它是鯨頭鸛科和鯨頭鸛屬唯一的一個物種。屬名源自拉丁語「balaena」鯨以及「-ceps」頭之義;種名「rex」在拉丁語中意為「帝王」,來自它強大的喙。鯨頭鸛身長可達150公分,成年鳥羽主要為灰色,幼鳥的羽毛主要為棕色。鯨頭鸛生活在非洲東部熱帶地區從蘇丹共和國到尚比亞的巨大沼澤地區。鯨頭鸛在泥水中捕魚,其食物主要是肺魚類或類似的魚。它們的巢築在地面上,每次產兩顆卵。鯨頭鸛的數量預估在5000至8000隻之間,大多數生活在蘇丹。",
"(學名:Hydrochoerus hydrochaeris)是水豚屬下僅存的兩種生物之一。牠是一種半水棲的食草動物,也是世界上體型最大的齧齒類動物。原產於南美洲除了智利以外的所有稀樹草原和叢林中。水豚是高度社會化的動物,最大的水豚群數量可達100頭,但一般在10至20頭之間。雖然因其肉及毛皮有利用價值而遭到捕獵,但該物種依然無危。",
"(學名:Tapirus indicus)又名亞洲貘、印度貘,是貘屬下的一個種,屬於奇蹄目貘科。馬來貘為現存 5 種貘中體型最大的物種,也是唯一生活於亞洲的現存物種。小貘出生時,身體有條紋狀的保護色、棕毛。其貌「似豬不是豬、似象不是象」,故也有古書稱之「四不像」。馬來貘的視力不佳,但是具有良好的聽覺以及嗅覺。",
"(學名:Gorilla)大猩猩是靈長目人科大猩猩屬類人猿的總稱。大猩猩是靈長目中體型最大與智力僅次於人類和黑猩猩的動物,他們生存於非洲大陸赤道附近叢林中,吃素。至2006年為止依然有大猩猩分一種還是兩種的爭論,種以下它分四至五個亞種。大猩猩92%至98%的脫氧核糖核酸(DNA)排列與人一樣,因此它是繼黑猩猩屬的兩個種後與人類最接近的現存的動物;也是目前力量最強大的靈長目物種。",
"(學名:Ramphastos sulfuratus)又名厚嘴巨嘴鳥或厚嘴鵎鵼,是一種羽色鮮艷的巨嘴鳥,也是貝里斯的國鳥,主要分布於墨西哥南部至巴拿馬一帶的中美地峽。彩虹巨嘴鳥連同其喙長42-55厘米。牠們色彩鮮艷的喙長12-15厘米,約佔全長的三分之一。雖然其喙似乎很大及笨重,但骨骼是呈海綿狀及中空,並由角質素所覆蓋。喙表面呈綠色,尖端紅色,兩側橙色。",
"(學名:Folivora)哺乳綱異關節總目披毛目下樹懶亞目動物的通稱,包括有樹懶科和二趾樹懶科。其移動速度非常地慢,只有每分鐘4米(0.24km/h)的速度,在地面上是只有每分鐘2米(0.12km/h)的速度。如果不慎掉到地面,容易成為其他肉食性動物的獵物,然而牠們具有游泳的能力。共有兩科六種,分布於南美洲及中美洲的熱帶雨林中,雖然外觀上相似,但兩科之間的分別頗大。雖然被稱為二趾與三趾樹懶,但其實所有現存的樹懶均有3根腳趾,主要差異在於,二趾樹懶的前臂上僅有二指。樹懶的粗毛夾縫中長有與其互利共生的綠藻,提供很好的保護色,而樹懶有時也會取食身上的綠藻作為營養來源。而這些綠藻也是樹懶蛾的食物來源,有些種類的樹懶蛾甚至只能在樹懶身上發現。絕種的樹懶包括地懶,其中體型最大的大地懶全長可達6米(20英尺),相當於現今的非洲象。",
"(學名:Manidae,也稱鯪鯉科)中國古稱鯪魚、鯪鯉、鯪鱧,是穿山甲科的一類哺乳動物的統稱,屬鱗甲目(Pholidota)下唯一的科,現存3屬8種,分佈在亞洲和非洲的熱帶及亞熱帶地區。它們從頭到尾披覆著魚鱗般的角質甲片,穴居夜行,以白蟻為主食。"]
let ice = ["馴鹿","雪狐","北極熊","斑海豹","企鵝","白大角羊","雪貂","豎琴海豹"];
let iceEN = ["redfoxRangifer tarandus","Vulpes lagopus","Ursus maritimus","Harbor seal","Ovis dalli","geochelone","Gulo gulo","Pagophilus groenlandicus"];
let IceDescriptions =[
"(學名Rangifer tarandus),又名角鹿。是鹿科馴鹿屬下的唯一一種動物。不同的馴鹿亞種之間的形態有很大差距。總的來說,生活在南部地區的馴鹿要比北部的同類體形更大。馴鹿的肩寬可以達到120厘米,身長在1.5米到2.3米之間。雄性和雌性之間也有體形差異,某些亞種的雄性體形可以達到雌性的兩倍,但雄性和雌性馴鹿頭上都長角,這也是馴鹿區別於其它鹿種的顯著特點之一,長角分枝繁複,有時超過30叉,寬大的鹿蹄可避免陷入雪地中,懸蹄發達,行走時腳關節會發出特殊聲響,可在暴風雪或永夜時,為後方的馴鹿提示位置,極短的尾巴可避免熱量流失。",
"(學名:Vulpes lagopus)別名雪狐或白狐,在寒冷的北極凍原地區是常見的小型犬科動物,由於其毛皮是市場上的高檔貨,因此成了人們競相獵捕的目標。 北極狐額面狹,吻部很尖,耳短而圓,頰後部生長毛,腳底部也密生長毛,所以適於在冰雪地上行走,尾毛蓬鬆,尖端白色,身體略小於赤狐。",
"(學名:Ursus maritimus,意即「海熊」)又稱 白熊 或 冰熊,北極熊是一種能在惡劣酷寒的環境下生存的動物,其活動範圍主要在北冰洋、即北極圈附近,而最南則可以在有浮冰出沒的地方找到牠們他們大約會在四點到十點間出現(現時找到牠們的最南點為加拿大的哈德森灣最南處的詹姆士灣)。而最北可以在北緯88度找到牠們,牠們分布在北極點。國際自然保護聯盟中的物種存續委員會把北極熊的棲息地劃分為十九個地域以做科學研究目的,分佈在五個國家:阿拉斯加(美國)、加拿大、俄羅斯、挪威、格陵蘭(丹麥)",
"(學名:Phoca largha)斑海豹是中國國家一級保護動物。由於斑海豹在沿海岸線的環境活動,有時需要到礁石或海岸上休息、換毛,沿海環境的變化對其生存有一定影響。比如渤海油田的開發讓沿岸自然環境發生變化,噪音和污染物增多,船隻活動頻繁,這都對斑海豹產生了不利影響",
"(學名:Sphenisciformes)企鵝科(Spheniscidae),是一種不會飛的鳥類。主要生活在南半球,目前已知全世界的企鵝共有19種,另有兩種已滅絕。多數分布在南極地區,而其中環企鵝屬的漢波德企鵝、麥哲倫企鵝與黑腳企鵝分布在緯度較低的溫帶地區,至於加拉帕戈斯企鵝的分布則更接近赤道；完全生活在極地的只有皇帝企鵝及阿德利企鵝兩種",
"(學名Ovis dalli)是北美洲西北部特有的一種羊,顏色由白色至淺褐色,有彎曲褐色的角。白大角羊的學名是以威廉·希·戴爾(William Healey Dall)來命名。雄性白大角羊有厚而彎曲的角。雌羊的較短及幼長,且輕微彎曲。雄羊聯群生活,很少會與雌羊群有關聯,只會在11月下旬至12月初時的交配季節才會走在一起。幼羊會於5月出生。在食物豐富的夏天,白大角羊會吃多種的植物。到了冬天,牠們會吃地衣及苔蘚。在春天,很多白大角羊群落都會走到洛磯山雪羊觀賞區覓食。",
"(學名:Mustela putorius furo),又名雪貂、地中海雪貂,是歐洲鼬的馴養亞種。牠們是兩性異形體的,雄貂比雌貂大。牠們一般呈褐色、黑色、白色或混色,公貂連同尾巴長可到51公分,重1—2公斤,母貂體型較小,體重約在600公克—1公斤,壽命為7—10歲,矇眼貂是暮晨活動的,每天約有14—18個小時為睡眠時間,於黎明及黃昏時最為活躍。牠們不像祖先鼬屬是獨居的,而是喜歡群居的。大部分的雪貂都能在社交圈中和平快樂的相處。牠們為有地盤性的動物,喜歡挖巢穴,也喜歡睡在隱密的空間。",
"(學名:Pagophilus groenlandicus)是一種相當耐寒的海洋哺乳動物,棲息於氣溫大約-40度的北極圈,以鱈魚等魚蝦為食,繁殖能力相當強 。體長1.7米,體重130千克。面部寬闊,兩眼靠近,強壯而呈黑色的爪子,銀白色而光滑的皮毛。明顯的黑色條帶在背部形成許多鞍紋,大體呈豎琴圖案。豎琴海豹是一種相當耐寒的海洋哺乳動物。主要分佈於亞特蘭大以北到北冰洋間的極地地區。生活於極地的開闊海洋和海岸線邊緣地帶。以鱈魚、香魚和鯡魚等為食。通常以集羣的形式沿着冰帶的邊緣大規模遷移。由於其皮毛和海豹油的價值而長期處於被捕獵狀態。從1987年開始,加拿大《海洋哺乳動物條例》禁止捕獵豎琴海豹幼崽(白毛海豹),捕獵的海豹必須是能自我生存和能獨立生活的海豹(通常年齡在25天以上)"
]
let Ocean = ["鯊魚","海兔子","魟魚","水母","海豚","白鯨","海馬","綠蠵龜"];
let OceanEN = ["Selachimorpha ","Anaspidea","Stingrays","Jellyfish","Delphinidae","Beluga","Hippocampus","Sea turtle"];
let oceanDescriptions =[
"(學名:Selachimorpha)鯊魚是鯊總目,動物的通稱,屬於軟骨魚綱中的板鰓亞綱,至今已經演化出約500個不同的種,劃分為現存 8 目(由於分類學家的意見不一致)最小的鯊魚為侏儒角鯊(Etmopterus perryi),僅有 17公分(6.7英寸) 長；最大的鯊魚則為鯨鯊(Rhincodon typus),超過 12公尺(40英尺)甚至更大。鯊魚有高度流線、適合游泳的外型,全身覆滿了盾鱗,鱗除了保護鯊魚免於受傷或者被寄生蟲寄生,還可以增進它們的流體動力,讓它們游得更快速。鯊魚體側用於呼吸的鰓裂有5-7個。它們有數套可替換的牙齒。鯊魚分布於全世界的海域,甚至是 2,000公尺(6,600英尺) 的深海。少數鯊魚如低鰭真鯊或露齒鯊屬同時生活於淡水與海水水域",
"(學名:Jorunna parva)後腮亞綱無楯目的一科。俗名“雨虎”,又名“海豬仔”。成體貝殼完全退化或為內殼,呈板狀或斧狀,具石灰質或僅存角質膜。體呈卵圓或蛞蝓形。頭部有一對觸角,呈耳形；頭頸部明顯,有一對耳形的嗅角。腹足寬,後端呈尾狀,因靜止時很像坐着的兔子而得名。廣佈世界各暖水海域,中國已知21種。海兔屬側足發達,前後端遊離,可作游泳器官。有紫汁腺,能發射紫色汁液來殺傷小型動物或逃避敵害。主要食物為海藻。海兔子分泌物,也叫海粉,是一種非常稀有,非常名貴的中藥材。",
"(學名:Dasyatidae、英語:Stingrays)又名尖吻魟、魴仔,為軟骨魚綱燕魟目土魟科魟屬下的一個種,成年雄性體長可達72.5公分。",
"(英文名稱:Jelly Fish)是無脊椎動物,屬於刺胞動物門中的一類,其中包括水母、海葵、珊瑚、水螅。全世界的海洋中有超過兩百種的水母,牠們分布於全球各地的水域裡,無論是熱帶的水域﹑溫帶的水域﹑淺水區﹑約百米深的海洋,甚至是淡水區都有牠們的蹤影。水母早在埃迪卡拉紀時就已經存在。水母的形狀大小各不相同,最大的水母其觸手可以延伸約十米遠。 在分類上有些屬於水螅綱,有些屬於缽水母綱,其生活史中,幾乎所有種類都有兩型,即水螅型和水母型,並有兩型在有性生殖與無性生殖之間的世代交現象,而人們常見的水母則是有性的水母型。",
"(學名:Delphinidae),廣義上泛指海豚科、鼠海豚科與淡水豚類,以及各類史前小型齒鯨,如肯氏海豚科、劍吻海豚科、懷佩什海豚科等。此外,領航鯨、虎鯨等黑鯨類在生物分類學上被歸入海豚科,因此本質上也屬於海豚,可是因為體形較大所以在非學術性的日常表達中,牠們一般被排除在海豚之外。海豚廣泛生活於世界各大洋大陸架附近的淺海區,在內海及江河入海口附近的鹹淡水中也有分布,個別種類見於內陸河流。通常喜歡群居,捕食魚類、烏賊等。牠們的軀幹呈紡錘形,皮膚光滑無毛,身體矯健而靈活,善於跳躍和潛泳,是在水中行動最迅速的哺乳動物。擁有發達的聲納系統,活動時主要依靠回聲定位功能,在水中和空氣中均有極好的聽力。鼻孔在頭頂上,用於出水換氣。體型從1公尺長、30公斤重(侏海豚)到9.5公尺長、14噸重(虎鯨)不等,形態特徵也各不相同。",
"(學名:Delphinapterus leucas)又稱貝魯卡鯨,為一角鯨科白鯨屬的唯一物種,以多變化的叫聲與豐富的臉部表情聞名,早期的捕鯨者稱之為「海中金絲雀」。白鯨廣泛分布於北極與亞北極地區,自古以來牠們一直是北極地區人類社會的重要商品,為當地原住民提供了食物、燃油、皮革等物資。牠們的活力與適應力、特殊的外貌、易受吸引的天性、以及可接受訓練等因素,使其成為海洋世界 的明星之一。幾個白鯨集中的地區已成為賞鯨聖地,包括加拿大東部的聖勞倫斯河下游與哈德遜灣西部的邱吉爾河河口。白鯨的潛水能力相當強,對於北極的浮冰環境有很好的適應力。",
"(學名:Hippocampus)是屬於海龍科的一類輻鰭魚。它是一種小型海洋生物,海馬屬具有不同於一般魚類的外形,尾鰭完全退化,脊椎則演化到如猴子尾巴一樣的捲纏尾,可捲曲來鉤住任何突出物體,以固定身體位置。海馬在水中的遊動方式也不同於一般魚類,它們幾乎總是昂立著身體,依靠小而幾乎透明的魚鰭的扇動,它們可以任意上下左右移動,但速度緩慢。通常海馬憑藉身上體色的偽裝及硬化成皮狀的皮膚以逃避掠食者。體色在幼年時和成年差異很大。",
"(學名:Chelonia mydas、英文:green sea turtle),又稱綠海龜、青海龜、石龜(臺灣話:tsio̍h-ku)、龜鼊(臺灣話:ku-piah)、龜蟞(臺灣話:ku-phi̍ah),是海洋中的爬蟲類動物,是海龜屬下的唯一一種。一生中大多的時間都在海中生活,但演化過程中仍然保留了部分祖先的生活方式,所以必須回到出生地上產卵,繁育後代,形成了一種較獨特的生活習性。綠蠵龜廣泛分布在熱帶及亞熱帶海域中,即約南北緯度20℃等溫線之間的海域,並在水溫逾攝氏25度的沙灘上產卵。由於牠用肺呼吸,於海中的潛水深度極限約一、兩百公尺。綠蠵龜的主食為海中的海草與大型海藻,因此體內脂肪累積了許多綠色色素,呈現淡綠色,也因而得名。綠蠵龜已瀕臨絕種,全世界僅剩下約20萬頭產卵母龜,在世界自然保護聯盟瀕危物種紅色名錄中列為瀕危物種。為避免因人類的捕殺及棲地之破壞,所有海龜被均列為瀕危野生動植物種國際貿易公約(或簡稱華盛頓公約)附錄中的物種,也被選為世界自然基金會的海洋十寶之一。"
]
let nocturnal = ["刺蝟","赤狐","美洲獅","浣熊","無尾熊","象龜","豪豬","貓頭鷹"];
let nocturnalEN = ["hedgehog","redfox","cougar","raccoon","koala","geochelone","porcupine","owl"];
let nocturnalDescriptions=[
"(學名:Erinaceinae)動物的通稱,屬真盲缺目蝟科,廣泛分布在歐洲、亞洲北部,在中國的北方和長江流域也分布很廣,這些刺蝟冬天冬眠,在長江流域民間又被叫做「偷瓜獾」。常見的物種有西歐刺蝟(Erinaceus europaeus)。刺蝟在夜間活動,以昆蟲和蠕蟲為主要食物,一晚上能吃掉200克的蟲子,消滅害蟲因此有利於農業。和豪豬不同,刺蝟的刺不能脫落。刺蝟一般能抵抗許多種毒物,但無法抵抗殺蟲劑,有時因誤食被殺蟲劑殺死的蟲子而中毒身亡,也因為行動緩慢,有時會被高速行駛的車輾死。刺蝟的主要天敵是貂、貓頭鷹和狐狸等食肉動物。另外有一種叫非洲迷你刺蝟的寵物刺蝟是由非洲的「四趾刺蝟和「北非刺蝟」雜交培育的,不冬眠,個頭較小,不耐寒。一般刺蝟能存活4-7年,但作為寵物的刺蝟,據記載有曾存活達16年的。",
"(學名:Vulpes vulpes),又俗名火狐,是狐的一種。赤狐是最大和分佈最廣泛的狐屬食肉目成員之一。赤狐分佈在整個北半球,包括北美,歐洲和亞洲的大部分地區,以及北非部分地區。它被國際自然保護聯盟列為無危物種。隨著人類的擴張,它的範圍也隨之擴大,後來引入澳大利亞。但是在那裡它被認為對本地的哺乳動物和鳥類動物有害。由於它在澳大利亞的存在,它被列入「世界百大外來入侵種」的名單。赤狐起源於中維拉夫蘭期。赤狐的祖先最早期時小規模地生活在歐亞大陸,並在威斯康辛州冰川融化後轉移至北美生活。在狐狸中,赤狐代表著食肉目動物的一種更進步的形式。除了它的體型大小,赤狐有別於其他狐屬的能力,它能更快地適應新的環境。儘管它的名字叫赤狐,該物種往往產生其他顏色,包括白色變型和黑化。目前已確認有45個亞種,分為兩類:亞洲和北非的大型狐狸和小型南部灰色沙漠狐狸。",
"(學名:Puma concolo),又稱山獅,是種棲息於美洲的大型食肉目貓科動物。其分布範圍從加拿大的育空地區一直延伸到南美洲的安第斯山脈南段,是西半球大型野生陸棲哺乳動物中分布範圍最廣的貓科。作為一種適應性強的泛化物種,在美洲大部分的棲息地種類中,都有美洲獅的身影。它是新大陸上體型第二大的貓科動物,僅次於美洲豹,同時它是奔跑第二快的貓科和彈跳最好的貓科。由於其生性隱秘且獨居,美洲獅被認為是夜行性兼曙暮性動物,然而美洲獅的日間活動也曾被目擊。在生物學分類上,美洲獅在貓科中屬於貓亞科(包括獵豹,家貓等),而不是更大型的豹亞科(包含獅、虎、豹、美洲豹等)。",
"(學名:Procyonidae)是食肉目下的一個科,包括浣熊、長鼻浣熊、蜜熊等,熊通常重5.5到9.5公斤,但有記載的最重的可達28公斤。眼睛周圍為黑色,尾有5-6個黑色環紋,體長65至75厘米,尾長約25厘米,皮毛的大部分為灰色,也有部分為棕色和黑色。也有罕見的白化種。浣熊是夜行性動物。雜食性,食物有水果、昆蟲、鳥蛋和其他小動物。雖然是野生動物,但浣熊非常適應人類城市的生活,有些族群以都市為棲地,生活在近郊的浣熊常會潛入人類住處偷竊食物,加上眼睛週遭的黑色條紋特徵,因此被稱為「小偷熊貓」(panda thief)。浣熊的交配季節為1或2月,在4或5月產下幼子(受天氣影響),一胎4至5個。其一般住在樹洞、地洞或山洞中。幼仔夏末就能斷奶,開始獨立生活。浣熊並不冬眠,但嚴寒的冬季會躲起來。浣熊一般只能生活幾年,野生的已知最長壽命為12年。",
"(學名:Phascolarctos cinereus),中國大陸叫樹袋熊、考拉(英語:Koala),香港叫樹熊,是澳洲的特有種有袋類動物,全世界僅分布在澳洲的東部昆士蘭州、新南威爾斯、南澳州和維多利亞地區低海拔、不密集的桉樹林中。無尾熊身體長約70至80厘米左右,成年體重8至15公斤,性情溫馴,體態憨厚,長相很像小熊,有一身又厚又軟的濃密灰褐色短毛,胸部、腹部、四肢內側和內耳皮毛呈白色,生有一對大耳朵,耳有茸毛,鼻子裸露且扁平,無尾熊有尾巴,但屬尾椎殘餘,只有約3.5公分長 ,這是因為它順的尾巴經過漫長的歲月已經退化成一個「座墊」,因而能長時間舒適地坐在樹上。它四肢粗壯,利爪長而彎曲,它的爪尖利,每隻五趾分為兩排,一排為二,一排為三,善於攀樹,且多數時間待在高高的樹上,就連睡覺也不下來。以尤加利樹葉和嫩枝為食,因為無尾熊從尤加利樹葉中得到了足夠的水分。這和它的生活環境有關,它的棲息地土所居住的澳大利亞森林大多是尤加利樹所組成的,使得無尾熊可取得的食物僅限於尤加利樹樹葉。",
"(學名:Geochelone)在生物分類學上是陸龜科象龜屬的俗稱。象龜分佈於非洲到亞洲。該屬下線僅有2個種:印度星龜(Geochelone elegans)緬甸星龜(Geochelone platynota)",
"(學名:Hystrix)是齧齒目豪豬科的一屬又稱箭豬,是一類披有尖刺的齧齒目,可以用來防禦掠食者。豪豬是齧齒目中體型第三大的,僅次於水豚及河狸,但與刺蝟不同。大部份豪豬約長60—90公分,尾巴長20—25公分,重5—16公斤。牠們圓潤及行動緩慢。豪豬有褐色、灰色及白色。不同豪豬物種的刺有不同的形狀,不過所有都是改變了的毛髮,表面上有一層角質素,嵌入在皮膚的肌肉組織。舊大陸豪豬(豪豬科)的刺是一束束的,而新大陸豪豬(美洲豪豬科)的刺則是與毛髮夾雜在一起。豪豬的刺銳利,很易脫落,會刺入攻擊者中。牠們的刺有倒鉤,可以掛在皮膚上,很難除去。牠們的刺長75公釐及闊2公釐。若刺鉤在攻擊者的組織上,在正常的肌肉運動下,倒鉤會令刺插得更深,每日可以深入約幾公釐。曾有掠食者因被刺刺中及感染而死去,在死去後刺仍會繼續嵌入體內。古代相信豪豬可以擲出牠們刺來攻擊敵人,但其實是錯誤的。",
"(學名:Strigiformes)梟、貓頭鷹,是鴞形目(的鳥類。鴞形目是鳥綱中的目。眼睛大,嘴短而粗壯前端成鉤狀。相對於頭部碩大的雙目均向前是本目鳥類共有且區別於其他鳥類的特徵,頭部正面的羽毛排列成面盤,部分種類具有耳狀羽毛。鴞形目在除南極洲以外所有的大洲都有分布,其中大部分物種為夜行性肉食性動物。貓頭鷹在西方的愛琴海和基督教文化中是「幸運、智慧」的象徵,而在中國文化中卻有「厄運、恐怖」的意義,這恰巧與蝙蝠在中西文化中的定位正好相反。"
];

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function ChangeMap (state){
  document.getElementById("tourElephone").classList.remove("tourDisplayNone");
  document.getElementById("hotno1").classList.add("tourDisplayNone");
  document.getElementById("iceno2").classList.add("tourDisplayNone");
  document.getElementById("iceno3").classList.add("tourDisplayNone");
  sleep(2000).then(r => {
    document.getElementById("tourElephone").classList.add("tourDisplayNone");
  })
  for (let i = 1; i <= 8; i++){
    document.getElementById("Centerig"+i).src = "/img/tour/"+state+"/0"+i+".jpg";
    document.getElementsByClassName('figure')[i-1].setAttribute('id',state);
  }
  if (state === "hot") {
    for(let i=0; i<hot.length; i++){
      document.getElementById("CenterigCN"+(i+1)).innerHTML=hot[i];
      document.getElementById("CenterigEN"+(i+1)).innerHTML=hotEN[i];
    }
    document.getElementById("TourDescriptionpic1").src = "/img/tour/"+state+"/01.jpg";
    document.getElementById("TourDescriptionTitle").innerHTML=hot[0];
    document.getElementById("TourDescriptionText").innerHTML=HotDescriptions[0];
  }
  if (state === "Ocean") {
    for(let i=0; i<Ocean.length; i++){
      document.getElementById("CenterigCN"+(i+1)).innerHTML=Ocean[i];
      document.getElementById("CenterigEN"+(i+1)).innerHTML=OceanEN[i];
    }
    document.getElementById("TourDescriptionpic1").src = "/img/tour/"+state+"/01.jpg";
    document.getElementById("TourDescriptionTitle").innerHTML=Ocean[0];
    document.getElementById("TourDescriptionText").innerHTML=oceanDescriptions[0];
  }
  if (state === "nocturnal") {
    for(let i=0; i<nocturnal.length; i++){
      document.getElementById("CenterigCN"+(i+1)).innerHTML=nocturnal[i];
      document.getElementById("CenterigEN"+(i+1)).innerHTML=nocturnalEN[i];
    }
    document.getElementById("TourDescriptionpic1").src = "/img/tour/"+state+"/01.jpg";
    document.getElementById("TourDescriptionTitle").innerHTML=nocturnal[0];
    document.getElementById("TourDescriptionText").innerHTML=nocturnalDescriptions[0];
  }  
  if (state === "ice") {
    for(let i=0; i<ice.length; i++){
      document.getElementById("CenterigCN"+(i+1)).innerHTML=ice[i];
      document.getElementById("CenterigEN"+(i+1)).innerHTML=iceEN[i];
    }
    document.getElementById("TourDescriptionpic1").src = "/img/tour/"+state+"/01.jpg";
    document.getElementById("TourDescriptionTitle").innerHTML=ice[0];
    document.getElementById("TourDescriptionText").innerHTML=IceDescriptions[0];
  }   
}
function ChangeDescription (i){
  let state = document.getElementsByClassName('figure')[i-1].attributes['id'].nodeValue;
  if (state === "ice") {
    document.getElementById("TourDescriptionpic1").src = "/img/tour/"+state+"/0"+i+".jpg";
    document.getElementById("TourDescriptionTitle").innerHTML=ice[i-1];
    document.getElementById("TourDescriptionText").innerHTML=IceDescriptions[i-1];
  }
  if (state === "hot") {
    document.getElementById("TourDescriptionpic1").src = "/img/tour/"+state+"/0"+i+".jpg";
    document.getElementById("TourDescriptionTitle").innerHTML=hot[i-1];
    document.getElementById("TourDescriptionText").innerHTML=HotDescriptions[i-1];
  }
  if (state === "nocturnal") {
    document.getElementById("TourDescriptionpic1").src = "/img/tour/"+state+"/0"+i+".jpg";
    document.getElementById("TourDescriptionTitle").innerHTML=nocturnal[i-1];
    document.getElementById("TourDescriptionText").innerHTML=nocturnalDescriptions[i-1];
  }
  if (state === "Ocean") {
    document.getElementById("TourDescriptionpic1").src = "/img/tour/"+state+"/0"+i+".jpg";
    document.getElementById("TourDescriptionTitle").innerHTML=Ocean[i-1];
    document.getElementById("TourDescriptionText").innerHTML=oceanDescriptions[i-1];
  }
}
function showdescription(i){
  let showstateno = [false,false,false,false,false,false,false,false];
  let showstatus = [false, false, false,false];
  let state = document.getElementsByClassName('figure')[i-1].attributes['id'].nodeValue;
  switch (state) {
    case "hot" : 
      showstatus[0] = true;
      break;
    case "ice" : 
      showstatus[1] = true;
      break;
    case "Ocean" :
      showstatus[2] = true;
      break;
    case "nocturnal" :
      showstatus[3] = true;
      break; 
    default :
      break;
  }
  showstateno[i-1] = true;
  document.getElementById("hotno1").classList.add("tourDisplayNone");
  document.getElementById("iceno2").classList.add("tourDisplayNone");
  document.getElementById("iceno3").classList.add("tourDisplayNone");

  if(showstateno[0] && showstatus[0]){
    document.getElementById("hotno1").classList.remove("tourDisplayNone");
  }
  if(showstateno[1] && showstatus[1]){
    document.getElementById("iceno2").classList.remove("tourDisplayNone");
  }
  if(showstateno[2] && showstatus[1]){
    document.getElementById("iceno3").classList.remove("tourDisplayNone");
  }
}

function CarouselShow1 (){
  const tourmap = useRef();
    return(<>
      <div className="tour_Group">
        <div className="tourGuide1">
            <div className="tourtextArea1">
                <h2 className="tourH2">Jungle Tour</h2>
                <p className="tourP1">園區導覽</p>
            </div>
            <div>
            <img src="/img/home/tropicalmap.svg" alt="" ref={tourmap} />
            </div>
        </div>
        <div className="ele-container tourDisplayNone" id="tourElephone">
      <div  className="tourbackground2">
        <div className="ele-wrapper">
            <div className="ele-tail"></div>
            <div className="ele-body">
                <div className="ele-head">
                    <div className="ele-eyebrows"></div>
                    <div className="ele-eyes"></div>
                    <div className="ele-mouth"></div>
                    <div className="ele-fang-front"></div>
                    <div className="ele-fang-back"></div>
                    <div className="ele-ear"></div>
                </div>
            </div>
            <div className="ele-leg-1 ele-leg-back">
                <div className="ele-foot"></div>
            </div>
            <div className="ele-leg-2 ele-leg-front">
                <div className="ele-foot"></div>
            </div>
            <div className="ele-leg-3 ele-leg-back">
                <div className="ele-foot"></div>
            </div>
            <div className="ele-leg-4 ele-leg-front">
                <div className="ele-foot"></div>
            </div>
        </div>
      </div>  
  </div>
        <div className="tourGuide2">
            <figure className="tourR1img">
              <img src="/img/home/tropical.jpg" alt="#/" 
                  onMouseMove={()=>{tourmap.current.src =
                  "/img/home/tropicalmap.svg"}}
                  onClick={()=>{ChangeMap("hot")}}
              /> 
              <figcaption>熱帶雨林</figcaption>
            </figure>
            <figure className="tourR2img">
              <img src="/img/home/Ocean.jpg" alt="#/" 
                  onMouseMove={()=>{tourmap.current.src =
                  "/img/home/Oceanmap.svg"}} 
                  onClick={()=>{ChangeMap("Ocean")}}
              /> 
              <figcaption>海底世界</figcaption>
            </figure>
            <figure className="tourR3img">
              <img src="/img/home/nocturnal.jpg" alt="#/" 
                  onMouseMove={()=>{tourmap.current.src =
                  "/img/home/nocturnalmap.svg"}}
                  onClick={()=>{ChangeMap("nocturnal") }}
              />
              <figcaption>夜行動物</figcaption>
            </figure>
            <figure className="tourR4img">
              <img src="/img/home/ice.jpg" alt="#/"
                  onMouseMove={()=>{tourmap.current.src =
                "/img/home/icemap.svg"}} 
                onClick={()=>{ChangeMap("ice") }}
                /> 
              <figcaption>冰原歷險</figcaption>
            </figure>
        </div>
      </div>
      <div style={{height:'100%',width:'100%'}} className="CarouselShow" >
    <Carousel cols={4} gap={20}>
      <Carousel.Item>
      <div className="tourCenterCard">
            <div className="figure" id='hot'
            onClick={()=>{ChangeDescription(1);showdescription(1)}}>
              <img src="/img/tour/hot/01.jpg"  id="Centerig1" alt="#/"/>
            </div>   
            <h3 className="tourCardTwoText" id="CenterigCN1" >亞洲象</h3> 
            <span className="tourCenterText" id="CenterigEN1">(Elephas maximus)</span>   
          </div>
      </Carousel.Item>
      <Carousel.Item>
      <div className="tourCenterCard">
            <div className="figure" id='hot'
              onClick={()=>{ChangeDescription(2);showdescription(2)}}>
              <img src="/img/tour/hot/02.jpg" id="Centerig2" alt="#/"/>
            </div>   
            <h3 className="tourCardTwoText" id="CenterigCN2">鯨頭鸛</h3> 
            <span className="tourCenterText" id="CenterigEN2">(Shoebill)</span>   
          </div>
      </Carousel.Item>
      <Carousel.Item>
      <div className="tourCenterCard">
            <div className="figure" id='hot'
              onClick={()=>{ChangeDescription(3);showdescription(3)}}>
              <img src="/img/tour/hot/03.jpg" id="Centerig3" alt="#/" />
            </div>   
            <h3 className="tourCardTwoText" id="CenterigCN3" >水豚</h3> 
            <span className="tourCenterText" id="CenterigEN3">(Capybara)</span>   
          </div>
      </Carousel.Item>
      <Carousel.Item>
      <div className="tourCenterCard">
            <div className="figure" id='hot'
            onClick={()=>{ChangeDescription(4);showdescription(4)}}>
              <img src="/img/tour/hot/04.jpg" id="Centerig4" alt="#/" />
            </div>   
            <h3 className="tourCardTwoText" id="CenterigCN4">馬來膜</h3> 
            <span className="tourCenterText" id="CenterigEN4">(Malayan Tapir)</span>   
          </div>
      </Carousel.Item>
      <Carousel.Item>
      <div className="tourCenterCard">
            <div className="figure" id='hot'
            onClick={()=>{ChangeDescription(5);showdescription(5)}}>
              <img src="/img/tour/hot/05.jpg" id="Centerig5" alt="#/" />
            </div>   
            <h3 className="tourCardTwoText" id="CenterigCN5">大猩猩</h3> 
            <span className="tourCenterText" id="CenterigEN5" >(Gorilla)</span>   
          </div>
      </Carousel.Item>
      <Carousel.Item>
      <div className="tourCenterCard">
            <div className="figure" id='hot'
            onClick={()=>{ChangeDescription(6);showdescription(6)}}>
              <img src="/img/tour/hot/06.jpg" id="Centerig6" alt="#/" />
            </div>   
            <h3 className="tourCardTwoText" id="CenterigCN6" >彩虹巨嘴鳥</h3> 
            <span className="tourCenterText" id="CenterigEN6">(Ramphastos sulfuratus)</span>   
          </div>
      </Carousel.Item>
      <Carousel.Item>
      <div className="tourCenterCard">
            <div className="figure" id='hot'
            onClick={()=>{ChangeDescription(7);showdescription(7)}}>
              <img src="/img/tour/hot/07.jpg" id="Centerig7" alt="#/" />
            </div>   
            <h3 className="tourCardTwoText" id="CenterigCN7">樹懶</h3> 
            <span className="tourCenterText" id="CenterigEN7">(Folivora)</span>   
          </div>
      </Carousel.Item>
      <Carousel.Item>
      <div className="tourCenterCard">
            <div className="figure" id='hot'
            onClick={()=>{ChangeDescription(8);showdescription(8)}}>
              <img src="/img/tour/hot/08.jpg" id="Centerig8" alt="#/" />
            </div>   
            <h3 className="tourCardTwoText" id="CenterigCN8">穿山甲</h3> 
            <span className="tourCenterText" id="CenterigEN8">(Manidae)</span>   
          </div>
      </Carousel.Item>
    </Carousel>
      </div>
      <div className="tourdescription">
        <div className="tourdescriptiongGuild">
          <div className="tourdescriptionGuild1">
            <div className="tourdescriptionpic">
            <img src="/img/tour/Elephant.jpg"  id="TourDescriptionpic1" alt="#/"/>
            </div>
          </div>
          <div className="tourdescriptionGuild2">
            <div className="tourdescriptionGuild2Text">
          <h2 id="TourDescriptionTitle" >亞洲象</h2>
          <p id="TourDescriptionText">學名:Elephas maximus),是象的一種,

                  錫蘭象是亞洲象的指名亞種。亞洲象為IUCN紅色名錄中的瀕

                  危物種之一,也是中國國家一級保護動物

                  亞洲象主要棲息地,為東南亞和南亞這些熱帶地區的印度、

                  尼泊爾、斯里蘭卡、緬甸、泰國、越南、印尼和馬來西亞等

                  十三個國家,大約四十四萬平方公里的土地上。古代從西亞

                  的兩河流域,往東延伸到中國的黃河流域,都曾經有牠們活

                  躍的蹤影。現今中國境內其自然棲息地自清朝以後就被壓縮

                  到雲南無量山、哀牢山以南的西雙版納、普洱和臨滄一帶。不過近年

                  來其活動北界可達玉溪、昆明之間。</p>
            </div>
            <div className="tourdescriptionGuild2Icon">
              <div className="tourdescriptionGuild2Iconbox"> 
                  <div className="tourdescriptionGuild2Icon1"></div>
                  <div className="tourdescriptionGuild2Icon2"></div>
                  <a href="/activity">
                  <button className="touradoptbtn btn" style={{color: "white"}}>我要認養！</button> </a>       
              </div>
            <div> 
          </div> 
            </div>
        </div>
        </div> 
      </div>

      <div id="hotno1" className= "tourDisplayNone tour_showBooking_area">
        <div className="tourGuide1">
            <div className="tourtextArea1">
                <h2 style={{color: "black"}} className="tourH2">Jungle Tour</h2>
                <p style={{color: "black"}} className="tourP1">園區導覽</p>
            </div>
        </div>
        <div className="tourwrap">
        <div className="Touritem">
            <img src="/img/tour/an1.jpeg" alt=""/>
          <div className="txt">
            <h2>一個美麗的牧群</h2>
            <p>Pyi Mai 和她的母親 Kham Moon 與嬰兒 Chaba、Bun Ma</p>
          </div>
        </div>
        <div className="Touritem">
          <img src="/img/tour/010-elephant-sky-walk-single-day-visit15737371131884.jpeg" alt=""/>
          <div className="txt">
            <h2>大象空中步道 - 單日遊</h2>
            <p>享受一整天的大象自然公園之旅，包括參加我們特別的“Hands Off”項目。觀察我們獲救的大像生活在他們選擇的象群中，了解他們的個人歷史。</p>
        </div>
        </div>
        <div className="Touritem">
            <img src="./img/tour/GluayHom_5.jpeg" alt=""/>
          <div className="txt">
            <h2>公牛大象膠坎</h2>
            <p>Gluay Hom 是一個 10 歲的男性，在幼年時，Gluay Hom 與他的母親分開，被訓練成馬戲團的大象。</p>
          </div>
        </div>     
        <div className="Touritem">
          <img src="/img/tour/CareForElephants_18.jpeg" alt="＃/"/>
          <div className="txt">
            <h2>為什麼我們要照顧大象？</h2>
            <p>大象有很多健康問題，尤其是老大象掉牙的時候。牙齒脫落是死亡的主要原因。隨著最後一顆臼齒開始分解，咀嚼和消化食物變得越來越困難。處於這種困境的大象經常死於飢餓或營養不良。</p>
          </div>
        </div>
        </div>
      </div>
      <div id="iceno2" className= "tourDisplayNone tour_showBooking_area">
        <div className="tourGuide1">
            <div className="tourtextArea1">
                <h2 style={{color: "black"}} className="tourH2">Jungle Tour</h2>
                <p style={{color: "black"}} className="tourP1">園區導覽</p>
            </div>
        </div>
        <div className="tourwrap">
        <div style={{width: "50%", height:"50%"}}className="Touritem Touritem1">
            <img style={{}}src="/img/tour/p6CVo6abkKGY.gif" alt=""/>
        </div>
        <div style={{width: "50%", height:"50%"}}className="Touritem Touritem1">
        <div className="txt1">
            <h2 style={{color:'#f9b112'}}>捕食</h2>
            <p style={{color: "black",whiteSpace:'break-spaces'}} >當北極狐聞到在窩裡的旅鼠氣味或聽到旅鼠的尖叫聲時，它會迅速地挖掘位於雪下面的旅鼠窩。
            等到扒得差不多時，北極狐會突然高高跳起，借著躍起的力量，用腿將雪做的鼠窩壓塌，將一窩旅鼠一網打盡，逐個吃掉它們。
            </p>
          </div>
        </div>
        </div>
      </div>
      <div id="iceno3" className= "tourDisplayNone tour_showBooking_area">
        <div className="tourGuide1">
            <div className="tourtextArea1">
                <h2 style={{color: "black"}} className="tourH2">Jungle Tour</h2>
                <p style={{color: "black"}} className="tourP1">園區導覽</p>
            </div>
        </div>
        <div style={{flexWrap:'wrap',high:'150vh'}} className="tourwrap">
        <div style={{width:'50%'}} className="Touritem">
            <img style={{objectFit:'cover', objectPosition:'50%'}}
            src="/img/tour/ice/001.jpg" alt=""/>
          <div className="txt">
            <h2>北極熊</h2>
            <p>唯一一種比其他種類的熊更長並且具有適合游泳的流線型的海熊。因為北極冰是多刺的，所以它有毛來保護腳底。它還具有防止滑倒和保護雙腳免受低溫影響的作用。</p>
          </div>
        </div>
        <div style={{width:'50%'}} className="Touritem">
        <img style={{objectFit:'cover', objectPosition:'55%'}}
            src="/img/tour/ice/002.jpg" alt=""/>
          <div className="txt">
            <h2>北極熊</h2>
            <p>一般在動物園裡看到的北極熊都是在水池裡游泳或是在岸上走來走去的模樣，餵食秀可是不能錯過的熱門節目，可以看見北極熊元氣滿滿地潛入水中覓食的模樣。</p>
        </div>
        </div>
        <div style={{width:'50%'}}  className="Touritem">
        <img style={{objectFit:'cover', objectPosition:'55%'}}
            src="/img/tour/ice/003.jpeg" alt=""/>
          <div className="txt">
            <h2>貝殼之眼</h2>
            <p>感覺就好像變成小海豹一樣偷偷觀察天敵北極熊的</p>
          </div>
        </div>     
        <div style={{width:'50%'}} className="Touritem">
        <img style={{objectFit:'cover', objectPosition:'55%'}}
            src="/img/tour/ice/005.jpeg" alt=""/>
          <div className="txt">
            <h2>餵食秀</h2>
            <p>這天的餵食秀是11點開始，在餵食秀開始15分鐘前過來的話能夠卡到不錯的欣賞位置。</p>
          </div>
        </div>
        </div>
      </div>

</>)
}
const rootElement = document.getElementById('root')
ReactDOM.render(<CarouselShow1 />, rootElement)
export default CarouselShow1
