// --- 黑色全屏遮罩（覆盖 #sunburst 900×900 容器），含标题文字 ---
const overlay = d3.select("#sunburst")
    .append("div")
    .attr("id", "overlay")
    .style("position", "absolute")
    .style("top", "0px")
    .style("left", "0px")
    .style("width", "900px")
    .style("height", "900px")
    .style("background", "black")
    .style("display", "flex")
    .style("justify-content", "center")
    .style("align-items", "center")
    .style("color", "white")
    .style("font-size", "36px")
    .style("z-index", "9999")
    .html("Global Food Security Index");

// 1秒后开始淡出，2秒内透明度降为0，结束后移除
overlay.transition()
    .delay(1000)
    .duration(2000)
    .style("opacity", 0)
    .on("end", () => {
        overlay.remove();
    });

// --- D3 主程序：绘制 5 个环形图 (1主 + 4小) ---
d3.csv("data/Global-Food-Security-Index2022.csv").then(data => {

    // 1) 排序
    data.sort((a, b) => +a.Rank - +b.Rank);

    // 2) 固定画布大小 = 900×900
    const width = 900;
    const height = 900;

    // 3) 主图与小图的环形大小（可酌情微调）
    const innerRadius = 80;
    const outerMaxRadius = 150;

    // 4) 主图中心位于容器下方
    //    x=450 为居中, y=650 为靠下
    const mainPos = { x: 450, y: 650 };

    // 5) 小图分布半径 (主图中心到小图中心)
    //    取 250~300 左右可避免重叠
    const smallR = 250;

    // 6) 定义主维度 & 小维度
    const mainDimension = "Overall score";
    const smallDimensions = [
        "Affordability",
        "Availability",
        "Quality and Safety",
        "Sustainability and Adaptation"
    ];

    // 7) 清除旧的 SVG
    d3.select("#sunburst").select("svg").remove();

    // 8) 创建 SVG (固定 900×900, 不自适应)
    const svg = d3.select("#sunburst")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // 9) 设置背景图 (如果需要)
    //   你可在 body 上设置全屏背景，或省略此步
    // d3.select("body")
    //   .style("background", "url('xxx.png') no-repeat center center fixed")
    //   .style("background-size", "cover");

    // 10) 定义颜色 (绿色渐变, 按 Rank)
    const colorPalette = [
        "#274E13","#1B5E20","#2E7D32","#388E3C","#43A047",
        "#4CAF50","#66BB6A","#81C784","#A5D6A7","#C8E6C9"
    ];
    const colorScale = d3.scaleSequential()
        .domain([1, data.length])
        .interpolator(d3.interpolateRgbBasis(colorPalette));

    // 11) 角度比例尺: 将所有国家分配到 0~2π
    const angleScale = d3.scaleBand()
        .domain(data.map(d => d.Country))
        .range([0, 2 * Math.PI])
        .padding(0.05);

    // 12) 长度比例尺: Rank越低, 条形越长
    //    也可改为 [innerRadius+20, outerMaxRadius]
    const lengthScale = d3.scaleLinear()
        .domain([1, data.length])
        .range([innerRadius+20, outerMaxRadius]);

    // --- 主图表 (展示 Overall Score) ---
    const mainGroup = svg.append("g")
        .attr("transform", `translate(${mainPos.x},${mainPos.y})`);

    // 主图: 每个国家一个环形扇区
    const mainBars = mainGroup.selectAll("path")
        .data(data)
        .enter()
        .append("path")
        .attr("fill", d => colorScale(+d.Rank))
        .attr("stroke", "#fff")
        // 初始时外半径=innerRadius (收缩)
        .attr("d", d => {
            const startAngle = angleScale(d.Country);
            const endAngle = startAngle + angleScale.bandwidth();
            return d3.arc()
                .innerRadius(innerRadius)
                .outerRadius(innerRadius)
                .startAngle(startAngle)
                .endAngle(endAngle)();
        })
        .on("mouseover", function(e, d) {
            d3.select(this)
                .transition().duration(300)
                .attr("fill", "#FFD700")
                .attr("d", () => {
                    const startAngle = angleScale(d.Country);
                    const endAngle = startAngle + angleScale.bandwidth();
                    return d3.arc()
                        .innerRadius(innerRadius)
                        .outerRadius(lengthScale(+d[mainDimension]) + 10)
                        .startAngle(startAngle)
                        .endAngle(endAngle)();
                });
            tooltip
                .style("display", "block")
                .html(`<strong>${d.Country}</strong><br>Rank: ${d.Rank}<br>${mainDimension}: ${d[mainDimension]}`)
                .style("left", (e.pageX + 10) + "px")
                .style("top", (e.pageY - 20) + "px");
        })
        .on("mouseout", function(e, d) {
            d3.select(this)
                .transition().duration(500)
                .attr("fill", colorScale(+d.Rank))
                .attr("d", () => {
                    const startAngle = angleScale(d.Country);
                    const endAngle = startAngle + angleScale.bandwidth();
                    return d3.arc()
                        .innerRadius(innerRadius)
                        .outerRadius(lengthScale(+d[mainDimension]))
                        .startAngle(startAngle)
                        .endAngle(endAngle)();
                });
            tooltip.style("display", "none");
        });

// 主图动画展开
    mainBars.transition().duration(2000)
        .attr("d", d => {
            const startAngle = angleScale(d.Country);
            const endAngle = startAngle + angleScale.bandwidth();
            return d3.arc()
                .innerRadius(innerRadius)
                .outerRadius(lengthScale(+d[mainDimension]))
                .startAngle(startAngle)
                .endAngle(endAngle)();
        });

// --- 四个小图表，沿半圆分布 ---
    const smallAnglesDeg = [210, 250, 290, 330];
    const smallAngles = smallAnglesDeg.map(a => a * Math.PI / 180);

    const smallDimensionsCount = smallDimensions.length; // 4

    smallAngles.forEach((angleDeg, i) => {
        const cx = mainPos.x + smallR * Math.cos(angleDeg);
        const cy = mainPos.y + smallR * Math.sin(angleDeg);

        const group = svg.append("g")
            .attr("transform", `translate(${cx},${cy})`);

        const dim = smallDimensions[i];

        const bars = group.selectAll("path")
            .data(data)
            .enter()
            .append("path")
            .attr("fill", d => colorScale(+d.Rank))  // 也可改成 colorScale(+d[dim])
            .attr("stroke", "#fff")
            .attr("d", d => {
                const startAngle = angleScale(d.Country);
                const endAngle = startAngle + angleScale.bandwidth();
                return d3.arc()
                    .innerRadius(innerRadius)
                    .outerRadius(innerRadius)
                    .startAngle(startAngle)
                    .endAngle(endAngle)();
            })
            .on("mouseover", function(e, d) {
                d3.select(this)
                    .transition().duration(300)
                    .attr("fill", "#FFD700")
                    .attr("d", () => {
                        const startAngle = angleScale(d.Country);
                        const endAngle = startAngle + angleScale.bandwidth();
                        return d3.arc()
                            .innerRadius(innerRadius)
                            .outerRadius(lengthScale(+d[dim]) + 10)
                            .startAngle(startAngle)
                            .endAngle(endAngle)();
                    });
                tooltip
                    .style("display", "block")
                    .html(`<strong>${d.Country}</strong><br>${dim}: ${d[dim]}`)
                    .style("left", (e.pageX + 10) + "px")
                    .style("top", (e.pageY - 20) + "px");
            })
            .on("mouseout", function(e, d) {
                d3.select(this)
                    .transition().duration(500)
                    .attr("fill", colorScale(+d.Rank))
                    .attr("d", () => {
                        const startAngle = angleScale(d.Country);
                        const endAngle = startAngle + angleScale.bandwidth();
                        return d3.arc()
                            .innerRadius(innerRadius)
                            .outerRadius(lengthScale(+d[dim]))
                            .startAngle(startAngle)
                            .endAngle(endAngle)();
                    });
                tooltip.style("display", "none");
            });

        // 小图动画展开
        bars.transition().duration(2000)
            .attr("d", d => {
                const startAngle = angleScale(d.Country);
                const endAngle = startAngle + angleScale.bandwidth();
                return d3.arc()
                    .innerRadius(innerRadius)
                    .outerRadius(lengthScale(+d[dim]))
                    .startAngle(startAngle)
                    .endAngle(endAngle)();
            });
    });

// --- 提示框 ---
    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("padding", "8px")
        .style("background", "#4CAF50")
        .style("color", "white")
        .style("border-radius", "5px")
        .style("display", "none");
});
