<template>
    <div class="review">
        <div class="header">
            <div class="user-icon-wrapper">
                <div class="user-icon"></div>  
                <div class="user-info">
                    <div class="user-cover"></div>
                </div>  
            </div>
            <div class="user-name">
                {{ review.userName }}
                <span class="user-level" v-bind:style="{backgroundColor:levelColor(review.userLevel)}">
                    &nbsp;&nbsp;Lv{{ review.userLevel }}&nbsp;&nbsp;
                </span>
                <span v-if="review.toReplyUserName">&nbsp;&nbsp;回复&nbsp;&nbsp;{{ review.toReplyUserName }}:&nbsp;&nbsp;{{ review.toReplyReviewContent }}</span>
            </div>
        </div>
        <div class="content">
            {{ review.reviewContent }}
        </div>
        <div class="footer">
            <div class="review-time">{{ review.reviewTime }}</div>
            <div class="review-other">
                <div class="review-up">赞</div>
                <div class="review-down">踩</div>
                <div ref="reply-btn" class="review-reply" @click.stop="reply()">回复</div>
                <div ref="reply" @click.stop="readyReply = true" v-if="readyReply" class="reply-input">
                    <div>
                        &nbsp;&nbsp;&nbsp;&nbsp;回复 {{ review.userName }} 的评论
                    </div>
                    <div class="reply-textarea">
                        <el-input
                            type="textarea"
                            resize="none"
                            :autosize="{ minRows: 6, maxRows: 6}"
                            placeholder="请输入内容"
                            v-model="replyText">
                        </el-input>
                    </div>
                    <el-button
                        class="reply-ok"
                        @click="sendReply(review)"
                        type="success"
                        icon="el-icon-check"
                        circle>
                    </el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Review', 
        data() {
            return {
                readyReply: false,
                replyText: ''
            }
        },
        methods: {
            reply() {
                this.readyReply = !this.readyReply
            },
            levelColor(userLevel) {
                switch (userLevel) {
                    case 1:
                        return 'gray'
                    case 2:
                        return 'yellow'
                    case 3:
                        return 'green'
                    case 4:
                        return 'yellow'
                    case 5:
                        return 'red'
                    case 6:
                        return 'blue'
                    default:
                        return 'white'
                }
            },
            sendReply() {
                if(this.replyText == '') {
                    this.$message.error('不能回复空白评论')
                    return
                }
                this.$axios.post("/api/video/review", {
                    reviewVideoId: this.$store.state.videoList.listDetail[this.$store.state.videoList.current-1].id,
                    userId: this.$store.state.user.id,
                    reviewContent: this.replyText,
                    reviewTime: new Date(),
                    toReplyUserId: this.review.userId,
                    toReplyReviewId: this.review.id,
                    primaryReviewId: this.review.primaryReviewId,
                }).then(
                    (resp) => {
                        if(resp.data.success) {
                            this.$message.success('回复成功')
                            this.replyText = ''
                            this.readyReply = false
                            
                            // 回复后刷新评论区
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
                            this.$message.error('回复失败')
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
        props: [
            'review'
        ],
        mounted() {
            document.addEventListener('click', (event) => {
                this.readyReply = false
            })
        }
    }
</script>

<style scoped>
    .review {
        width: 950px;
        position: relative;;
    }
    .header {
        width: 950px;
        height: 40px;
        line-height: 40px;
        /* background-color: whitesmoke; */

        position: relative;
        z-index: 90;
    }
    .user-icon {
        width: 50px;
        height: 50px;
        border-radius: 25px;
        background-image: url('@/assets/user.webp');
        background-repeat: no-repeat;
        background-size: cover;

        position: absolute;
        z-index: 80;
    }
    .user-name {
        font-size: 13px;
        color: #61666d;
        position: absolute;
        z-index: 40;
        left: 60px;
    }
    .user-icon:hover {
        cursor: pointer;
    }
    .content {
        width: 890px;
        font-size: 16px;
        color: #18191c;
        position: relative;
        display: inline-block;
        z-index: 80;
        left: 60px;
    }
    .footer {
        width: 890px;
        height: 32px;
        line-height: 32px;
        font-size: 13px;
        color: #9499a0;
        position: relative;
        display: inline-block;
        z-index: 70;
        left: 60px;
    }
    .review-time {
        position: absolute;
        left: 0;
    }
    .review-other {
        position: absolute;
        left: 150px;
        user-select: none;
    }
    .review-up {
        position: absolute;
        left: 0;
    }
    .review-down {
        position: absolute;
        left: 30px;
    }
    .review-reply {
        width: 50px;
        position: absolute;
        left: 60px;
    }
    .review-up:hover,.review-down:hover,.review-reply:hover {
        cursor: pointer;
        color: #00aeec;
    }
    .user-level {
        width: 100px;
        height: 20px;
        background-color: red;
        color: #ffffff;
        border-radius: 10px;
    }
    .user-info {
        width: 450px;
        height: 300px;
        border-radius: 10px;
        background-color: #ffffff;
        box-shadow: 0 5px 10px 0 rgba(0, 0, 0, .1);
        display: none;

        position: absolute;
        z-index: 90;
        top: 30px;
        left: 30px;
    }
    .user-icon-wrapper:hover .user-info {
        display: block;
    }
    .user-icon-wrapper {
        position: absolute;
        z-index: 50;
    }
    .reply-input {
        width: 500px;
        height: 200px;
        background-color: #ffffff;
        border-radius: 20px;
        box-shadow: 0 5px 10px 0 rgba(0, 0, 0, .1);

        position: absolute;
        left: 100px;
        /* top: 100px; */
    }
    .reply-textarea {
        width: 500px;
        height: 140px;

        position: absolute;
    }
    /* 如果你的 el-input type 设置成textarea ，就要用这个了 */
    .reply-textarea>>>.el-textarea__inner {
        font-size: 16px;
        border: 0;
        resize: none;/* 这个是去掉 textarea 下面拉伸的那个标志，如下图 */
    }
    .reply-ok {
        position: absolute;
        left: 430px;
        top: 140px;
    }
    .user-cover {
        width: 450px;
        height: 150px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background-image: url('@/assets/diancipao.jpg');
        background-repeat: no-repeat;
        background-size: cover;

        position: absolute;
    }
</style>