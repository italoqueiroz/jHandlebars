<style type="text/css">
	.divComponent div{
		width:100px;
		height:50px;
		padding:10px;
		margin:10px;
		color:#FFF;
		background:#A5BFDD;
		float:left;
}	
</style>
<div class="divComponent">
  {{#each pessoas}}
	  <div style=''>
	  	Nome: {{nome}}<br />
		  Idade: {{idade}}
	  </div>
  {{/each}}
</div>