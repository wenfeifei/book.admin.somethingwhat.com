import React, { Component, Fragment } from "react";
import {
  Row,
  Col,
  Card,
  Tabs,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './chart.less';

import UserNews from './Component/UserNews'
import UserSex from './Component/UserSex'
import UserActive from './Component/UserActive'
import UserTimeSlot from './Component/UserTimeSlot'

const { TabPane } = Tabs;

class Groupedcolumn extends Component {
  render() {
    return (
      <Fragment>
        <PageHeaderWrapper title="">
          <Card className={styles.chart_card}>
            <div className={styles.salesCard}>
              <Tabs size="large" tabBarStyle={{ marginBottom: 0 }}>
                <TabPane tab="用户统计" key="sales">
                  <UserNews />
                </TabPane>
              </Tabs>
            </div>
          </Card>
          <br />
          <Card className={styles.chart_card}>
            <div className={styles.salesCard}>
              <Tabs size="large" tabBarStyle={{ marginBottom: 0 }}>
                <TabPane tab="新增用户的时间段分布" key="sales">
                  <Row>
                    <Col span={24}>
                      <UserTimeSlot />
                    </Col>
                  </Row>
                </TabPane>
              </Tabs>
            </div>
          </Card>
          <br />
          <Card className={styles.chart_card}>
            <div className={styles.salesCard}>
              <Tabs size="large" tabBarStyle={{ marginBottom: 0 }}>
                <TabPane tab="用户画像" key="sales">
                  <Row gutter={16}>
                    {/* <Col span={12}>
                      <h3>男女占比</h3>
                      <UserSex />
                    </Col> */}
                    <Col span={12}>
                      <h3>僵尸粉占比</h3>
                      <UserActive />
                    </Col>
                  </Row>
                </TabPane>
              </Tabs>
            </div>
          </Card>
        </PageHeaderWrapper>
      </Fragment>
    );
  }
}

export default Groupedcolumn;
