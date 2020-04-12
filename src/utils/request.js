export default (params) => {
    // 加载中 网络请求都会显示
    uni.showLoading({
        title: "加载中"
    })
    return new Promise((resolve,reject)=> {
        wx.request({
            // url: 'https://URL',
            // data: {},
            // method: 'GET',  // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {},  // 设置请求的 header

            // 直接把上面注释的东西解构
            ...params, 
            success: function(res){
                // success 成功
                resolve(res.data);
            },
            fail: function(err) {
                // fail 失败
                reject(err);
            },
            complete: function() {
                // complete 成功或者失败都会
                // 网络请求完了加载中隐藏
                uni.hideLoading();
            }
        })
    })
}