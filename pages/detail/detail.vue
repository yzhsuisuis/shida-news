<template>
	<view class="detail">
		<view class="title">{{detail.title}}</view>
		<view class="info">
			<view class="auth">编辑: {{detail.author}}</view>
			<view class="time">时间:{{detail.posttime}}</view>
		</view>
		<view class="content">
			<rich-text :nodes="detail.content"></rich-text>			
		</view>

		<view class="description">免责声明：本资料中引用腾讯新闻的案例仅供个人学习和研究之用，并不代表本平台立场。
			我们尊重版权，如有侵权行为，请及时联系我们，我们将尽快删除相关内容。本平台不承担因使用这些内容而产生的任何法律责任。请用户自行判断信息的准确性和合法性。
		</view>

	</view>
</template>

<script>
	import {parseTime} from "@/utils/tool.js"
	export default {
		data() {
			return {
				options: null,
				detail: {}
			};
		},
		onLoad(e) {
			this.options = e;
			this.getDetail();
		},
		methods: {
			getDetail() {
				uni.request({
					url: 'https://ku.qingnian8.com/dataApi/news/detail.php', // 确保URL是正确的，并且没有HTML实体字符
					data: this.options,
					success: res => {
						console.log("getit");
						console.log(res);
						// 如果需要将结果赋值给this.detail，可以取消注释下面的代码
						//通过引入写好的时间戳转时间的格式
						res.data.posttime=parseTime(res.data.posttime)
						// 这里是非常狗的,用的是正则表达式
						res.data.content=res.data.content.replace(/<img/gi,'<img style="max-width:100%"')
						this.detail = res.data;
						
						//存入缓存
						this.setHistory()
						
						uni.setNavigationBarTitle({
							title:this.detail.title
						})
						
					}
				});
			},
			setHistory(){
				let historyArr = uni.getStorageSync("historyArr")||[]
				let item={
					id:this.detail.id,
					classid:this.detail.classid,
					picurl:this.detail.picurl,
					title:this.detail.title,
					looktime:parseTime(Date.now())
				}
				//在这个里面新加,如果新查出来的id在缓存中找的到的话,就删除掉
				let index = historyArr.findIndex(i =>{
					return i.id == this.detail.id;
				})
				
				if(index>=0)
				{
					historyArr.splice(index,1)
				}
				
				//新加的对象要放在前面
				historyArr.unshift(item)
				historyArr=historyArr.slice(0,10)
				uni.setStorageSync("historyArr",historyArr)
				
			}
		}
	}
</script>

<style lang="scss">
	.detail {
		padding: 30rpx;

		.title {
			font-size: 46rpx;
			color: #333;
		}

		.info {
			background: #f6f6f6;
			font-size: 25rpx;
			color: #666;

			display: flex;
			justify-content: space-between;
			margin: 40rpx 0;

		}

		.content {
			padding-bottom: 50rpx;
		}

		.description {
			background: #FEF0F0;
			font-size: 26rpx;
			padding: 20rpx;
			color: #F89898;
			line-height: 1.8em;

		}
	}
</style>