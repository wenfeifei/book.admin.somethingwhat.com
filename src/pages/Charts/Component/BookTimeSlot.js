import React from "react";
import {
  Row,
  Col,
  DatePicker,
  Select,
  Button,
  Spin,
} from 'antd';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend,
} from "bizcharts";
import DataSet from "@antv/data-set";
import { connect } from 'dva';
import styles from '../chart.less';

import { getTimeDistance } from '../../../utils/utils';

const { RangePicker } = DatePicker;
const { Option } = Select;

// 查询列表数据url
const queryDataUrl = 'statistics/getByBookUserReadStatistics';

@connect(({ statistics, loading }) => ({
  statistics,
  loading: loading.effects[queryDataUrl],
}))
class Donut extends React.Component {
  state = {
    rangePickerValue: getTimeDistance(31),
    curSelectedDate: null,
    curSelectedDateType: 'd',
  };

  componentWillMount() {
    const { rangePickerValue } = this.state;
    this.setState({ curSelectedDate: [rangePickerValue[0].format('YYYY-MM-DD'), rangePickerValue[1].format('YYYY-MM-DD')] })
  };

  componentDidMount() {
    const { curSelectedDate, curSelectedDateType } = this.state;
    this.loadData({
      dateType: curSelectedDateType,
      begin_time: curSelectedDate[0],
      end_time: curSelectedDate[1],
    });
  }

  /**
   * 加载数据
   */
  loadData = paramsObj => {
    // 初始查询时的查询参数
    const { dispatch } = this.props;
    dispatch({
      type: queryDataUrl,
      payload: paramsObj,
    });
  };

  handleRangePickerChange = (val, curSelectedDate) => {
    this.setState({
      curSelectedDate,
    });
  };

  handleRangePickerTypeChange = (val) => {
    this.setState({
      curSelectedDateType: val,
    });
  };

  // 刷新数据
  handleReload = () => {
    const { curSelectedDate, curSelectedDateType } = this.state;
    const data = {
      dateType: curSelectedDateType,
      begin_time: curSelectedDate[0],
      end_time: curSelectedDate[1],
    }
    this.loadData(data)
  }

  render() {
    const { rangePickerValue, curSelectedDateType } = this.state;
    const {
      loading,
      statistics: { resByBookUserReadStatistics },
    } = this.props;

    const res = {
      data_user: [0],
      data_chapter: [0],
      columns: [''],
    }
    if (resByBookUserReadStatistics && resByBookUserReadStatistics.columns) {
      res.data_user = resByBookUserReadStatistics.data_user
      res.data_chapter = resByBookUserReadStatistics.data_chapter
      res.columns = resByBookUserReadStatistics.columns
    }

    const data = []
    res.columns.forEach((key, idx) => {
      data.push({
        date: key,
        '参与阅读用户数': res.data_user[idx],
        '阅读章节数': res.data_chapter[idx],
      })
    })

    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: "fold",
      fields: ["参与阅读用户数", "阅读章节数"],
      // 展开字段集
      key: "name",
      // key字段
      value: "total", // value字段
    });
    const cols = {
      date: {
        range: [0, 1],
      },
    };

    return (
      <Spin spinning={loading}>
        <Row gutter={16}>
          <Col span={24}>
            <div className={styles.p20}>
              <RangePicker
                defaultValue={rangePickerValue}
                onChange={this.handleRangePickerChange}
                style={{ width: 256 }}
              />
              <Select
                style={{ marginLeft: 10 }}
                defaultValue={curSelectedDateType}
                onChange={this.handleRangePickerTypeChange}
              >
                <Option value="d">按日统计</Option>
                <Option value="m">按月统计</Option>
                <Option value="y">按年统计</Option>
              </Select>
              <Button type="primary" icon="reload" onClick={this.handleReload} style={{ marginLeft: 10 }}>刷新数据</Button>
            </div>
            <Chart height={400} data={dv} scale={cols} forceFit>
              <Legend />
              <Axis name="date" />
              <Axis
                name="total"
                label={{
                  formatter: val => `${val}`,
                }}
              />
              <Tooltip
                crosshairs={{
                  type: "y",
                }}
              />
              <Geom
                type="line"
                position="date*total"
                size={2}
                color="name"
              />
              <Geom
                type="point"
                position="date*total"
                size={4}
                shape="circle"
                color="name"
                style={{
                  stroke: "#fff",
                  lineWidth: 1,
                }}
              />
            </Chart>
          </Col>
        </Row>
      </Spin>
    );
  }
}

export default Donut;
