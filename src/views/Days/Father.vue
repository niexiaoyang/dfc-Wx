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
      font-size: 9px;
    }

    img {
      object-fit: cover;
    }

    .price-btn {
      display: flex;
      width: 95px;
      height: 26px;
      line-height: 26px;
      font-size: 9px;
      background-color: #ff8b34;

      .label {
        width: 36px;
        text-align: center;
      }

      .count {
        flex: 1;
        padding-left: 6px;
        color: #ff8b34;
        font-size: 16px;
        background-color: #ffffff;
      }
    }

    .box-2 {
      .rule-info {
        position: absolute;
        top: 70px;
        left: 28px;
        right: 28px;
        font-size: 10px;
        line-height: 20px;
        color: #ed5129;
        letter-spacing: 1px;
      }
    }

    .box-3 {
      .first {
        position: absolute;
        top: 90px;
        left: 16px;
        right: 19px;
        height: 307px;

        .baby {
          border: 3px solid #ffffff;
        }

        .baby-1 {
          width: 163px;
          height: 163px;
          align-self: flex-end;

          img {
            width: 100%;
            height: 100%;
          }

          .name {
            position: absolute;
            left: 11px;
            bottom: 46px;
            text-shadow: 1px 1px .01px rgba($color: #000000, $alpha: 0.7)
          }

          .price-btn {
            position: absolute;
            left: 11px;
            bottom: 11px;
          }
        }

        .baby-2 {
          margin-left: 12px;
          width: 163px;
          height: 248px;
          background-color: #3ca0e7;

          img {
            height: 156px;
            border-bottom: 3px solid #ffffff;
          }

          .name {
            margin-top: 15px;
            margin-left: 6px;
          }

          .price-btn {
            margin-top: 12px;
            margin-left: 6px;
          }
        }
      }

      .second {
        position: absolute;
        bottom: 5px;
        left: 15px;
        right: 15px;
        .bg {
          padding-left: 10px;
          margin-bottom: 16px;
          height: 165px;
          background-color: #ffffff;
          border: 3px solid #3ca0e7;

          .name {
            margin-top: 46px;
            width: 104px;
            color: #000000;
          }

          .price-btn {
            margin-top: 20px;

            .count {
              margin: 1px;
            }
          }
        }

        img {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 216px;
          height: 201px;
          border: 3px solid #ffffff;
          border-radius: 3px;
        }
      }
    }

    .box-4 {
      .baby {
        position: absolute;
        top: 135px;
        left: 27px;
        right: 27px ;
        height: 162px;
        display: flex;
        font-size: 12px;
        border: 3px solid #ffffff;
        background-color: #db603f;

        img {
          height: 100%;
          width: 160px;
        }

        .info {
          flex: 1;
          padding: 39px 16px 14px 9px;
        }

        .price-btn {
          margin-top: 14px;
        }

        .buy-btn {
          margin-top: 28px;
        }
      }
    }

    .box-5 {
      .baby-wrapper {
        position: absolute;
        top: 90px;
        left: 32px;
        right: 30px;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;

        img {
          width: 100%;
          border: 3px solid #ffffff;
        }
      }

      .name {
        margin-top: 12px;
      }

      .price-btn {
        margin-top: 11px;
      }

      .baby-1 {
        width: 110px;
      }

      .baby-2 {
        margin-left: 16px;
        width: 162px;
      }
    }
  }
</style>
