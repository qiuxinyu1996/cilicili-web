<template>
    <div class="reviews">
        <div class="my-review">
            <div class="my-review-icon"></div>
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
            <div class="review-wrapper" v-bind:style="{'z-index':999-index}" v-for="(review, index) in reviewList">
                <div class="first-review">
                    <Review  v-bind:style="{'z-index':999-index}" :review="review"></Review> 
                </div>
                <div class="second-review" v-for="(reply, kidIndex) in review.replyList">
                    <Review v-if="kidIndex+1<displayReview[index]"  v-bind:style="{'z-index':99-index-kidIndex}" :review="reply"></Review>
                    <div class="see-more" v-if="reviewList.length>displayReview[index] && kidIndex==displayReview[index]-1" @click="displayReview.splice(index,1,displayReview[index]+3)">
                        展示更多评论
                    </div>
                </div>
            </div>       
        </div>
        <div v-else>
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
                displayReview: []
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
            }
        },
        computed: {
            reviewList() {
                return this.$store.state.reviewList
            }
        },
        mounted() {
            setTimeout(() => {
                for(var i = 0; i < this.$store.state.reviewList.length; i++) {
                    this.displayReview.push(4)
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
            // setTimeout(() => {
            //     console.log('this.$route.query.vid')
            //     console.log(this.$route.query.vid)
            //             this.$axios.get('/api/video/getReview?videoId=' + this.$route.query.vid)
            //             .then(
            //                 (resp) => {
            //                     this.$store.commit('setReviewList', resp.data.data)
            //                 }
            //             ).catch(
            //                 (err) => {
            //                     console.log(err)
            //                 }
            //             )    
            // }, 200);
        },
    }
</script>

<style scoped>
    .reviews {
        height: 500px;
        position: relative;
        /* display: inline-block; */
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
        width: 1200px;
        height: 300px;
    }
    .my-review {
        width: 1200px;
        height: 100px;

        position: relative;
        top: 10px;
    }
    .my-review-icon {
        width: 60px;
        height: 60px;
        border-radius: 30px;
        background-image: url('@/assets/user.webp');
        background-repeat: no-repeat;
        background-size: cover;

        position: absolute;
        /* left: 20px; */
    }
    .my-review-input {
        width: 1030px;
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
        left: 1120px;
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
        font-size: 16px;
        position: relative;
        left: 59px;
    }
    .see-more:hover {
        cursor: pointer;
        color: #00aeec;
    }
</style>