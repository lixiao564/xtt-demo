<template>
	<section>
		<el-dialog :title="dialog.name" :visible.sync="dialog.isSee">
			<el-form v-model="form" :ref="form.formName">
				<!-- 输入框 -->
				<el-form-item v-for="(item, index) in Input" :key="item.title" :label="item.title">
					<el-input v-model="item.value"></el-input>
				</el-form-item>
				<!-- Select框 -->
				<el-form-item v-for="(item ,index) in Select" :key="item.title" :label="item.title">
					<el-select v-model="item.value">
						<el-option v-for="(option,index) in item.list" :key="index" :label="option.label" :value="option.value"></el-option>
					</el-select>
				</el-form-item>
				<!-- checkbox框 -->
				<el-form-item v-for="(item, index) in Checkbox" :key="item.title" :label="item.title">
					<el-checkbox-group v-model="item.value">
						<el-checkbox v-for="(option, index) in item.list" :key="index" 
						:label="option.label">
						</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<!-- Radio按钮 -->
				<el-form-item v-for="(item, index) in Radio" :key="item.title" :label="item.title">
					<el-radio-group v-model="item.value">
						<el-radio  v-for="(option, index) in item.list" :key="index" :label="option.label" >
						</el-radio>
					</el-radio-group>
				</el-form-item>
				<!-- 文件类型 -->
				<el-form-item v-for="(item, index) in File" :key="item.title" :label="item.title">
					<el-input type="file" v-model="item.value"></el-input>
				</el-form-item>
				<!-- text文本 -->
				<el-form-item v-for="(item, index) in Textarea" :key="item.title" :label="item.title">
					<el-input type="textarea" v-model="item.value"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer">
				<el-button v-for="(item, index) in Button" :key="index" :size="item.size" :type="item.type"  @click="handleClick(item.name)">{{item.name}}</el-button>
			</span>
		</el-dialog>
	</section>
</template>
<script>
export default {
  props: {
    dialog: {
      type: Object
    },
    form: {
      type: Object
    },
    Input: {
      type: Array,
      default: function() {
        return [];
      }
    },
    Select: {
      type: Array,
      default: function() {
        return [];
      }
    },
    Checkbox: {
      type: Array,
      default: function() {
        return [];
      }
    },
    Radio: {
      type: Array,
      default: function() {
        return [];
      }
    },
    File: {
      type: Array,
      default: function() {
        return [];
      }
    },
    Textarea: {
      type: Array,
      default: function() {
        return [];
      }
    },
    Button: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data: function() {
    return {
      input: [],
      select: []
    };
  },
  methods: {
    handleClick: function(name) {
      if (this.Input.length) {
        for (var i = 0; i < this.Input.length; i++) {
          this.form.input.push(this.Input[i].value);
        }
      }
      if (this.Select.length) {
        for (var i = 0; i < this.Select.length; i++) {
          this.form.select.push(this.Select[i].value);
        }
      }
      if (this.Checkbox.length) {
        for (var i = 0; i < this.Checkbox.length; i++) {
          this.form.checkbox.push(this.Checkbox[i].value);
        }
      }
      if (this.Radio.length) {
        for (var i = 0; i < this.Radio.length; i++) {
          this.form.radio.push(this.Radio[i].value);
        }
      }
      if (this.File.length) {
        for (var i = 0; i < this.File.length; i++) {
          this.form.file.push(this.File[i].value);
        }
      }
      if (this.Textarea.length) {
        for (var i = 0; i < this.Textarea.length; i++) {
          this.form.textarea.push(this.Textarea[i].value);
        }
      }

      this.$emit("handleClick", [this.form, name]);
    }
  }
};
</script>
