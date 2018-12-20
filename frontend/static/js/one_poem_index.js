$(()=>{
    // 请求所有 Xu 的诗歌
    // request: {}
    // response: {All:[id, title_zh, content_zh, title_en]}
    $.ajax({
        type: "GET",
        url: "getXuAll",
        dataType: "json",
        data: {},
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
            // console.log(data);
            data["All"].forEach(element => {
                let p_id = element["id"];
                let p_btnId = "p_btnId" + element["id"];
                let title_zh = element["title_zh"];
                let content_zh = element["content_zh"];
                let title_en = element["title_en"];
                let str = `
                <div class="resume-item d-flex flex-column flex-md-row mb-5">
                    <div class="resume-content mr-auto">
                        <h3 class="mb-0">${title_zh}</h3>
                        <div class="subheading mb-3">${title_en!=""? title_en : ""}</div>
                        <p>
                            ${content_zh}
                        </p>
                    </div>
                    <ul class="resume-date text-md-right dev-icons">
                        <li class="list-inline-item" 
                            style="cursor: pointer" 
                            id="${p_btnId}">
                            <i class="fas fa-arrow-circle-right"></i>
                        </li>
                    </ul>
                </div>
                `;
                $("#inside").append(str);
                $("#" + p_btnId).click(()=>{
                    window.location.href = "one_poem_inside.html?id=" + p_id;
                });
            });
        },
        error: function(e){
            console.log("请求Xu所有诗歌失败");
            console.log("    " + e.state + " " + e.statusText);
        },
        complete: () => {
            $("#main_loader").remove();
        }
    });
});