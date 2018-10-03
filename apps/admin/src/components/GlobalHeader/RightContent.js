import React, { PureComponent } from 'react'
// import {
//   FormattedMessage,
//   formatMessage,
//   setLocale,
//   getLocale
// } from 'umi/locale'
import { Spin, Tag, Menu, Icon, Dropdown, Avatar, Tooltip, Button } from 'antd'
import moment from 'moment'
import groupBy from 'lodash/groupBy'
import HeaderSearch from '@/components/HeaderSearch'
import NoticeIcon from 'ant-design-pro/lib/NoticeIcon'
import styles from './index.less'

export default class GlobalHeaderRight extends PureComponent {
  getNoticeData() {
    const { notices = [] } = this.props
    if (notices.length === 0) {
      return {}
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice }
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow()
      }
      if (newNotice.id) {
        newNotice.key = newNotice.id
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold'
        }[newNotice.status]
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        )
      }
      return newNotice
    })
    return groupBy(newNotices, 'type')
  }

  // changLang = () => {
  //   const locale = getLocale()
  //   if (!locale || locale === 'zh-CN') {
  //     setLocale('en-US')
  //   } else {
  //     setLocale('zh-CN')
  //   }
  // }

  render() {
    const {
      currentUser,
      fetchingNotices,
      onNoticeVisibleChange,
      onMenuClick,
      onNoticeClear,
      theme
    } = this.props

    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="logout">
          <Icon type="logout" />
          {'退出登录'}
          {/* <FormattedMessage id="menu.account.logout" defaultMessage="logout" /> */}
        </Menu.Item>
      </Menu>
    )
    const noticeData = this.getNoticeData()
    let className = styles.right
    if (theme === 'dark') {
      className = `${styles.right}  ${styles.dark}`
    }
    return (
      <div className={className}>
        <HeaderSearch
          className={`${styles.action} ${styles.search}`}
          placeholder={'搜索'}
          onSearch={value => {
            console.log('input', value) // eslint-disable-line
          }}
          onPressEnter={value => {
            console.log('enter', value) // eslint-disable-line
          }}
        />
        <Tooltip title={'帮助'}>
          <a
            target="_blank"
            href="https://pro.ant.design/docs/getting-started"
            rel="noopener noreferrer"
            className={styles.action}
            title=""
          >
            <Icon type="question-circle-o" />
          </a>
        </Tooltip>
        <NoticeIcon
          className={styles.action}
          count={currentUser.notifyCount}
          onItemClick={(item, tabProps) => {
            console.log(item, tabProps) // eslint-disable-line
          }}
          onClear={onNoticeClear}
          onPopupVisibleChange={onNoticeVisibleChange}
          loading={fetchingNotices}
          popupAlign={{ offset: [20, -16] }}
        >
          <NoticeIcon.Tab
            list={noticeData.notification}
            title={'test'}
            emptyText={'test'}
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
          />
          <NoticeIcon.Tab
            list={noticeData.message}
            title={'test'}
            emptyText={'test'}
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
          />
          <NoticeIcon.Tab
            list={noticeData.event}
            title={'test'}
            emptyText={'test'}
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
          />
        </NoticeIcon>
        {currentUser.name ? (
          <Dropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
              <Avatar
                size="small"
                className={styles.avatar}
                src={currentUser.avatar}
                alt="avatar"
              />
              <span className={styles.name}>{currentUser.name}</span>
            </span>
          </Dropdown>
        ) : (
          <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
        )}
      </div>
    )
  }
}
