<?php
// Before removing this file, please verify the PHP ini setting `auto_prepend_file` does not point to this.

// This file was the current value of auto_prepend_file during the Wordfence WAF installation (Fri, 18 Oct 2024 12:43:51 +0000)
if (file_exists('/var/www/html/waf/domain_protection/function_warning.php')) {
	include_once '/var/www/html/waf/domain_protection/function_warning.php';
}
if (file_exists(__DIR__.'/wp-content/plugins/wordfence/waf/bootstrap.php')) {
	define("WFWAF_LOG_PATH", __DIR__.'/wp-content/wflogs/');
	include_once __DIR__.'/wp-content/plugins/wordfence/waf/bootstrap.php';
}