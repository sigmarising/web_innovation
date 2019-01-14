$(() => {
    $(() => {
        // init echarts
        let ec1 = echarts.init($("#nw_7").get(0));
        let ec2 = echarts.init($("#nw_8").get(0));
        let g_ec = [];

        g_ec.push(ec1);
        g_ec.push(ec2);

        // showloading
        ec1.showLoading();
        ec2.showLoading();

        // get nodes
        let nodes;
        let edges;
        $.ajax({
            type: "POST",
            url: "static/data/nodes_ming.json",
            dataType: "json",
            success: data => {
                nodes = data.nodes;
                let a_color = ['#C23531', '#2F4554', '#61A0A8', '#D48265', '#91C7AE', '#749F83', '#CA8622', '#BDA29A', '#6E7074']
                nodes.forEach(item => {
                    let w = $("#nw_7").width();
                    let h = $("#nw_7").height();
                    item.x = Math.floor(Math.random() * w);
                    item.y = Math.floor(Math.random() * h);
                    item.fixed = true;
                    item.label.show = true;
                    item.itemStyle.color = a_color[Math.floor(Math.random() * a_color.length)];
                });
                console.log(nodes.length);

                // get edges
                $.ajax({
                    type: "POST",
                    url: "static/data/edges_ming.json",
                    dataType: "json",
                    success: data => {
                        edges = data.edges;

                        // set echarts options
                        let series_c = {
                            type: 'graph',
                            layout: 'circular',
                            circular: {
                                rotateLabel: true
                            },
                            roam: true,
                            focusNodeAdjacency: true,
                            nodes: nodes,
                            edges: edges,
                            label: {
                                position: 'right'
                            },
                            itemStyle: {
                                borderColor: '#fff',
                                borderWidth: 1,
                                shadowBlur: 10,
                                shadowColor: 'rgba(0, 0, 0, 0.3)'
                            },
                            lineStyle: {
                                curveness: 0.3,
                                opacity: 0.15
                            },
                            emphasis: {
                                label: {
                                    show: true
                                },
                                lineStyle: {
                                    width: 5,
                                    opacity: 0.35
                                }
                            }
                        };
                        let series_f = {
                            type: 'graph',
                            layout: 'force',
                            force: {
                                repulsion: 60,
                                edgeLength: [90, 100],
                            },
                            roam: true,
                            focusNodeAdjacency: true,
                            nodes: nodes,
                            edges: edges,
                            label: {
                                position: 'right'
                            },
                            itemStyle: {
                                borderColor: '#fff',
                                borderWidth: 1,
                                shadowBlur: 10,
                                shadowColor: 'rgba(0, 0, 0, 0.3)'
                            },
                            lineStyle: {
                                curveness: 0.3,
                                opacity: 0.15
                            },
                            emphasis: {
                                label: {
                                    show: true
                                },
                                lineStyle: {
                                    width: 5,
                                    opacity: 0.35
                                }
                            }
                        };
                        let option_c = {
                            title: {
                                text: '明朝人物关系网络-1',
                                subtext: 'Circular layout',
                                top: 'bottom',
                                left: 'right'
                            },
                            tooltip: {},
                            series: series_c
                        };
                        let option_f = {
                            title: {
                                text: '明朝人物关系网络-2',
                                subtext: 'Force layout',
                                top: 'bottom',
                                left: 'right'
                            },
                            tooltip: {},
                            series: series_f
                        };

                        ec1.hideLoading();
                        ec1.setOption(option_c);
                        ec2.hideLoading();
                        ec2.setOption(option_f);

                    },
                    error: e => {
                        console.log("ERROR: " + e.state + " " + e.statusText);
                    }
                });
            },
            error: e => {
                console.log("ERROR: " + e.state + " " + e.statusText);
            }
        });

       

        window.addEventListener("resize", ()=>{
            g_ec.forEach(item => {
                item.resize();
            });
        });
        $(".sidebartoggler").click(() => {
            g_ec.forEach(item => {
                item.resize();
            });
            console.log(1);
        });
    });
});