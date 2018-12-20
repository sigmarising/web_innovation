// 解析 url 中的请求参数
function getQueryVar(str_target) {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i=0;i<vars.length;i++) {
            let pair = vars[i].split("=");
            if(pair[0] == str_target){return pair[1];}
    }
    return false;
}

$(()=>{
    let g_id = getQueryVar("id");

    $.ajax({
        type: "GET",
        url: "getXuInside",
        dataType: "json",
        data: {
            id: g_id    
        },
        beforeSend: () => {
            let str_loader = `
            <div class="loader" id="main_loader">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
            `
            $(".this_thing").append(str_loader);
        },
        success: function(data){
            let p_title_zh = data["title_zh"];
            let p_content_zh = data["content_zh"];
            let p_title_en = data["title_en"];;
            let p_content_en = data["content_en"];
            let p_time = data["create_time"];
            let p_remark = data["remark"];

            let str = `
            <div class="resume-item d-flex flex-column flex-md-row mb-5">
                <div class="resume-content mr-auto">
                    <h3 class="mb-0">${p_title_zh}</h3>
                    <p style="color:#343A40">
                        ${p_content_zh}
                    </p>
                </div>
                <div class="resume-date text-md-right">
                    <span class="text-primary">${p_time}</span>
                </div>
            </div>
            <div class="resume-item d-flex flex-column flex-md-row mb-5">
                <div class="resume-content mr-auto">
                    <h3 class="mb-0">${p_title_en}</h3>
                    <p style="color:#343A40">
                        ${p_content_en}
                    </p>
                </div>
                <div class="resume-date text-md-right">
                    <span class="text-primary">${p_remark}</span>
                </div>
            </div>
            `;
            $("#inside").append(str);
        },
        error: function(e){
            console.log("请求Xu诗歌失败");
            console.log("    " + e.state + " " + e.statusText);
        },
        complete: () => {
            $("#main_loader").remove();
        }
    });
});