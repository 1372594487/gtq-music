## Loading动画

必要的HTML DOM元素

```html
<!-- LOADING -->
<ul class="loading-container">
    <li class="shape1"></li>
    <li class="shape2"></li>
    <li class="shape3"></li>
    <li class="shape4"></li>
</ul>
```

必要CSS代码

```css
// LOADING ANIMATION
.loading-container{
    position: fixed;
    width: 30px;
    height: 30px;
    left: 50%;
    top: 50%;
    transform: rotate(10deg) translate(-50%, -50%);
    animation: rotation 1s infinite ease-in-out;
    li{
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        &.shape1 {left: 0;background-color: #fd5159;}
        &.shape2 {right: 0;background-color: #fd5159;}
        &.shape3 {bottom: 0;background-color: #fd5159;}
        &.shape4 {bottom: 0;right: 0;background-color: #fd5159;}
    }
}
@keyframes rotation {
    from {transform: rotate(0deg);}
    to {transform: rotate(360deg);}
  }
.loading-container .shape1 {animation: loaddingshape1 1s ease-in-out 0s infinite alternate;}
.loading-container .shape2 {animation: loaddingshape2 1s ease-in-out 0s infinite alternate;}
.loading-container .shape3 {animation: loaddingshape3 1s ease-in-out 0s infinite alternate;}
.loading-container .shape4 {animation: loaddingshape4 1s ease-in-out 0s infinite alternate;}
@keyframes loaddingshape1 {
    from {transform: translate(0, 0);border-radius: 50%;}
    to {transform: translate(20px, 20px);border-radius: 0;}
}
@keyframes loaddingshape2 {
    from {transform: translate(0, 0);border-radius: 50%;}
    to {transform: translate(-20px, 20px);border-radius: 0;}
}
@keyframes loaddingshape3 {
    from {transform: translate(0, 0);border-radius: 50%;}
    to {transform: translate(20px, -20px);border-radius: 0;}
}
@keyframes loaddingshape4 {
    from {transform: translate(0, 0);border-radius: 50%;}
    to {transform: translate(-20px, -20px);border-radius: 0;}
}
```

js控制显示与清除

```js
// 加载动画
var Loading = {
    show: function() {
        $('.loading-container').show();
    },
    clear: function() {
        $('.loading-container').hide();
    }
};
```

------------------------------------------

-------------------------



或者直接一个js，这里面包含了DOM和CSS

```js
// 加载动画
var Loading = {
    insert: false,
    domAndStyle: function() {
        var cssStr = ".loading-container{position:fixed;width:30px;height:30px;left:50%;top:50%;-webkit-transform:rotate(10deg) translate(-50%,-50%);-ms-transform:rotate(10deg) translate(-50%,-50%);transform:rotate(10deg) translate(-50%,-50%);-webkit-animation:rotation 1s infinite ease-in-out;animation:rotation 1s infinite ease-in-out}.loading-container li{position:absolute;width:10px;height:10px;border-radius:50%}.loading-container li.shape1{left:0;background-color:#fd5159}.loading-container li.shape2{right:0;background-color:#fd5159}.loading-container li.shape3{bottom:0;background-color:#fd5159}.loading-container li.shape4{bottom:0;right:0;background-color:#fd5159}@-webkit-keyframes rotation{from{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes rotation{from{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.loading-container .shape1{-webkit-animation:loaddingshape1 1s ease-in-out 0s infinite alternate;animation:loaddingshape1 1s ease-in-out 0s infinite alternate}.loading-container .shape2{-webkit-animation:loaddingshape2 1s ease-in-out 0s infinite alternate;animation:loaddingshape2 1s ease-in-out 0s infinite alternate}.loading-container .shape3{-webkit-animation:loaddingshape3 1s ease-in-out 0s infinite alternate;animation:loaddingshape3 1s ease-in-out 0s infinite alternate}.loading-container .shape4{-webkit-animation:loaddingshape4 1s ease-in-out 0s infinite alternate;animation:loaddingshape4 1s ease-in-out 0s infinite alternate}@-webkit-keyframes loaddingshape1{from{-webkit-transform:translate(0,0);transform:translate(0,0);border-radius:50%}to{-webkit-transform:translate(20px,20px);transform:translate(20px,20px);border-radius:0}}@keyframes loaddingshape1{from{-webkit-transform:translate(0,0);transform:translate(0,0);border-radius:50%}to{-webkit-transform:translate(20px,20px);transform:translate(20px,20px);border-radius:0}}@-webkit-keyframes loaddingshape2{from{-webkit-transform:translate(0,0);transform:translate(0,0);border-radius:50%}to{-webkit-transform:translate(-20px,20px);transform:translate(-20px,20px);border-radius:0}}@keyframes loaddingshape2{from{-webkit-transform:translate(0,0);transform:translate(0,0);border-radius:50%}to{-webkit-transform:translate(-20px,20px);transform:translate(-20px,20px);border-radius:0}}@-webkit-keyframes loaddingshape3{from{-webkit-transform:translate(0,0);transform:translate(0,0);border-radius:50%}to{-webkit-transform:translate(20px,-20px);transform:translate(20px,-20px);border-radius:0}}@keyframes loaddingshape3{from{-webkit-transform:translate(0,0);transform:translate(0,0);border-radius:50%}to{-webkit-transform:translate(20px,-20px);transform:translate(20px,-20px);border-radius:0}}@-webkit-keyframes loaddingshape4{from{-webkit-transform:translate(0,0);transform:translate(0,0);border-radius:50%}to{-webkit-transform:translate(-20px,-20px);transform:translate(-20px,-20px);border-radius:0}}@keyframes loaddingshape4{from{-webkit-transform:translate(0,0);transform:translate(0,0);border-radius:50%}to{-webkit-transform:translate(-20px,-20px);transform:translate(-20px,-20px);border-radius:0}}";
        var style = window.document.createElement("style"); 
        style.type = "text/css"; 
        style.innerHTML = cssStr; 
        window.document.getElementsByTagName("HEAD").item(0).appendChild(style);
        var domStr = "<ul class='loading-container'><li class='shape1'></li><li class='shape2'></li><li class='shape3'></li><li class='shape4'></li></ul>";
        var dom = window.document.createElement("ul"); 
        dom.innerHTML = domStr; 
        window.document.body.getElementsByTagName("div").item(0).appendChild(dom);
    },
    show: function() {
        if (!this.insert) {this.domAndStyle();this.insert=true;}
        $('.loading-container').show();
    },
    clear: function() {
        $('.loading-container').hide();
    }
};
```

