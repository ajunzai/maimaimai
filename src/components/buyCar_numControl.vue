<template>
    <div class="numControl">
        <span class="sub" :class="{disabled:mycount==min}" @click="sub">-</span>
        <input type="number" v-model="mycount">
        <span class="add" :class="{disabled:mycount==max}" @click="add">+</span>
    </div>
</template>
<script>
export default {
    // 外部绑定:count="xxx",然后把值给子组件绑定mycount
    props:["count","max","min"],
    data:function(){
        return{
            mycount:1
        }
    },
    created(){
        this.mycount = this.count;
    },
    methods:{
        sub(){
            if(this.mycount==this.min){
                return;
            }
            this.mycount--;
            this.$emit("change",this.mycount)
        },
        add(){
            if(this.mycount==this.max){
                return
            }
            this.mycount++;
            this.$emit("change",this.mycount)
        }
    }
}
</script>
<style scoped lang="scss">
    .numControl{
        display: flex;
        span {
            border: 1px solid #000;
            width: 30px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            cursor: pointer;
            &:first-child{
                border-top-left-radius: 5px;
                border-bottom-left-radius: 5px;
            }
            &:last-child{
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
            }
            &.disabled{
                cursor: no-drop;
            }
        }
        input {
            padding-left: 10px;
            width: 50px;        
            border: 1px solid #000;
            border-left: none;
            border-right: none;
            text-align: center;
  }
    }
</style>

