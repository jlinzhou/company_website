<template>
    <el-row>
        <el-col :span="24" class="">
            <div class="bg-black">
                <el-row class="nav">
                    <router-link to="/index">
                        <el-col :span="2" :offset="3">Goth</el-col>
                    </router-link>
                    <router-link to="/product">
                        <el-col :span="2">服务</el-col>
                    </router-link>
                    <router-link to="/team">
                        <el-col :span="2">团队</el-col>
                    </router-link>
                    <router-link to="/story">
                        <el-col :span="2">感言</el-col>
                    </router-link>
                    <router-link to="/article">
                        <el-col :span="2">干货</el-col>
                    </router-link>
                    <router-link to="/us">
                        <el-col :span="2">我们</el-col>
                    </router-link>

                    <template v-if="!showname">
                        <router-link to="/login">
                            <el-col :span="1" :offset="7">登录</el-col>
                        </router-link>
                        <router-link to="/register">
                            <el-col :span="1">注册</el-col>
                        </router-link>
                    </template>
                    <template v-else>
                        <router-link to="/user">
                            <el-col :span="1" :offset="7">您好 张三</el-col>
                        </router-link>
                        <router-link to="/login">
                            <el-col :span="1">退出</el-col>
                        </router-link>
                    </template>

                </el-row>
            </div>
            <div class="select">
                <el-select v-model="option" placeholder="请选择" @change="link">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <!-- this.$store.getters -->
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: "vue-header",
    data() {
        return {
            options: [
                { label: "Goth", value: "index" },
                { label: "服务", value: "product" },
                { label: "团队", value: "team" },
                { label: "故事", value: "story" },
                { label: "干货", value: "article" },
                { label: "我们", value: "us" }
            ],
            option: "index",
            showname: false,
            loginForm: {
                username: 'admin',
                password: '123456'
            },
        }
    },
    methods: {
        link: function () {
            this.$router.push({ path: '/' + this.option })
        },

    },
    created() {
        this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
                console.log(this.$store.getters.token)
                this.$message.success('登录成功!')
                this.showname = true
                // this.$router.push('/home')
            })
            .catch(() => { })

    },
}
</script>

<style lang="less">
@import url("../assets/css/reset.css");
@media (max-width: 768px) {
    .bg-black {
        display: none;
    }
    .select {
        display: block !important;
    }
}
.select {
    display: none;
    div {
        width: 100%;
    }
}
.bg-black {
    background: #111111;
    height: 80px;
    line-height: 80px;
    .nav {
        font-size: 16px;
        .router-link-active {
            color: red;
        }
        a {
            text-decoration: none;
            color: inherit;
            div {
                border-radius: 5px;
                cursor: pointer;
                color: white;
                text-align: center;
            }
            div:hover {
                background: #d2d3d5;
                color: black;
            }
        }
        .router-link-active {
            div {
                background: #d2d3d5;
                color: black;
            }
        }
    }
}
</style>