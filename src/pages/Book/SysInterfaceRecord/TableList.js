import React, { Component } from 'react';
import { Table, Card, Form, Row, Col, Input, Button } from 'antd';
import { connect } from 'dva';
import paginationConfig from '../../../../config/pagination.config';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../TableList.less';
import { getVersionCategory } from '../../../utils/common'

const FormItem = Form.Item;
// 查询列表数据url
const queryDataUrl = 'sysInterfaceRecord/getListByPage';

@Form.create()
@connect(({ sysInterfaceRecord, loading }) => ({
  sysInterfaceRecord,
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
            <FormItem label="Path">
              {getFieldDecorator('Path')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="Referer">
              {getFieldDecorator('Referer')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="User_Agent">
              {getFieldDecorator('User_Agent')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="RecordType">
              {getFieldDecorator('RecordType')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
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

    function TempRender(text, record) {
      const { Referer } = record
      let html = getVersionCategory(Referer)
      if (html === '开发版')
        html = <span style={{ color: '#AAA' }}>开发版</span>
      if (html === '体验版')
        html = <span style={{ color: '#8B5A2B' }}>体验版</span>
      if (html === '正式版本')
        html = <span style={{ color: '#0000FF' }}>正式版本</span>
      return html;
    }

    const tempColumns = [
      {
        title: '小程序版本',
        dataIndex: 'ver',
        key: 'ver',
        render: TempRender,
        width: 100,
      },
      {
        title: 'Host',
        dataIndex: 'Host',
        key: 'Host',
      },
      {
        title: 'Path',
        dataIndex: 'Path',
        key: 'Path',
      },
      // {
      //   title: 'Url',
      //   dataIndex: 'Url',
      //   key: 'Url',
      //   width: 120,
      // },
      {
        title: 'Referer',
        dataIndex: 'Referer',
        key: 'Referer',
      },
      // {
      //   title: 'RequestParams',
      //   dataIndex: 'RequestParams',
      //   key: 'RequestParams',
      //   render: item => { return JSON.stringify(item) },
      // },
      // {
      //   title: 'User_Agent',
      //   dataIndex: 'User_Agent',
      //   key: 'User_Agent',
      //   width: 120,
      // },
      {
        title: '访问来源ip',
        dataIndex: 'RemoteIpAddress',
        key: 'RemoteIpAddress',
      },
      {
        title: '耗时(秒)',
        dataIndex: 'Millisecond',
        key: 'Millisecond',
      },
      {
        title: 'RecordType',
        dataIndex: 'RecordType',
        key: 'RecordType',
      },
      {
        title: '创建时间',
        dataIndex: 'Create_Time',
        key: 'Create_Time',
        width: 120,
      },
    ];
    this.setState({ columns: tempColumns });
  };

  render() {
    const { columns } = this.state;
    const {
      loading,
      sysInterfaceRecord: { resByGetListByPage },
    } = this.props;

    if (resByGetListByPage && resByGetListByPage.List) {
      for (let i = 0; i < resByGetListByPage.List.length; i += 1) {
        const expdArr = []
        expdArr.push({ 'Url': resByGetListByPage.List[i].Url })
        expdArr.push({ 'RequestParams': resByGetListByPage.List[i].RequestParams })
        expdArr.push({ 'User_Agent': resByGetListByPage.List[i].User_Agent })
        resByGetListByPage.List[i].descArr = expdArr
      }
    }
    const getDesc = (record) => {
      return (
        <div>
          <p style={{ margin: 0 }}><span style={{ color: '#000', fontWeight: '600' }}>Url：</span>{record.descArr[0].Url}</p>
          <br />
          <p style={{ margin: 0 }}><span style={{ color: '#000', fontWeight: '600' }}>RequestParams：</span>{JSON.stringify(record.descArr[1].RequestParams)}</p>
          <br />
          <p style={{ margin: 0 }}><span style={{ color: '#000', fontWeight: '600' }}>User_Agent：</span>{record.descArr[2].User_Agent}</p>
        </div>
      )
    }

    return (
      <PageHeaderWrapper title="">
        <Card bordered={false}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>
          <Table
            bordered={true}
            rowKey={record => record.Id}
            dataSource={resByGetListByPage === undefined ? [] : resByGetListByPage.List}
            columns={columns}
            pagination={this.getPaginationConfig(
              resByGetListByPage === undefined ? 0 : resByGetListByPage.Count
            )}
            loading={loading}
            onChange={this.handleStandardTableChange}
            expandedRowRender={record => getDesc(record)}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default TableList;