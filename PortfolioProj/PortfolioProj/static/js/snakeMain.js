//物件設計
// snake (bodyXY=[{},{}...]座標矩陣,dir目前方向,render()將自己渲染在畫面中,eat()吃食物,move()蛇移動,turn(dir)蛇轉向,)
// snake建構式   
class Snake {
    constructor(x, y) {
        this.bodyXY = [{ x: 2, y: 10 }];
        this.dir = 'right';
        this.dirChangeCount = 0;
        this.speed = 0.3;
    }
    set head(xy) {
        this.bodyXY[0] = xy;
    };
    get head() {
        return this.bodyXY[0];
    }
    render() {
        const board = document.getElementById('grid-board');
        [...document.getElementsByClassName('snake')].forEach(ele => { ele.remove() });
        this.bodyXY.forEach(function (xy) {
            let bodyStr = ` <div class="snake" style="grid-column: ${xy.x} / ${xy.x} ;  grid-row: ${xy.y} / ${xy.y} ;"></div> `;
            board.innerHTML += bodyStr;
        })
    }
    move() {
        //利用dir 取得新座標 


        this.bodyXY.forEach((xy, i) => {

            if (i < this.bodyXY.length - 1) {
                this.bodyXY[this.bodyXY.length - i - 1] = { ...this.bodyXY[this.bodyXY.length - i - 2] };
            }
        })
        if (this.dir == 'right' || this.dir == 'left') {

            this.bodyXY[0] = { x: this.bodyXY[0].x + (this.dir == 'right' ? 1 : -1), y: this.bodyXY[0].y };
        }
        else {
            this.bodyXY[0] = { x: this.bodyXY[0].x, y: this.bodyXY[0].y + (this.dir == 'up' ? -1 : 1) };
        }



    }
    checkBodyIsOutSide() {
        //判斷 this.head.x>21||this.head.x<0||this.head.y>21||this.head.y<0?
        return this.head.x > 21 || this.head.x < 1 || this.head.y > 21 || this.head.y < 1

    }
    turnTo(dir) {
        //確認是否合法
        if (this.dir == 'right' || this.dir == 'left') {
            if (dir == 'right' || dir == 'left') { }
            else {
                this.dir = dir + '';
               
            }            
          
        }
        else {                      
            if (dir == 'up' || dir == 'down') { }
            else {
                this.dir = dir + '';
                
            }
        }
         

    }
    speedUp() { 
        this.speed = this.speed * 0.95;
    }
    eat(food) {
        //console.log('food.bodyXY.x:',food.bodyXY.x,',this.head.x:',this.head.x)
        if (food.bodyXY.x == this.head.x && food.bodyXY.y == this.head.y) {
            console.log('init!!');
            this.bodyXY.push({ x: this.bodyXY[this.bodyXY.length - 1].x, y: this.bodyXY[this.bodyXY.length - 1].y });
            document.getElementById('food').remove();
            snake.speedUp();
            const gameCenterHTML = `Snake Speed：${Math.round(1 / snake.speed * 10) / 10} (cell/sec)`;
            document.getElementById('gameCenter').style = 'display:block';
            document.getElementById('gameCenter').innerHTML =gameCenterHTML;
            
            
        }
      
    }
    isHeadInBd() { 
        //bodyXY除head之外，都拿出來比較
        let InBd=false;
        this.bodyXY.forEach((ele,i)=>{
               if(i!=0&&ele.x==this.head.x&&ele.y==this.head.y){
                  InBd=true;
               }
               
        }) 
        return InBd        
    }
}
class Food {
    constructor() {
        this.bodyXY = { x:NaN , y: NaN};

    }
    
    bodyUpdate(snake) {
        this.bodyXY = { x: Math.floor(Math.random()*21)+1, y: Math.floor(Math.random()*21)+1 };
        let isInSnake = false;
        snake.bodyXY.forEach(xy => {
            if (xy.x == this.bodyXY.x && xy.y == this.bodyXY.y) {
                isInSnake = true;
                
            }
        })
        if (isInSnake) { this.bodyUpdate(snake) }
        else { return }
    }
    render(snake) {
        const board = document.getElementById('grid-board');
        if (!document.getElementById('food')) {
            this.bodyUpdate(snake);                    
            const bodyStr = ` <div id="food" class="food" style="grid-column: ${this.bodyXY.x} / ${this.bodyXY.x} ;  grid-row: ${this.bodyXY.y} / ${this.bodyXY.y} ;"></div> `;
            board.innerHTML += bodyStr;
            
        }
        else {
            console.log('already food');
        };
    }
}


let i = 0;
let renderTime = 0;
const snake = new Snake(10, 10);
const food = new Food();
window.addEventListener('keydown', e => {
    if (snake.dirChangeCount > 0) {  }
    else{
    snake.dirChangeCount++;
    switch (e.key) {
        case 'ArrowUp':
            snake.turnTo('up');
            break;
        case 'ArrowDown':
            snake.turnTo('down');
            break;
        case 'ArrowLeft':
            snake.turnTo('left');
            break;
        case 'ArrowRight':
            snake.turnTo('right');
            break;

        }
    }
});
function repeat(currentTime) {    
    //if reach interval
    if ((currentTime - renderTime) > snake.speed * 1000) {
        //1.Update block    
        snake.move();
        if (snake.checkBodyIsOutSide()||snake.isHeadInBd()) {
            if (confirm('game over,press ok to restart!')) {
                window.location.reload();
            }
            return
        }; 
        snake.render();
        snake.eat(food);
        food.render(snake);
        snake.dirChangeCount=0;        
        //2.time setting
        renderTime = currentTime + 0;
        if (i == 0) { alert('Use Arrow Key(↑、↓、←、→) To Change Snake Direction '); };
        i++;        
        window.requestAnimationFrame(repeat);
    }    
    else {
        window.requestAnimationFrame(repeat);
        return
    };
}
window.requestAnimationFrame(repeat);


