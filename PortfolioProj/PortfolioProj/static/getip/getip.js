
const getIPBtn = document.getElementById('getIPBtn'),
    reportDiv = document.getElementById('reportDiv'),
    IP_INFO_TOKEN="fb65e7df7e7781";

const url = `https://ipinfo.io?token=${IP_INFO_TOKEN}`;

getIPBtn.addEventListener('click', function () {
    axios
        .get(url)
        .then(response=>{
            const report =`<div  class="alert alert-primary">
              IP:${response.data.ip}<br>
              country:${response.data.country}<br>
              city:${response.data.city}<br>              
              timemzone:${response.data.timezone}<br>

            </div>`;
            document.getElementById("reportDiv").innerHTML = report;
        })  
        .catch(err=>{
            console.log("發生錯誤",err);
            alert('網路狀況不佳');
        });
});