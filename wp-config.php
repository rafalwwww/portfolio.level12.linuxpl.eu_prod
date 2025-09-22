<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'level12_wp' );

/** Database username */
define( 'DB_USER', 'level12_wp' );

/** Database password */
define( 'DB_PASSWORD', 'l*-^-9HS+AE!loD6' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'ob%C,+o-oM]v8vYQd>wgE@lr<0kjSrdZ>W`.!ck>D0ftg^*E}0kElf>d?GkGS(dQ' );
define( 'SECURE_AUTH_KEY',  'vuVl&{%*xYPVqPx_KA[VTO,_;++m/gEK8?8+pwA@.`A/3v7R(Qv2C+k^< 4u)nsC' );
define( 'LOGGED_IN_KEY',    '#*O:;6q11Yoy|fX-MaPSb{kY{Z.e5WMGz%{=BgYfs6_JlV@g#P1`,:s,d&HHitQO' );
define( 'NONCE_KEY',        'mWCtf@ys.0Po#R/]F,`O#0D@vs:pX(zu(+1{zwaDwN8}YmY-VD6x+5z2#dYK7P #' );
define( 'AUTH_SALT',        'odo6f_m/An$m^G=$1%kv=C4[N7:n|fjwlP;XqiI1xO!u>iZZBm.d|aHrcc$,C;[}' );
define( 'SECURE_AUTH_SALT', 'kUuWdr;1|51/WiEX*v]_L_X=o=fk:;?;=Iu/~4i!( r1M(+R0FJy=8C[%G*:Yz/Z' );
define( 'LOGGED_IN_SALT',   '$PQp,HH,l`tu8O 3Zf./Fi~OdE<ugFl9szU N(f$(GSbfy1* )1[D{9t9V.mzjrh' );
define( 'NONCE_SALT',       'yU3qq]O,ueaD9E/CTL1R-ng(_qc_:};rPI+dCe[dcR/(v4iUJ-ys>]m4S:K2kSz,' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */
// Enables core updates only for minor versions (by default)
define( 'WP_AUTO_UPDATE_CORE', 'minor' );
define( 'FORCE_SSL_ADMIN', true );
define( 'DISALLOW_FILE_EDIT', true );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
