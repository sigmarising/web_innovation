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

$(()=>{
    // 设置侧边栏选中状态
    let g_idDynasty = getQueryVar("dynasty");  // 朝代代码
    let g_dynasty = dynasty_dict[g_idDynasty];  // 朝代名称
    let id_target = "#si" + g_idDynasty;
    $(id_target).addClass("selected");

    // 请求本朝代的所有诗人的数据
    // request:{dynasty:""}
    // reponse:{poets:[{id:"",name:"",intro:""},]}
    $.ajax({
        type: "GET",
        url: "getPoets",
        dataType: "json",
        data: {
            dynasty: g_dynasty
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
        success: function (data) {
            console.log(data);
            data["poets"].forEach(element => {
                let c_id = "cId_" + element["id"];
                let c_btnId = "cBtn_" + element["id"];
                let c_nameId = "cName_" + element["id"];
                let c_nameText =  element["name"];
                let c_intro = element["intro"] != "" ? element["intro"] : "暂无介绍";

                let str = `
                <div class="card card-hover" id="` + c_id + `">
                    <div class="card-body">
                        <h5 class="card-title" id="` + c_nameId + `">` + c_nameText + `</h5>
                        <p>` + c_intro + `</p>
                        <div class="text-right">
                            <button type="button" class="btn btn-sm btn-outline-success" id="` + c_btnId + `">Explore</button>
                        </div>
                    </div>
                </div>
                `
                $("#content_inside").append(str);
                $("#" + c_btnId).click(()=>{
                    window.location.href = 'sd_poet.html?dynasty=' + g_idDynasty + '&poetId=' + element["id"];
                });
            });
        },
        error: function(e){
            console.log("请求 " + g_dynasty + " 代所有诗人失败！");
            console.log("    " + e.state + " " + e.statusText);
        },
        complete: () => {
            $("#main_loader").remove();
        }
    });
});