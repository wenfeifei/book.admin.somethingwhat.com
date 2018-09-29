import React, { Component } from 'react';
import { Table, Card, Form, Row, Col, Input, Button } from 'antd';
import Link from 'umi/link';
import { connect } from 'dva';
import paginationConfig from '../../../../config/pagination.config';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../TableList.less';

const FormItem = Form.Item;
// 查询列表数据url
const queryDataUrl = 'bookUser/getWechatPayOrderByPage';

@Form.create()
@connect(({ bookUser, loading }) => ({
  bookUser,
  loading: loading.effects[queryDataUrl],
}))
class TableList extends Component {
  state = {
    columns: null,
    formValues: {},
    curPn: 1,
  };

  componentDidMount() {
    this.setColumns();
    this.loadData();
  }

  /**
   * 加载数据
   */
  loadData = paramsObj => {
    // 初始查询时的查询参数
    const initSearchParams = { pn: 1, ps: paginationConfig.defaultPageSize };
    const { dispatch } = this.props;
    const params = { ...initSearchParams, ...paramsObj };
    const { pn } = params;
    this.setState({ curPn: pn });
    dispatch({
      type: queryDataUrl,
      payload: params,
    });
  };

  /**
   * 获取分页配置
   */
  getPaginationConfig = _total => {
    const { curPn } = this.state;
    return {
      current: curPn,
      ...paginationConfig,
      total: _total,
    };
  };

  /**
   * 表格分页、排序、筛选变化时触发
   */
  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { formValues } = this.state;
    const params = {
      pn: pagination.current,
      ps: pagination.pageSize,
      ...formValues,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
    this.loadData(params);
  };

  /**
   * 查询
   */
  handleSearch = e => {
    e.preventDefault();
    const { form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };
      this.setState({
        formValues: values,
      });
      this.loadData(values);
    });
  };

  /**
   * 重置
   */
  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    this.loadData();
  };

  renderForm = () => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="Openid">
              {getFieldDecorator('Openid')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  };

  setColumns = () => {
    const openidRender = (val) => <Link to={`/book/user-list-detail?openid=${val}`}>{val}</Link>
    const tempColumns = [
      {
        title: '来自哪个小程序',
        dataIndex: 'FromKey',
        key: 'FromKey',
      },
      {
        title: 'Appid',
        dataIndex: 'Appid',
        key: 'Appid',
      },
      {
        title: 'Openid',
        dataIndex: 'Openid',
        key: 'Openid',
        render: openidRender,
      },
      {
        title: 'MchId',
        dataIndex: 'MchId',
        key: 'MchId',
      },
      {
        title: '商户订单号',
        dataIndex: 'OutTradeNo',
        key: 'OutTradeNo',
      },
      {
        title: 'Body',
        dataIndex: 'Body',
        key: 'Body',
      },
    //   {
    //     title: 'RequestData',
    //     dataIndex: 'RequestData',
    //     key: 'RequestData',
    //   },
      {
        title: '标价金额(分)',
        dataIndex: 'TotalFee',
        key: 'TotalFee',
        width: 150,
      },
      {
        title: '是否支付成功',
        dataIndex: 'IsPaySuccessed',
        key: 'IsPaySuccessed',
        // width: 100,
        render: val => val ? '是' : '否',
      },
      {
        title: '支付结果',
        dataIndex: 'PayResult',
        key: 'PayResult',
      },
      {
        title: '创建时间',
        dataIndex: 'Create_Time',
        key: 'Create_Time',
        width: 120,
        sorter: true,
      },
      {
        title: '更新时间',
        dataIndex: 'Update_Time',
        key: 'Update_Time',
        width: 120,
        sorter: true,
      },
    ];
    this.setState({ columns: tempColumns });
  };

  render() {
    const { columns } = this.state;
    const {
      loading,
      bookUser: { resByGetWechatPayOrder },
    } = this.props;
    // console.info('resByGetWechatPayOrder', resByGetWechatPayOrder)

    return (
      <PageHeaderWrapper title="">
        <Card bordered={false}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>
          <Table
            bordered={true}
            rowKey={record => record.Id}
            dataSource={resByGetWechatPayOrder === undefined ? [] : resByGetWechatPayOrder.List}
            columns={columns}
            pagination={this.getPaginationConfig(
              resByGetWechatPayOrder === undefined ? 0 : resByGetWechatPayOrder.Count
            )}
            loading={loading}
            onChange={this.handleStandardTableChange}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default TableList;