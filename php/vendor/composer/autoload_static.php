<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit100b9cb315f1139507bf9519a4a69af2
{
    public static $prefixLengthsPsr4 = array (
        'P' => 
        array (
            'PHPMailer\\PHPMailer\\' => 20,
        ),
        'F' => 
        array (
            'Firebase\\JWT\\' => 13,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'PHPMailer\\PHPMailer\\' => 
        array (
            0 => __DIR__ . '/..' . '/phpmailer/phpmailer/src',
        ),
        'Firebase\\JWT\\' => 
        array (
            0 => __DIR__ . '/..' . '/firebase/php-jwt/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit100b9cb315f1139507bf9519a4a69af2::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit100b9cb315f1139507bf9519a4a69af2::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit100b9cb315f1139507bf9519a4a69af2::$classMap;

        }, null, ClassLoader::class);
    }
}
