// 解析 url 中的请求参数
function getQueryVar(str_target) {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] == str_target) { return pair[1]; }
    }
    return false;
}

// 朝代代码与字典的对应
dynasty_dict = {
    1: "秦",
    2: "汉",
    3: "魏晋",
    4: "南北",
    5: "隋",
    6: "唐",
    7: "宋",
    8: "辽",
    9: "金",
    10: "元",
    11: "明",
    12: "清"
}

$(() => {
    // 解析当前所选朝代 设置侧边栏选中状态
    let g_idDynasty = getQueryVar("dynasty");  // 朝代代码
    let g_dynasty = dynasty_dict[g_idDynasty];  // 朝代名称
    let id_target = "#si" + g_idDynasty;
    $(id_target).addClass("selected");

    // 解析当前诗人 设置标题以及简介介绍
    // request: {poetID:""}
    // response: {name:"", intro:""}
    let g_poetID = getQueryVar("poetId");
    console.log(g_poetID)
    let g_poet;
    let g_intro;
    $.ajax({
        type: "GET",
        url: "getPoetIntro",
        dataType: "json",
        data: {
            poetID: g_poetID
        },
        success: data => {
            g_poet = data["name"];
            g_intro = data["intro"] != "" ? data["intro"] : "暂无简介";
            $("#head_name").text(g_dynasty + " - " + g_poet);
            $("#head_intro").text(g_intro);

            // 请求本诗人的所有诗歌数据
            // request: {dynasty: "", author: ""}
            // response: {poetry: [{id:"", title:"", content:""}]}
            $.ajax({
                type: "GET",
                url: "getPoetry",
                dataType: "json",
                data: {
                    dynasty: g_dynasty,
                    author: g_poet
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
                    $(".container-fluid").append(str_loader);
                },
                success: data => {
                    console.log(data);
                    data["poetry"].forEach(element => {
                        let c_id = "cId_" + element["id"];
                        let c_titleId = "cTitle_" + element["id"];
                        let c_titleText = element["title"];
                        let c_content = element["content"];

                        let str = `
                        <div class="card card-hover bg-gray" id="` + c_id + `">
                            <div class="card-body">
                                <h5 class="card-title" id="` + c_titleId + `">` + c_titleText + `</h5>
                                <p>` + c_content + `</p>
                            </div>
                        </div>
                        `
                        $("#content_inside").append(str);
                    });
                },
                error: e => {
                    console.log("请求诗人ID " + g_poetID + " " + g_poet + " 失败！");
                    console.log("    " + e.state + " " + e.statusText);
                },
                complete: () => {
                    $("#main_loader").remove();
                }
            });
        },
        error: e => {
            console.log("请求诗人ID " + g_poetID + " 失败！");
            console.log("    " + e.state + " " + e.statusText);
        }
    });

});