$(document).ready(function () {
    // $('body').prop('style', 'overflow:hidden;background-image:linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.6)),url(/static/backgrounddesk2.jpg)')

    // new Glide('.glide', config).mount();

    function eleToCenterTop(id) {
        var topStr = (parseInt(document.getElementById(id).parentNode.clientHeight) - parseInt(document.getElementById(id).clientHeight)) * 0.5;
        document.getElementById(id).style.top = topStr.toString() + 'px';

    };

    function eleToCenterLeft(id) {
        var leftStr = (parseInt(document.getElementById(id).parentNode.clientWidth) - parseInt(document.getElementById(id).clientWidth)) * 0.5;
        document.getElementById(id).style.left = leftStr.toString() + 'px';

    };
    debug(false);
    function debug(doDebug) {
        var divEles = document.getElementsByTagName('div')
        if (doDebug) {
            var i;
            for (i = 0; i < divEles.length; i++) {
                console.log(divEles[i].className += " debug");
            }
        }
    }

    //eleToCenterTop('title');
    document.getElementById('title').style = "";
    eleToCenterLeft('title');
    eleToCenterLeft('portfolio');
    eleToCenterLeft('skill');
    /* 3. anime for title*/
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
    //選取目標(queryselector('.catalog-item-outside duv'))、添加click事件、


    $('#catalog-item-outside div').click(function (e) {
        $("#catalog-item-outside div").removeClass("catalog-item-click");
        $(this).addClass("catalog-item-click");
        const srcList = ['/static/backgrounddesk.jpg',
            'https://picsum.photos/id/2/200/300',
            'https://picsum.photos/id/3/200/300',
            'https://picsum.photos/id/4/200/300',
            'https://picsum.photos/id/5/200/300'].map(function (ele) {
                return `<img src="${ele}">`;
            });
        if ($('#catalog-items-image img')) { $('#catalog-items-image img').remove() };
        [...$("#catalog-item-outside div")].forEach(function (ele, i) {
            ele.dataset.title == e.target.dataset.title ? $('#catalog-items-image').append(srcList[i]) : "";

        }
        );


    })

    $('#catalog-item-outside div')[0].click();
    $('#catalog-section').attr('style', '');



});
$('#catalog-image-hover').click(function (e) {
    $('#myModal').modal('show');
    const modalBg = $('.modal-backdrop').get(0);
    $('#modal-dialog-control').append(modalBg);





})
var observer = new IntersectionObserver(function(entries) {
	// isIntersecting is true when element and viewport are overlapping
	// isIntersecting is false when element and viewport don't overlap
	if(entries[0].isIntersecting === true)
        new Glide('.glide', {
        type:"carousel",        
        perView: 1
        }).mount();
        //取得窗格寬與高
        const slideWidth = $('.catalog-detail-slide').width();
        const slideHeight = $('.catalog-detail-slide').height();
        //設置div寬與高
        [...$('.glide__slide div').get()].forEach((ele)=>{
            ele.style.width=`${slideWidth}px`;
        ele.style.height=`${slideHeight}px`;
        })

}, { threshold: [0] });

observer.observe(document.querySelector("#myModal"));




