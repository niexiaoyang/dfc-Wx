<template>
  <div class="father-day">
    <div class="box box-1">
      <img src="@/assets/images/father/father-day-01.png" @click="handleClickImg" />
    </div>
    <div class="box box-2">
      <img src="@/assets/images/father/father-day-02.png" @click="handleClickImg" />
      <div class="rule-info flex-column-center">
        <ul>
          <li>活动期间在“大风车商城APP”下载注册/成交订单的用户，均可领取现金红包，可用于减免运费。</li>
          <li>活动期间在“大风车商城微信公众号”文字留言/转发的用户，可免费定制父亲节广告H5/节日祝福H5。</li>
        </ul>
      </div>
    </div>
    <div class="box box-3">
      <img src="@/assets/images/father/father-day-03.png" @click="handleClickImg" />

      <div class="first flex-sb-start">
        <div class="baby baby-1" @click="handleBuy(list[1].id)">
          <img src="@/assets/images/father/baby-2.png" />
          <div class="name">{{ list[1].name }}</div>
          <div class="price-btn">
            <div class="label">供货价</div>
            <div class="count">{{ list[1].price }}</div>
          </div>
        </div>
        <div class="baby baby-2" @click="handleBuy(list[0].id)">
          <img src="@/assets/images/father/baby-1.png" />
          <div class="name">{{ list[0].name }}</div>
          <div class="price-btn">
            <div class="label">供货价</div>
            <div class="count">{{ list[0].price }}</div>
          </div>
        </div>
      </div>
      <div class="second">
        <div class="bg" @click="handleBuy(list[2].id)">
          <div class="name">{{ list[2].name }}</div>
          <div class="price-btn">
            <div class="label">供货价</div>
            <div class="count">{{ list[2].price }}</div>
          </div>
        </div>
        <img src="@/assets/images/father/baby-3.png" @click="handleBuy(list[2].id)" />
      </div>
    </div>
    <div class="box box-4">
      <img src="@/assets/images/father/father-day-04.png" @click="handleClickImg" />
      <div class="baby" @click="handleBuy(list[3].id)">
        <img src="@/assets/images/father/baby-4.png" />
        <div class="info">
          <div class="name">{{ list[3].name }}</div>
          <div class="price-btn">
            <div class="label">供货价</div>
            <div class="count">{{ list[3].price }}</div>
          </div>
          <div class="buy-btn flex-end" id="buy-btn">立即去购买>></div>
        </div>
      </div>
    </div>
    <div class="box box-5">
      <img src="@/assets/images/father/father-day-05.png" @click="handleClickImg" />
      <div class="baby-wrapper">
        <div class="baby-1" @click="handleBuy(list[4].id)">
          <img src="@/assets/images/father/baby-5.png" />
          <div class="name">{{ list[4].name }}</div>
          <div class="price-btn">
            <div class="label">供货价</div>
            <div class="count">{{ list[4].price }}</div>
          </div>
        </div>
        <div class="baby-2" @click="handleBuy(list[5].id)">
          <img src="@/assets/images/father/baby-6.png" />
          <div class="name">{{ list[5].name }}</div>
          <div class="price-btn">
            <div class="label">供货价</div>
            <div class="count">{{ list[5].price }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import brower from '@/utils/brower';
import bridge from '@/utils/bridge';

export default {
  name: 'Father',
  data() {
    return {
      list: [
        {
          id: '73d906f8f45040e59f4f2fdafcf99286',
          name: '秋装新款儿童两件套针织衫裙装',
          price: '56.00',
        }, {
          id: '4d592055e8784f94bc3642f3c6ba232f',
          name: '濮院《千代宝贝》精品童装毛衣',
          price: '28.00',
        }, {
          id: 'adedcac5d35a4b8b9d289976ab695eb7',
          name: '2018秋款韩版儿童牛仔背带裤',
          price: '46.00',
        }, {
          id: 'f605c095eae140e5bcbbb349e4363006',
          name: '中小女童短款可爱牛仔外套',
          price: '41.00',
        }, {
          id: '159d72d93e5f42eda0ef699dfbd408a3',
          name: '韩版中小童春秋休闲运动套装',
          price: '37.00',
        }, {
          id: '589da62722c74ca4bfc4e81ea0dd749b',
          name: '新款潮韩时尚撞色条纹连帽外套',
          price: '36.00',
        },
      ],
    };
  },
  methods: {
    handleClickImg(e) {
      e.stopPropagation();
      e.preventDefault();
    },
    handleBuy(productId) {
      const payload = {
        type: 'product',
        data: {
          id: productId,
        },
      };
      const str = JSON.stringify(payload);

      if (brower.checkIfIOS()) {
        bridge.callHandler('callNavigation', payload, (response) => {
          console.log('JS got response', response);
        });
      } else {
        console.log('str', str);
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
  .father-day {
    color: #ffffff;
    .box {
      position: relative;

      img {
        display: block;
        width: 100%;
        height: auto;
      }
    }

    .name {
      font-size: .185rem;
    }

    img {
      object-fit: cover;
    }

    .price-btn {
      display: flex;
      width: 1.9rem;
      height: .52rem;
      line-height: .52rem;
      font-size: .185rem;
      background-color: #ff8b34;

      .label {
        width: .72rem;
        text-align: center;
      }

      .count {
        flex: 1;
        padding-left: .12rem;
        color: #ff8b34;
        font-size: .32rem;
        background-color: #ffffff;
      }
    }

    .box-2 {
      .rule-info {
        position: absolute;
        top: 1.24rem;
        left: .64rem;
        right: .64rem;
        font-size: .2rem;
        line-height: .4rem;
        color: #ed5129;
        letter-spacing: .02rem;
      }
    }

    .box-3 {
      .first {
        position: absolute;
        top: 1.8rem;
        left: .32rem;
        right: .38rem;
        height: 6.15rem;

        .baby {
          border: .07rem solid #ffffff;
        }

        .baby-1 {
          width: 3.26rem;
          height: 3.26rem;
          align-self: flex-end;

          img {
            width: 100%;
            height: 100%;
          }

          .name {
            position: absolute;
            left: .22rem;
            bottom: .92rem;
            text-shadow: .01rem .01rem .01rem rgba($color: #000000, $alpha: 0.7)
          }

          .price-btn {
            position: absolute;
            left: .22rem;
            bottom: .22rem;
          }
        }

        .baby-2 {
          margin-left: .24rem;
          width: 3.26rem;
          height: 4.95rem;
          background-color: #3ca0e7;

          img {
            height: 3.12rem;
            border-bottom: .07rem solid #ffffff;
          }

          .name {
            margin-top: .3rem;
            margin-left: .12rem;
          }

          .price-btn {
            margin-top: .24rem;
            margin-left: .12rem;
          }
        }
      }

      .second {
        position: absolute;
        bottom: .1rem;
        left: .3rem;
        right: .3rem;
        .bg {
          padding-left: .2rem;
          margin-bottom: .32rem;
          height: 3.3rem;
          background-color: #ffffff;
          border: .07rem solid #3ca0e7;

          .name {
            margin-top: .92rem;
            width: 2.08rem;
            color: #000000;
            font-size: .24rem;
          }

          .price-btn {
            margin-top: .4rem;

            .count {
              margin: .02rem;
            }
          }
        }

        img {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 4.32rem;
          height: 4.03rem;
          border: .07rem solid #ffffff;
          border-radius: .07rem;
        }
      }
    }

    .box-4 {
      .baby {
        position: absolute;
        top: 2.7rem;
        left: .54rem;
        right: .54rem ;
        height: 3.25rem;
        display: flex;
        font-size: .24rem;
        border: .07rem solid #ffffff;
        background-color: #db603f;

        img {
          height: 100%;
          width: 3.22rem;
        }

        .info {
          flex: 1;
          padding: .68rem .32rem .28rem .18rem;
        }

        .price-btn {
          margin-top: .28rem;
        }

        .buy-btn {
          margin-top: .78rem;
        }
      }
    }

    .box-5 {
      .baby-wrapper {
        position: absolute;
        bottom: .4rem;
        left: .65rem;
        right: .6rem;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;

        img {
          width: 100%;
          border: .07rem solid #ffffff;
        }
      }

      .name {
        margin-top: .24rem;
      }

      .price-btn {
        margin-top: .22rem;
      }

      .baby-1 {
        width: 2.2rem;
      }

      .baby-2 {
        margin-left: 0.32rem;
        width: 3.25rem;
      }
    }
  }
</style>
