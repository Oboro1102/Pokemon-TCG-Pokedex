# 寶可夢TCG圖鑑
> This project is not produced, endorsed, supported, or affiliated with Nintendo or The Pokémon Company.

### 實裝功能
* 系列清單
* 系列卡片清單
* 單卡歐美地區價格資料
* 牌組建構
* 牌組資料匯出
* 清除緩存資料

### 資料使用
* TCG卡片資料
> All data made available by the [Pokémon TCG API](https://pokemontcg.io/)
> 
> *為避免多次請求，初次讀取會將資料 cache 於 localStorage*
* 牌組建構匯出
> cache 資料於 localStorage，keyName 為 deckList，匯出資料格式為 xlsx 檔

### 專案執行指令
* 初次執行 `npm install`
* 啟動專案 `npm start`
