<template>
	<section>
		<el-menu>
			<template v-for="item in items">
				<template v-if="item.child">
					<el-submenu :index="item.path" :key="item.name">
						<template slot="title">
							{{item.name}}
						</template>
						<my-side :items="item.child"></my-side>
					</el-submenu>
				</template>
				<template v-else>
					<el-menu-item :index="item.path" :key="item.name">{{item.name}}</el-menu-item>
				</template>
			</template>
		</el-menu>
	</section>
</template>
<script>
	export default{
		name:'MySide',
		props:{
			items:{
				type: Array,
				default: function(){
					return [];
				}
			}
		}
	}
</script>