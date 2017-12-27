## 圣诞大作战

### 1 放入图片对象

在制作游戏前，首先要导入所有的游戏资源。我们所有的游戏资源都是图片，图片资源的导入和使用分为两步：

* 创建图片对象

  输入以下代码，可以创建一个图片对象：

  ```javascript
  var bg = new Sprite('http://ou1htxdl4.bkt.clouddn.com/crs.jpg',0,0,600,400);
  ```

  其中：

  1. `bg`是这个图片对象的名称，可以自己定义
  2. `'http://ou1htxdl4.bkt.clouddn.com/crs.jpg'`是图片的链接地址，想要替换不同图片就替换链接地址
  3. `0,0`是图片左上角的坐标位置
  4. `600`是图片的宽度，`400`是图片的高度

* 画出图片

  创建好图片对象后，还不能画出来，我们需要用下面这行代码来画出图片：

  ```javascript
  bg.draw();
  ```

  其中：

  1. `bg`表示要画出的是叫做`bg`这个名称的对象
  2. `draw`表示画出这个对象，它后面的`()`和`;`千万不能忘记

> #### 小练习
>
> 挑选图片，在游戏中画出所有游戏元素
>
> 1. 左边玩家的图片（p1）  2. 右边玩家的图片（p2）  3. 中间障碍物的图片（tree）  球的图片（ball）
>
> ![示意图1](http://ou1htxdl4.bkt.clouddn.com/santa1.jpg){:zoom="50%";} 

### 2 让图片落在地上

有的同学的图片位置可能不对，玩家漂浮在空中。没有关系，我们通过简单的几行代码，就能让他们落到地上。

在`画出图片`（也就是后面带`.draw()`）的代码前加上以下代码：

```javascript 
ball.drop();
```

这行代码可以让小球落到地上。

其中：

1. `ball`是对象的名称，也就是想让谁掉落，就把谁写在这里
2. `drop()`是指这行代码的作用是让对象落在地上
3. 将这行代码写在`.draw()`代码的前面，是为了让它先下落再画出来

> #### 小练习
>
> 让以下游戏元素都落到地上
>
> 1. 左边玩家
> 2. 右边玩家
> 3. 球

### 3 用键盘控制玩家

用键盘控制玩家移动有固定的格式，在这里我们会学习两种键盘的事件：

* 按键按下（down）

  ```javascript
  Key['按键名称'].down = function() {
      按键效果;
  }
  ```

  其中，按键名称和按键效果是可以自定义的地方：

  1. 按键名称需要用一对`''`包起来，否则会出错

  2. 每个按键的名称如下图所示

     ![键盘示意图](http://ou1htxdl4.bkt.clouddn.com/keyboard2-01.jpg) 

  > #### 试一试
  >
  > 在`Loop`函数的大括号`{ }`外输入以下代码：
  >
  > ```javascript
  > Key['ArrowRight'].down = function() {
  >     p2.moveX = 3;
  > }
  > ```
  >
  > 这行代码可以让我们按下向右方向键时，玩家2（p2）向右移动。如何理解呢？
  >
  > 1. `'ArrowRight'`是右方向键的名称
  > 2. `down`表示按下这个按键
  > 3. `p2.moveX`是控制`p2`移动的变量：当它比0大时，`p2`向右移动；当它比0小时，`p2`向左移动

  > #### 小练习
  >
  > 请选择你喜欢的按键，用它们来控制玩家1和玩家2的跳起，一共有两个跳起效果，所以需要2个按键：
  >
  > 1. 玩家1跳起：`p1.jump()`
  > 2. 玩家2跳起：`p2.jump()`

* 按键弹起（up）

  目前有一个问题：当我们按下向右按键后，即使放开了按键，玩家2仍然向右移动，这是因为我们没有做按键弹起的事件反应。按键弹起的格式和按键按下类似，只是将`down`改成了`up`。如下所示：

  ```javascript
  Key['按键名称'].up = function() {
      按键效果;
  }
  ```

  > #### 试一试
  >
  > 我们想让玩家2（p2）停止，就应该让`p2.moveX = 0`，因此，输入以下代码：
  >
  > ```javascript
  > Key['ArrowRight'].up = function() {
  >     p2.moveX = 0;
  > }
  > ```
  >
  > 可以发现，现在放开按键后，玩家2就停止了移动。

  > #### 小练习
  >
  > 请选择你喜欢的按键，用它们来控制玩家1和玩家2的移动，一共有四个移动效果，所以需要4个按键：
  >
  > 1. 玩家1向左移动：`p1.moveX = -3`
  > 2. 玩家1向右移动：`p1.moveX = 3`
  > 3. 玩家2向左移动：`p2.moveX = -3`
  > 4. 玩家2向右移动：`p2.moveX = 3`

### 4 碰撞检测

要进行碰撞检测，非常简单。如果有两个物体的名称叫做A和B，那么要检测A是否碰撞到B，就使用`A.collide(B)`就行了。

那么在我们的游戏中，`p1`碰撞到小球`ball`时，会产生的反应，就可以这样描述：

在控制所有物体落下（`drop`）的代码后面添加以下代码：

```javascript
 if (p1.collide(ball)) {
     ball.hit(p1);
 }
```

if是我们学习过的条件语句，当括号内的条件满足时（也就是p1碰撞到ball时），会产生的反应是：`ball.hit(p1)`，这行代码的意思就是ball会碰到p1后反弹。

那么，`p2`碰到小球`ball`之后，会有这样的反应呢？

> #### 小练习
>
> 我们可以发现，`p2`碰到小球`ball`之后的反应和`p1`碰撞到小球`ball`时非常相似，我们只需要再写一段代码，并将`p1`改为`p2`就行了。
>
> ```javascript
>  if (p2.collide(ball)) {
>      ball.hit(p2);
>  }
> ```

那么，我们的小球碰到树的时候，应该怎么办呢？其实也很简单的哦。

```javascript
if (ball.collide(tree)) {
        ball.hit(tree);
}
```

这样，我们的游戏就完成了。

### 5 保存分享链接

点击右上角的分享按钮，记录下分享链接，就可以分享给朋友玩了！