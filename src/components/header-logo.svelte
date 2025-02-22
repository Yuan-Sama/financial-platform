<script lang="ts">
	import Logo from '$assets/logo.svg';
	import { APP_NAME } from '$lib';
</script>

<a href="/">
	<div class="items-center lg:flex">
		<img class="h-7 w-7" src={Logo} alt="logo" />
		<span class="ml-2.5 text-2xl font-semibold text-white">
			{APP_NAME}
		</span>
	</div>
</a>
