<template>
  <transition name="mask">
    <div class="try-mask" v-show="visiable">
      <div class="try-modal">
        <div class="try-modal__title">
          <h2 v-if="title">{{title}}</h2>
          <button @click="hide">
            <i>X</i>
          </button>
        </div>
        <p>{{message}}</p>
        <div class="try-modal__footer">
          <TryButton @click="confirmHandler">确定</TryButton>
          <TryButton @click="cancelHandler">取消</TryButton>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      visiable: false,
      resolve: null,
      reject: null
    }
  },
  props: {
    title: {
      default: ''
    },
    message: {
      require: true
    }
  },
  methods: {
    confirmHandler () {
      this.hide()
      if (typeof this.resolve === 'function') {
        this.resolve()
      }
    },
    cancelHandler () {
      this.hide()
      if (typeof this.reject === 'function') {
        this.reject()
      }
    },
    hide () {
      this.visiable = false
    },
    show () {
      this.visiable = true
    }
  }
}
</script>

<style lang="less">
.try-mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0,0,0,.3);
  text-align: center;
}
.try-mask:after {
  content: "";
  display: inline-block;
  height: 100%;
  width: 0;
  vertical-align: middle;
}
.mask-enter-active .try-modal{
  animation: fade-in .5s;
}
.mask-leave-active .try-modal{
  animation: fade-out .5s;
}
@keyframes fade-in {
  0% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
@keyframes fade-out {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
}
.try-modal {
  display: inline-block;
  width: 420px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  text-align: left;
  &__title {
    position: relative;
    h2 {
      padding-right: 10px;
    }
    button {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
  &__footer{
    display: flex;
    justify-content: flex-end;
  }
}
</style>
