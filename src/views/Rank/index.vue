<template>
  <div class="rank-page">
    <header class="flex-sb">
      <div class="arrow" @click="handleDateStep(-1)">
        <svg-icon icon-class="left-arrow" color="#979797" size="16px" />
      </div>
      <div class="date-wrapper flex-column-center">
        <div class="flex-row" v-if="searchType === 'week'">
          <popup-picker
            :data="[weekList]"
            v-model="week"
            @on-change="onChangeWeek"
            value-text-align="center"
            confirm-text="确定"
            popup-title="请选择日期"
          >
          </popup-picker>
          <svg-icon icon-class="bottom-arrow" color="#979797" size="16px" style="margin-left: 7px" />
        </div>
        <datetime
          v-else
          v-model="date"
          @on-change="handleChangeDate"
          clear-text="请选择日期"
          :format="searchType === 'day' ? 'YYYY-MM-DD' : 'YYYY-MM'"
        >
          <div class="flex-row">
            <div class="date">{{ date }}</div>
            <svg-icon icon-class="bottom-arrow" color="#979797" size="16px" style="margin-left: 7px" />
          </div>
        </datetime>
        <div class="total-count">50238.00元</div>
      </div>
      <div class="arrow" @click="handleDateStep(1)">
        <svg-icon icon-class="right-arrow" color="#979797" size="16px" />
      </div>
    </header>
    <div class="data-wrapper">
      <div class="bg-bar"></div>
      <div class="table-list">
        <x-table :cell-bordered="false" style="background-color:#fff;">
          <thead>
            <tr>
              <th>时间</th>
              <th>客户</th>
              <th>金额</th>
              <th>折扣率</th>
              <th>营业员</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="font-size: 12px; line-height: 12px;">
                <div>2018.05.09</div>
                <div>17:48</div>
              </td>
              <td>某某某</td>
              <td>25720.00</td>
              <td>200</td>
              <td>李招财</td>
            </tr>
          </tbody>
        </x-table>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';

import {
  XTable,
  Datetime,
  PopupPicker,
} from 'vux';

export default {
  name: 'Rank',
  components: {
    XTable,
    Datetime,
    PopupPicker,
  },
  data() {
    return {
      date: '',
      week: [],
      weekList: [],
      // 搜索类型: 日，月，周
      searchType: 'week',
    };
  },
  created() {
    this.initDate();
    this.initWeekDate();
  },
  methods: {
    initDate() {
      const currDate = dayjs();
      this.date = this.searchType === 'day' ? currDate.format('YYYY-MM-DD') : currDate.format('YYYY-MM');
    },
    initWeekDate() {
      const currDate = dayjs();
      const today = currDate.day();
      let startDate = null;
      let newStartDate = null;
      let newEndDate = null;

      // 周一
      const diffDay = today === 0 ? 6 : today - 1;
      startDate = currDate.subtract(diffDay, 'day');

      // 搜集周列表
      let weekList = [];
      const WeekLength = 10;
      // 本周前
      for (let i = 0; i < WeekLength; i += 1) {
        newStartDate = startDate.subtract(7 * i, 'day');
        newEndDate = newStartDate.add(6, 'day');
        weekList = [
          `${newStartDate.format('YYYY-MM-DD')} — ${newEndDate.format('YYYY-MM-DD')}`,
          ...weekList,
        ];

        // 本周
        if (i === 0) {
          this.week = [`${newStartDate.format('YYYY-MM-DD')} — ${newEndDate.format('YYYY-MM-DD')}`];
        }
      }

      // 本周后
      for (let i = 1; i < WeekLength; i += 1) {
        newStartDate = startDate.add(7 * i, 'day');
        newEndDate = newStartDate.add(6, 'day');
        weekList.push(`${newStartDate.format('YYYY-MM-DD')} — ${newEndDate.format('YYYY-MM-DD')}`);
      }

      this.weekList = weekList;
    },
    handleDateStep(num) {
      if (this.searchType === 'week') {
        const index = this.weekList.findIndex(item => item === this.week[0]);
        if ((index <= 0 && num < 0) || (index >= (this.weekList.length - 1) && num > 0)) {
          return;
        }

        this.week = [this.weekList[index + num]];
      } else {
        const date = dayjs(this.date);
        const newDate = date.add(num, this.searchType);
        const format = this.searchType === 'day' ? 'YYYY-MM-DD' : 'YYYY-MM';
        this.date = newDate.format(format);
      }
    },
    handleChangeDate() {},
    onChangeWeek() {},
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .rank-page {
    padding-top: 16px;
    header {
      height: 82px;
      background-color: #ffffff;

      .arrow {
        height: 100%;
        padding-left: 16px;
        padding-right: 16px;
        line-height: 82px;
      }

      .total-count {
        font-size:20px;
        color:#ff5f4a;
      }
    }

    .data-wrapper {
      position: relative;
      padding-top: 5px;
      .bg-bar {
        position: absolute;
        top: 0;
        left: 2px;
        right: 2px;
        height:9px;
        border-radius:100px;
        background:#ff4444;
      }

      .table-list {
        position: relative;
        margin-left: 6px;
        margin-right: 6px;
        z-index: 10;

        thead {
          background-image:linear-gradient(-180deg, #ffe0e0 0%, #ffffff 6%);
        }
      }
    }
  }
</style>
