glide = {};
//區塊1:宣告class與function  
    class Portfolio {
        constructor() {
            this.idList = { //1.放入跟Modal有關的，待操作的元素Id
                buttonContainer: 'catalog-item-outside',
                firstFloorImg: 'catalog-items-image',
                secondFloorImg: 'catalog-image-second-floor',
                title: 'catalog-items-title',
                seeMore: 'catalog-image-hover',
                modal: 'myModal',
                modalDialog: 'modal-dialog-control',
                icon: 'catalog-detail-icon',
                detailTitle: 'catalog-detail-title',
                subTitle: 'catalog-detail-subtitle',
                connect: 'catalog-detail-connect',
                footer: 'modal-footer',
                intro: 'catalog-detail-intro'
            };
            this.classList = {  //2.放入跟Modal有關的，待操作的元素class
                buttonClicked: 'catalog-item-click',
                modalBg: 'modal-backdrop',
                glide: 'glide__slides'
            }

            this.projects = [  //3.放入project相關資訊
                {
                    projId: 'projB1', buttonName: 'Css<br>[Bootstrap]', title: 'NTD Company Website Draft', subTitle: 'CSS Web Design', url: 'http://157.230.90.126/', firstFloorImg: '/static/NTDHomePage.PNG', secondFloorImg: '/static/NTDWebMark4.svg', icon: '/static/css_logo2.svg',
                    intro: `(For Computer User/No RWD)NTD is an engineering consultant company in New York.
                        The owner ,Li Yuan Lin had commissioned me to design
                        their company website. The website is built as a
                        static website by bootstrap ,and refer python django frame
                        as the backend tool. After the draft finished
                        ,this website had been updated to digital ocean’s server.`,
                    detailImgList: ['/static/NTDHomePage.PNG', '/static/NTDAbout.PNG', '/static/NTDService.PNG', '/static/NTDContact.PNG']
                },
                {
                    projId: 'projB2', buttonName: 'Javascript<br>[Plain]', title: 'Snake Game', subTitle: 'Js game design', url: '/snake', firstFloorImg: '/static/snakeTitleImg.png', secondFloorImg: '/static/jsIcon.svg', icon: '/static/jsIcon.svg',
                    intro: `(Only For Computer User)A classic snake game created by plain JavaScript (no libraries or frameworks)!
                    The game loop is designed by "requestAnimationFrame()".
                    Please use Arrow key (↑、↓、←、→) to control snake direction.
                        The speed of the snake will increase after it eats food(yellow cell).`,
                    detailImgList: ['/static/snakeCode.PNG', '/static/snakeTitleImg.png', '/static/snakeCode.PNG', '/static/snakeTitleImg.png']
                },
                {
                    projId: 'projB3', buttonName: 'Javascript<br>[Axios]', title: 'Get Your IP!', subTitle: 'Js axios response', url: '/getip', firstFloorImg: '/static/getip/getip3.png', secondFloorImg: '/static/jsIcon.svg', icon: '/static/jsIcon.svg',
                    intro: `Get Your IP! is a web app that can get your IP information(IP Address、Country、City、Timezone).
                    This app is built by ipinfo.io(https://ipinfo.io/) service which get response via “Axios”.`,
                    detailImgList: ['/static/getip/getip3.png', '/static/getip/getipCode.PNG', '/static/getip/getip3.png', '/static/getip/getipCode.PNG']
                },
                {
                    projId: 'projB4', buttonName: 'Python<br>[Numpy]', title: 'New RC-PM', subTitle: 'Developed By Python Numpy', url: 'https://newrcpm.com/', firstFloorImg: '/static/newrcpm/pmcurve.png', secondFloorImg: '/static/newrcpm/python.svg', icon: '/static/newrcpm/python.svg',
                    intro: `(For Computer User/No RWD)Nec RC-PM is a web app created based on python numpy library, and is used to analysis the P-M curve of RC & New RC column. This app also use chart.js to plot the P-M curve diagram. Currently, all service in this app are free!`,
                    detailImgList: ['/static/newrcpm/newrcpm.PNG', '/static/newrcpm/pmcurve.png', '/static/newrcpm/newrcpm.PNG', '/static/newrcpm/pmcurve.png']
                }
            ];

        }
        findProj(id) {     //4.透過input的id ，找到對應的project 
            let proj;
            this.projects.forEach((ele, i) => {
                if (ele.projId == id) {
                    proj = { ...ele };
                }
            })
            return proj
        }
        renderButton() {  //5.渲染出project的按鈕 
            this.projects.forEach((ele, i) => {
                const str = `<div id="${ele.projId}" >${ele.buttonName}</div> `;
                $('#' + this.idList.buttonContainer).append(str);
            })
        }
        renderTitle(id) { //6.渲染出project的標題
            const proj = this.findProj(id);
            $('#' + this.idList.title).html(proj.title);

        }        
        renderImg(id) {  //7.渲染出project圖片
            const proj = this.findProj(id);
            const strFirstFloorImg = `<img src="${proj.firstFloorImg}" >`;
            const strSecondFloorImg = `<img src="${proj.secondFloorImg}" >`;
            if ($('#' + this.idList.firstFloorImg + '>img')) { $('#' + this.idList.firstFloorImg + '>img').remove() };
            if ($('#' + this.idList.secondFloorImg + '>img')) { $('#' + this.idList.secondFloorImg + '>img').remove() };
            $('#' + this.idList.firstFloorImg).append(strFirstFloorImg);
            $('#' + this.idList.secondFloorImg).append(strSecondFloorImg);
            $('#' + this.idList.seeMore).attr('data-id', id);
        }
        renderModal(id) {  //8.渲染出彈出式視窗
            console.log('renderModal');
            const proj = this.findProj(id);
            $('#' + this.idList.modal).modal('show');
            const modalBg = $('.' + this.classList.modalBg)[0];
            $('#' + this.idList.modalDialog).append(modalBg);
            //icon
            $('#' + this.idList.icon).attr('src', proj.icon);
            //title
            $('#' + this.idList.detailTitle).html(proj.title);
            //subtitle
            $('#' + this.idList.subTitle).html(proj.subTitle);
            //view connect: 'catalog-detail-connect',
            $('#' + this.idList.connect).attr('href', proj.url);
            //paragraph
            const paraStr = `${proj.intro}[<a href="#" onclick="document.getElementById('catalog-detail-connect').click()"  target="_blank">Visit!</a>]`;
            $('#' + this.idList.intro).html(paraStr);
            //detailImgList           
            proj.detailImgList.forEach((ele, i) => {
                $(`.g${i}>div>img`).attr('src', proj.detailImgList[i]);
            });


        }
        buttonClicked(id = this.projects[0].projId) {  //9.被按的按鈕改class
            $('#' + this.idList.buttonContainer + '>div').removeClass(this.classList.buttonClicked);
            $('#' + id).addClass(this.classList.buttonClicked);
        }
    }
    
    //對彈出式視窗設置彈出時監聽事件
    mountCount = 0;
    glide = {};    
    observer = new IntersectionObserver(function (entries) {
            // isIntersecting is true when element and viewport are overlapping
            // isIntersecting is false when element and viewport don't overlap        
            if (entries[0].isIntersecting === true)
                console.log('#glide width:' + $('#glide').width());
            if (mountCount == 1) {
                glide = new Glide(`#glide`, {
                    type: "carousel",
                    perView: 1
                }).mount();
            }

            const slideWidth = $('.catalog-detail-slide').width();
            const slideHeight = $('.catalog-detail-slide').height();

            [...$('.glide__slide div').get()].forEach((ele) => {
                ele.style.width = `${slideWidth}px`;
                ele.style.height = `${slideHeight}px`;
            })

            if ($(`.glide__slide`).width() == 0) {
                console.log("width==0");
                glide.mount();
                const cloneLen = [...$(`.glide__slide--clone`).get()].length;
                [...$(`.glide__slide--clone`).get()].forEach((ele, i) => {
                    if (i != 0 && i != cloneLen - 1) {
                        $(ele).remove();
                    }

                })
            }
            mountCount++;
        }, { threshold: [0] });

    function eleToCenterTop(id) {
        var topStr = (parseInt(document.getElementById(id).parentNode.clientHeight) - parseInt(document.getElementById(id).clientHeight)) * 0.5;
        document.getElementById(id).style.top = topStr.toString() + 'px';

    };

    function eleToCenterLeft(id) {
        var leftStr = (parseInt(document.getElementById(id).parentNode.clientWidth) - parseInt(document.getElementById(id).clientWidth)) * 0.5;
        document.getElementById(id).style.left = leftStr.toString() + 'px';

    };

    function debug(doDebug) {
        var divEles = document.getElementsByTagName('div')
        if (doDebug) {
            var i;
            for (i = 0; i < divEles.length; i++) {
                console.log(divEles[i].className += " debug");
            }
        }
    }


