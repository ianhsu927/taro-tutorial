export default defineAppConfig({
  pages: [
    "pages/index/index",
    "pages/thread_detail/thread_detail",
    "pages/nodes/nodes",
    "pages/hot/hot",
    "pages/node_detail/node_detail",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    list: [],
  },
});
