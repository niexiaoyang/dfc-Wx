<template>
  <div class="rank-page">
    <header class="flex-sb">
      <div class="arrow" @click="handleDateStep(-1)">
        <svg-icon icon-class="left-arrow" color="#979797" size="4.267vw" />
      </div>
      <div class="date-wrapper flex-column-center">
        <div class="flex-row" v-show="searchType === 'week'" @click="handleShowWeek">
          <div>{{ week[0] }}</div>
          <svg-icon icon-class="bottom-arrow" color="#979797" size="4.267vw" style="margin-left: 1.867vw" />
        </div>
        <datetime
          v-show="searchType === 'day'"
          v-model="day"
          clear-text="请选择日期"
          format="YYYY-MM-DD"
        >
          <div class="flex-row">
            <div class="date">{{ day }}</div>
            <svg-icon icon-class="bottom-arrow" color="#979797" size="4.267vw" style="margin-left: 1.867vw" />
          </div>
        </datetime>
        <datetime
          v-show="searchType === 'month'"
          v-model="month"
          clear-text="请选择日期"
          format="YYYY-MM"
        >
          <div class="flex-row">
            <div class="date">{{ month }}</div>
            <svg-icon icon-class="bottom-arrow" color="#979797" size="4.267vw" style="margin-left: 1.867vw" />
          </div>
        </datetime>
        <div class="total-count">{{ `${total}元` }}</div>
      </div>
      <div class="arrow" @click="handleDateStep(1)">
        <svg-icon icon-class="right-arrow" color="#979797" size="4.267vw" />
      </div>
    </header>
    <div class="data-wrapper">
      <div class="bg-bar"></div>
      <div class="table-list">
        <x-table :cell-bordered="false" style="background-color:#fff;">
          <thead>
            <tr>
              <th v-for="(item, i) in headerListMap[listType]" :key="i">{{ item }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in list" :key="i">
              <td v-for="(field, j) in filedListMap[listType]" :key="`${i}-${j}`">{{ item[field] }}</td>
            </tr>
          </tbody>
        </x-table>
      </div>
    </div>

    <div @click="searchType = 'day'">change to day</div>
    <div @click="searchType = 'week'">change to week</div>
    <div @click="searchType = 'month'">change to month</div>

    <popup v-model="showWeek">
      <div class="popup-week">
        <popup-header
          left-text="取消"
          right-text="确定"
          title="请选择日期"
          @on-click-left="showWeek = false"
          @on-click-right="handleChangeWeek"
        ></popup-header>
        <picker
          :data="[weekList]"
          v-model="pickerWeek"
        ></picker>
      </div>
    </popup>
  </div>
</template>

<script>
import {
  getStorePerformance,
  getProfitReport,
  getEmployeeRank,
  getProductRank,
  getCustomRank,
} from '@/api/invoice';
import dayjs from 'dayjs';
import brower from '@/utils/brower';
import bridge from '@/utils/bridge';
import {
  XTable,
  Datetime,
  Picker,
  Popup,
  PopupHeader,
} from 'vux';

export default {
  name: 'Rank',
  components: {
    XTable,
    Datetime,
    Picker,
    Popup,
    PopupHeader,
  },
  data() {
    return {
      listQuery: {
        currentDate: '',
        beginDate: '',
        endDate: '',
      },
      day: '',
      month: '',
      week: [],
      pickerWeek: [],
      weekList: [],
      headerListMap: {
        store: ['时间', '客户', '金额', '折扣率', '营业员'],
        profit: ['客户', '业绩', '利润', '利润率'],
        employee: ['员工', '数量', '金额', '提成', '百分比'],
        product: ['商品', '数量', '金额', '百分比'],
        custom: ['客户', '数量', '金额', '均价', '百分比'],
      },
      filedListMap: {
        store: ['orderDate', 'customerName', 'amount', 'discountRate', 'salesClerk'],
        profit: ['customName', 'amount', 'profit', 'profitRate'],
        employee: ['userName', 'num', 'amount', 'extract', 'accounting'],
        product: ['productName', 'num', 'amount', 'accounting'],
        custom: ['customName', 'num', 'amount', 'avgPrice', 'accounting'],
      },
      // total money
      total: 0,
      list: [],
      // 列表类型: store, profit, employee, product, custom
      listType: 'store',
      // 搜索类型: 日，月，周
      searchType: 'day',
      showWeek: false,
    };
  },
  created() {
    this.initDate();
    this.initWeekDate();
    const { query: { listType } } = this.$route;

    if (listType) {
      this.listType = listType;
    }

    if (brower.checkIfIOS()) {
      bridge.registerHandler('replyPayload', (res) => {
        const { searchType } = res;
        this.searchType = searchType;
        console.log('searchType', searchType);
        this.refreshQuery();
      });
    } else {
      window.bridge.replyPayload = (res) => {
        const { searchType } = res;
        this.searchType = searchType;
        this.refreshQuery();
      };
    }
  },
  watch: {
    day() {
      if (this.searchType === 'day') {
        this.refreshQuery();
      }
    },
    month() {
      if (this.searchType === 'month') {
        this.refreshQuery();
      }
    },
    week() {
      if (this.searchType === 'week') {
        this.refreshQuery();
      }
    },
    searchType() {
      this.refreshQuery();
    },
  },
  methods: {
    refreshQuery() {
      switch (this.searchType) {
        case 'day': {
          this.listQuery = {
            beginDate: '',
            endDate: '',
            currentDate: this.day,
          };
          break;
        }
        case 'month': {
          this.listQuery = {
            beginDate: dayjs(this.month).startOf('month').format('YYYY-MM-DD'),
            endDate: dayjs(this.month).endOf('month').format('YYYY-MM-DD'),
            currentDate: '',
          };
          break;
        }
        case 'week': {
          const arr = this.week[0].split(' — ');
          this.listQuery = {
            beginDate: dayjs(arr[0]).format('YYYY-MM-DD'),
            endDate: dayjs(arr[1]).format('YYYY-MM-DD'),
            currentDate: '',
          };
          break;
        }
        default:
      }

      this.getList();
    },
    getList() {
      switch (this.listType) {
        case 'store': {
          getStorePerformance(this.listQuery).then((res) => {
            const { data: { list, turnover } } = res;
            this.list = list;
            this.total = turnover;
          });
          break;
        }
        case 'profit': {
          getProfitReport(this.listQuery).then((res) => {
            const { data: { list, turnover } } = res;
            this.list = list;
            this.total = turnover;
          });
          break;
        }
        case 'employee': {
          getEmployeeRank(this.listQuery).then((res) => {
            const { data: { list, turnover } } = res;
            this.list = list;
            this.total = turnover;
          });
          break;
        }
        case 'product': {
          getProductRank(this.listQuery).then((res) => {
            const { data: { list, turnover } } = res;
            this.list = list;
            this.total = turnover;
          });
          break;
        }
        case 'custom': {
          getCustomRank(this.listQuery).then((res) => {
            const { data: { list, turnover } } = res;
            this.list = list;
            this.total = turnover;
          });
          break;
        }
        default:
      }
    },
    initDate() {
      const currDate = dayjs();
      this.day = currDate.format('YYYY-MM-DD');
      this.month = currDate.format('YYYY-MM');
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
      const WeekLength = 20;
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
      } else if (this.searchType === 'day') {
        const date = dayjs(this.day);
        const newDate = date.add(num, this.searchType);
        this.day = newDate.format('YYYY-MM-DD');
      } else {
        const date = dayjs(this.month);
        const newDate = date.add(num, this.searchType);
        this.month = newDate.format('YYYY-MM');
      }
    },
    handleShowWeek() {
      this.pickerWeek = [...this.week];
      this.showWeek = true;
    },
    handleChangeWeek() {
      this.week = [...this.pickerWeek];
      this.showWeek = false;
    },
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
        border-radius: 9px;
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

        tbody {
          tr {
            td {
              min-width: 70px;
            }

            td:first-child {
              font-size: 3.2vw;
              line-height: 3.2vw;
            }
          }
        }
      }
    }
  }
</style>
