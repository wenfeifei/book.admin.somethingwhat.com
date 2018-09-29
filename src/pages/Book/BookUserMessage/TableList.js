import React, { Component, Fragment } from 'react';
import { Table, Card, Form, Row, Col, Input, Button, Select, Modal, Divider, message, Spin } from 'antd';
import Link from 'umi/link';
import { connect } from 'dva';
import paginationConfig from '../../../../config/pagination.config';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../TableList.less';
import check from '@/components/Authorized/CheckPermissions';
import { CheckAuthorityByArray } from '../../../utils/common';

const { Option } = Select;
const FormItem = Form.Item;
const { confirm } = Modal;
const { TextArea } = Input;

// 查询列表数据url
const queryDataUrl = 'bookUserMessage/getListByPage';
// 新增 url
const addDataUrl = 'bookUserMessage/add';
// 编辑 url
const updateDataUrl = 'bookUserMessage/update';
// 删除 url
const delDataUrl = 'bookUserMessage/del';
// 检查当前登录用户对于指定的控制器和方法有无访问权限 url
const checkAuthorityUrl = 'auth/checkAuthority';

// 创建表单-新增
const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleCreateFormModalVisible, record, authority, loading } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      // form.resetFields();
      handleAdd({ ...fieldsValue, Id: record ? record.Id : '' });
    });
  };

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 15 },
  };

  const children = [];
  if (authority) {
    authority.forEach(item => {
      children.push(<Option key={item}>{item}</Option>);
    })
  }

  return (
    <Modal
      destroyOnClose
      title={`${record ? '编辑' : '新建'}`}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleCreateFormModalVisible()}
      confirmLoading={loading}
    >
      <FormItem {...formItemLayout} label="Openid">
        {form.getFieldDecorator('Openid', {
          // rules: [{ required: true, message: '请输入至少10个字符！', min: 10 }],
          initialValue: record ? record.Openid : '',
        })(<Input placeholder="" disabled={!!record} />)}
      </FormItem>

      <FormItem {...formItemLayout} label="内容">
        {form.getFieldDecorator('Content', {
          rules: [{ required: true, message: '请输入至少2个字符！', min: 2 }],
          initialValue: record ? record.Content : '',
        })(<TextArea placeholder="" />)}
      </FormItem>

    </Modal>
  );
});

@Form.create()
@connect(({ bookUserMessage, auth, loading }) => ({
  bookUserMessage,
  auth,
  loading: loading.effects[queryDataUrl],
  loadingByAdd: loading.effects[addDataUrl],
  loadingByUpdate: loading.effects[updateDataUrl],
  loadingByDel: loading.effects[delDataUrl],
  loadingByCheckAuthority: loading.effects[checkAuthorityUrl],
}))
class TableList extends Component {
  state = {
    columns: null,
    formValues: {},
    curPn: 1,
    modalCreateFormVisible: false,
    curSelectedRow: null,
    selectedRowKeys: null,
    permissions: null, // 指定控制器和方法拥有的权限信息
  };

  componentDidMount() {
    // 检查当前登录用户对于指定的控制器和方法有无访问权限
    const { dispatch } = this.props;
    dispatch({
      type: checkAuthorityUrl,
      payload: {
        list: [
          { controller: 'BookUserMessage', method: 'Add' },
          { controller: 'BookUserMessage', method: 'Update' },
          { controller: 'BookUserMessage', method: 'Delete' },
        ],
      },
    });
  }

  componentWillReceiveProps(nextProps) {
    const { loadingByAdd, loadingByUpdate, loadingByDel, loadingByCheckAuthority } = this.props
    const { bookUserMessage: { resByAdd, resByUpdate, resByDel }, auth: { resByCheckAuthority } } = nextProps

    // 获取到权限数据
    if (resByCheckAuthority) {
      if (loadingByCheckAuthority && !nextProps.loadingByCheckAuthority) {
        const permiss = {
          add: CheckAuthorityByArray(resByCheckAuthority, 'BookUserMessage', 'Add'),
          update: CheckAuthorityByArray(resByCheckAuthority, 'BookUserMessage', 'Update'),
          del: CheckAuthorityByArray(resByCheckAuthority, 'BookUserMessage', 'Delete'),
        }
        this.setState({ permissions: permiss })
        this.setColumns(permiss.update);
        this.loadData();
      }
    }
    // 新增操作结果
    if (resByAdd) {
      if (loadingByAdd && !nextProps.loadingByAdd) {
        message.success('新增操作成功');
        this.setState({ modalCreateFormVisible: false })
        this.loadData()
      }
    }
    // 编辑操作结果
    if (resByUpdate) {
      if (loadingByUpdate && !nextProps.loadingByUpdate) {
        const { curSelectedRow } = this.state
        curSelectedRow.Openid = resByUpdate.Openid
        curSelectedRow.Content = resByUpdate.Content
        curSelectedRow.Update_Time = resByUpdate.Update_Time
        message.success('编辑操作成功');
        this.setState({ modalCreateFormVisible: false })
      }
    }
    // 删除操作结果
    if (resByDel) {
      if (loadingByDel && !nextProps.loadingByDel) {
        message.success('操作成功');
        this.loadData()
        this.setState({ selectedRowKeys: null })
      }
    }
  }

