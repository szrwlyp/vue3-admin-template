<script setup lang="ts">
import { ref } from "vue";
const gapValue = ref(20);
</script>

<template>
  <div class="demo">
    <div>
      <h1>empty</h1>
      <div>
        当元素没有子元素或文本内容时可用:empty伪类为其设置内容或隐藏该元素。
      </div>
      <div class="empty"></div>
    </div>
    <div>
      <h1>gap</h1>
      <div>指定grid、flex和multi-column布局中行和列之间的空间大小。</div>
      <el-slider v-model="gapValue" max="40" />
      <div class="test" :style="'gap: 0' + gapValue + 'px;'">
        <div>1111</div>
        <div>2222</div>
      </div>
    </div>

    <div>
      <h1>background-clip</h1>
      <div>背景裁剪</div>
      <div class="clip">
        Light. Bright.<br />
        Full of might.
      </div>
      <div class="clip_1">背景修剪</div>
    </div>
    <div>
      <h1>user-select</h1>
      <div>user-select 的CSS属性控制用户是否可以选择文本。值：</div>
      <p>text：默认值</p>
      <p>none：元素和子元素的文本不可选</p>
      <p>
        all：选择时，会选中元素和子元素的所有文本。双击元素或单击文本时，会选择具有此值的最高祖先
      </p>
      <p>contain：可选择，但范围是该元素边界内</p>
      <div class="user_select">你好世界你好世界你好世界</div>
    </div>
    <div>
      <h1>:invalid 伪类</h1>
      <div>:invalid 表示任意内容未通过验证的 input 或其他 form 元素</div>
      <form>
        <label for="url_input">Enter a URL:</label>
        <input type="url" id="url_input" />
        <br />
        <br />
        <label for="email_input">Enter an email address:</label>
        <input type="email" id="email_input" required />
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.demo {
  display: flex;
  flex-direction: column;
  gap: 20px 20px;
}
h1 {
  font-size: 33px;
  font-weight: 700;
}
.empty:empty::before {
  content: "暂无数据";
}
// .empty:empty {
//   display: none;
// }
.test {
  display: flex;
  height: 50px;
  gap: 0 10px;
  div {
    flex: 1;
    border: 1px solid red;
  }
}

.clip {
  width: 300px;
  height: 100px;
  font-size: 2rem;
  font-weight: bold;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  background-image: linear-gradient(90deg, #dc79ff, #256bfa);
}
.clip_1 {
  background: url(/src/assets/background_clip_demo.jpg) no-repeat;
  background-size: cover;
  width: 200px;
  height: 100px;
  font-size: 50px;
  font-weight: 700;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.user_select {
  font-size: 20px;
  user-select: contain;
}

input:invalid {
  background-color: #ffdddd;
}

form:invalid {
  border: 5px solid #ffdddd;
}

input:valid {
  background-color: #ddffdd;
}

form:valid {
  border: 5px solid #ddffdd;
}

input:required {
  border-color: #800000;
  border-width: 3px;
}

input:required:invalid {
  border-color: #c00000;
}
</style>
