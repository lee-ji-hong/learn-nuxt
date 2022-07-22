<template>
  <div class="roulette-outer">
    <!--<img class="test" src="../assets/images/first.png" :alt="하하"/>-->
    
    
    <div class="roulette-pin"></div>
    <div class="roulette" :style="roulettStyle">
        <!--값 영역-->
        <div class="item-wraper">
            <div v-for="(item,index) in items" :key="index" class="item" :style="itemStyles[index]">{{item.value}}</div>
        </div>

        <!--선 영역-->
        <div class="item-wraper">
            <div v-for="(item,index) in items" :key="index" class="line" :style="lineStyles[index]"></div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
    name: 'RoulettePage',
    data() {
    return {
      searchKeyword: '../assets/images/first.png',

      items:[
        {value:'1'},
        {value:'2'},
        {value:'3'},
        {value:'4'},
        {value:'5'},
        {value:'6'},
      ],
      itemStyles:[],
      lineStyles:[],
      current:0 // pin이 가리리킄 데이터 위치
     }
   },
   computed:{
    segment(){
        return 360/this.items.length;
    },
    offset(){
        return this.segment/2
    },
    angle(){
        return-this.current*this.segment
    },
    roulettStyle(){
        return {
            "transform":"rotate("+this.angle+"deg)"
        }
    }
   },
   created(){
        this.items.forEach((el,index)=>{
            // itemStyles 정의
            this.itemStyles.push({
                "transform":"rotate("+(this.segment*index)+"deg)",
            })
            // lineStyles 정의
            this.lineStyles.push({

                "transform":"rotate("+(this.segment*index + this.offset) +"deg)",
            })
        })
   },
   mounted(){
    
    
   }
}
</script>

<style>
    /* .test{
        width:100px
    } */
    .roulette-outer{
        text-align:center;
        position: relative;
        overflow: hidden;

        /**/width:500px;
        height:500px;

        font-size: 30px;

        margin-left:auto;
        margin-right:auto;

        
        /* background:#ffeaa7; */
    }
    .roulette-outer > .roulette {
        
        position: absolute;
        top:5%;
        left:5%;
        right:5%;
        bottom:5%;
        border-radius:50%;
        /* background:gray; */
        border: 2px solid black
    }
    .roulette-outer > .roulette > .item-wraper > .item {
        position: absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;

        padding-top:10%;
        text-align:center;
        display:flex;
        justify-content:center;
    }
    .roulette-outer > .roulette > .item-wraper > .line {
        position:absolute;
        top:0;
        bottom:50%;
        left:50%;
        width:2px;
        margin-left:-1px;
        background: black;
        transform-origin:bottom
    }
    .roulette-outer > .test {
        width:450px;
        position: absolute;
        top:0%;
        left:0%;
        right:0%;
        bottom:10%;
        border-radius:50%;
        /* background:gray;
        border: 2px solid black */
    }
    .roulette-outer > .roulette-pin {
        position: absolute;
        top:3%;
        left:50%;

        margin-left:-5px;

        width:0;
        height:0;
        right:0;
        border-style:solid;
        border-width:25px 5px 0 5px;
        border-color:#ff0000 transparent transparent transparent;
    }

</style>