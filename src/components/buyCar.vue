<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-for="(item, index) in message" :key="item.id">
                                    <td width="48" align="center">
                                        <el-switch v-model="item.isSelected" active-color="#409eff" inactive-color="#555555">
                                        </el-switch>
                                    </td>
                                    <td align="left" colspan="2">
                                        <div class="shopInfo"><img :src="item.img_url" alt="" style="width: 50px; height: 50px; margin-right: 10px;">
                                            <span>{{item.title}}</span>
                                        </div>
                                    </td>
                                    <td width="84" align="left">{{item.sell_price}}</td>
                                    <td width="104" align="center">
                                        <el-input-number @change="countChange($event,index)" size="mini" :min="1" :max="10" v-model="item.buycount"></el-input-number>
                                    </td>
                                    <td width="104" align="left">{{item.sell_price*item.buycount}}</td>
                                    <td width="54" align="center">
                                        <a @click="modalShow=true,deleteIndex=index;" href="javascript:void(0)">删除</a>
                                    </td>
                                </tr>
                                <!-- 当购物车没有东西的时候显示 -->
                                <tr v-if="undefined&&this.message.length==0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{totalNum}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{totalPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                            <button class="submit" onclick="formSubmit(this, '/', '/shopping.html');">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
        <!-- 模态框 -->
        <Modal v-model="modalShow" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>提示框</span>
            </p>
            <div style="text-align:center">
                <p>你确定要删除嘛?</p>
            </div>
            <div slot="footer">
                <Row :gutter="16" justify="center">
                    <Col span="8" offset="6">
                    <Button type="success" size="large" @click="modalShow=false">取消</Button>
                    </Col>
                    <Col span="6">
                    <Button type="error" size="large" @click="del">删除</Button>
                    </Col>
                </Row>
            </div>
        </Modal>

    </div>
</template>
<script>
export default {
    name:"buyCar",
    data:function(){
        return{
            // 一开始没有被添加数据是undefined  主要解决刷新情况下页面一直存在没有商品的显示
            message:undefined,
            modalShow:false,
            // 删除的index值
            deleteIndex:0

        }
    },
    created(){
        // 进来显示弹框
        this.$Spin.show();
        let buyList = this.$store.state.buyList;
        let ids="";
        // console.log(buyList);
        for (const key in buyList) {
            ids+=key;
            ids+=","
        }
        ids = ids.slice(0,-1);
        // 当ids为空的时候就不发起ajax了
        if(ids==""){
            setTimeout(()=>{
                this.$Spin.hide();
            },1000)
            return
        } 
        this.axios.get(`site/comment/getshopcargoods/${ids}`).then(response=>{
            // console.log(response);
            response.data.message.forEach((v,i)=>{
                v.buycount = buyList[v.id];
                v.isSelected = true;
            })
            this.message = response.data.message;
            // console.log(this.message);
            // 请求完成关闭弹框
            setTimeout(()=>{
                this.$Spin.hide();
            },1000)
        }).catch(error=>{
            console.log(error);
        })
    },
    computed:{
        // 计算总数量
        totalNum(){
            let tNum =0;
            // 非空判断
             if(this.message==undefined) return tNum;
            this.message.forEach(v=>{
                if(v.isSelected){
                    tNum += v.buycount;
                }
            })
            return tNum;
        },
        // 计算总价格
        totalPrice(){
            let price = 0;
            // 非空判断
             if(this.message==undefined) return price;
            this.message.forEach(v=>{
                if(v.isSelected){
                    price += v.buycount*v.sell_price;
                }
            })
            return price;
        }
    },
    methods:{
        countChange(value,index){
            console.log(value,index);
            // console.log(this.$store.state.buyList[index]);
            console.log(this.message[index].id);
            this.$store.commit('changeCount',{
                goodid: this.message[index].id,
                goodNum:value
            })
        },
        del(){
            // 在删除当前页面的id前同步到vuex的仓库中
            this.$store.commit('delete',this.message[this.deleteIndex].id)
            // 删除当前渲染页面的
            this.message.splice(this.deleteIndex,1);
            this.modalShow = false;
            
        }
    }
}
</script>

