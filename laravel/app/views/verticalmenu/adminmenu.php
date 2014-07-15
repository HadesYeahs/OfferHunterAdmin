<ul class="cbp-vimenu">
	<li><a href="#" class="icon-logo">Logo</a></li>
	<li class="<?php echo ($pageName == "Users" ? "cbp-vicurrent" : "") ?>"><a href="<?php echo route("users") ?>" class="fa fa-users">Users</a></li>
	<li class="<?php echo ($pageName == "Dashboard" ? "cbp-vicurrent" : "") ?>"><a href="<?php echo route("dashboard") ?>" class="fa fa-tachometer">Dashboard</a></li>
	<li class="<?php echo ($pageName == "Configuration" ? "cbp-vicurrent" : "") ?>"><a href="#" class="fa fa-cogs">Configuration</a></li>
	<!-- Example for active item:
	<li class="cbp-vicurrent"><a href="#" class="icon-pencil">Pencil</a></li>
	-->
</ul>