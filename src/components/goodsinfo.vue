<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div v-if="this.imglist.length!=0" class="pic-box">
                                <ProductZoomer :baseImages="images" :base-zoomer-options="zoomerOptions"></ProductZoomer>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <div class="el-input-number el-input-number--small">
                                                    <span @click="buyNum==1?buyNum==1:buyNum--" :class="{'is-disabled':buyNum==1}" role="button" class="el-input-number__decrease ">
                                                        <i @click="buyNum==1?buyNum==1:buyNum--" class="el-icon-minus"></i>
                                                    </span>
                                                    <span @click="buyNum<goodsinfo.stock_quantity?buyNum++:goodsinfo.stock_quantity" :class="{'is-disabled':buyNum==goodsinfo.stock_quantity}" role="button" class="el-input-number__increase">
                                                        <i @click="buyNum<goodsinfo.stock_quantity?buyNum++:goodsinfo.stock_quantity" class="el-icon-plus"></i>
                                                    </span>
                                                    <div class="el-input el-input--small">
                                                        <!---->
                                                        <input v-model="buyNum" type="text" autocomplete="off" max="60" min="1" class="el-input__inner" role="spinbutton" aria-valuemax="60" aria-valuemin="1" aria-valuenow="1" aria-disabled="undefined">
                                                        <!---->
                                                        <!---->
                                                        <!---->
                                                    </div>
                                                </div>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button class="buy">立即购买</button>
                                                <button @click="carAdd" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a @click="isShowDesc=true" href="javascript:;" :class="{selected:isShowDesc}">商品介绍</a>
                                        </li>
                                        <li>
                                            <a @click="isShowDesc=false" href="javascript:;" :class="{selected:!isShowDesc}">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <div v-html="goodsinfo.content" class="tab-content entry" :style="{display: isShowDesc?'block':'none'}">
                            </div>
                            <div class="tab-content" :style="{display: !isShowDesc?'block':'none'}">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea v-model.trim="commentContent" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input @click="submitComments" id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-if="messageList.length==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item, index) in messageList" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | cutTime}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <Page :total="totalCount" :page-size="pageSize" placement="top" show-elevator show-sizer @on-change="changeIndex($event)" @on-page-size-change="changepageSize($event)" :page-size-opts='[5, 10,15,20]' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item, index) in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/goodsinfo/'+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/goodsinfo/'+item.id">{{item.title}}</router-link>
                                            <span>{{item.add_time | cutTime}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BackTop></BackTop>
        <!-- 陪伴他的图片 -->
        <img class="moveImg" style="display:none" v-if="imglist.length!=0" :src="imglist[0].original_path" alt="">
    </div>
</template>

<script>
    import $ from 'jquery'
    import ProductZoomer from 'vue-product-zoomer';
    export default {
        name: "goodsinfo",
        data: function () {
            return {
                goodsinfo: {},
                hotgoodslist: [],
                imglist: [],
                // 买的数量
                buyNum:1,
                // 商品详情和评论的切换
                isShowDesc:true,
                // 放大镜
               images: {
                    normal_size: []
                },
                    // 轮播图的配置
                zoomerOptions: {
                    'zoomFactor': 3,
                    'pane': 'pane',
                    'hoverDelay': 300,
                    'namespace': 'zoomer',
                    'move_by_click':false,
                    'scroll_items': 7,
                    'choosed_thumb_border_color': "#dd2c00"
                },
                // 评论的数组
                messageList:[],
                // 评论相关数据
                pageIndex:1,
                pageSize:5,
                // 总页数
                totalCount:0,
                // 输入的评论内容
                commentContent:''

            }
        },
        
        methods: {
            getgoodsInfo() {
                // 强制初始化
                this.imglist=[];
                // 清空预览图片的数组
                this.images.normal_size=[];
                this.axios.get(`site/goods/getgoodsinfo/${this.$route.params.goodsid}`).then(response => {
                    // console.log(response);
                    this.goodsinfo = response.data.message.goodsinfo;
                    this.hotgoodslist = response.data.message.hotgoodslist;
                    this.imglist = response.data.message.imglist;
                    // console.log(this);
                    this.imglist.forEach((v,i)=>{
                        this.images.normal_size.push({
                            id:v.id,
                            url:v.original_path
                        })
                    })
                    // console.log(this.images);
                }).catch(error => {
                    console.log(error);
                })
            },
            // 获取评论
            getcomments(){
                this.axios.get(`site/comment/getbypage/goods/${this.$route.params.goodsid}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`).then(response=>{
                    // console.log(response);
                    this.messageList = response.data.message;
                    this.totalCount =response.data.totalcount;
                    
                }).catch(error=>{console.log(error);})
            },
            // 页面改变
            changeIndex(page){
               this.pageIndex = page;
               this.getcomments();
            },
            // 页面容量改变
            changepageSize(size){
                this.pageSize = size;
                this.getcomments();
            },
            // 提交评论
            submitComments(){
                if(this.commentContent==""){

                    this.$Message.error('对方不想说话,并且向你抛出一个异常');
                    // this.$message.error('警告哦，这是一条警告消息');
                    return;
                }
                this.axios.post(`site/validate/comment/post/goods/${this.$route.params.goodsid}`,{
                    commenttxt:this.commentContent
                }).then(response=>{
                    console.log(response)
                    if(response.data.status==0){
                        this.$Message.success('评论成功!')
                        this.pageIndex=1;
                        this.getcomments()
                    }
                }).catch(error=>{console.log(error)});
                this.commentContent="";
            },
            carAdd(){
                let gwcoffset = $("#buyButton .add").offset();
                console.log(gwcoffset);
                let overoffest = $(".icon-cart").offset();
                $(".moveImg").show().css(gwcoffset).addClass('move').stop(false,true).animate(overoffest,1000,()=>{
                    $('.moveImg').removeClass('move').hide();
                })
                    this.$store.commit('increment',{
                        goodid:this.$route.params.goodsid,
                        goodNum:this.buyNum
                    });
            }
        },
        components: {
            ProductZoomer
        },
        // 这个生命周期函数中data 和methods 中的那些值 还没有设置给这个组件
        beforeCreate() {

        },
        // 在实例创建完成后被立即调用
        created() {
            this.getgoodsInfo();
            this.getcomments();
        },
        watch: {
            $route(to, from) {
                this.getgoodsInfo();
                this.getcomments();
            }
        }
    }
</script>

<style>
.zoomer-zoomer-box {
    width: 368px
}
.thumb-list img {
    height: 78px;
    width: 78px;
}
.control i {
  text-align: center;
}
#zoomer-pane-container {
    left: 377.5px !important ;
    top: 30px !important;
}
.moveImg{
    width: 40px;
    position: absolute;
    top: 0;
    right: 50px;
}
.moveImg.move{
    transform: scale(.5,.5) rotateZ(3600deg);
    transition: transform 1s;
}
@import url('../../node_modules/font-awesome/css/font-awesome.min.css');
    /* @import url('../assets/lib/zoom/css/magnifier.css'); */
</style>