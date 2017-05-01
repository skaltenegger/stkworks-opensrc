=== Save Posts With Cmd+S ===
Contributors: MikePayne
Tags: posts, pages, save, ctrl+s, cmd+s,
Requires at least: 3.1
Tested up to: 4.2.2
Stable tag: 1.2

Publish or update posts and pages using the Ctrl+S hotkey (cmd+s on Mac)

== Description ==

Publish or update posts and pages using the Ctrl+S hotkey (cmd+s on Mac). Overwrites the browsers default Ctrl+S function of "Save webpage as.." and instead runs the WordPress function assigned to the Publish button.


== Installation ==

1. Upload `cmd-s.php` to the `/wp-content/plugins/` directory
1. Activate the plugin through the 'Plugins' menu in WordPress

== Frequently Asked Questions ==

= Will this plugin work on PC, Mac, or Linux? =

Yes, the hotkey will replace the default browser functions in all browsers across all Operating Systems.

== Screenshots ==

None Available

== Changelog ==

= 1.2 =
* Updates JS to work cross-browser
* Moves JS to it's own file

= 1.1 =
* loads JS in footer of admin
* checks for cmd+s and ctrl+s hotkeys
* stops default action of browser
* virtually clicks the Publish button