//區塊2:頁面初始化
function initialize(isFirstTime = true) {
        //初次初始化
        if (isFirstTime) {
            //動畫播放
            anime({
                targets: '#portfolio',
                translateY: -840,
                easing: 'cubicBezier(.5, .05, .1, .3)',
            });
            anime.timeline({}).add({
                targets: '#ryanTsaiSvg path',
                duration: 2000,
                strokeDashoffset: [anime.setDashoffset, 0],
                easing: 'easeInOutQuad',
                direction: 'alternative',
            }).add({
                targets: '#ryanTsaiSvg path',
                duration: 500,
                keyframes: [{ fill: 'rgb(255,255,255)' }],
                easing: 'easeInOutQuad',
                direction: 'alternative',
                delay: function (el, i) {
                    return i * 250
                }
            });
            //初始化myfullpage
            myfullpage = new fullpage('#fullpage', { autoScrolling: true });
            fullpage_api.setAllowScrolling(true);
            $('#catalog-section').attr('style', '');
            //初始化portfolio
            portfolio = new Portfolio();
            portfolio.renderButton();
        };
    
        //將首頁主要元素移至視窗中間
        debug(false);
        document.getElementById('title').style = "";
        eleToCenterLeft('title');
        eleToCenterLeft('portfolio');
        eleToCenterLeft('skill');        

        // header中的icon css設定
        if ($(window).width() <= 991) {
            $('.nav-icon-box').css("margin-top", "6px");
            $('.nav-icon-box').width(60);
            $('.nav-icon-box').css("display", "flex");
            $('.nav-icon-box').css("justify-content", "center");
        }
        else {
            $('.nav-icon-box').removeAttr('style');
        }

        // catalog 的頂部位置設定
        const mTopStr = `${Math.round($(window).width() * 0.02 + $('header').outerHeight())}px`;
        $('#catalog-title').css('margin-top', mTopStr);

        // catalog 按鈕尺寸調整
        const buttonWidth = $('#catalog-item-outside div:first-child').outerWidth();
        $('#catalog-item-outside div:last-child').css('width', buttonWidth + 'px');
        $('#catalog-item-outside div:last-child').css('max-width', buttonWidth + 'px');

    }// end of initialize
    initialize();

//區塊3:事件設定 
    function setEvent() {
        //事件:點頁面底部之箭頭來移動頁面
        $('#arrowDown').click((e) => {
            myfullpage.moveTo(2);
        })
        $('#arrowUp').click((e) => {
            myfullpage.moveTo(1);
        })

        //事件:點按鈕後，改變按鈕顏色、改變標題、改變顯示圖片
        $('#catalog-item-outside div').click(function (e) {
            portfolio.buttonClicked(this.id);
            portfolio.renderTitle(this.id);
            portfolio.renderImg(this.id);
        });

        //事件:點project 圖片(See More)，修改彈出式視窗中的資訊 
        $('#catalog-image-hover').click(function (e) {
            portfolio.renderModal(this.dataset.id);
        });

        //事件:使用者縮放視窗，重新初始化頁面，false表示不是第一次初始化
        $(window).resize(() => {
            initialize(false);    
        });

        //事件:彈出式視窗出現在畫面時，初始化glide
        observer.observe(document.querySelector("#myModal"));
    }
    setEvent();

//區塊4:強迫事件發生
$('#catalog-item-outside div')[0].click();






