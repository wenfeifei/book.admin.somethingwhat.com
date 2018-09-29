import React, { Component, Fragment } from 'react';
import { Table, Card, Form, Row, Col, Input, Button, Divider, message } from 'antd';
import Link from 'umi/link';
import { connect } from 'dva';
import FormByAddCurrency from '@/components/Book/formByAddCurrency';
import paginationConfig from '../../../../config/pagination.config';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../TableList.less';
import { CheckAuthorityByArray } from '../../../utils/common';

const FormItem = Form.Item;
// 查询列表数据url
const queryDataUrl = 'bookUser/getListByPage';
// 赠送喵币url
const addCurrencyUrl = 'bookUser/addCurrency';
// 检查当前登录用户对于指定的控制器和方法有无访问权限 url
const checkAuthorityUrl = 'auth/checkAuthority';

@Form.create()
@connect(({ bookUser, auth, loading }) => ({
  bookUser,
  auth,
  loading: loading.effects[queryDataUrl],
  loadingByAddCurrency: loading.effects[addCurrencyUrl],
  loadingByCheckAuthority: loading.effects[checkAuthorityUrl],
}))
class TableList extends Component {
  state = {
    columns: null,
    modalVisible: false,
    formValues: {},
    curPn: 1,
    curSelectedRow: null,
    curAddedCurrency: 0,
    permissions: null, // 指定控制器和方法拥有的权限信息
  };

  componentDidMount() {
    // 检查当前登录用户对于指定的控制器和方法有无访问权限
    const { dispatch } = this.props;
    dispatch({
      type: checkAuthorityUrl,
      payload: {
        list: [
          { controller: 'BookUser', method: 'AddCurrency' },
        ],
      },
    });
    // this.setColumns();
    // this.loadData();
  }

  componentWillReceiveProps(nextProps) {
    const { loadingByAddCurrency, loadingByCheckAuthority } = this.props
    const { bookUser: { resByAddCurrency }, auth: { resByCheckAuthority } } = nextProps

    // 获取到权限数据
    if (resByCheckAuthority) {
      if (loadingByCheckAuthority && !nextProps.loadingByCheckAuthority) {
        const permiss = {
          addCurrency: CheckAuthorityByArray(resByCheckAuthority, 'BookUser', 'AddCurrency'),
        }
        this.setState({ permissions: permiss })
        this.setColumns(permiss.addCurrency);
        this.loadData();
      }
    }
    // 新增操作结果
    if (resByAddCurrency) {
      if (loadingByAddCurrency && !nextProps.loadingByAddCurrency) {
        const { curSelectedRow, curAddedCurrency } = this.state
        if (resByAddCurrency.Code >= 0) {
          // 更新喵币的显示值
          curSelectedRow.Currency += parseInt(curAddedCurrency, 10);
          message.success('操作成功');
        }
      }
    }

    // if (loadingByAddCurrency === nextProps.loadingByAddCurrency && nextProps.loadingByAddCurrency) {
    //   const { curSelectedRow, curAddedCurrency } = this.state
    //   if (resByAddCurrency.Code >= 0) {
    //     // 更新喵币的显示值
    //     curSelectedRow.Currency += parseInt(curAddedCurrency, 10);
    //     message.success('操作成功');
    //   }
    // }
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

  /**
   * 赠送喵币相关方法 -> 显示/隐藏 弹出层
   */
  handleModalVisible = (flag, record) => {
    this.setState({
      modalVisible: !!flag,
      curSelectedRow: record,
    });
  };

  /**
   * 赠送喵币相关方法 -> 确定提交
   */
  handleAdd = fields => {
    const { curSelectedRow } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: addCurrencyUrl,
      payload: {
        openid: curSelectedRow.Openid,
        currency: fields.Currency,
      },
    });
    this.setState({
      modalVisible: false,
      curAddedCurrency: fields.Currency,
    });
  };

  renderForm = () => {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="User_Id">
              {getFieldDecorator('User_Id')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="Openid">
              {getFieldDecorator('Openid')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="昵称">
              {getFieldDecorator('NickName')(<Input placeholder="请输入" />)}
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

  setColumns = (addCurrencyPermission) => {
    const openidRender = (val) => <Link to={`/book/user-list-detail?openid=${val}`}>{val}</Link>
    const tempColumns = [
      {
        title: '用户id',
        dataIndex: 'User_Id',
        key: 'User_Id',
        sorter: true,
      },
      {
        title: 'Openid',
        dataIndex: 'Openid',
        key: 'Openid',
        render: openidRender,
      },
      {
        title: '昵称',
        dataIndex: 'NickName',
        key: 'NickName',
        width: 150,
      },
      {
        title: '喵币',
        dataIndex: 'Currency',
        key: 'Currency',
        sorter: true,
      },
      {
        title: '用户头像',
        dataIndex: 'AvatarUrl',
        key: 'AvatarUrl',
        width: 100,
        render: val => <img className={styles.avatar_img} src={val} alt="" />,
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
      {
        title: '操作',
        width: 150,
        render: (text, record) => (
          <Fragment>
            <Link to={`/book/user-list-detail?openid=${record.Openid}`}>详细</Link>
            <Divider type="vertical" />
            <Button
              type="primary"
              size="small"
              onClick={() => this.handleModalVisible(true, record)}
              disabled={!addCurrencyPermission}
            >
              赠送喵币
            </Button>
          </Fragment>
        ),
      },
    ];
    this.setState({ columns: tempColumns });
  };

  render() {
    const { modalVisible, columns } = this.state;
    const {
      loading,
      loadingByAddCurrency,
      bookUser: { resByGetListByPage },
    } = this.props;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
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
            loading={loading || loadingByAddCurrency}
            onChange={this.handleStandardTableChange}
          />
        </Card>
        <FormByAddCurrency {...parentMethods} modalVisible={modalVisible} />
      </PageHeaderWrapper>
    );
  }
}

export default TableList;