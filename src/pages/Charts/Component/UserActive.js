import React from "react";
import { Spin } from 'antd';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  Guide,
} from "bizcharts";
import { connect } from 'dva';
import DataSet from "@antv/data-set";

// 查询列表数据url
const queryDataUrl = 'statistics/getByReadUserStatistics';

@connect(({ statistics, loading }) => ({
  statistics,
  loading: loading.effects[queryDataUrl],
}))
class Donut extends React.Component {

  componentDidMount() {
    this.loadData();
  }

  /**
   * 加载数据
   */
  loadData = () => {
    const { dispatch } = this.props;
    dispatch({
      type: queryDataUrl,
    });
  };

  render() {
    const {
      loading,
      statistics: { resByReadUserStatistics },
    } = this.props;

    const { DataView } = DataSet;
    const { Html } = Guide;

    const data = []
    let sum = 0
    if (resByReadUserStatistics) {
      resByReadUserStatistics.forEach(item => {
        data.push({
          item: item.flag,
          count: item.total,
        })
        sum += item.total
      })
    }

    const dv = new DataView();
    dv.source(data).transform({
      type: "percent",
      field: "count",
      dimension: "item",
      as: "percent",
    });
    const cols = {
      percent: {
        formatter: val => {
          return `${(val * 100).toFixed(2)}%`;
        },
      },
    };

    return (
      <Spin spinning={loading}>
        <div>
          <Chart
            // height={window.innerHeight}
            height={480}
            data={dv}
            scale={cols}
            // padding={[80, 100, 80, 80]}
            padding={0}
            forceFit
          >
            <Coord type='theta' radius={0.75} innerRadius={0.6} />
            <Axis name="percent" />
            <Legend
              position="right"
              offsetY={-window.innerHeight / 2 + 120}
              offsetX={-100}
            />
            <Tooltip
              showTitle={false}
              itemTpl={`<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>`}
            />
            <Guide>
              {<Html
                position={["50%", "50%"]}
                html={`<div style="color:#8c8c8c;font-size:1.16em;text-align: center;width: 10em;">总用户数<br><span style="color:#262626;font-size:2.5em">${sum}</span>个</div>`}
                alignX="middle"
                alignY="middle"
              />}
            </Guide>
            <Geom
              type="intervalStack"
              position="percent"
              color="item"
              tooltip={[
                "item*percent",
                (item, percent) => {
                  const percent2 = `${(percent * 100).toFixed(2)}%`;
                  return {
                    name: item,
                    value: percent2,
                  };
                },
              ]}
              style={{
                lineWidth: 1,
                stroke: "#fff",
              }}
            >
              <Label
                content="percent"
                formatter={(val, item) => {
                  return `${item.point.item}：${val}`;
                }}
              />
            </Geom>
          </Chart>
          <p style={{ marginLeft: 20, color: '#ff0000' }}>正常用户：有阅读过小说的用户</p>
          <p style={{ marginLeft: 20, color: '#ff0000' }}>僵尸用户：从未阅读过小说的用户</p>
        </div>
      </Spin>
    );
  }
}

export default Donut;