  /**
   * 加载数据
   */
  loadData = paramsObj => {
    // 初始查询时的查询参数
    const initSearchParams = { pn: 1, ps: paginationConfig.defaultPageSize };
    const { dispatch } = this.props;
    const params = { ...initSearchParams, ...paramsObj };
    if (!params.sorter) {
      // 添加默认排序
      params.sorter = 'Create_Time_ascend'
    }
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
   * 删除
   */
  handleDelete = () => {
    const { selectedRowKeys } = this.state
    const { dispatch } = this.props
    if (!selectedRowKeys) {
      message.warning('请勾选要删除的数据');
    }
    else {
      confirm({
        title: '您是否确认要删除选中的数据',
        content: <span style={{ color: '#ff0000' }}>你即将删除 {selectedRowKeys.length} 条数据<br />此操作不可逆，请再次确认！</span>,
        onOk() {
          dispatch({
            type: delDataUrl,
            payload: { ids: selectedRowKeys },
          });
        },
        onCancel() { },
      });
    }
  }

  /**
   * 新建 / 编辑
   */
  handleCreateFormModalVisible = (flag, record) => {
    this.setState({
      modalCreateFormVisible: !!flag,
      curSelectedRow: record,
    });
  };

  /**
   * 新建 / 编辑 - 确定提交
   */
  handleAdd = fields => {
    const { dispatch } = this.props;
    if (!fields.Id) {
      dispatch({
        type: addDataUrl,
        payload: fields,
      });
    }
    else {
      dispatch({
        type: updateDataUrl,
        payload: fields,
      });
    }
  };

  renderForm = () => {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const { permissions } = this.state;

    return (
      permissions && <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="Openid">
              {getFieldDecorator('Openid')(<Input placeholder="请输入" />)}
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
        {/* <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
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
        </Row> */}
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button icon="plus" type="primary" disabled={!permissions.add} onClick={() => this.handleCreateFormModalVisible(true)}>
                新建
              </Button>
              <Button icon="delete" style={{ marginLeft: 8 }} disabled={!permissions.del} onClick={this.handleDelete}>
                删除
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  };

  setColumns = (updatePermission) => {
    const openidRender = (val) => <Link to={`/book/user-list-detail?openid=${val}`}>{val}</Link>
    const tempColumns = [
      {
        title: 'Openid',
        dataIndex: 'Openid',
        key: 'Openid',
        render: openidRender,
      },
      {
        title: '内容',
        dataIndex: 'Content',
        key: 'Content',
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
        width: 180,
        render: (text, record) => (
          <Fragment>
            <Button type="primary" size="small" disabled={!updatePermission} onClick={() => this.handleCreateFormModalVisible(true, record)}>
              编辑
            </Button>
            <Divider type="vertical" />
          </Fragment>
        ),
      },
    ];
    this.setState({ columns: tempColumns });
  };

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  }

  render() {
    const { columns, modalCreateFormVisible, curSelectedRow, selectedRowKeys } = this.state;
    const {
      loading,
      loadingByAdd,
      loadingByUpdate,
      loadingByDel,
      bookUserMessage: { resByGetListByPage },
    } = this.props;

    const createFormMethods = {
      handleAdd: this.handleAdd,
      handleCreateFormModalVisible: this.handleCreateFormModalVisible,
    }
    // console.info('resByGetListByPage', resByGetListByPage)

    // 通过 rowSelection 对象表明需要行选择
    const rowSelection = {
      selectedRowKeys,
      onChange: (this.onSelectChange),
    };

    return (
      <PageHeaderWrapper title="">
        <Spin spinning={!!loadingByDel} tip="正在执行删除操作...">
          <Card bordered={false}>
            <h3 style={{ color: '#ff0000', paddingBottom: '10px' }}>tips：[openid] 不填写则默认发送给所有人，填写则指定openid发送</h3>
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
              rowSelection={rowSelection}
            />
          </Card>
          <CreateForm {...createFormMethods} modalVisible={modalCreateFormVisible} record={curSelectedRow} loading={loadingByAdd || loadingByUpdate} />
        </Spin>
      </PageHeaderWrapper>
    );
  }
}

export default TableList;