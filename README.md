<div align="center"><img src="https://raw.githubusercontent.com/LuoSK/assets/main/img/icon_128.png" alt="" width="121" height="121" class="jop-noMdConv"></div>



<div align="center">
	<h1 align="center"> Sweet Cookie </h1>
	<p>用于快速解析编辑Cookie的浏览器插件</p>
</div>

## 🔗 快速跳转

- [特性](#特性)
- [浏览器支持](#浏览器支持)
- [如何安装](#如何安装)
- [使用](#使用)
- [常见问题-FAQ](#常见问题-FAQ)
- [版本变化](#版本变化)
- [报告问题](#报告问题)
## ✨ 特性

- 快速解析cookie，自动种到当前域
- 支持 KEY-VALUE/ JSON / YAML 格式解析
- 支持解析后对 cookie 进行增删改
- 全新的 UI，快速上手

<br />

## 🖥️ 浏览器支持

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" class="jop-noMdConv">](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" class="jop-noMdConv">](http://godban.github.io/browsers-support-badges/)<br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" class="jop-noMdConv">](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" class="jop-noMdConv">](http://godban.github.io/browsers-support-badges/)<br>Safari |
| --- | --- | --- | --- |
| >=96✅ | &nbsp;&nbsp;❔ | &nbsp;&nbsp;&nbsp;✖️| &nbsp;&nbsp;✖️  |

<br />

## 使用

1. 请先选择解析格式，解析格式不正确，会导致无法解析~

2. 解析格式样例
``` yaml
# yaml
{
  Math-Socre: "96",
  name: "Hiphop"
}
```

```json
# JSON
{
  "name": "John",
  "age": 18
}
```
```key
# key-value
name=john; age=20;
```

<br/>

## 📦 如何安装

插件商店：[chrome webstore](https://chrome.google.com/webstore/detail/sweet-cookie/ljoobagfjndhnpgcgcfcioecilnnmfid/evaluated)

下载安装：[release](https://github.com/LuoSK/sweet-cookie/releases/tag/v1.0.0)

<br />

## ℹ️ 常见问题-FAQ

1.  <img src="https://raw.githubusercontent.com/LuoSK/assets/main/img/warning1.png" alt="" width="162" height="71">
    请先检查value的格式正确，浏览器可能并不支持某些value值，例如value中含有`=` `;` 等特殊字符。某个字段的设置错误，不会影响其他字段的设置

<br />

## 版本变化

### 🔖 Version 1.0.0

> - ♻️ 使用 Preact + Mui 重构
> - 🎨 样式升级
> - ✨ 支持解析后进行编辑，支持修改 KEY，VALUE 以及 cookie 有效期 (expires)
> - ✨ 添加了 YAML 格式和 JSON 格式解析
> - 🚸 兼容旧版使用
> - 📝 文档更新
    
### 🎉 Version 0.0.1

> - ✨ 第一版支持 key_value 格式解析的 sweet-cookie

<br />

## 🐛 报告问题

邮箱：📨 [bjchensiyuan@gmail.com](mailto:bjchensiyuan@gmail.com)
前往提问： 🚩[issue](https://github.com/LuoSK/sweet-cookie/issues/new)
