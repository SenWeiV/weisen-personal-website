# A4 资源说明

2026-10-25。当前页面没有 img、picture、video、SVG image 或 CSS 背景图片。全部主要视觉由本地代码生成，不加载照片、纹理、视频或三维模型。

- `assembly.js`：本次原创的 WebGL 程序雕塑、实体分面、线框、轨道和信号；包含简化 Canvas 2D 回退。没有复制第三方几何实现。
- `main.js`：场景选择、连续权重插值、拖动和惯性、展开弹簧、点击波动、滑杆、键盘、项目面板及 GSAP 编排。
- `index.html`：真实内容、原生控件、dialog 和 details，以及 JavaScript 不可用时的内联 SVG 静态构图。
- `style.css`：完整的响应式排版；字体请求是其中唯一的 url() 资源。
- `fonts/syne.ttf`、`fonts/syne-700.ttf`：Google Fonts 的 Syne 800 / 700，许可 `syne-OFL.txt`。
- `fonts/dm-sans.ttf`：本地 DM Sans 400，许可 `dmsans-OFL.txt`。
- `vendor/gsap.min.js`、`ScrollTrigger.min.js`：沿用本地 GSAP 3.13.0，保留原许可头。
- favicon 以代码写成内联 SVG，不请求图片文件。

所有运行资源均本地托管。A3 的线形曲面稿及 A2 图片稿保存在本地设计工作区，用于历史对照，不参与发布。

调研的 Opus 5.5 案例由其作者如此标注，本项目没有独立核验模型的生成过程；本项目当前代码由本次 Codex 会话编写。
