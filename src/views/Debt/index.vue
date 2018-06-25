<template>
  <div class="debt-page">
    <div class="search-wrapper">
      <input type="text" v-model="listQuery.search" ref="search" placeholder="请输入关键字" />
      <div class="search-tag flex-center" v-show="!searching" @click="handleSearch">
        <icon type="search"></icon>
        <span class="label">搜索</span>
      </div>
      <div class="flex-center clear-btn" @click="clearSearch">
        <icon type="clear" v-show="searching"></icon>
      </div>
    </div>
    <div class="data-wrapper">
      <div class="bg-bar"></div>
      <div class="table-list">
        <x-table :cell-bordered="false" style="background-color:#fff;">
          <thead>
            <tr>
              <th>时间</th>
              <th>客户</th>
              <th>订单金额</th>
              <th>已付金额</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2018.05.09</td>
              <td>蔡晟烨</td>
              <td>25720.00</td>
              <td>20000.00</td>
            </tr>
          </tbody>
        </x-table>
      </div>
    </div>
  </div>
</template>

<script>
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
    };
  },
  methods: {
    getList() {},
    handleSearch() {
      this.searching = true;
      this.$refs.search.focus();
    },
    clearSearch() {
      this.listQuery.search = '';
      this.searching = false;
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
      padding: 4px 16px;
      height: 30px;
      border-radius: 15px;
      background-color: #ffffff;
      box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.04);

      input {
        height: 100%;
        width: 100%;
        border: none;
        outline: none;
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
        top: 8px;
        right: 8px;
        width: 16px;
        height: 16px;
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
