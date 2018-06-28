<template>
  <div class="cungen-page" v-if="cungen">
    <div class="cungen-header">
      <div class="flex-column-center cungen-title">
        <div class="flex-row">{{cungen.storeName}}</div>
      </div>
      <div class="flex-end cungen-phone">{{`手机： ${cungen.phone}`}}</div>
      <div class="flex-sb">
        <div class="flex-start">{{`单号${cungen.orderSn}`}}</div>
        <div class="flex-end">{{`日期：${cungen.orderDate.substr(0,10)}`}}</div>
      </div>
      <div class="flex-sb">
        <div class="flex-start" v-for="(item, i) in cungen.custom" :key="i" >{{`客户：${item.customComp}`}}</div>
        <div class="flex-end">{{`营业员：${cungen.sellerUserName}`}}</div>
      </div>
    </div>
    <x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
      <thead class="cungen-tab">
        <tr>
          <th class="head-goods">商品</th>
          <th class="head-price">单价</th>
          <th class="head-num">数量</th>
          <th>小计</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in cungen.itemsList" :key="i">
          <td>
            <div class="sname">{{item.productName}}</div>
          </td>
          <td>{{item.price}}</td>
          <td>{{item.num}}</td>
          <td>{{item.amnt}}</td>
        </tr>
      </tbody>
    </x-table>
    <div class="cunge-computed">
      <div class="flex-end computed-tap" >
        <div>{{`购买数量：${cungen.totNum}`}}</div>
        <div>{{`退货数量：0`}}</div>
        <div>{{`金额合计：${cungen.totAmnt+cungen.freight}`}}</div>
      </div>
      <div class="computed-cent">
        <div class="flex-star relAmnt">{{`应收： ${cungen.relAmnt}`}}</div>
        <div class="flex-start" v-for="(item, i) in cungen.payList" :key="i">
          <div>{{`${item.payType} ${item.payName} ${item.payMoney}`}}</div>
        </div>
      </div>
    </div>
    <div class="cunge-footer">
      <div class="flex-start">发货方式：{{ cungen.deliverId | deliverStauts }}</div>
      <div class="flex-start">{{`${cungen.payDate} （第${cungen.printNum}次打印）`}}</div>
    </div>
    <!-- 存根联 存根联 存根联 -->
<div class="cungen-header">
      <div class="flex-column-center cungen-title">
        <div class="flex-row">{{cungen.storeName}}</div>
      </div>
      <div class="flex-end cungen-phone">存根联</div>
      <div class="flex-sb">
        <div class="flex-start">{{`单号${cungen.orderSn}`}}</div>
        <div class="flex-end">{{`日期：${cungen.orderDate.substr(0,10)}`}}</div>
      </div>
      <div class="flex-sb">
        <div class="flex-start" v-for="(item, i) in cungen.custom" :key="i" >{{`客户：${item.customComp}`}}</div>
        <div class="flex-end">{{`营业员：${cungen.sellerUserName}`}}</div>
      </div>
    </div>
    <x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
      <thead class="cungen-tab">
        <tr>
          <th class="head-goods">商品</th>
          <th class="head-price">单价</th>
          <th class="head-num">数量</th>
          <th>小计</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in cungen.itemsList" :key="i">
          <td>
            <div class="sname">{{item.productName}}</div>
          </td>
          <td>{{item.price}}</td>
          <td>{{item.num}}</td>
          <td>{{item.amnt}}</td>
        </tr>
      </tbody>
    </x-table>
    <div class="cunge-computed">
      <div class="flex-end computed-tap" >
        <div>{{`购买数量：${cungen.totNum}`}}</div>
        <div>{{`退货数量：0`}}</div>
        <div>{{`金额合计：${cungen.totAmnt+cungen.freight}`}}</div>
      </div>
      <div class="computed-cent">
        <div class="flex-star relAmnt">{{`应收： ${cungen.relAmnt}`}}</div>
        <div class="flex-start" v-for="(item, i) in cungen.payList" :key="i">
          <div>{{`${item.payType} ${item.payName} ${item.payMoney}`}}</div>
        </div>
      </div>
    </div>
    <div class="cunge-footer">
      <div class="flex-start">发货方式：{{ cungen.deliverId | deliverStauts }}</div>
      <div class="flex-start">{{`${cungen.payDate} （第${cungen.printNum}次打印）`}}</div>
    </div>
  </div>
</template>
<script>
import { XTable } from 'vux';
import { getCungenList } from '@/api/cungen';

export default {
  name: 'Cungen',
  components: {
    XTable,
  },
  data() {
    return {
      cungen: null,
    };
  },
  created() {
    const { query: { orderId } } = this.$route;
    getCungenList({ orderId }).then((res) => {
      this.cungen = res.data;
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .cungen-page {
    background: #fff;
    .cungen-header{
      margin: 0 15px;
      .cungen-title{
        margin: 20px 0;
        div{
          font-size: 18px;
        }
      }
      .cungen-phone{
        margin-right: 15px;
      }
      .flex-sb{
        line-height: 28px;
      }
    }
    .vux-table{
      margin: 0 5%;
      width: 90%;
      .cungen-tab{
        height: 34px;
        border-top: 1px dashed #000;
        border-bottom: 1px dashed #000;
        .head-goods{
          width: 144px;
          text-align: left;
        }
        .head-price{
          width: 62px;
        }
        .head-num{
          width: 102px;
        }
      }
      tbody{
        border-bottom: 1px dashed #000;
        tr{
          .sname{
            width: 113px;
            line-height: 20px;
            // height: 40px;
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
        }
      }
    }
  .cunge-computed{
    margin:10px 15px;
    .computed-tap{
      font-size: 14px;
      line-height: 28px;
    }
    .computed-cent{
      .relAmnt{
        font-size: 18px;
        line-height:28px;
      }
    }
    }
    .cunge-footer{
      padding: 10px 0;
      margin: 0 15px;
      border-top: 1px  dashed #000;
      border-bottom: 1px  dashed #000;
    }
  }
</style>
