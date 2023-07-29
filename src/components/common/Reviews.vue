<template>
    <div class="reviews">
        <div class="review-total">
            <div class="review-total-text">评论</div>
            <div class="review-total-number">{{ $store.state.reviewList.length }}</div>
        </div>
        <div class="my-review">
            <div class="my-review-icon" :style="{'background-image':`url(${$store.state.user.userIcon})`}"></div>
            <div class="my-review-input">
                <el-input
                    type="textarea"
                    resize="none"
                    :autosize="{ minRows: 3, maxRows: 3}"
                    placeholder="你猜我的评论区在等谁？"
                    v-model="myReview">
                </el-input>
            </div>
            <div class="my-review-btn" @click="sendReply()">
                发布
            </div>
        </div>
        <div class="other-review" v-if="JSON.stringify(reviewList) != '[]'">
            <div class="review-wrapper" :style="{'z-index':999-index}" v-for="(review, index) in reviewList">
                <div v-if="index<displayFirstReview">
                    <div class="first-review">
                        <Review  :style="{'z-index':999-index}" :review="review"></Review> 
                    </div>
                    <div class="second-review" v-for="(reply, kidIndex) in review.replyList">
                        <Review v-if="kidIndex<displaySecondReview[index]"  :style="{'z-index':99-index-kidIndex}" :review="reply"></Review>
                        <div class="see-more" v-if="review.replyList.length>displaySecondReview[index] && kidIndex==displaySecondReview[index]-1" @click="displaySecondReview.splice(index,1,displaySecondReview[index]+3)">
                            展示更多评论
                        </div>
                    </div>
                </div>
            </div>       
        </div>
        <div class="empty" v-else>
            <el-empty :image-size="300" description="人迹罕至，空空如也"></el-empty>
        </div>
    </div>
</template>

<script>
    import Review from '@/components/common/Review.vue';
    export default {
        name: 'reviews',
        components: {
            Review
        },
        data() {
            return {
                myReview: '',
                // 分别控制一级和二级评论展示条数
                displayFirstReview: 10,
                displaySecondReview: []
            }
        },
        computed: {
            reviewList() {
                return this.$store.state.reviewList
            }
        },
        methods: {
            sendReply() {
                if(this.myReview == '') {
                    this.$message.error('不能发布空白评论')
                    return
                }
                this.$axios.post("/api/video/review", {
                    reviewVideoId: this.$store.state.videoList.listDetail[this.$store.state.videoList.current-1].id,
                    userId: this.$store.state.user.id,
                    reviewContent: this.myReview,
                    reviewTime: new Date(),
                    toReplyUserId: null,
                    toReplyReviewId: null,
                    primaryReviewId: null,
                }).then(
                    (resp) => {
                        if(resp.data.success) {
                            this.$message.success('发布成功')
                            this.myReview = ''
                            this.readyReply = false
                            
                            // 发布后刷新评论区
                            var videoList = this.$store.state.videoList
                            this.$axios.get('/api/video/getReview?videoId=' + videoList.listDetail[videoList.current-1].id)
                            .then(
                                (resp) => {
                                    this.$store.commit('setReviewList', resp.data.data)
                                }
                            ).catch(
                                (err) => {
                                    console.log(err)
                                }
                            )

                            this.displaySecondReview.unshift(3)
                        }else {
                            this.$message.error('发布失败')
                        }
                    }
                ).catch(
                    (err) => {
                        console.log(err)
                        this.$message.error('回复失败')
                    }
                )
            },
        },
        mounted() {
            setTimeout(() => {
                for(var i = 0; i < this.$store.state.reviewList.length; i++) {
                    this.displaySecondReview.push(3)
                }
            }, 500);
            this.$axios.get('/api/video/getReview?videoId=' + this.$router.currentRoute.query.vid)
            .then(
                (resp) => {
                    this.$store.commit('setReviewList', resp.data.data)
                }
            ).catch(
                (err) => {
                    console.log(err)
                }
            ) 
            window.onscroll = () =>{
                if (getScrollHeight() - 50 <= getWindowHeight() + getDocumentTop()) {
                    this.displayFirstReview += 10
                    console.log(this.displayFirstReview)
                }      
            }
        }
}
</script>

<style scoped>
    .reviews {
        width: 1100px;
        /* height: 1000px; */
        position: relative;
        display: inline-block;
        /* overflow: auto; */
    }
    .review-wrapper {
        position: relative;
    }
    .first-review {
        position: relative;
        /* z-index: 2; */
    }
    .second-review {
        position: relative;
        left: 50px;
        /* z-index: 1; */
    }
    .noReview{
        width: 11200px;
        height: 300px;
    }
    .review-total {
        width: 1100px;
        height: 50px;
        
        position: relative;
    }
    .review-total-text {
        width: 200px;
        height: 30px;
        line-height: 30px;
        font-size: 20px;
        color: #18191c;

        position: absolute;
        top: 50%;
        left: 10px;
        transform: translate(0, -50%);
    }
    .review-total-number {
        width: 200px;
        height: 30px;
        line-height: 30px;
        font-size: 13px;
        color: #9499a0;

        position: absolute;
        top: 50%;
        left: 60px;
        transform: translate(0, -50%);
    }
    .my-review {
        width: 1100px;
        height: 100px;

        position: relative;
        top: 10px;
    }
    .my-review-icon {
        width: 60px;
        height: 60px;
        border-radius: 30px;
        background-color: #e3e5e7;
        background-repeat: no-repeat;
        background-size: cover;

        position: absolute;
        /* left: 20px; */
    }
    .my-review-input {
        width: 940px;
        height: 50px;

        position: absolute;
        left: 70px;
    }
    .my-review-btn {
        width: 75px;
        height: 75px;
        line-height: 75px;
        text-align: center;
        border-radius: 5px;
        background-color: #80DAF6;
        color: #ffffff;

        position: absolute;
        left: 1025px;
    }
    .my-review-btn:hover {
        cursor: pointer;
        background-color: #00aeec;
    }
    .my-review-input>>>.el-textarea__inner {
        border: 0;
        resize: none;
        background-color: #f1f2f3;
    }
    .my-review-input>>>.el-textarea__inner:hover {
        background-color: #ffffff;
        border: #c9ccd0 1px solid;
    }
    .other-review {
        position: absolute;
        left: 20px;
    }
    .see-more {
        width: 200px;
        height: 20px;
        color: #9499a0;
        font-size: 14px;
        position: relative;
        left: 59px;
    }
    .see-more:hover {
        cursor: pointer;
        color: #00aeec;
    }
    .empty {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
    }
</style>