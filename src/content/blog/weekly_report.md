---
publishDate: 2025-12-03T13:28:12+08:00
updatedDate: 2025-12-04T00:17:52+08:00
---
---
publishDate: 2025-12-03T13:28:12+08:00
updatedDate: 2025-12-04T00:17:52+08:00
---
---
title: Weekly Report
description: Display weekly reports.Only for record keeping purposes

tags:
  - Weekly_Report
  - Group_Meeting
language: 中文
slug: Weeklyreport
---
## 🛠️ 2025-12-03

<table class="custom-table">
<thead>
<tr>
<td style="width:100px">论文</td>
<td>SpaceGNN: Multi-Space Graph Neural Network for Node Anomaly Detection with Extremely Limited Labels</td>
</tr>
</thead>
<tbody>
<tr>
<td>作者</td>
<td>Xiangyu Dong, Xingyi Zhang, Lei Chen, Mingxuan Yuan, Sibo Wang</td>
</tr>
  <tr>
<td>机构</td>
<td>The Chinese University of Hong Kong; Huawei Noah’s Ark Lab; MBZUAI</td>
</tr>
  <tr>
<td>发表</td>
<td>ICLR 2025</td>
</tr>
  <tr>
<td>研究领域</td>
<td>图神经网络 节点异常检测 半监督学习</td>
</tr>
  <tr>
<td>总结</td>
    <td>本文围绕真实场景中的节点异常检测问题展开，针对图结构形态复杂、异常节点极少且标签稀缺这两个核心难点，提出了一个多空间几何图神经网络框架 SpaceGNN。作者认为传统方法把图固定嵌入欧氏空间并依赖伪标签做数据增强既难以适配层级、环状等多种结构，又容易在极不平衡数据上放大噪声，于是设计了三部分：1. <b>可学习空间投影（LSP）</b>：通过可学习曲率 κ 将节点嵌入到最适合的空间。2. <b>距离感知传播（DAP）</b>：基于加权同质性调整邻居传播权重，减少噪声传播。3. <b>多空间集成（MuISE）</b>：集成多个空间的模型输出，替代数据增强，提升信息利用效率。大量在社交与金融等 9 个真实图数据集上的实验表明，SpaceGNN 在 AUC 和 F1 上都显著优于现有通用 GNN 和专用异常检测模型，说明多空间几何表示、距离感知传播和多模型集成是在有限监督条件下提升节点异常检测性能的一条有效路径。</td>
</tr>
</tbody>
</table>


<table class="custom-table">
<thead>
<tr>
<td style="width:100px">论文</td>
<td>Hypergraph Neural Networks</td>
</tr>
</thead>
<tbody>
<tr>
<td>作者</td>
<td>Yifan Feng, Haoxuan You, Zizhao Zhang, Rongrong Ji, Yue Gao</td>
</tr>
  <tr>
<td>机构</td>
<td>Fujian Key Laboratory of Sensing and Computing for Smart City, 
  Department of Cognitive Science School of Information Science and Engineering, Xiamen University, 361005, China
 Peng Cheng Laboratory, 
  China BNRist, 
  KLISS, School of Software, Tsinghua University, 100084, China.</td>
</tr>
  <tr>
<td>发表</td>
<td>AAAI 2019</td>
</tr>
   <tr>
<td>研究领域</td>
<td>超图神经网络 高阶关系建模 图表示学习 节点分类</td>
</tr>
  <tr>
<td>总结</td>
    <td>本文针对传统图神经网络只能刻画点与点成对关系、难以利用“一组点同时相关”的高阶结构这一问题，提出了基于超图的神经网络框架 Hypergraph Neural Networks（HGNN）。作者首先利用<b>超图拉普拉斯</b>推导出一种在“节点 → 超边 → 节点”路径上传播信息的超图卷积算子，将节点特征先在超边内聚合，再分发回各节点，从而自然建模多点之间的高阶关系，并证明当每条超边只连接两个点时，HGNN 退化为传统 GCN，因此 GCN 可以视为 HGNN 的特例。随后，论文在<b>引文网络节点分类</b>和<b> 3D 形状分类</b>等任务中，通过构建<b>单模态与多模态</b>超图进行实验，结果表明 HGNN 在充分利用复杂结构和多模态信息方面优于现有图卷积方法，验证了该框架在高阶关系数据上的有效性和普适性。</td>
</tr>
</tbody>
</table>

---



##  写在最后



