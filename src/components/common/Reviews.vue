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
        <div v-if="JSON.stringify(reviewList) != '[]'">
            <div class="review-wrapper" v-bind:style="{'z-index':999-index}" v-for="(review, index) in reviewList">
                <div class="first-review">
                    <Review  v-bind:style="{'z-index':999-index}" :review="review"></Review> 
                </div>
                <div class="second-review" v-for="(reply, kidIndex) in review.replyList">
                    <Review  v-bind:style="{'z-index':99-index-kidIndex}" :review="reply"></Review>
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
            }
        },
        methods: {
            sendReply() {
                if(this.myReview == '') {
                    this.$message.error('不能发布空白评论')
                    return
                }
                this.$axios.post("/api/video/review", {
                    reviewVideoId: this.$store.state.player.videoId,
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
                            this.readyReply = false
                            this.$router.go(0);
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
        display: inline-block;
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
        width: 50px;
        height: 50px;
        border-radius: 25px;
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
</style>