---
publishDate: 2025-12-03T15:31:41+08:00
updatedDate: 2025-12-04T00:10:46+08:00
---

---
title: Signature Question
description: The issue of displaying incorrect signatures. The solution of the question.

tags:
  - Signature
  - Bold
language: 中文
slug: Worry_Signature
---
## 🛠️ The solution of the worry signature.
今天终于解决了插入 Signature 后
icon粗体化的问题

问题展示：
<img width="496" height="130" alt="image" src="https://github.com/user-attachments/assets/616727f0-2881-412f-8e02-4eda4e98cb98" />

```bash
<?xml version="1.0" encoding="utf-8"?> <svg enable-background="new 0 0 1024 224" fill="none" height="auto" id="Layer_1" version="1.1" viewBox="33 -80 969 386" width="100%" x="0px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" y="0px">
<style>
path{
    stroke: black;
    stroke-width: 4;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
    opacity: 1;
}
</style>
<path.   ...
```
  
由于signature.svg中的的 <style> 样式会影响到 icon 的表现  
使得其他正常的 icon 变粗 加黑  
影响效果的展示  
  
  

任务排查  
1. 我先定位问题是在 index.astro  
   我认为是 signature.astro 的样式太过于强势  其路径 /packages/pure/components/user/Signature.astro  
   影响到了 index.astro 的效果展示  
   但是 我在反复修改 <Signature />  企图将其封闭起来  
   使用隔离容器包裹  
   让其样式不外溢到其他效果  
   此方法无果  

2. 然后想法是修改 signature.astro  
   想看它的样式强势在哪  
   然后发现  
   ```bash
   <!-- <style is:global> 修改权限 -->
   <style>
   .signature-wrapper svg {
       width: 100%;
       height: auto;
       stroke: currentColor;
     }
   </style>.
   ```
   is:global 我认为抓住了问题的关键  
   但是很可惜 并不是  
   
3. 在经过ChatGPT的指引后  
   它让我目光看到 signature.svg  
   这是我也恍然大悟  
   在 page/about/index.astro 页面的签名并没有影响到其他 icon  
   关键原因就在于 signature.svg 中出现了 <style> 其样式影响到了其他的 icon  
   再将其删除后  
   一切问题得以解决  
   

## 🛠️ 写在最后 之另一个问题

关于为什么 .svg 会出现 <style>   
这是完全可以单出一篇日志的  

日后我或将补齐这一问题   
而且 日前我也在 Lindx.do 论坛看到了有人提出这一问题 （问题：自动生成的笔划 并不是按照签名的笔划）  
🔗 链接：https://linux.do/t/topic/1204037/11

今天 仅作一个大致介绍  

在签名动画中 也就是前文提到的 Signature.astro   
在该文件中提出了 描边签名动画  

我在 “曲折离奇” 的使用后   
发现了无法实心化的问题  
这又是一个巨大的 亟需解决的问题 于我  
  
那么我在ChatGPT的不断询问下  
让他给我实现 signature.svg 的动画  
  
在 assest 中也可以看到 我经过了诸多的尝试  
仍然无法提取出最终行之有效的 .svg 文件  
  
因此我所有的可动的 signature 都是经由 GPT 生成  
  
那么其中就有一个问题   
会出现一些奇奇怪怪的东西   
如 上文提到的 <style>  
在日后影响深远～  
  
除此之外  
  
还有一个重要的问题 就是笔划问题  
  
我在 ChatGPT 的指导下 也找出了结局方案  
就是 在每一个笔划 即 每一个 <path> 中添加 seq 属性  
  

```bash
   <path
        d=" M240.599823,369.087402   C235.639099,369.272400 233.070847,366.395599 231.935257,362.586823   C230.742737,358.587067 233.361465,356.248779 236.733093,354.344696   C247.828949,348.078461 259.843933,344.039429 271.795624,339.962555   C321.766998,322.916931 372.859009,310.219513 424.740051,300.451721   C453.485229,295.039825 482.376770,290.630707 511.366089,287.026642   C530.624878,284.632294 550.032288,283.191925 569.387695,281.473724   C604.710510,278.338043 640.095032,276.629395 675.515198,276.173553   C693.739685,275.938995 712.015808,276.427887 730.244202,278.395752   C744.955261,279.983917 759.653198,281.386230 774.091370,284.683472   C778.779968,285.754242 783.396973,287.203094 787.961487,288.733124   C791.899475,290.053131 794.838196,292.634003 796.569153,296.555298   C797.936157,299.652161 797.083923,302.113037 794.698730,304.133942   C792.097961,306.337616 788.540894,306.825012 786.474060,304.518982   C782.274719,299.833771 776.639465,299.032928 771.269592,297.743744   C754.437195,293.702667 737.284485,291.701141 720.043518,290.250336   C686.282959,287.409454 652.504456,287.975586 618.751770,289.837280   C592.027100,291.311340 565.327698,293.274841 538.692749,296.104980   C499.497955,300.269714 460.456635,305.457855 421.817444,313.274078   C367.794525,324.202271 314.489441,337.822479 262.806976,357.243439   C255.024216,360.167999 247.290665,363.288483 240.599823,369.087402  z"
        data-duration="600"
        fill="none"
        seq="5"
        opacity="1.000000"
        stroke="black"
        stroke-width="2"
  />

```
   
seq=‘x’ （ x ∈ R ） 1、2、3 ...  
seq 值越小 则笔划越先出现  
  
这样就解决了笔划的问题  
  
  
The end.  















