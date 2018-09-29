import React, { Component } from 'react';
import { Table, Card, Form, Row, Col, Input, Button } from 'antd';
import Link from 'umi/link';
import { connect } from 'dva';
import paginationConfig from '../../../../config/pagination.config';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../TableList.less';
import { getPageQuery } from '../../../utils/utils';

const FormItem = Form.Item;
// 查询列表数据url
const queryDataUrl = 'bookReadRecord/getListByPage';

@Form.create()
@connect(({ bookReadRecord, loading }) => ({
  bookReadRecord,
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
    const { openid } = getPageQuery();
    this.loadData({ Openid: openid });
  }

  /**
   * 加载数据
   */
  loadData = paramsObj => {
    // 初始查询时的查询参数
    const initSearchParams = { pn: 1, ps: paginationConfig.defaultPageSize };
    const { dispatch } = this.props;
    const params = { ...initSearchParams, ...paramsObj, AlreadyCollected: true };// 添加固定的查询条件：已收藏
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
    form.setFieldsValue({ 'Openid': '' })
    this.setState({
      formValues: {},
    });
    this.loadData();
  };

  renderForm = () => {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { openid } = getPageQuery();

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="Openid">
              {/* {getFieldDecorator('Openid')(<Input placeholder="请输入" />)} */}
              {getFieldDecorator('Openid', {
                initialValue: openid,
                rules: [{
                  required: false, message: '请输入',
                }],
              })(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="作者">
              {getFieldDecorator('Author')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="书名">
              {getFieldDecorator('Book_Name')(<Input placeholder="请输入" />)}
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
        title: 'Openid',
        dataIndex: 'Openid',
        key: 'Openid',
        render: openidRender,
      },
      {
        title: '搜索来源',
        dataIndex: 'Rule',
        key: 'Rule',
        width: 90,
        render: val => {
          if (val === 1)
            return '笔趣阁';
          else if (val === 2)
            return '外国文学';
        },
      },
      {
        title: '作者',
        dataIndex: 'Author',
        key: 'Author',
      },
      {
        title: '小说名称',
        dataIndex: 'Book_Name',
        key: 'Book_Name',
        render: (text, record) => <a target='_blank' rel='noopener noreferrer' href={record.Book_Link}>{text}</a>,
      },
      {
        title: '小说分类',
        dataIndex: 'Book_Classify',
        key: 'Book_Classify',
        width: 100,
      },
      // {
      //   title: '小说介绍页链接地址',
      //   dataIndex: 'Book_Link',
      //   key: 'Book_Link',
      // },
      {
        title: '小说封面图片',
        dataIndex: 'Cover_Image',
        key: 'Cover_Image',
        render: val => <img src={val} alt='' className={styles.cover_img} />,
      },
      // {
      //   title: '小说简介',
      //   dataIndex: 'Book_Intro',
      //   key: 'Book_Intro',
      // },
      {
        title: '已收藏',
        dataIndex: 'AlreadyCollected',
        key: 'AlreadyCollected',
        width: 80,
        render: val => val ? '是' : '否',
      },
      {
        title: '最近一次阅读',
        dataIndex: 'Last_Reading_ChapterName',
        key: 'Last_Reading_ChapterName',
      },
      // {
      //   title: '最近一次阅读的章节页链接地址',
      //   dataIndex: 'Last_Reading_ChapterLink',
      //   key: 'Last_Reading_ChapterLink',
      // },
      {
        title: '创建时间',
        dataIndex: 'Create_Time',
        key: 'Create_Time',
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
      bookReadRecord: { resByGetListByPage },
    } = this.props;
    // console.info('resByGetListByPage', resByGetListByPage)

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
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default TableList;