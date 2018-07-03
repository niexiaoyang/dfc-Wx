<template>
  <div class="debt-page">
    <div class="search-wrapper flex-row">
      <div class="input-wrapper">
        <input type="text" v-model="listQuery.search" ref="search" placeholder="请输入关键字" @keyup.enter="getList" />
        <div class="flex-center clear-btn" @click="clearSearch">
          <icon type="clear" v-show="searching"></icon>
        </div>
      </div>
      <div class="search-tag flex-center" v-show="!searching" @click="handleSearch">
        <icon type="search"></icon>
        <span class="label">搜索</span>
      </div>
      <div class="search-btn" @click="getList" v-show="searching">搜索</div>
    </div>
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
            <tr v-for="(item, i) in list" :key="i" @click="handleClickRow(item)">
              <td v-for="(field, j) in filedListMap[listType]" :key="`${i}-${j}`">{{ item[field] }}</td>
            </tr>
          </tbody>
        </x-table>
      </div>
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/debt';
import brower from '@/utils/brower';
import bridge from '@/utils/bridge';

import {
  XTable,
  Icon,
} from 'vux';

export default {
  name: 'Debt',
  components: {
    XTable,
    Icon,
  },
  data() {
    return {
      listQuery: {
        search: '',
      },
      searching: false,
      headerListMap: {
        pay: ['时间', '客户', '订单金额', '已付金额'],
        arrears: ['时间', '客户', '订单金额', '欠款金额'],
      },
      filedListMap: {
        pay: ['orderDate', 'customName', 'relAmnt', 'repAmnt'],
        arrears: ['orderDate', 'customName', 'relAmnt', 'arrAmnt'],
      },
      // 列表类型: pay, arrears
      listType: 'pay',
      list: [],
    };
  },
  created() {
    const { query: { listType } } = this.$route;

    if (listType) {
      this.listType = listType;
    }

    this.getList();
  },
  methods: {
    getList() {
      getList(this.listQuery).then((res) => {
        const { data } = res;
        this.list = data;
      });
    },
    handleSearch() {
      this.searching = true;
      this.$refs.search.focus();
    },
    clearSearch() {
      this.listQuery.search = '';
      this.searching = false;
      this.getList();
    },
    handleClickRow(debt) {
      const { orderId } = debt;

      const payload = {
        type: 'debtOrder',
        data: {
          id: orderId,
        },
      };
      const str = JSON.stringify(payload);

      if (brower.checkIfIOS()) {
        bridge.callHandler('callNavigation', payload, (response) => {
          console.log('JS got response', response);
        });
      } else {
        if (window.jsObj && window.jsObj.callNavigation) {
          window.jsObj.callNavigation(str);
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .debt-page {
    padding-top: 20px;

    .search-wrapper {
      position: relative;
      margin: 0 10px 20px;
      height: 30px;
      line-height: 30px;

      .input-wrapper {
        position: relative;
        height: 100%;
        width: 100%;
        border-radius: 15px;
        box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.04);
      }

      input {
        padding: 4px 16px;
        height: 100%;
        width: 100%;
        border: none;
        outline: none;
        border-radius: 15px;
        background-color: #ffffff;
      }

      .search-tag {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ffffff;
        border-radius: 15px;
        z-index: 10;

        .label {
          margin-left: 10px;
          color: #333333
        }
      }

      .clear-btn {
        position: absolute;
        top: 7px;
        right: 8px;
        width: 16px;
        height: 16px;
      }

      .search-btn {
        margin-left: 4px;
        margin-right: 4px;
        width: 64px;
        text-align: center;
        background-color: #ff4444;
        color: #ffffff;
        height: 100%;
        border-radius: 4px;
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
