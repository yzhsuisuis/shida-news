<template>
	<view class="home">
		<scroll-view scroll-x class="navscroll">
			<view class="item" :class="index==navIndex ? 'active':''" v-for="(item,index) in navArr"
				@click="clickNav(index,item.id)":key="item.id">
				{{item.classname}}
			</view>
		</scroll-view>
		<view class="content">
			<view class="row" v-for="item in newsArr">
				<newsbox :item="item" @click.native="goDetail(item)":key="item.id"></newsbox>
			</view>
		</view>
		<view class="nodata" v-if="!newsArr.length" >
			<image src="../../static/images/cry.png" mode="widthFix"></image>
		</view>
		<view class="loading" v-if="newsArr.length">
			<view v-if="loading==1">数据加载中...</view>
			<view v-if="loading==2">没有更多了~~</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '杨子赫',
				navIndex: 0,
				navArr: [],
				newsArr: [],
				currentPage:1,
				currentid:50,
				loading:1 //0-默认 ,1-加载中 ,2没有更多了
			}
		},
		onLoad() {
			this.getNavData();
			this.getNewsData();

		},
		onReachBottom(){
			this.currentPage++;
			if(this.loading ==2 )
			{
				return ;
			}
			console.log("拉满了"+this.currentPage)
			this.loading=1
			this.getNewsData();
			
			
			
		},
		methods: {
			clickNav(index, id) {
				this.navIndex = index;
				this.newsArr = [];
				this.currentId = id;
				this.currentPage = 1;
				this.loading = 0;
				this.getNewsData();
			},
			goDetail(item) {
				console.log(item)
				uni.navigateTo({
					// url: "/pages/detail/detail"
					//页面间的传参
					url:`/pages/detail/detail?cid=${item.classid}&id=${item.id}`
				})
			},
			getNavData() {
				uni.request({
					url: "https://ku.qingnian8.com/dataApi/news/navlist.php",
					success: res => {
						console.log(res)
						this.navArr = res.data
					}
				})
			},
			getNewsData() {
				uni.request({
					url: "https://ku.qingnian8.com/dataApi/news/newslist.php",
					// data: {
					// 	//你小子这里居然也能给写错
					// 	cid: this.currentid,
					// 	page: this.currentPage
					// },
					data: {
						cid: this.currentId,
						page: this.currentPage
					},
					success: res => {
						console.log(res)
						if(res.data.length==0)
						{
							this.loading =2
						}
						this.newsArr = [...this.newsArr , ...res.data]
					}
				})

			}

		}
	}
</script>

<style lang="scss" scoped>
	.navscroll {
		height: 100rpx;
		background: #e3e5e7;
		white-space: nowrap;
		// 固定导航栏
		position: fixed;
		//h5界面吸顶效果
		top: var(--window-top);
		left: 0;
		z-index: 10;

		/deep/ ::-webkit-scrollbar {
			width: 4px !important;
			height: 1px !important;
			overflow: auto !important;
			background: transparent !important;
			-webkit-appearance: auto !important;
			display: block;
		}

		.item {
			font-size: 40rpx;
			display: inline-block;
			line-height: 100rpx;
			padding: 0 30rpx;
			color: #333;

			&.active {
				color: #30a1ee;
			}
		}
	}

	.content {
		padding: 30rpx;
		padding-top: 130rpx;
		.row {
			border-bottom: 1px dotted #efefef;
			padding: 15rpx 0;
		}
	}
	.nodata {
		display: flex;
		justify-content: center;
		image {
			width: 360rpx;
		}
	.loading {
		justify-content: center;
		text-align: center;
		font-size: 26rpx;
		color: #888;
		line-height: 2em;
	}
}
</style>