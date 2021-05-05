<template>
  <div class="user">
    <div class="bg">
      <img src="../../assets/login_bg.jpg" alt="" />
    </div>
    <div class="user-content">
      <van-form v-if="state.login">
        <van-field
          v-model="state.email"
          name="邮箱"
          label="邮箱"
          placeholder="邮箱"
          :rules="[{ validator: validEmail, message: '请输入正确的邮箱格式' }]"
        />

        <van-field
          v-model="state.password"
          :type="state.isPassword ? 'password' : 'text'"
          name="密码"
          label="密码"
          placeholder="密码必须为字母开头"
          :right-icon="state.isPassword ? 'closed-eye' : 'eye-o'"
          autocomplete="new-password"
          @click-right-icon="togglePasswordType"
          :rules="[{ validator: validPassword, message: '密码格式不正确' }]"
        />

        <div class="commit-btn">
          <div style="margin: 16px">
            <van-button round block type="danger" @click="login">
              登录
            </van-button>
          </div>
        </div>
        <!-- <div class="commit-btn">
          <van-button round block type="default" @click="toggleRegisterBox">
            注册
          </van-button>
        </div> -->
      </van-form>
      <van-form v-else>
        <van-field
          v-model="state.email"
          name="邮箱"
          label="邮箱"
          placeholder="邮箱"
          :rules="[{ validator: validEmail, message: '请输入正确的邮箱格式' }]"
        />

        <van-field
          v-model="state.password"
          :type="state.isPassword ? 'password' : 'text'"
          name="密码"
          label="密码"
          placeholder="密码必须为字母开头"
          :right-icon="state.isPassword ? 'closed-eye' : 'eye-o'"
          autocomplete="new-password"
          @click-right-icon="togglePasswordType"
          :rules="[{ validator: validPassword, message: '密码格式不正确' }]"
        />
        <!-- 允许输入正整数，调起纯数字键盘 -->
        <van-field
          v-model="state.digit"
          type="digit"
          label="验证码"
          placeholder="请输入验证码"
          maxlength="6"
          :rules="[{ validator: validCode, message: '请输入6位验证码' }]"
        />
        <button class="send" @click="sendCode(60)" :disabled="state.isSend">
          {{ state.text3 }}
        </button>

        <div class="commit-btn">
          <div style="margin: 16px">
            <van-button round block type="danger" @click="register">
              注册
            </van-button>
          </div>
        </div>
        <!-- <div class="commit-btn">
          <van-button round block type="default" @click="toggleRegisterBox">
            注册
          </van-button>
        </div> -->
      </van-form>
      <div class="lr">
        <span @click="changeModule">{{
          state.login == true ? state.text2 : state.text1
        }}</span>
        <span>忘记密码</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Register } from "../../api/getData";
import { onActivated, reactive } from "vue";
import { Toast } from "vant";
export default {
  setup() {
    const state = reactive({
      email: "",
      password: "",
      code: "",
      isPassword: true,
      login: true,
      isSend: false,
      text: "",
      text1: "登录",
      text2: "注册",
      text3: "发送验证码",
    });
    // 校验函数可以返回 Promise，实现异步校验
    const validEmail = (val) =>
      new Promise((resolve) => {
        Toast.loading("验证中...");

        setTimeout(() => {
          Toast.clear();
          resolve(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(val));
        }, 500);
      });
    const validPassword = (val) =>
      new Promise((resolve) => {
        resolve(/^[a-zA-Z][0-9a-zA-Z_]{6,12}$/.test(val));
      });
    const validCode = (val) =>
      new Promise((resolve) => {
        resolve(/^[/d]{6}$/.test(val));
      });

    const togglePasswordType = () => {
      state.isPassword = !state.isPassword;
    };

    onActivated(() => {
      state.email = "";
      state.password = "";
    });

    const sendCode = (seconds) => {
      let time = seconds;
      state.text3 = `${time}s后重新发送`;
      state.isSend = true;
      let timer = setInterval(() => {
        if (time == 1) {
          clearInterval(timer);
          timer = null;
          state.text3 = `发送验证码`;
          state.isSend = false;
        } else {
          time--;
          state.text3 = `${time}s后重新发送`;
        }
      }, 1000);
    };

    const login = () => {};
    const register = () => {
      console.log("register");
      Register(state).then((res) => {
        console.log(res);
      });
    };
    const changeModule = () => {
      state.login = !state.login;
    };
    const debounce = function (fn, wait, trigger) {
      let timeout = null;
      return function (...args) {
        timeout && clearTimeout(timeout);
        if (trigger) {
          fn.apply(this, args);
          timeout = setTimeout(() => {
            clearTimeout(timeout);
            timeout = null;
          }, wait);
        } else {
          timeout = setTimeout(() => {
            fn.apply(this, args);
          }, wait);
        }
      };
    };

    return {
      state,
      validEmail,
      validPassword,
      validCode,
      login,
      register,
      togglePasswordType,
      changeModule,
      debounce,
      sendCode,
    };
  },
};
</script>

<style lang="less">
.user {
  .bg {
    img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
  .user-content {
    padding-top: 140px;
    position: relative;
    .van-form {
      width: 80%;
      margin: 0 auto;
      & input {
        color: #fff !important;
      }

      .van-cell {
        background-color: transparent !important;
      }
      .van-button {
        font-size: 16px;
        background-color: transparent !important;
        text-shadow: 0 0 10px red, 0 0 20px red, 0 0 30px red, 0 0 40px red;
      }
      .van-field__label {
        width: 3.2em;
      }
    }
    .lr {
      position: relative;
      display: flex;
      justify-content: space-around;
      padding: 0 10px;
      color: #fff;
      text-shadow: 0 0 10px red, 0 0 20px red, 0 0 30px red, 0 0 40px red;
    }
  }
  .send {
    background-color: transparent;
    color: #fff;
    opacity: 0.7;
    border: 1px solid #fff;
    padding: 2px 10px;
    float: right;
    margin: 10px 20px 10px 0;
    vertical-align: middle;
    border-radius: 15px;
  }
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-transition-delay: 99999s !important;
  -webkit-transition: color 99999s ease-out, background-color 99999s ease-out !important;
}
</style>