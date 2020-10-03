<script>
	function clearStorage() {
		window.localStorage.clear();
		window.indexedDB.deleteDatabase("graphcache-v3");
		window.location.reload(true);
	}
</script>

<nav class="navbar navbar-expand navbar-light bg-light">
	<a class="navbar-brand" href="#/">URQL Svelte CRUD</a>

	<div class="collapse navbar-collapse" id="navbarSupportedContent">
		<ul class="navbar-nav mr-auto">
			<li class="nav-item">
				<a class="nav-link" href="#/todos">Todos list</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="#/new">New todo</a>
			</li>
		</ul>
		<!-- <ul class="navbar-nav">
			<li class="nav-item">
				<button
					class="btn btn-sm btn-outline-secondary"
					on:click={() => window.location.reload()}>Reload</button>
				<button
					class="btn btn-sm btn-outline-secondary"
					on:click={clearStorage}>Clear local cache</button>
			</li>
		</ul> -->
	</div>
</nav>

<br />
