import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Table, Divider } from 'antd';
import Link from 'umi/link';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getPageQuery } from '../../../utils/utils';
import styles from '../BasicProfile.less';

const { Description } = DescriptionList;
const queryDataUrl = 'bookUser/getSingleById';
const getBookSummaryUrl = 'bookUser/getBookSummary';
const getRecentReadingByPageUrl = 'bookReadRecord/getRecentReadingByPage';
const readRecordColumns = [
  {
    title: '作者',
    dataIndex: 'Author',
    key: 'Author',
  },
  {
    title: '小说名称',
    dataIndex: 'Book_Name',
    key: 'Book_Name',
  },
  {
    title: '小说介绍页',
    dataIndex: 'Book_Link',
    key: 'Book_Link',
  },
  {
    title: '最近阅读的章节',
    dataIndex: 'Chapter_Name',
    key: 'Chapter_Name',
  },
  {
    title: '章节地址',
    dataIndex: 'Chapter_Link',
    key: 'Chapter_Link',
  },
  {
    title: '最后阅读时间',
    dataIndex: 'Update_Time',
    key: 'Update_Time',
  },
];

@connect(({ bookUser, bookReadRecord, loading }) => ({
  bookUser,
  bookReadRecord,
  loading: loading.effects[queryDataUrl],
  loadingByBookSummary: loading.effects[getBookSummaryUrl],
  loadingBytRecentReading: loading.effects[getRecentReadingByPageUrl],
}))
class Detail extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const { openid } = getPageQuery();
    dispatch({
      type: queryDataUrl,
      payload: { Openid: openid },
    });
    dispatch({
      type: getBookSummaryUrl,
      payload: { Openid: openid },
    });
    dispatch({
      type: getRecentReadingByPageUrl,
      payload: { Openid: openid },
    });
  }

  getGenderName = val => {
    let sex = ''
    if (val === '1') sex = '男';
    else if (val === '2') sex = '女';
    else sex = '未知';
    return sex;
  };

  render() {
    const {
      loading,
      loadingByBookSummary,
      loadingBytRecentReading,
      bookUser: { resByGetSingleById, resByGetBookSummary },
      bookReadRecord: { resByGetRecentReadingByPage },
    } = this.props;
    // console.info('resByGetSingleById', resByGetSingleById)

    return (
      <PageHeaderWrapper title="详情页">
        <Card bordered={false} loading={loading || loadingByBookSummary}>
          {resByGetSingleById !== undefined && (
            <DescriptionList size="large" title="" style={{ marginBottom: 32 }}>
              <div className={styles.title2}>1. 基础信息</div>
              <Description term="Id">{resByGetSingleById.Id}</Description>
              <Description term="Appid">{resByGetSingleById.Appid}</Description>
              <Description term="用户id">{resByGetSingleById.User_Id}</Description>
              <Description term="Openid">{resByGetSingleById.Openid}</Description>
              <Description term="昵称">{resByGetSingleById.NickName}</Description>
              <Description term="头像">
                <img className={styles.avatar_img} src={resByGetSingleById.AvatarUrl} alt="" />
              </Description>
              <Description term="性别">{this.getGenderName(resByGetSingleById.Gender)}</Description>
              <Description term="国家">{resByGetSingleById.Country}</Description>
              <Description term="省份">{resByGetSingleById.Province}</Description>
              <Description term="城市">{resByGetSingleById.City}</Description>
              <Description term="语言">{resByGetSingleById.Language}</Description>
              <Description term="创建时间">{resByGetSingleById.Create_Time}</Description>
              <Description term="更新时间">{resByGetSingleById.Update_Time}</Description>
              <Description term="喵币">
                <span className={`${styles.fontWeightX} ${styles.padding_right_20}`}>{resByGetSingleById.Currency}</span>
                <Link target='_blank' to={`/book/user-recharge-list?openid=${resByGetSingleById.Openid}`}>查看充值(赠送)记录</Link>
              </Description>
              {/* <Description term="阅读时长(分钟)">{resByGetSingleById.Read_Minute}</Description> */}
            </DescriptionList>
          )}
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="" style={{ marginBottom: 32 }}>
            <div className={styles.title2}>2. 其他信息</div>
            {resByGetBookSummary !== undefined && (
              <div>
                <Description className={styles.newline} term="阅读时长">{resByGetBookSummary.DurationExplain}</Description>
                <Description className={styles.newline} term="阅读记录">
                  <span className={styles.padding_right_20}>共{resByGetBookSummary.BookRecordCount}本书{resByGetBookSummary.ChapterRecordCount}章节</span>
                  <Link target='_blank' to={`/book/book-readrecord-list?openid=${resByGetSingleById.Openid}`}>查看详细</Link>
                </Description>
                <Description className={styles.newline} term="收藏书本">
                  <span className={styles.padding_right_20}>{resByGetBookSummary.CollectionCount}本</span>
                  <Link target='_blank' to={`/book/book-collections-list?openid=${resByGetSingleById.Openid}`}>查看详细</Link>
                </Description>
              </div>
            )}
          </DescriptionList>
          <DescriptionList size="large" title="" style={{ marginBottom: 32 }}>
            <div className={styles.title2}>3. 最近阅读（最近十本小说）</div>
            <Table
              bordered={true}
              rowKey={record => record.Book_Info_Id}
              style={{ marginBottom: 16 }}
              pagination={false}
              loading={loadingBytRecentReading}
              dataSource={resByGetRecentReadingByPage === undefined ? [] : resByGetRecentReadingByPage.List}
              columns={readRecordColumns}
            />
          </DescriptionList>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Detail;